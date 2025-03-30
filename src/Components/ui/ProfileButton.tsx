import { useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import useAuth from "../../auth/useAuth";
import "./ProfileButton.css"
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../../mobile/useIsMobile";


const ProfileButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {currentUserId, currentUser, setCurrentUser, setCurrentUserId} = useAuth();
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    function toggleModal() {
        const modal = document.getElementById("myModal")
        if (modal) {
            !isModalOpen ? (modal.style.display = "block") : (modal.style.display = "none");
        }
        setIsModalOpen(!isModalOpen);
    }
    
    // Close modal when clicking outside the content
    window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (modal && (event.target === modal)) {
        setIsModalOpen(!isModalOpen);
        modal.style.display = "none";
    }
    };

    function handleLogout(){
        setCurrentUser(null); 
        setCurrentUserId(null);
        navigate("/login");
        toggleModal()
    }

    function handleLogIn(){
        navigate("/login");
        toggleModal()
    }

    return(
        <>
            <button onClick={() => toggleModal()} className="open-button"><FaUserLarge /></button>

            <div id="myModal" className="modal">
                <div className={isMobile ? "mobile__modal-content" : "modal-content" }>
                    <span className="close" onClick={() => toggleModal()}>&times;</span>
                    {currentUser ? 
                        (<>
                        <h2>Prihlásený ako: {currentUser}</h2>
                        <button className="load__more__button" onClick={() => handleLogout()}>Odhlásiť sa</button>
                        {/* <button onClick={() => handleLogout()}>Zmeniť heslo</button> */}
                        </>)
                        :
                        (<>
                        <h2 >Nie ste prihlásený</h2>
                        <button className="load__more__button" onClick={()=> handleLogIn()}>Prihlásiť sa</button>
                        </>)
                    }
                </div>
            </div>
        </>
    )
}

export default ProfileButton;