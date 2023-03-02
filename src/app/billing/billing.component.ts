import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  billsPerPage = 10;
  currentPage = 1;
  length = 50;
constructor(private navService: NavBarService){}
  ngOnInit(): void {
    this.getTotalLength();
    
  }
  handlePageEvent(e: PageEvent) {
    // this.pageEvent = e;
    // this.length = e.length;
    this.billsPerPage = e.pageSize;
    this.currentPage = e.pageIndex +1;
    this.getAllBills();
  }
  getAllBills(){
    const queryParms = `?pagesize=${this.billsPerPage}&page=${this.currentPage}`;
    this.navService.getPagenationBills(queryParms).subscribe(res=>{
      if(res.bills){
        this.lists = res.bills;
        this.stuData = res.bills;
      }
    })
  }
  getTotalLength() {
    this.navService.getAllBills().subscribe(res=>{
      if(res.bills){
        this.length = res.bills.length;
        this.getAllBills();
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
