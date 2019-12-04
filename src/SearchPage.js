import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import PropTypes from 'prop-types';
import * as BooksAPI from './utils/BooksAPI';

class SearchPage extends Component{
    static propTypes = {
        searchBooks: PropTypes.array,
        searchValue: PropTypes.string,
    }

    state = {
        searchBooks: [],
        searchValue: ''
    }

    handleSearchInput = event => {
        const value = event.target.value;
        this.setState(()=>({searchValue: value}));
        if(!value){
            this.setState(()=>({searchBooks: []}));
        }
    }

    searchBooks = event => {
        event.preventDefault();
        const query = this.state.searchValue;
        BooksAPI.search(query)
          .then(res=>{
              let books = res.error?[]:res;
              this.setState(()=>({searchBooks: books}));
          })
    }

    render(){
        const { searchBooks } = this.state;
        const { handleBookShelfChange, bookInShelf } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'>
                        <button className="close-search">Close</button>
                    </Link>
                    <form
                      className="search-books-input-wrapper"
                      onSubmit={this.searchBooks}>
                        {/*
                          NOTES: The search from BooksAPI is limited to a particular set of search terms.
                          You can find these search terms here:
                          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                          you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input
                          type="text"
                          placeholder="Search by title or author"
                          onChange={this.handleSearchInput}/>
                    </form>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            searchBooks.map(book=>(
                                <li key={book.id}>
                                    <Book
                                      book={book}
                                      shelf={bookInShelf(book.title)}
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

export default SearchPage;