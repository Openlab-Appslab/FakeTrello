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
  styleUrls: ['./to-do.component.scss']
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

  // public getAllUserTasks(): void {
  //   this.taskService.getAllUserTasks().subscribe(
  //     (response: ITask[]) => {
  //       this.tasks = response;
  //       this.inprogress = [];
  //       this.done = [];
  //       this.tasks.forEach(task => {
  //         if (task.state === 'inProgress') {
  //           this.inprogress.push(task);
  //         } else if (task.state === 'done') {
  //           this.done.push(task);
  //         }
  //       });
  //       this.toDoForm.reset();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

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

  updateTaskState(task: ITask, newState: string): void {
    task.state = newState;
    console.log(task.state, task.id, task.text, task.deadline)
    this.taskService.updateTask(task).subscribe(
      () => console.log('Task state updated successfully.'),
      error => console.error('Error updating task state:', error)
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

  onDrop(event: CdkDragDrop<ITask[]>, newState: string) {
    const droppedTask = event.item.data;
    const currentIndex = event.currentIndex;
    const previousContainer = event.previousContainer;
    const currentContainer = event.container;
  
    // Check if the task was dropped in a different container
    if (previousContainer !== currentContainer) {
      // Update the state of the dropped task
      this.updateTaskState(droppedTask, newState);
    }
  
    // Move the dropped task to the new position in the array
    if (typeof currentIndex === 'number') {
      moveItemInArray(currentContainer.data, event.previousIndex, currentIndex);
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
