// IconLibrary.ts
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faFloppyDisk, 
  faEye, 
  faPen, 
  faCog, 
  faDesktop 
} from "@fortawesome/free-solid-svg-icons";

interface IconProps {
  name: "floppyDisk" | "eye" | "pen" | "cog" | "desktop";
  size?: "xs" | "sm" | "lg" | "1x" | "2x" | "3x";
  title?: string;
}

const iconMap = {
  floppyDisk: faFloppyDisk,
  eye: faEye,
  pen: faPen,
  cog: faCog,
  desktop: faDesktop,
};

const Icon: React.FC<IconProps> = ({ name, size = "1x", title }) => (
  <FontAwesomeIcon icon={iconMap[name]} size={size} title={title} />
);

export default Icon;
