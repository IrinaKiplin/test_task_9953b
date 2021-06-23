'use strict';

import React from 'react';

const BookItem = (props) => {
  //find recomendedBook
  let recomendedBook = {}
  if (props.list != 0) {
    let recomendBookYear = props.list.filter((item) => {return item.yearPublish > 2018})
    let recomendBookRating = recomendBookYear.filter((item) => { 
      return item.rating == Math.max(...(recomendBookYear.map((item)=> item.rating)))
    })
    let rand = Math.floor(Math.random() * recomendBookRating.length)
    let recomendedBookRandom = recomendBookRating.find((item, i) => {
      return i == rand
    })
    Object.assign(recomendedBook, recomendedBookRandom)
    recomendedBook.yearPublish = 'Рекомендованная книга';
    props.list.unshift(recomendedBook)    
  }
  //to sort catalog by year
  let booksYear = [...new Set(props.list.map((book) => book.yearPublish))];
  let booksCatalog = booksYear.map((year) => props.list.filter((book) => book.yearPublish === year));
  
  return (
    <ul onClick={props.deleteBook}>
      {            
        booksYear.map((year, i) => {
          return (
            <li key={i}>{year}
              <ul>
                {
                  booksCatalog.map((books, i) => {
                    return (
                      books.map((book, i) => {
                        if (book.yearPublish == year) {
                          return (
                            <li key={i} data-name={book.nameBook}>{book.nameBook}
                              <button className='delete'>X</button>
                            </li>
                          );
                        }  
                      })
                    )                     
                  })
                }
              </ul>
            </li>
          );
        })
      }
    </ul>  
  )
}


export default BookItem;