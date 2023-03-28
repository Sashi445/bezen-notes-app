import { useState, useContext } from 'react';
import { NotesContext } from './../app/notesContext';
import { addNoteAsync, updateNoteAsync } from './../app/actions';
import { v4 as uuidv4 } from "uuid";

const initialFormState = {
    title: "",
    tagline: "",
    body: "",
    color: "",
    pinned: false,
    tags: []
}

const NoteForm = ({ setShowModal, noteState }) => {

    const { dispatch } = useContext(NotesContext);

    const edit = noteState ? true : false

    const [formState, setFormState] = useState(!noteState ? initialFormState : noteState);
    const [error, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setFormState(prevFormState => ({ ...prevFormState, [e.target.name]: e.target.value }))
    }

    const handlePinnedCheckbox = () => {
        setFormState(prevFormState => ({ ...prevFormState, pinned: !prevFormState.pinned }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errorTxt = ""
        if (!formState.title) errorTxt = "Title is required"
        else if (!formState.tagline) errorTxt = "Tagline is required"
        else if (!formState.body) errorTxt = "body is required"

        if (errorTxt) {
            setErrorMsg(errorTxt)
            return;
        } else {
            let action = null
            const payload = { ...formState }
            if (!edit) {
                action = await addNoteAsync({ ...payload, id: uuidv4() });
            }
            else action = await updateNoteAsync({ ...payload });
            dispatch(action);
            setShowModal(false);
            setFormState(initialFormState);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className='form-label'>Title</label>
                <input placeholder='Enter your note title' name='title' id="title" type="text" className="form-control" value={formState.title} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="body" className="form-label">Body</label>
                <textarea placeholder='body' name="body" id="body" className="form-control" value={formState.body} onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="tagline" className='form-label'>Tagline</label>
                <input name='tagline' id="tagline" type="text" className="form-control" value={formState.tagline} onChange={handleChange} />
            </div>
            <div className='mb-3'>
                <input className='form-check-input me-2' checked={formState.pinned} type="checkbox" name="pinned" id="pinned" onChange={handlePinnedCheckbox} />
                <label className='form-check-label' htmlFor="pinned">Pinned</label>
            </div>
            {!error ? null : <div className='alert alert-danger'>{error}</div>}
            <div className='text-end'>
                <button className='btn btn-sm btn-outline-primary' type="submit">
                    {!edit ? 'Create' : 'Update'}
                </button>
            </div>
        </form>
    );
}

export default NoteForm;