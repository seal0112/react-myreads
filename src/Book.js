import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component{
    static propTypes = {
        book: PropTypes.object.isRequired,
        shelf: PropTypes.string.isRequired,
        handleBookShelfChange: PropTypes.func.isRequired,
    }

    state = {      
        bookShelfOptions: [
            {
                value: 'currentlyReading',
                label: 'Currently Reading'
              },
            {
                value: 'wantToRead',
                label: 'Want to Read'
                },
            {
                value: 'read',
                label: 'Read'
            }]
    }

    render(){
        const { book, handleBookShelfChange, shelf } = this.props;

        return (
            <div className="book">
                <div className="book-top">
                    <div
                      className="book-cover"
                      style={{ 
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select
                          value={shelf}
                          onChange={handleBookShelfChange.bind(this, book.id)}>
                            <option value="move" disabled>Move to...</option>
                            {this.state.bookShelfOptions.map(opt=>
                                (<option
                                  key={opt.value}
                                  value={opt.value}>
                                    {opt.label}
                                </option>))}
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors && book.authors.map(author=>(
                    <div
                      key={author}
                      className="book-authors">
                        {author}
                    </div>
                ))}
            </div>
        )
    }
}

export default Book;