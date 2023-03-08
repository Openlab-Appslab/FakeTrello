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

  // public getAllUserTasks(): void{ 
  //   this.taskService.getAllUserTasks().subscribe( 
  //     (response: ITask[]) => {
  //       this.tasks = response;
  //       this.toDoForm.reset();
  //       console.log(this.tasks);
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  public getAllUserTasks(): void {
    this.taskService.getAllUserTasks().subscribe(
      (response: ITask[]) => {
        this.tasks = [];
        this.inprogress = [];
        this.done = [];
        response.forEach(task => {
          console.log(task.state, 'state of task before pushing to array, state should be toDo');
          if (task.state == 'inProgress') {
            console.log(task.state, 'inProgress hehehe');
            this.inprogress.push(task);
          } else if (task.state == 'done') {
            console.log(task.state, 'done hehehe');
            this.done.push(task);
          }
          this.tasks.push(task);
        });
        this.toDoForm.reset();
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
        // console.log('listing edited', response);
        this.getAllUserTasks();
      })
    )
  }

  deleteTask(taskId: number){ //function for deleting the listing by using the listingId
    
    this.taskService.deleteTask(taskId).subscribe(
      (response: void) => {
        console.log('task deleted');
        this.getAllUserTasks();
        this.done = this.tasks.filter(task => task.state == 'done');
      }
    );
  }

  updateTaskState(task: ITask, newState: string): void {
    console.log(task.state, 'old state');
    task.state = newState;
    console.log(task.state, 'new state');
    console.log(task.state, task.id, task.text, task.deadline);
    this.taskService.updateTask(task).subscribe({
      next: () => console.log('Task state updated successfully.'),
      error: error => console.error('Error updating task state:', error)
    });
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
  
    if (previousContainer !== currentContainer) {
      this.updateTaskState(droppedTask, newState);
    }
  
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
