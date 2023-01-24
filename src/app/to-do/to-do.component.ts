import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from '../model/task';
import { TaskService } from '../service/task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  openDeleteModal(content: any) { //function for opening the delete modal
    this.modalService.open(content);
  }

  openEditModal(content: any) { //function for opening the edit modal
    this.modalService.open(content);
  };

  addTask() {
    // this.tasks.push({
    //   description: this.toDoForm.value.item, 
    //   deadline: this.toDoForm.value.deadline,
    //   done: false
    // });
    // this.toDoForm.reset();

    this.taskService.createTask(this.toDoForm.value.item, this.toDoForm.value.deadline)
      .subscribe((response: any) => {
        console.log(response);
        this.tasks.push({
          description: response.text,
          deadline: response.date,
          done: false
        });
        this.toDoForm.reset();
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

  addTaskA(){
    if(this.toDoForm.valid){
      console.log(this.toDoForm.value);

      const text = this.toDoForm.value.item;
      const date = this.toDoForm.value.deadline;
      console.log(text, date);

      this.taskService.createTask(text, date);
        // .subscribe(() => this.router.navigate(['/myListings'])); 
        // .subscribe((response: Task[]) =>
        // this.tasks.push{
        //   description = response.text,
        //   deadline = response.date,
        // });
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
    this.toDoForm.controls['item'].setValue(item.description);
    this.toDoForm.controls['deadline'].setValue(item.deadline);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  updateTask(){
    this.tasks[this.updateIndex].description = this.toDoForm.value.item;
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
    this.toDoForm = this.fb.group({
      item : ['', Validators.required],
      deadline: ['',]
    });
  }
}
