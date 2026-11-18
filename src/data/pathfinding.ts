export interface PathfindingCode {
  /** File the excerpt comes from, rendered in the code block header. */
  caption: string;
  code: string;
}

export interface PathfindingTable {
  caption?: string;
  columns: string[];
  rows: string[][];
}

export interface PathfindingNote {
  kind: "note" | "tradeoff";
  title: string;
  text: string;
}

export interface PathfindingSection {
  id: string;
  /** Groups sections in the contents list and draws a divider in the body. */
  part: string;
  eyebrow: string;
  title: string;
  summary: string;
  paragraphs?: string[];
  bullets?: string[];
  code?: PathfindingCode;
  table?: PathfindingTable;
  note?: PathfindingNote;
}

export const PATHFINDING_META = {
  eyebrow: "Morimori · Unity / C#",
  title: "3D Voxel Worlds & Pathfinding",
  summary:
    "Morimori generates its worlds at runtime and lets players carve holes in them, so nothing about the level can be baked ahead of time — neither a navmesh nor a level mesh. This is the stack that replaced Unity's defaults: a 15³ chunk grid with deterministic generation, distance-based streaming, chunk meshes built in Jobs, a height-based occlusion cull, and on top of all of it a single flat occupancy array driving a 26-neighbour A* search that runs on worker threads.",
  stack: [
    "Unity",
    "C#",
    "Procedural generation",
    "Chunk streaming",
    "Unity Jobs",
    "A*",
    "Task parallelism",
    "Mirror",
  ],
  repo: "https://github.com/ilmn25/240809",
};

export const PATHFINDING_FLOW = [
  { label: "Chunk grid", detail: "15³ blocks" },
  { label: "Generation", detail: "seeded tasks" },
  { label: "Streaming", detail: "2 / 3 / 4 ranges" },
  { label: "Mesh + cull", detail: "Jobs, native arrays" },
  { label: "NavMap", detail: "1 byte / voxel" },
  { label: "A* + follower", detail: "26 neighbours" },
];

