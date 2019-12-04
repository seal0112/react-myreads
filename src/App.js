import React from 'react';
import './App.css';
import ListBooks from './ListBooks';
import SearchPage from './SearchPage';
import { Route, Switch } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        shelfCategory: [
            {
                title:'Currently Reading',
                type: 'currentlyReading'
                },
            {   
                title: 'Want to Read',
                type: 'wantToRead'
                },
            {
                title: 'Read',
                type: 'read'
                }
            ],
        books: [],
    }

    componentDidMount = () => {
        BooksAPI.getAll()
            .then(books=>{
                this.setState(()=>({
                    books: books
                }))
            })
    }

    handleBookShelfChange = (id, event) => {
        let bookId = {id: id};
        BooksAPI.update(bookId, event.target.value)
            .then(()=>BooksAPI.getAll())
            .then((books)=>{
                this.setState(()=>({books: books}))
            })
    }

    isBookInShelf = (title) => {
        for(let book of this.state.books){
            if(book.title===title){
               return book.shelf 
            }
        }
        return "none"
    }

    render() {
        const { shelfCategory, books } = this.state;

        return (
            <div className="app">
                <Switch>
                    <Route exact path='/' render={()=>(
                        <ListBooks 
                          shelfCategory={shelfCategory}
                          books={books}
                          handleBookShelfChange={this.handleBookShelfChange}/>
                    )} />
                    <Route path='/search' render={()=>(
                        <SearchPage
                          handleBookShelfChange={this.handleBookShelfChange}
                          bookInShelf={this.isBookInShelf}/>
                    )} />
                </Switch>
            </div>
        )
    }
}

export default BooksApp
