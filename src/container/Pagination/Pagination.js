import React, { Component, useState, useEffect } from 'react';

const Pagination = (props) => {
        
        const [postsPerPage, setPostsPerPage] = useState(0);
        const [totalPosts, setTotalPosts] = useState(0);
        /* Recupération des données de posts */
        useEffect(()=> {
            setPostsPerPage(props.postsPerPage)
            setTotalPosts(props.totalPosts)
        })

        const pageNumbers = []
        /* Calcul du nombre de pages  */
        for(let i = 1 ; i<=Math.ceil(totalPosts / postsPerPage); i++){
            pageNumbers.push(i)
        }

        return (
                <ul className='pagination justify-content-center'>
                {/* Boucle d'affichage des livres  */}
                    {pageNumbers.map(number => {
                       return(
                            <li key={number} className='page-item'>
                                <a onClick={(e)=> props.paginate(number,e)} href="!#" className='page-link'>{number}</a>
                            </li>
                       )
                    })}
                </ul>
        );
}
export default Pagination;

