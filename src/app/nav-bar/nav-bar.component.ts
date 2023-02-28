import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { NavBarService } from './nav-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @ViewChild(SnackBarComponent)
  snack!: SnackBarComponent;
  constructor(private navBarService: NavBarService, public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }
  studentID = 0;
  totalFee = 0;
  dueAmount = 0;
  amountPaid = 0;
  recivedBy = 'Shahaz';
  paymentDate = new Date();
  billNo = 1;
  ngOnInit(): void {
    if(this.data){
    console.log('data',this.data);
    this.studentID = this.data.studentID;
    this.totalFee = this.data.totalFee;
    }
    if(this.totalFee) {
     this.dueAmount = this.totalFee;
     this.amountPaid = this.dueAmount;
    }
    this.getBill();
    this.getBillNo();
  }
  onAmountChange() {
    if(this.totalFee) {
      // this.dueAmount = this.dueAmount - this.amountPaid;
      // this.amountPaid = this.dueAmount;
     }

  }
  createBilling() {
    if(this.dueAmount == this.totalFee) {
      this.dueAmount = this.totalFee - this.amountPaid;
    } else {
      this.dueAmount = this.dueAmount - this.amountPaid;
    }
    const obj = {
      studentID: this.studentID,
      totalFee: this.totalFee,
      dueAmount: this.dueAmount,
      amountPaid: this.amountPaid,
      paymentDate: this.paymentDate,
      recivedBy: this.recivedBy,
      billNo: this.billNo

    }
    this.navBarService.createBill(obj).subscribe(result => {
console.log(result);
this.snack.openSnackBar();
this.dialogRef.close(result);
    });
  }
  getBill(){
    this.navBarService.getBill(this.studentID).subscribe(result=>{
      console.log('stuBill', result);
      if(result.bills.length >0) {
        const length = result.bills.length;
        this.dueAmount = result.bills[length-1].dueAmount;
        this.amountPaid =  result.bills[length-1].dueAmount;
      }
    })
  }
  getBillNo(){
    this.navBarService.getBillNo().subscribe(res=>{
      console.log(res);
      if(res.bills){
        this.billNo = res.bills[res.bills.length -1].billNo + 1;
      }
    })
  }
}
