

import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'preview-photo',
  template: `
  <!-- <div style="height: 75vh;
  overflow: scroll; padding:20px" >
<registration [create]=false></registration>


</div> -->

<h2 mat-dialog-title>Update Student Details</h2>
<mat-dialog-content class="mat-typography">

<registration [certificateNumberFlag]="certificateNumberFlag" [create]=false></registration>


</mat-dialog-content>
<mat-dialog-actions align="end">
  <button mat-button mat-dialog-close>Cancel</button>
  <button mat-button (click)="onUpdeat()" cdkFocusInitial>Update</button>
</mat-dialog-actions>

  `,

})
export class EditRegistrationDialogComponent implements OnInit, AfterViewInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  certificateNumberFlag = false;
  @ViewChild(RegistrationComponent)
  reg!: RegistrationComponent;
  ngOnInit(): void {
    console.log(this.data);
    // this.reg.setFormData(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit(): void {
    this.reg.setFormData(this.data);
    if(this.data.certificateIssued && this.data.certificateNumber){
      this.certificateNumberFlag = true;
    }
  }
  onUpdeat(){
    this.reg.updatePost();
    this.dialogRef.close();
  }
}
