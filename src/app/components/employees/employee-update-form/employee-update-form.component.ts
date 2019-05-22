import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-employee-update-form',
  templateUrl: './employee-update-form.component.html',
  styleUrls: ['./employee-update-form.component.scss']
})
export class EmployeeUpdateFormComponent implements OnInit {

  constructor(public es: EmployeeService, private afs: AngularFirestore) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.afs.collection('employees').doc(form.value.id).set(form.value);
    this.es.selectedEmployee.next(null);
    this.es.displayUpdateForm = false;
  }
  
  onRemove(employeeId: string) {
    this.afs.collection('employees').doc(employeeId).delete();
    this.es.selectedEmployee.next(null);
    this.es.displayUpdateForm = false;
  }
}
