'use strict';

import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZa6enM--nDkF02O_Be51naxj7mVMoyws",
  authDomain: "test-task-9953b.firebaseapp.com",
  projectId: "test-task-9953b",
  storageBucket: "test-task-9953b.appspot.com",
  messagingSenderId: "923156345185",
  appId: "1:923156345185:web:80d2d9d9ab94ff79ec1520",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export function loadBooks() {
  const booksStorage = [];
  return db.collection('books').get().then(function (querySnapshot) {
    querySnapshot.forEach((doc) => {
      booksStorage.push(doc.data());
    });
  }).then(()=> {return booksStorage})
}

export const saveBook = (books) => {
  for (let item of books) {    
    db.collection('books').doc(item.nameBook).set(item)
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
}

export const deleteBook = (deletedBooks) => {
  for (let item of deletedBooks) {    
    db.collection('books').doc(item.nameBook).delete()
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
}