import "./ProfileButton.css"
import { CgMenu } from "react-icons/cg";

type Props = {
    elementId : string;
    isModalOpen : boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuButton = ({elementId, isModalOpen, setIsModalOpen} : Props) => {

    function toggleModal() {
        const modal = document.getElementById(elementId)
        if (modal) {
            !isModalOpen ? (modal.style.display = "block") : (modal.style.display = "none");
        }
        setIsModalOpen(!isModalOpen);
    }
    
    // zatvara modal pri kliknuti mimo
    window.onclick = function(event) {
    const modal = document.getElementById(elementId);
    if (modal && (event.target === modal)) {
        setIsModalOpen(!isModalOpen);
        modal.style.display = "none";
    }
    };

    return(
        <>
            <button onClick={() => toggleModal()} className="open-button"><CgMenu /></button>
        </>
    )
}

export default MenuButton;