export const PATHFINDING_SECTIONS: PathfindingSection[] = [
  {
    id: "constraints",
    part: "The world",
    eyebrow: "01 · Constraints",
    title: "Why nothing could be baked",
    summary:
      "The two Unity systems this project would normally rely on assume a level that exists, complete and static, before the player arrives. Morimori has no such level.",
    paragraphs: [
      "A NavMesh is baked from static geometry: someone presses Bake, Unity rasterises the level into convex polygons, and agents query the result. A static-batched scene makes the same assumption — everything visible is known up front. Here the world is a grid of chunks that are generated while the player is already standing in it, unloaded when they fall out of range, modified one block at a time, and — for the dungeon — thrown away and rebuilt on every visit.",
    ],
    bullets: [
      "Generation is incremental. Chunks are created on first entry, so there is never a complete level to bake from.",
      "Streaming is mandatory. Worlds run up to 16 × 4 × 16 chunks, so only a neighbourhood may hold meshes at once.",
      "Blocks change at runtime. Digging or placing is a single-cell write that has to update collision, navigation, and the visual mesh immediately.",
      "Movement is grid-aligned. Entities are 0.7³ boxes stepping cell to cell, so a voxel grid is the exact shape of the simulation.",
    ],
    note: {
      kind: "tradeoff",
      title: "The trade",
      text: "A voxel grid gives up smooth polygon surfaces and baked-lighting shortcuts in exchange for O(1) random access, per-block edits, deterministic regeneration, and data that any thread can read. Everything below follows from that choice.",
    },
  },
  {
    id: "chunks",
    part: "The world",
    eyebrow: "02 · Chunks",
    title: "15³ blocks, one integer each",
    summary:
      "The chunk is the unit of storage, generation, streaming, meshing, culling, saving, and entity ownership. A world is a flat array of chunk references indexed by chunk coordinate.",
    paragraphs: [
      "A Chunk holds a single int[] of 15³ = 3,375 block ids, indexed x + size * (y + size * z). Chunk.Zero is a shared empty sentinel, which is what lets World's indexer answer for coordinates outside the world without null checks at every call site. Chunk coordinates and world coordinates live in the same value space — everything is snapped to multiples of 15 — so the indexer accepts block coordinates and divides internally.",
    ],
    code: {
      caption: "World.cs — chunk indexing",
      code: `public const int ChunkSize = 15;

public Chunk this[int x, int y, int z]
{
    get
    {
        int chunkX = x / ChunkSize, chunkY = y / ChunkSize, chunkZ = z / ChunkSize;
        if (IsInRange(chunkX, chunkY, chunkZ))
            return _chunks[GetIndex(chunkX, chunkY, chunkZ)];
        return Chunk.Zero;
    }
}

private int GetIndex(int chunkX, int chunkY, int chunkZ)
    => chunkX + Size.x * (chunkY + Size.y * chunkZ);`,
    },
    table: {
      caption: "Chunk geometry and the numbers that follow from it",
      columns: ["Quantity", "Value"],
      rows: [
        ["Chunk edge", "15 blocks"],
        ["Cells per chunk", "3,375 (one int[] per chunk)"],
        ["Padded neighbourhood for meshing", "17³ = 4,913 cells"],
        ["Mesh scratch preallocation", "20,250 faces · 81,000 verts · 121,500 indices"],
        ["Abyss world", "16 × 4 × 16 chunks = 240 × 60 × 240 blocks"],
        ["Occupancy map for that world", "3.46 M bytes ≈ 3.3 MB"],
      ],
    },
    bullets: [
      "Two coordinates, one convention. GetChunkCoordinate floors a world position onto the chunk grid; GetBlockCoordinate subtracts it to get a local 0–14 index. World.GetBlock/SetBlock are the only places that convert.",
      "The chunk owns its entities. Static entities (placed structures, doors, furniture) live in StaticEntity and loose items in DynamicEntity, so unloading a chunk is also the point where its contents are parked and its NavMap footprint is cleared.",
      "Chunks are the save unit. Chunk is [Serializable], so a save is the world's chunk array plus per-world metadata — no separate voxel format and nothing re-derived on load.",
    ],
  },
  {
    id: "generation",
    part: "The world",
    eyebrow: "03 · Generation",
    title: "A deterministic task pipeline per chunk",
    summary:
      "Generators are ordered lists of tasks. Chunk-pass work runs for every chunk, world-pass work runs once afterwards, and every random draw is seeded from the save seed plus the chunk coordinate.",
    paragraphs: [
      "Each world type declares an IGenTask array. The abyss, for example, runs stone → granite → marble → dirt → sand → forest → mountain → void on every chunk, then flattens the spawn pad, carves the dungeon and maw entrances, plants the spawn statue and garden, and finally scatters entities once over the whole world. Because the two hooks are separate, a task can fill terrain in RunChunk and place set-pieces in RunWorld.",
    ],
    code: {
      caption: "Gen.cs — the task contract and per-chunk seeding",
      code: `public interface IGenTask
{
    void RunChunk(Vector3Int coord, Chunk chunk) { }
    void RunWorld(World world) { }
}

public static System.Random CreateChunkRandom(string salt, Vector3Int chunkCoord)
{
    int hash = CombineHashes(Save.Inst.seed,
               CombineHashes(DeterministicStringHash(salt),
               CombineHashes(chunkCoord.x,
               CombineHashes(chunkCoord.y, chunkCoord.z))));
    return new System.Random(hash);
}`,
    },
    bullets: [
      "Determinism without ordering. A chunk's noise offsets and scatter rolls come from its own coordinate hash, so generation does not depend on the order chunks are visited in, and the same seed reproduces the same world.",
      "Stable string hashing. Seeds come from typed phrases; string.GetHashCode differs between .NET runtimes, so the generator uses its own DJB2-style hash to keep saves portable.",
      "Regeneration is a first-class mode. RegenerateOnVisit marks worlds that are discarded and rebuilt on entry (the dungeon), and a per-world LayoutNonce reseeds them so every visit is a new layout rather than a repeat.",
      "Generation happens before navigation starts. Chunks are generated, then the occupancy map is populated from them, so pathfinding never sees half-generated terrain.",
    ],
  },
  {
    id: "streaming",
    part: "The world",
    eyebrow: "04 · Streaming",
    title: "Three ranges, one traverse event",
    summary:
      "The player's chunk coordinate is polled every frame; when it changes, the world reloads around it. Load and unload are driven by separate ranges so visual and simulation distances can differ.",
    code: {
      caption: "Scene.cs — the ranges",
      code: `public static readonly int RenderRange = 2;   // chunks of meshes around the player
public static readonly int LogicRange  = 3;   // mob AI / despawn range
public static readonly int GenRange    = 4;   // client NavMap seeding range
public static readonly int RenderDistance = RenderRange * World.ChunkSize;
public static readonly int LogicDistance  = LogicRange * World.ChunkSize;`,
    },
    bullets: [
      "Traverse detection. Scene.Update compares the player's chunk coordinate with the previous one and calls World.LoadWorld, which fans out to chunk meshes, static entities, loose items, and the fog-of-war map.",
      "Load order is nearest-first. MapLoad builds its offset list once per range and sorts it by x² + z² + 2y², so the chunk the player is standing in is uploaded before the ones at the edge of the range — no visible hole when walking into a new area.",
      "Unload is the same pass in reverse. Chunks outside the range have their entities unloaded, their NavMap footprints cleared, and their GameObject destroyed one second later, so in-flight physics and renderers never reference a dead mesh.",
      "One mesh at a time. A SemaphoreSlim(1) serialises chunk mesh construction, because the job is synchronous (Schedule + Complete) and the Unity-side wiring has to happen on the main thread anyway.",
      "Entities follow their chunk. Static entities spawn when their chunk's mesh is created and are parked back into the chunk list when it unloads; mobs are never persisted at all — leaving the logic range discards them and the spawner decides when a replacement is needed.",
    ],
    note: {
      kind: "note",
      title: "Streaming and navigation are coupled deliberately",
      text: "The occupancy map is one world-space array, not per-chunk data. Streaming writes into it when a chunk arrives (skipping chunks it has already folded in) and clears entity footprints when one leaves. That is why a path can cross a chunk seam with no special case — and why PathRandom refuses to expand into a chunk outside the player's logic range, so idle mobs never drag far-away nav data into a search.",
    },
  },
  {
    id: "meshing",
    part: "The world",
    eyebrow: "05 · Meshing",
    title: "Padded neighbourhood, one job, native buffers",
    summary:
      "A chunk emits a face only where the neighbouring cell is empty, which means the mesher cannot work from 15³ cells alone. It reads a padded 17³ grid assembled from up to 27 chunks.",
    paragraphs: [
      "MeshLoadData.Create copies the chunk's own cells into the middle of a 17³ NativeMap3D, then fills the surrounding shell: six faces, twelve edges, and eight corners, each pulled from the neighbouring chunk. Seam-adjacent blocks therefore cull correctly inside the job instead of producing internal walls at chunk borders.",
    ],
    code: {
      caption: "MapLoad.cs — job scheduling and hand-off",
      code: `await _semaphoreSlim.WaitAsync();
if (_chunk != null && _chunk != Chunk.Zero)
{
    await Task.Run(() => LoadMeshMath()); // MeshMathJob: Schedule() + Complete()
    LoadMeshObject(replace);              // Unity objects, main thread only
}`,
    },
    bullets: [
      "The job is a plain IJob, not parallel-for. It walks y → z → x and emits a face only when the neighbour in that direction is empty; faces are triangles indexed into preallocated NativeLists.",
      "Per-layer counts are what make culling cheap later. The job accumulates Count[y] = number of faces up to and including layer y, so a later pass can ask how many vertices belong to the first N layers without rescanning geometry.",
      "Textures resolve inside the job. Each face looks up its block's rect in a NativeHashMap and applies autotiling from the neighbour pattern, so no per-face work is left for the main thread.",
      "Shadow geometry is emitted alongside. A second vertex set offset by 0.03 units feeds a shadow-only renderer, which is how blocks cast shadows without shadow-casting the main mesh twice.",
      "Output survives as native memory. ChunkMeshNativeData owns persistent NativeArrays of vertices, UVs, normals, and triangles; the managed Mesh is built from them, and the arrays are kept because the culler needs them again.",
    ],
    note: {
      kind: "tradeoff",
      title: "Schedule + Complete is not really parallelism",
      text: "The job is scheduled and immediately completed inside a task holding a one-at-a-time semaphore, so it buys allocation-free, Burst-friendly execution off the frame thread rather than true overlap. Mesh uploads never stall the main thread, at the cost of chunks arriving strictly one after another.",
    },
  },
  {
    id: "culling",
    part: "The world",
    eyebrow: "06 · Culling",
    title: "Hiding what is above the horizon",
    summary:
      "In this top-down view, terrain above the player buries the player. MapCull decides a single world height per frame, and every chunk culls itself against it in a job.",
    paragraphs: [
      "The trigger mixes intent and occlusion: if the orbit camera is blocked by terrain, or terrain is within 50 blocks along four angled directions, the player counts as indoors and culling turns on. MapCull then computes YThreshold = player y + YOffset, where the offset is player-adjustable and snaps back to a soft default after a while.",
    ],
    code: {
      caption: "MapCullComponent.cs — three cases per chunk",
      code: `if (_selfChunkPosition.y + World.ChunkSize < MapCull.YThreshold)   // entirely below
    { _meshRenderer.enabled = true; return; }
if (_selfChunkPosition.y >= MapCull.YThreshold)                     // entirely above
    { _meshRenderer.enabled = false; return; }
if (HandleRangeCheck())                                             // straddles the plane
    { await Task.Run(() => HandleCullMath()); HandleCullMesh(); }`,
    },
    bullets: [
      "Whole chunks are free. Anything above the threshold is a disabled renderer; anything below keeps the original mesh. Only the chunk containing the plane is rebuilt.",
      "The rebuild is a partial mesh, not a mask. HandleCullMathJob copies every vertex and triangle below the threshold through a NativeHashMap remap, then walks the layer at the threshold and emits a cap face wherever a block sits directly beneath it — so the cut looks solid from above.",
      "Rebuilds are frame-gated. CullSyncFrame schedules each rebuild a few frames apart and every component waits on it, so traversing into 100 chunks does not rebuild 100 meshes in one frame.",
      "Collision is untouched. Culling disables the MeshRenderer, never the MeshCollider, so physics and aiming behave identically whether or not the terrain above the player is drawn.",
      "Shadows stay consistent. The shadow mesh is a separate renderer, so a culled chunk keeps casting from its own geometry while its visible surface is rebuilt.",
    ],
  },
  {
    id: "edits",
    part: "The world",
    eyebrow: "07 · Edits",
    title: "One block write, four systems",
    summary:
      "Digging a block is the point where the world, the collision grid, the navigation grid, and every connected client have to agree. World.SetBlock is where that is coordinated.",
    code: {
      caption: "World.cs — SetBlock",
      code: `Inst[chunkCoordinate][blockCoordinate] = blockID;
byte navValue = blockID == 0 ? NavMap.Air : NavMap.Block;
NavMap.Set(coordinate, navValue);
NavMapSync.BroadcastBlockUpdate(coordinate, navValue);
MapUpdated?.Invoke(coordinate);

MapLoad.RefreshExistingChunk(chunkCoordinate);`,
    },
    bullets: [
      "The chunk write is authoritative. Storage stays a plain int[] of block ids; everything else is derived from it.",
      "Navigation is patched, not rebuilt. One byte flips in the occupancy array, and the pathfinder picks the change up on its next search.",
      "The mesh is rebuilt for that chunk only. RefreshExistingChunk re-runs the mesh job with replace = true, reusing the existing GameObject and MapCullComponent.",
      "Seams are handled explicitly. If the edited cell sits on a chunk border, SetBlock refreshes the adjacent chunk too — including the twelve edge and eight corner neighbours — because the padded mesher only looked across that seam when those chunks were built.",
      "Clients receive the same byte. A single-block NavMap message keeps every peer's occupancy map identical without re-sending chunk data; doors do the same per cell when they open and close.",
      "Structures are not terrain. Placing a door or a bed spawns an entity whose footprint is stamped into the map with its own value (Door or Semi) and withdrawn again when it unloads.",
    ],
  },
  {
    id: "navmap",
    part: "Navigation",
    eyebrow: "08 · Occupancy",
    title: "One byte per voxel",
    summary:
      "NavMap is a flat byte array covering the whole world. Every collision answer, for pathfinding and for movement, comes out of this array.",
    paragraphs: [
      "The array is sized Bounds.x × Bounds.y × Bounds.z and indexed with the same x-major flattening as the chunk data, so lookups are cheap and cache-friendly along x. Unlike the chunk grid it has no per-chunk structure at all: streaming folds chunks into it as they arrive, and it is initialised before any chunk data is written.",
    ],
    code: {
      caption: "NavMap.cs",
      code: `public const byte Air = 0;   // empty, walkable
public const byte Door = 1;  // blocks movement, pathfinding can route through
public const byte Block = 2; // fully solid
public const byte Semi = 3;  // fully solid (slab, sign, bed, …)

private static int GetIndex(int x, int y, int z)
    => x + World.Inst.Bounds.x * (y + World.Inst.Bounds.y * z);`,
    },
    table: {
      caption: "Cell values and what each system does with them",
      columns: ["Value", "Movement", "Pathfinding"],
      rows: [
        ["Air (0)", "Walkable", "Traversable"],
        ["Door (1)", "Blocked", "Traversable, +10 cost"],
        ["Block (2)", "Blocked", "Impassable"],
        ["Semi (3)", "Blocked", "Impassable"],
      ],
    },
    bullets: [
      "Build order. Scene startup calls NavMap.Initialize(), each chunk is folded in with SetChunk (block id 0 → Air, anything else → Block), and every static entity then stamps its footprint using its own NavValue — which is how a door becomes Door and a bed becomes Semi.",
      "Folding is idempotent. SetChunk records which chunk coordinates it has already consumed, so repeated traversals never re-stamp stale block data over a changed cell.",
      "Solidity is one shared query. IsBlocked sweeps the standard mob collider (0.35 half-width, 0.25 half-depth, 0.7 tall) and returns true if any overlapping cell is not Air. A* uses it to decide whether a cell can be stood in; movement uses it to decide whether a step is legal.",
      "Escape hatches. TryFindSurface snaps a column down to the highest cell that is air above solid ground, and TryFindOpenSpot walks outward shell by shell when an entity has been sealed inside geometry.",
    ],
    note: {
      kind: "note",
      title: "Out-of-bounds is not a wall",
      text: "Get() returns Block when the map is uninitialised, but Air outside the world bounds. Node.IsAir then overrides that: negative or over-maximum x/z count as solid, while any y above the ceiling counts as open. That asymmetry is deliberate — it lets a search climb above the world instead of failing at the roof line.",
    },
  },
  {
    id: "search",
    part: "Navigation",
    eyebrow: "09 · Search",
    title: "A* on a 26-neighbour lattice",
    summary:
      "PathFind is a textbook A* with three deliberate deviations: a squared-distance heuristic, per-move costs that match the cell geometry, and an expansion budget that guarantees a bounded frame cost.",
    code: {
      caption: "PathFind.cs — the search loop",
      code: `openList.Add(new Node(start, null, 0, SqDist(start, end), false, Vector3Int.zero));
while (openList.Count > 0 && closedList.Count < scanCount)
{
    openList.Sort((A, B) => A.F.CompareTo(B.F));
    currentNode = openList[0];
    openList.RemoveAt(0);
    closedList.Add(currentNode.Position);

    foreach (var direction in Node.Directions) // 26 offsets
    {
        dirPosition = Vector3Int.FloorToInt(currentNode.Position + direction);
        if (closedList.Contains(dirPosition)) continue;

        isFloat = Node.IsAir(dirPosition + Vector3Int.down);
        gCost = currentNode.G + SqDist(currentNode.Position, dirPosition);
        if (direction.x != 0 && direction.z != 0 && isFloat) gCost++;
        if (NavMap.IsSemiBlocking(NavMap.Get(dirPosition))) gCost += ObstaclePenalty;

        if (openList.Exists(n => n.Position == dirPosition && n.G <= gCost) ||
            !agent.IsValidPosition(dirPosition, direction, currentNode)) continue;

        openList.Add(new Node(dirPosition, currentNode, gCost,
                              SqDist(dirPosition, endPosition), isFloat, direction));
    }
}`,
    },
    bullets: [
      "Move cost is squared distance, so the eight orthogonal steps cost 1, the twelve edge diagonals cost 2, and the eight space diagonals cost 3. A diagonal step taken while the cell below is air adds 1, which makes airborne corner-cutting slightly less attractive than staying grounded.",
      "Doors cost ObstaclePenalty = 10 on top of the move cost. They are navigable, so a mob will path through a closed door when the alternative is long enough, but a detour almost always wins.",
      "The heuristic is squared Euclidean distance, which over-estimates. A* therefore behaves like a weighted/greedy search: it drives hard at the goal and finishes quickly, but the returned path is not guaranteed optimal. On a grid built from 1/2/3-cost steps this is the intended trade — mobs only need a plausible route.",
      "Adjacency is the goal test, not equality. When the popped node is one axis-aligned cell away from the target, the target is appended directly and the loop returns, so the search never has to expand the goal itself.",
      "scanCount is the budget, not a distance. GroundPathingModule passes Info.PathAmount (3000 by default), which caps how many cells may be closed before the search must answer. When the budget or the open list runs out, the closest node reached so far is returned instead — a mob always gets a path, even if it is only a partial one.",
    ],
    note: {
      kind: "tradeoff",
      title: "No decrease-key",
      text: "If a cheaper route to an already-open cell is found, a second node for that cell is inserted rather than the existing one being re-parented. The closed set keeps it from expanding twice, so the cost is a slightly larger open list, not a wrong path. Likewise, the goal node appended at the end is not legality-checked — the final step trusts the caller.",
    },
  },
  {
    id: "legality",
    part: "Navigation",
    eyebrow: "10 · Legality",
    title: "The same grid, five different creatures",
    summary:
      "A* knows what blocks the world; it does not know what a rabbit can climb. Legality is delegated to the agent through IsValidPosition, so every creature filters the same search with its own rules.",
    paragraphs: [
      "GroundPathingModule implements five gates on a candidate cell, all evaluated against the agent's tuning fields: clearance for its own height, no corner cutting on diagonals, ground under it when jumping, enough remaining air time to reach the next surface, and no falls longer than it can survive. Changing an animal's jump height therefore changes its search graph without touching the pathfinder.",
    ],
    code: {
      caption: "GroundPathingModule.cs — diagonal and fall gates",
      code: `// diagonal moves may not cut a corner
if (dir.x != 0 && dir.z != 0)
    validity = Node.IsAir(new Vector3Int(pos.x - dir.x, pos.y - dir.y, pos.z))
            && Node.IsAir(new Vector3Int(pos.x, pos.y - dir.y, pos.z - dir.z))
            && Node.IsAir(new Vector3Int(pos.x - dir.x, pos.y, pos.z))
            && Node.IsAir(new Vector3Int(pos.x, pos.y, pos.z - dir.z));

// falling: require ground within PathFall cells
for (int fall = 0; fall < Info.PathFall; fall++)
    if (!Node.IsAir(new Vector3Int(pos.x, pos.y - fall, pos.z)))
        validity = true;`,
    },
    table: {
      caption: "MobInfo tuning fields that reshape the search graph",
      columns: ["Field", "Default", "Effect"],
      rows: [
        ["PathHeight", "1", "Cells of vertical clearance the agent needs"],
        ["PathJump", "1", "Blocks it can climb; 0 disables all vertical moves"],
        ["PathAir", "4", "Steps of air time allowed between surfaces (−1 = unlimited)"],
        ["PathFall", "15", "Longest drop it will accept before rejecting the edge"],
        ["PathAmount", "3000", "Expansion budget per search"],
        ["PointLostDistance", "5", "Distance from the current waypoint that counts as lost"],
        ["MaxStuckCount", "250", "Repath ticks without movement before giving up"],
        ["NormalSkipAmount", "1", "Waypoints skipped per reached point"],
      ],
    },
    note: {
      kind: "note",
      title: "Flying is not a pathfinding mode",
      text: "There is no flying A*. CanFly only bypasses the two ground-specific bits: the search no longer waits for the target to land, and Node.GetPathList keeps the airborne tail of the path instead of trimming it. Hovering enemies skip the search entirely and steer straight at their anchor with HoverMovementModule.",
    },
  },
  {
    id: "shaping",
    part: "Navigation",
    eyebrow: "11 · Shaping",
    title: "Cell centres, ledges, and trimmed tails",
    summary:
      "A* returns cell coordinates; a character needs world positions it can actually reach. GetPathList rewrites the raw chain into a walkable polyline on the way back to the caller.",
    code: {
      caption: "Node.cs — GetPathList",
      code: `if (!jumpEnd)                                  // !CanFly
    while (currentNode != null && currentNode.IsFloat)
        currentNode = currentNode.Parent;      // drop the airborne tail

while (currentNode != null)
{
    currentNode.Position.x += 0.5f;            // cell centre
    currentNode.Position.z += 0.5f;

    if (currentNode.IsFloat || currentNode.Parent is { IsFloat: true })
    {
        currentNode.Parent.Position.x += currentNode.Direction.x * 0.35f;
        currentNode.Parent.Position.z += currentNode.Direction.z * 0.35f;
    }

    pathList.Add(currentNode);
    currentNode = currentNode.Parent;
}
pathList.Reverse();`,
    },
    bullets: [
      "Cell centres. Voxel coordinates are floor indices, so every waypoint is offset by +0.5 on x and z — the same convention NavMap.IsBlocked assumes when it tests the mob collider.",
      "Ledge offset. Any waypoint adjacent to an airborne node pushes its parent 0.35 blocks along the move direction. A jump therefore starts slightly past the edge rather than from the centre of the last solid cell, which is what makes a one-block gap clearable at walking speed.",
      "Tail trimming. Ground agents cannot fly, so a path that ends mid-air is truncated back to the last grounded cell. Fliers keep it, which is why the same function takes the agent's CanFly as its argument.",
      "The chain is reversed in place, reusing the node objects — each node is also the parent link of the next, so the list must be built backwards and flipped once.",
    ],
  },
  {
    id: "following",
    part: "Navigation",
    eyebrow: "12 · Following",
    title: "Reaching the path is a separate problem",
    summary:
      "PathingModule owns the whole life cycle of a route: when to ask for one, how to swap it in safely, which waypoint to chase, and when to admit it is stuck.",
    paragraphs: [
      "Searches run asynchronously, so a result can never be applied immediately. Results land in a queued field and are swapped into the live path on the next Update, together with a recomputed waypoint index. A generation counter invalidates any in-flight search whose target was replaced, so a stale route can never be walked.",
    ],
    bullets: [
      "Waypoint selection. When a waypoint is reached the follower jumps ahead by NormalSkipAmount (stopping early if the next point is airborne), then HandleAirMovePoint walks forward through consecutive floating points that share the same direction so a jump arc is consumed as one move.",
      "Reached means close enough. A grounded point is accepted within 0.45/2 horizontally and 0.04 vertically; the final point uses a stop distance derived from speed × deceleration so the agent does not overshoot or jitter.",
      "Two stuck detectors. Either the agent has drifted more than PointLostDistance (5) from its current waypoint, or it has moved less than 0.002 blocks in the last tick MaxStuckCount (250) times. Either one triggers OnStuck, which repaths up to MaxRepathCount times before reporting PathingStatus.Stuck.",
      "Repath cadence. A 0.5 s routine re-searches only when the chase target has moved more than DistAttack, so a stationary target never costs a search.",
      "Abstract movement. Off-render entities skip collision entirely and slide along Direction at SpeedLogic, snapping to the waypoint on arrival. Distant mobs stay cheap; only visible ones pay for physics.",
    ],
    note: {
      kind: "note",
      title: "Landing before pathing",
      text: "A ground mob will not start a chase search while its target is still mid-air or while it is not grounded itself — the path would be computed against a floor that is about to change. It waits in a 100 ms poll until the target is above solid ground.",
    },
  },
  {
    id: "cheap-paths",
    part: "Navigation",
    eyebrow: "13 · Cheap paths",
    title: "Wander, strafe, and flee",
    summary:
      "Most mob movement is not goal-directed. PathRandom runs the same search with a synthetic destination and a budget measured in blocks, which turns A* into a bounded random walk.",
    paragraphs: [
      "Roaming picks a random offset scaled by DistRoam; strafing uses DistStrafe; evasion and escape use the vector away from the target, dropped ten blocks so the wander tends downward. The candidate destination is the start plus that offset, and the search budget becomes the offset length — a 10-block roam expands at most ten cells before returning the path to whatever cell got closest.",
    ],
    bullets: [
      "Chunk-range filter. PathRandom rejects any neighbour outside the player's logic range, so idle mobs never drag navigation data in from unstreamed chunks.",
      "Best-effort by design. The return value is the path to the closest node reached, never a failure. A wander that hits a wall simply produces a path that stops at the wall.",
      "One search, two vocabularies. PathFind and PathRandom differ in goal selection, budget, and range filtering; the neighbour expansion, costs, and legality checks are identical.",
    ],
  },
  {
    id: "execution",
    part: "Navigation",
    eyebrow: "14 · Execution",
    title: "Ten workers and one shared array",
    summary:
      "Searches run on the thread pool with a hard concurrency cap, reading a byte array that the main thread keeps mutating. The design leans on cheap recovery rather than locking.",
    code: {
      caption: "PathFind.cs — the job gate",
      code: `private static readonly int MaxTaskCount = 10;
private static SemaphoreSlim _semaphore = new(MaxTaskCount, MaxTaskCount);

await _semaphore.WaitAsync();
try
{
    _startPosition = NavMap.GetRelativePosition(Vector3Int.FloorToInt(agent.Machine.transform.position));
    _endPosition   = NavMap.GetRelativePosition(Vector3Int.FloorToInt(agent.GetTargetPosition()));
    return await Task.Run(() => FindPathAsync(agent, _startPosition, _endPosition, scanCount));
}
finally
{
    _semaphore.Release();
}`,
    },
    bullets: [
      "A semaphore caps concurrency at ten searches; the queueing happens inside the awaited call, so a hundred mobs repathing at once cannot saturate the pool.",
      "Positions are captured into parameters before the job is queued, so the search never touches Unity's Transform API off the main thread — the only shared mutable state it reads is the NavMap array itself.",
      "NavMap reads are lock-free. Writes (a placed block, a door toggling, a chunk folding in) happen on the main thread while searches read, so a search can observe a cell change mid-run. The follower tolerates it: positions are always re-validated by movement collision, and the next repath happens within half a second.",
      "Repath is fire-and-forget with a generation counter and a queued-repath flag: whoever asks last wins, and stale results are discarded instead of being walked.",
    ],
    note: {
      kind: "tradeoff",
      title: "Where the time actually goes",
      text: "Every expansion sorts the open list and every neighbour does a linear Exists scan, so large budgets (3000) are dominated by list bookkeeping rather than by grid reads. The cap keeps the worst case bounded, which is the property that matters for a 60 fps budget shared by dozens of mobs.",
    },
  },
];
