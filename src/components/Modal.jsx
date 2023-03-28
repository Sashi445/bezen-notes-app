import { createPortal } from "react-dom";

const Modal = ({ children, showModal, setShowModal }) => {

    const modalStyle = {
        top: '0px',
        left: '0px',
        position: 'absolute',
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        overflow: 'hidden'
    }

    return (
        <>
            {showModal ? createPortal((<div onClick={() => setShowModal(false)} style={modalStyle}>
                <div className="card" onClick={(e) => { e.stopPropagation() }}>
                    <div className="card-body">
                        {children}
                    </div>
                </div>
            </div>), document.body) : null}
        </>
    );
}

export default Modal;