import React from "react";
import { FileText } from "lucide-react";
import { PERSONAL_INFO } from "../constants";

interface ResumeMenuProps {
  triggerClassName: string;
  rootClassName?: string;
}

const ResumeMenu: React.FC<ResumeMenuProps> = ({
  triggerClassName,
  rootClassName = "",
}) => {
  return (
    <a
      href={PERSONAL_INFO.social.resume}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Resume"
      title="Resume"
      className={`${triggerClassName} ${rootClassName}`}
    >
      <FileText className="w-6 h-6 transition-transform group-hover:scale-110" />
    </a>
  );
};

export default ResumeMenu;
