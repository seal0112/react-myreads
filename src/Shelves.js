import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class Shelves extends Component{
    static propTypes = {
        shelf: PropTypes.object,
        handleBookShelfChange: PropTypes.func,
    }

    render(){
        const { shelf, handleBookShelfChange } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            this.props.books.map(book=>(
                                <li key={book.id}>
                                    <Book
                                      book={book}
                                      shelf={shelf.type}
                                      handleBookShelfChange={handleBookShelfChange}/>
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default Shelves;