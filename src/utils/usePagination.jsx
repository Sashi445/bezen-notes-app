import { useState } from 'react';

export const usePagination = (initialPage = 0, pageSize, items) => {

    const totalPages = items.length === 0 ? 0 : (items.length % pageSize ? Math.floor(items.length / pageSize) : Math.floor(items.length / pageSize) - 1);

    const [page, setPage] = useState(initialPage);

    const pageIncrement = () => setPage(prev => prev === totalPages ? 0 : prev + 1);

    const pageDecrement = () => setPage(prev => prev === 0 ? prev : prev - 1);

    const getCurrentPageItems = () => {
        const start = page * pageSize;
        return page === totalPages ? items.slice(start) : items.slice(start, start + pageSize);
    }

    return { page, pageIncrement, pageDecrement, getCurrentPageItems, totalPages };
}

