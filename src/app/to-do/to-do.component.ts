import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from '../model/task';
import { TaskService } from '../service/task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  toDoForm !: FormGroup;
  tasks: ITask[] = [];
  inprogress: ITask[] = [];
  done: ITask[] = [];
  updateIndex!: any;
  isEditEnabled: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private modalService: NgbModal,

    ) { }

  openDeleteModal(content: any) {
    this.modalService.open(content);
  }

  openEditModal(content: any) {
    this.modalService.open(content);
  };

  addTask() {
    console.log(this.toDoForm.value);
    this.taskService.createTask(this.toDoForm.value.item, this.toDoForm.value.deadline)
      .subscribe((response: any) => {
        console.log(response);
        this.toDoForm.reset();
      });
  }

  public getAllUserTasks(): void{ 
    this.taskService.getAllUserTasks().subscribe( 
      (response: ITask[]) => {
        this.tasks = response;
        console.log(this.tasks);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  dontMakeItemIfEmpty() {
    if (this.toDoForm.value.item == ' ') {
      console.log('empty');
    }
    else {
      this.addTask();
    }
  }

  deleteTask(i: number){
    this.tasks.splice(i, 1);
  }

  deleteInProgressTask(i: number){
    this.inprogress.splice(i, 1);
  }

  deleteDoneTask(i: number){
    this.done.splice(i, 1);
  }

  onEdit(item: ITask, i: number){
    this.toDoForm.controls['item'].setValue(item.text);
    this.toDoForm.controls['deadline'].setValue(item.deadline);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  updateTask(){
    this.tasks[this.updateIndex].text = this.toDoForm.value.item;
    this.tasks[this.updateIndex].deadline = this.toDoForm.value.deadline;
    this.tasks[this.updateIndex].done = false;
    this.toDoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  ngOnInit(): void {

    this.getAllUserTasks();

    this.toDoForm = this.fb.group({
      item : ['', Validators.required],
      deadline: ['',]
    });
  }
}
