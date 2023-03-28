import { deleteNoteAsync, pinNote, unpinNote } from "./../app/actions";
import { useContext, useState } from 'react';
import { NotesContext } from './../app/notesContext';
import Modal from "./Modal";
import NoteForm from "./NoteForm";
import PinFill from './../assets/pin-fill.png';
import PinOutline from "./../assets/pin-outline.png";
import Edit from "./../assets/edit.png";
import Delete from "./../assets/delete.png";
import Icon from './Icon';
import { updateNoteFb } from './../services/firebase';

const Note = ({ note }) => {

    const { id, title, tagline, body, pinned } = note;

    const { dispatch } = useContext(NotesContext);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const pinnedSrc = pinned ? PinFill : PinOutline;

    const handleNotePin = async () => {
        let action = null
        if (!pinned) {
            action = await updateNoteFb({ ...note, pinned: true }).then(() => {
                return pinNote(id);
            });
        } else {
            action = await updateNoteFb({ ...note, pinned: false }).then(() => {
                return unpinNote(id);
            });
        }
        dispatch(action);
    }

    const handleNoteDelete = async () => {
        let action = await deleteNoteAsync(id);
        dispatch(action)
    }

    return (
        <>
            <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal} >
                <div>
                    <div className="mb-5">
                        Are you sure you want to delete ?
                    </div>
                    <div className="text-end">
                        <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => setShowDeleteModal(false)} >Cancel</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={handleNoteDelete}>Delete</button>
                    </div>
                </div>
            </Modal>
            <Modal setShowModal={setShowEditModal} showModal={showEditModal}>
                <NoteForm setShowModal={setShowEditModal} noteState={{ id, title, body, tagline, pinned }} />
            </Modal>
            <div className="card g-col-lg-3 g-col-sm-6 g-col-12 ">
                <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                        <div className="flex-grow-1">
                            <p className="font-bold text-lg">{title}</p>
                        </div>
                        <div onClick={handleNotePin}>
                            <Icon src={pinnedSrc} />
                        </div>
                    </div>
                    <div className="">
                        {body}
                    </div>
                </div>
                <div className="card-footer">
                    <div className="d-flex">
                        <div className="flex-grow-1">
                            <span className="badge rounded-pill text-bg-secondary">{tagline}</span>
                        </div>
                        <div className="cursor-pointer me-2" onClick={() => setShowEditModal(true)}>
                            <Icon src={Edit} alt={'edit'} />
                        </div>
                        <div className="cursor-pointer" onClick={() => setShowDeleteModal(true)} >
                            <Icon src={Delete} alt={'delete'} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Note;