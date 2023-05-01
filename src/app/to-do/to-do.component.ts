import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ITask } from '../model/task';
import { TaskService } from '../service/task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {

  toDoForm!: FormGroup;
  tasks: ITask[] = [];

  toDo: ITask[] = [];
  inprogress: ITask[] = [];
  done: ITask[] = [];
  updateIndex!: any;
  isEditEnabled: boolean = false; 

  selectedFiles: File[] = [];
  showSelectedFiles = false;

  fullScreenContent: any;
  fullScreenImage: string;

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

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.selectedFiles.push(files[i]); 
      } 
    }
  }

  removeSelectedFile(file: File) {
    this.selectedFiles = this.selectedFiles.filter(selectedFile => selectedFile !== file);
  }
  
  
  addTask() {
    const formData = new FormData();
    formData.append('title', this.toDoForm.value.title);
    formData.append('text', this.toDoForm.value.text);
    formData.append('deadline', this.toDoForm.value.deadline);
    
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('listOfImage', this.selectedFiles[i]);
    }

    console.log(formData.get('title'), formData.get('text'), formData.get('deadline'), formData.get('listOfImage'));
    console.log(formData.get('listOfImage'), 'listOfImage before DB');
    
    this.taskService.createTask(formData)
      .subscribe((response: any) => {
        this.getAllUserTasks();
        this.toDoForm.reset();
        this.selectedFiles = [];
        this.showSelectedFiles = false;
      });
    }

  openTaskInfoModal(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

  openFullScreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }
  
  test() {
    console.log("Tasks in 'toDo' array:");
    console.log("----------------------");
    this.toDo.forEach((task) => {
      console.log(`Title: ${task.title}, Task: ${task.text}, Deadline: ${task.deadline}, State: ${task.state}`);
    });
    console.log("Tasks in 'inprogress' array:");
    console.log("----------------------");
    this.inprogress.forEach((task) => {
      console.log(`Title: ${task.title}, Task: ${task.text}, Deadline: ${task.deadline}, State: ${task.state}`);
    });
    console.log("Tasks in 'done' array:");
    console.log("----------------------");
    this.done.forEach((task) => {
      console.log(`Title: ${task.title}, Task: ${task.text}, Deadline: ${task.deadline}, State: ${task.state}`);
    });
    console.log("All tasks:");
    console.log("----------------------");
    this.tasks.forEach((task) => {
      console.log(`Title: ${task.title}, Task: ${task.text}, Deadline: ${task.deadline}, State: ${task.state}`);
    });
  }

  testForm(){
    console.log(this.toDoForm.controls);
  }

  public getAllUserTasks(): void { 
    this.taskService.getAllUserTasks().subscribe( 
      (response: ITask[]) => {

        this.tasks = response;
        this.toDo = [];
        this.inprogress = [];
        this.done = [];
  
        this.tasks.forEach(task => {
          if (task.state === 'toDo' || task.state === 'todo') {
            this.toDo.push(task);
          } else if (task.state === 'inprogress') {
            this.inprogress.push(task);
          } else if (task.state === 'done') {
            this.done.push(task);
          }
        });

        console.log(this.tasks);
  
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

  deleteTask(taskId: number){
    
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
  
      previousContainer.data.splice(previousIndex, 1);
  
      currentContainer.data.splice(currentIndex, 0, droppedTask);
    } else {
      moveItemInArray(currentContainer.data, previousIndex, currentIndex);
    }
  }

  ngOnInit(): void {
    this.getAllUserTasks();

    this.toDoForm = this.fb.group({
      title: ['', Validators.required],
      text : ['', Validators.required],
      deadline: ['',],
    });
  }
}
