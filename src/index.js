'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import './index.html';
import './style.css';
import BookItem from './book-item.js';
import BookInput from './book-input.js';
import { loadBooks, saveBook, deleteBook } from './firestore';

class BooksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      newBookName: '',
      newBookAuthor: '',
      newBookYearPublish: '',
      newBookRating: '',
      newBookIsbn: '',
      error: '',
    };
  }

  componentDidMount() {
    loadBooks().then((booksStorage) => {
      this.setState({ list: booksStorage });
    })
  }  

  addBook(ev) {
    if(ev.code === 'NumpadEnter' || ev.type === 'click') {
      for (let item of document.querySelectorAll('input')) {
        if (item.validity.patternMismatch || this.state.newBookName == '' || this.state.newBookAuthor == '') {
          this.setState({ error: 'error' });
          return
        }
      }
      //to get actual data
      loadBooks().then((booksStorage) => {
        this.setState({ list: booksStorage });
        //to add new data
        const books = this.state.list;
        books.push({
          nameBook: this.state.newBookName,
          author: this.state.newBookAuthor,
          yearPublish: (this.state.newBookYearPublish ? this.state.newBookYearPublish : 'год не указан'),
          rating: (this.state.newBookRating ? this.state.newBookRating : '0') ,
          isbn: this.state.newBookIsbn,
        })
        //update data (firestore)
        saveBook(books);
        //update state
        loadBooks().then((booksStorage) => {
          this.setState(
            {
              list: booksStorage,
              error: '',
              newBookName: '',
              newBookAuthor: '',
              newBookYearPublish: '',
              newBookRating: '',
              newBookIsbn: '',
            }
          );  
        });              
      })        
    }
  }

  addBookName(ev) {
    this.setState({ newBookName: ev.target.value })
  }  

  addAuthor(ev) {
    this.setState({ newBookAuthor: ev.target.value })
  }

  addYearPublish(ev) {
    this.setState({ newBookYearPublish: ev.target.value })
  }

  addRating (ev) {
    this.setState({ newBookRating: ev.target.value })
  }

  addIsbn (ev) {
    this.setState({ newBookIsbn: ev.target.value })
  }

  deleteBook(key) {    
    if (key.target.className != 'delete') return;
    //to add new data
    const deletedLi = key.target.closest('li');
    const deletedlist = this.state.list.filter((item, i) => {return item.nameBook === deletedLi.dataset.name});
    const list = this.state.list.filter((item, i) => {return item.nameBook !== deletedLi.dataset.name});      
    //update data (firestore)
    deleteBook(deletedlist);
    //update state
    this.setState({ list: list });    
  }
 
  render() {   
    return(
      <div>
        <h1>Каталог книг</h1>
        <BookItem
          list={this.state.list}
          deleteBook={this.deleteBook.bind(this)}
        />    
        <BookInput
          newBookName={this.state.newBookName}
          newBookAuthor={this.state.newBookAuthor}
          newBookYearPublish={this.state.newBookYearPublish}
          newBookRating={this.state.newBookRating}
          newBookIsbn={this.state.newBookIsbn}
          error={this.state.error}
          addBook={this.addBook.bind(this)}
          addBookName={this.addBookName.bind(this)}
          addAuthor={this.addAuthor.bind(this)}
          addYearPublish={this.addYearPublish.bind(this)}
          addRating={this.addRating.bind(this)}
          addIsbn={this.addIsbn.bind(this)}
        />        
      </div>
    );
  }
}

ReactDOM.render(
  <BooksList />,
  document.querySelector('#list')
);