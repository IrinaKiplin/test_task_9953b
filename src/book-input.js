'use strict';

import React from 'react';

const BookInput = (props) => {
  const className = props.error ? 'error' : '';
  return (
    <div>
      <h3>Добавить книгу в каталог</h3>
      <form>   
        <label>Введите название книги:
          <input
            className={className}
            type='text'
            maxLength='100'
            placeholder='"Как стать разработчиком"'
            pattern='(.|\s)*\S(.|\s)*'
            value={props.newBookName}
            onChange={props.addBookName}
            onKeyUp={props.addBook}
          />
        </label>
        <label>Введите автора:
          <input
            className={className} 
            type='text'
            placeholder='Иванов Иван'
            pattern='(.|\s)*\S(.|\s)*'
            value={props.newBookAuthor}
            onChange={props.addAuthor}
            onKeyUp={props.addBook}
          />
        </label>
        <label>Введите год публикации:
          <input
            type='text'
            placeholder='не ранее 1800'
            pattern='(18|19|20)[0-9]{2}'
            value={props.newBookYearPublish}
            onChange={props.addYearPublish}
            onKeyUp={props.addBook}
          />
        </label>
        <label>Введите рейтинг:
          <input
            type='text'
            placeholder='от 0 до 10'
            pattern='([0-9]|10)'
            value={props.newBookRating}
            onChange={props.addRating}
            onKeyUp={props.addBook}
          />
        </label>
        <label>Введите ISBN:
          <input
            type='text'
            placeholder='000-0-0000-0000-0'
            pattern='(?:ISBN(?:-1[03])?:? )?(?=[-0-9 ]{17}$|[-0-9X ]{13}$|[0-9X]{10}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?(?:[0-9]+[- ]?){2}[0-9X]'
            value={props.newBookIsbn}
            onChange={props.addIsbn}
            onKeyUp={props.addBook}
          />
        </label>
        <button
          className='button'
          type='button'
          onClick={props.addBook}
          >добавить книгу
        </button>
      </form>
    </div>
  )
}

export default BookInput; 