import React from "react";
import cl from "./pagination.module.css";

const Pagination = ({pagesArray, page, changePage}) => {
    return(
        <div className={cl.pagination}>
            {pagesArray.map(p => 
            <span 
                onClick={() => changePage(p)}
                key={p} 
                className={page === p ? cl.btn.concat(" ", cl.current) : cl.btn}
            >
                {p}
            </span>
            )}
        </div>
    );
};

export default Pagination