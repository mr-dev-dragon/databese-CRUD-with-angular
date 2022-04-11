import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './student.model';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  formValue!: FormGroup; 

  studentobj: StudentModel = new StudentModel;

  allstudent: any;

  btnUpdateShow:boolean = false;

  btnSaveShow:boolean = true;


  constructor(private formBuilder:FormBuilder, private api:ApiService ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:[''],
      class:[''],
      email:[''],
      address:[''],
      city:[''],
      password:['']
    })
    this.AllStudent();
  }

  AddStudent(){
    this.studentobj.address = this.formValue.value.address;
    this.studentobj.city = this.formValue.value.city;
    this.studentobj.name = this.formValue.value.name;
    this.studentobj.email = this.formValue.value.email;
    this.studentobj.password = this.formValue.value.password;
    this.studentobj.class = this.formValue.value.class;

    this.api.postStudent(this.studentobj).subscribe({
      next: (v) => {console.log(v)},
    error: (e) => {
      alert("Error")
      console.log(e)},
    complete: () => {
      console.log('complete')
      alert("Data Saved")
      this.AllStudent();
      this.formValue.reset();
    } })

  }

  AllStudent(){
    this.api.getStudent().subscribe(res => {
      this.allstudent = res;
    })
  }

  EditStudent(data:any){
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['city'].setValue(data.city);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['class'].setValue(data.class);
    this.formValue.controls['password'].setValue(data.password);
    this.studentobj.id = data.id;
    this.UpdateShowBtn();
  }

  UpdateStudent(){
    this.studentobj.address = this.formValue.value.address;
    this.studentobj.city = this.formValue.value.city;
    this.studentobj.name = this.formValue.value.name;
    this.studentobj.email = this.formValue.value.email;
    this.studentobj.password = this.formValue.value.password;
    this.studentobj.class = this.formValue.value.class;
    this.api.putStudent(this.studentobj,this.studentobj.id).subscribe(res => {
      alert("Data Updated");
      this.AllStudent();
      this.SaveShowBtn();
    })


  }


  DeleteStudent(data:any){
    this.api.deleteStudent(data.id).subscribe(res => {
      alert("Record Deleted");
      this.AllStudent();
    })

  }

  UpdateShowBtn()
  {
    this.btnUpdateShow = true;
    this.btnSaveShow = false;
  }
  SaveShowBtn()
  {
    this.btnUpdateShow = false;
    this.btnSaveShow = true;
  }



}
