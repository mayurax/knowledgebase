import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  @ViewChild('employeeAttendanceDate') employeeAttendanceDate: ElementRef;
  @ViewChild('employeeAttendanceId') employeeAttendanceId: ElementRef;
  @ViewChild('studentAttendanceDate') studentAttendanceDate: ElementRef;
  @ViewChild('studentAttendanceId') studentAttendanceId: ElementRef;

  constructor(private afs: AngularFirestore, private ns: NotificationService) { }

  ngOnInit() {
  }

  recordEmployeeAttendance() {
    this.afs.collection('employee-attendance').add({
      date: this.employeeAttendanceDate.nativeElement.value,
      employeeId: this.employeeAttendanceId.nativeElement.value
    });

    this.employeeAttendanceId.nativeElement.value = '';
    this.ns.broadcast({content: 'Attendance Recorded'});
  }

  recordStudentAttendance() {
    this.afs.collection('student-attendance').add({
      date: this.studentAttendanceDate.nativeElement.value,
      studentId: this.studentAttendanceId.nativeElement.value
    });

    this.studentAttendanceId.nativeElement.value = '';
    this.ns.broadcast({content: 'Attendance Recorded'});
  }
}
