import React from 'react';
import './App.css';
import ListBooks from './ListBooks';
import SearchPage from './SearchPage';
import { Route, Switch } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';



class BooksApp extends React.Component {
    state = {
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
            .then(books => {
                this.setState(()=>({
                    books: books
                }))
            })
    };

    /**
    * @description handle book's shelf change
    * @param {string} id is a string from the server,
    *                 which is used to notify server which book had changed status.
    * @param {object} events are "things" that happen to HTML elements.
    */
    handleBookShelfChange = (id, event) => {
        console.log('id', id, typeof(id), 'event', event, typeof(event))
        let bookId = {id: id};
        BooksAPI.update(bookId, event.target.value)
            .then(()=>BooksAPI.getAll())
            .then((books)=>{
                this.setState(()=>({books: books}))
            })
    };

    /**
    * @description use book's title to find book's shelf
    * @param {string} title is a string about book's main title.
    * @return {?string} return book's shelf
    */
    isBookInShelf = (title) => {
        for(let book of this.state.books){
            if(book.title === title){
               return book.shelf
            }
        }
        return "none"
    };

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
