

import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'preview-photo',
  template: `
  <h2 mat-dialog-title>Hi {{data.name}}</h2>

<img [src]="data.url? data.url : data.imagePath" height="200">
<div mat-dialog-actions>
  <!-- <button mat-button (click)="onNoClick()">No Thanks</button> -->
  <button mat-button [mat-dialog-close]="data.name" cdkFocusInitial>Ok</button>
</div>
  `,

})
export class PhotoPreviewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
