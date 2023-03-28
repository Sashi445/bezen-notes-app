
import NoteForm from './../components/NoteForm';
import { useContext, useEffect, useState } from 'react';
import { NotesContext } from './../app/notesContext';
import Modal from '../components/Modal';
import { readAllNotesAsync } from '../app/actions';
import Pagination from '../components/Pagination';

const Notes = () => {
    const { state: notes, dispatch } = useContext(NotesContext);

    const pinnedNotes = notes.filter(note => note?.pinned)
    const unPinnedNotes = notes.filter(note => !note?.pinned)

    const [showNoteForm, setShowNoteForm] = useState(false);

    const toggleNoteForm = () => setShowNoteForm(prev => !prev);

    useEffect(() => {
        readAllNotesAsync().then(action => {
            dispatch(action);
        }).catch(err => {
            console.log(err.message);
        })
    }, [])

    return (
        <>
            <Modal showModal={showNoteForm} setShowModal={setShowNoteForm}>
                <NoteForm setShowModal={setShowNoteForm} />
            </Modal>
            <div className="container py-6">
                <div className="mb-12">
                    <div className="d-flex">
                        <div className="flex-grow-1 h2 font-bold">
                            Notes App
                        </div>
                        <button className='btn btn-sm btn-success' onClick={toggleNoteForm}>+ Add Note</button>
                    </div>
                </div>
                <Pagination title={'Pinned'} items={pinnedNotes} />
                <Pagination title={'Others'} items={unPinnedNotes} />
            </div>
        </>
    );
}

export default Notes;