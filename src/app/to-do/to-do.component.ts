import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from '../model/task';
import { TaskService } from '../service/task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

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
    private cdr: ChangeDetectorRef

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
        this.getAllUserTasks();
        this.toDoForm.reset();
      });
  }

  public getAllUserTasks(): void{ 
    this.taskService.getAllUserTasks().subscribe( 
      (response: ITask[]) => {
        this.tasks = response;
        this.toDoForm.reset();
        console.log(this.tasks);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  editTask(taskModel: ITask){ 
    let cancelBtn = document.getElementById('edit_task_cancel');
    if(cancelBtn){
       cancelBtn.click();
    }
    this.taskService.editTask(taskModel).subscribe(
      (response => {
        console.log('listing edited', response);
        this.getAllUserTasks();
      })
    )
  }

  deleteTask(taskId: number){ //function for deleting the listing by using the listingId
    
    this.taskService.deleteTask(taskId).subscribe(
      (response: void) => {
        console.log('task deleted');
        this.getAllUserTasks();
        this.done = this.tasks.filter(task => task.done);
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
