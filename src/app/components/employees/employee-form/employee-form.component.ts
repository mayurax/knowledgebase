import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Employee } from '../employee.model';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { NotificationService } from '../../../notification/notification.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employeesCollection: AngularFirestoreCollection<Employee>;

  constructor(public es: EmployeeService, private afs: AngularFirestore, private ns: NotificationService) { }

  ngOnInit() {
    this.employeesCollection = this.afs.collection<Employee>('employees');
  }

  onSubmit(form: NgForm) {
    this.employeesCollection.add(form.value);
    this.es.displayForm = false;
    this.ns.broadcast({content: 'Employee Added'});
  }
}
