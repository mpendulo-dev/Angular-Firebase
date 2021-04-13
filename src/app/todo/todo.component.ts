import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  // List array to store todos
  toDoListArray: any[];

  // injecting todo service
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getToDoList().snapshotChanges().subscribe(item => {
      this.toDoListArray = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["$key"] =  element.key;
        this.toDoListArray.push(x);    
      });

      // dort array isChecked 
      this.toDoListArray.sort((a,b) => {
        return a.isChecked - b.isChecked;
      });
    });
    
     
  }
  onAdd(itemTitle) {
    this.todoService.addTitle(itemTitle.value);
    itemTitle.vallue = null;
  }

  alterCheck($key: string, isChecked) {

    this.todoService.checkOrUnCheckTitle($key, !isChecked);
  }
  onDelete($key: string) {
    this.todoService.removeTitle($key);
  }
}
