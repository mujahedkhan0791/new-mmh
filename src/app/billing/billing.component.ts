import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../nav-bar/nav-bar.service';

@Component({
  selector: 'billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  lists: any;
  stuData: any;
  selectedItem = '';
  filter = '';
  selectedNode: any;
constructor(private navService: NavBarService){}
  ngOnInit(): void {
    this.getAllBills();
  }
  getAllBills(){
    this.navService.getAllBills().subscribe(res=>{
      if(res.bills){
        this.lists = res.bills;
        this.stuData = res.bills;
      }
    })
  }
  onBntClick(lists: any) {
    this.selectedItem = lists.billNo;
    this.selectedNode = lists;
  }
  onFilterChange(e:string) {
    this.lists = this.stuData.filter((ele:any)=>{
      const tempId = String(ele.studentID);
      return  tempId.includes(e);
     })
   }
}
