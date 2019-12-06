import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shelves from './Shelves';
import PropTypes from 'prop-types';

class ListBooks extends Component{
    static propTypes = {
        shelfCategory: PropTypes.array,
        books: PropTypes.array,
        handleBookShelfChange: PropTypes.func,
    }

    render(){
        const { shelfCategory, books, handleBookShelfChange } = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {shelfCategory.map(shelf=>(
                      <Shelves
                        key={shelf.type}
                        shelf={shelf}
                        books={books.filter(book=>
                          shelf.type===book.shelf)}
                        handleBookShelfChange={handleBookShelfChange}/>
                    ))}
                </div>
                <Link className="open-search" to="/search">
                    <button>Add a book</button>
                </Link>
            </div>
        )
    }
}

export default ListBooks;
