
import { usePagination } from './../utils/usePagination';
import Note from './Note';
import ArrowLeft from "./../assets/arrow-lleft.png";
import ArrowRight from "./../assets/arrow-right.png";
import Icon from './Icon';

const Pagination = ({ title, items }) => {

    const { page, pageIncrement, pageDecrement, getCurrentPageItems, totalPages } = usePagination(0, 4, items);

    const currPageItems = getCurrentPageItems();

    return (<div className="container mb-6">
        <div className='mb-4 d-flex align-items-center justify-content-center'>
            <div className='flex-grow-1 d-flex align-items-center'>
                <span className='h3 me-2' >{title}</span> <span className="badge rounded-full text-bg-primary">{items.length}</span>
            </div>
            <div className='d-flex align-items-center'>
                <div className='me-3'>
                    {page + 1} / {totalPages + 1}
                </div>
                <button className='btn btn-sm btn-secondary me-2' disabled={page === 0} onClick={pageDecrement}>
                    <Icon src={ArrowLeft} alt={'arrow-left'} />
                </button>
                <button className='btn btn-sm btn-secondary' disabled={page === totalPages} onClick={pageIncrement}>
                    <Icon src={ArrowRight} alt={'arrow-right'} />
                </button>
            </div>
        </div>
        <div className='grid'>
            {currPageItems.map(note => (<Note note={note} key={note.id} />))}
        </div>
    </div>);
}

export default Pagination;