import "./CompactWordDisplay.css";
import { useIsMobile } from "../../mobile/useIsMobile";

const ParticipantNameDisplay = ({ name } : { name: string }) => {
  const isMobile = useIsMobile();
  return <span className= {isMobile ? "mobile__name__style" : "name__style"}>{ name }</span>;
};

export default ParticipantNameDisplay;


