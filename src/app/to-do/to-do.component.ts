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

  toDo: ITask[] = [];
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
  
  test() {
    console.log("Tasks in 'toDo' array:");
    console.log("----------------------");
    this.toDo.forEach((task) => {
      console.log(`Task: ${task.text}, Deadline: ${task.deadline}, State: ${task.state}`);
    });
    console.log("Tasks in 'inprogress' array:");
    console.log("----------------------");
    this.inprogress.forEach((task) => {
      console.log(`Task: ${task.text}, Deadline: ${task.deadline}, State: ${task.state}`);
    });
    console.log("Tasks in 'done' array:");
    console.log("----------------------");
    this.done.forEach((task) => {
      console.log(`Task: ${task.text}, Deadline: ${task.deadline}, State: ${task.state}`);
    });
    console.log("All tasks:");
    console.log("----------------------");
    this.tasks.forEach((task) => {
      console.log(`Task: ${task.text}, Deadline: ${task.deadline}, State: ${task.state}`);
    });
  }

  public getAllUserTasks(): void { 
    this.taskService.getAllUserTasks().subscribe( 
      (response: ITask[]) => {
        // Initialize arrays
        this.tasks = response;
        this.toDo = [];
        this.inprogress = [];
        this.done = [];
  
        // Sort tasks into arrays based on state
        this.tasks.forEach(task => {
          if (task.state === 'toDo' || task.state === 'todo') {
            this.toDo.push(task);
          } else if (task.state === 'inprogress') {
            this.inprogress.push(task);
          } else if (task.state === 'done') {
            this.done.push(task);
          }
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
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;
    const previousContainer = event.previousContainer;
    const currentContainer = event.container;
  
    if (previousContainer !== currentContainer) {
      droppedTask.state = newState;
      this.taskService.updateTask(droppedTask).subscribe(
        () => {
          console.log('Task updated successfully');
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  
      // Remove task from previous array
      previousContainer.data.splice(previousIndex, 1);
  
      // Push task to new array
      currentContainer.data.splice(currentIndex, 0, droppedTask);
    } else {
      // Move task within the same array
      moveItemInArray(currentContainer.data, previousIndex, currentIndex);
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
