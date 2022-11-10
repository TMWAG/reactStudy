import { useMemo } from "react";

export const usePagination = (totalPages) =>{
    const pagesArray = useMemo(() => {
        const pages = [];
        while(pages.length < totalPages){
            pages.push(pages.length+1);
        };
        return pages;
    }, [totalPages]);
    return pagesArray;
}
