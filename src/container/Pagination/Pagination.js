import React, { Component } from 'react';

class Pagination extends Component {
    render() {
        const pageNumbers = []

        for(let i = 1 ; i<=Math.ceil(this.props.totalPosts / this.props.postsPerPage); i++){
            pageNumbers.push(i)
        }

        console.log(pageNumbers)
        
        return (
                <ul className='pagination justify-content-center'>
                    {pageNumbers.map(number => {
                       return(
                            <li key={number} className='page-item'>
                                <a onClick={()=> this.props.paginate(number)} href="!#" className='page-link'>{number}</a>
                            </li>
                       )
                    })}
                </ul>
                
        );
    }
}


export default Pagination;
