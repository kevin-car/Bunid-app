import React, { Component } from 'react';

const Pagination = (props) => {
        const pageNumbers = []

        for(let i = 1 ; i<=Math.ceil(props.totalPosts / props.postsPerPage); i++){
            pageNumbers.push(i)
        }

        return (
                <ul className='pagination justify-content-center'>
                    {pageNumbers.map(number => {
                       return(
                            <li key={number} className='page-item'>
                                <a onClick={()=> props.paginate(number)} href="!#" className='page-link'>{number}</a>
                            </li>
                       )
                    })}
                </ul>         
        );
    
}
export default Pagination;

