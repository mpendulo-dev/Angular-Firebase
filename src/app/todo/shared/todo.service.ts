
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // create a todo list of type angularfirelist
  toDoList: AngularFireList<any>;
  // inject firebase database
  constructor(private firebasedb: AngularFireDatabase) { }

  // get list of todos from firebase database
  getToDoList() {
    this.toDoList = this.firebasedb.list('titles');
    return this.toDoList;
  }

  // add title of todo to the array of object of type todoList, and a check to see if its completed
  addTitle(title: string) {
    this.toDoList.push({
      title: title,
      isChecked: false
    });
  }

  // check if tasks is complete or uncheck when its not complete
  checkOrUnCheckTitle($key: string, flag: boolean) {
    this.toDoList.update($key, {isChecked: flag});
  }

  // remove a todo from array list
  removeTitle($key: string) {
    this.toDoList.remove($key);
  }
}
