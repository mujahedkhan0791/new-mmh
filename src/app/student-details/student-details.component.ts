import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { RegistrationComponent } from '../registration/registration.component';
import { RegistrationService } from '../registration/registration.service';
import { EditRegistrationDialogComponent } from './edit-student-dialog';

@Component({
  selector: 'student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit, AfterViewInit{
  lists: any;
  stuData: any;
  active = false;
  selectedItem = '';
  selectedNode: any;
  totalPosts=10;
  allbilles= [];
  postsPerPage = 10;
  currentPage = 1;
  editForm = false;
  filter = '';
  @ViewChild(RegistrationComponent)
  reg!: RegistrationComponent;

constructor(private regService: RegistrationService,  public dialog: MatDialog,private route: Router, private navBarService: NavBarService){}


// ELEMENT_DATA= [
//   {studentID: 1, name: 'Hydrogen', regNo: 1.0079, phone: 'H'},
// ];
displayedColumns = ['studentID', 'name', 'regNo', 'phone'];
dataSource = [];
ngOnInit(): void {
  this.getStudentDetails();

  // this.getBillDueDetails();
}
getBillDueDetails() {
  this.navBarService.getAllBills().subscribe(res=>{
    if(res.bills) {
      console.log(res.bills);
      this.allbilles = res.bills;
    }
  })
}
mapDueBills(){
  this.lists.forEach((ele: any)=>{
    this.navBarService.getBill(ele.studentID).subscribe(res=>{
      if(res.bills?.length>0) {
        ele['dueAmount'] = res.bills[res.bills.length -1].dueAmount;
      } else {
        ele['dueAmount'] = ele.totalFee;
      }
    });
  })
}
ngAfterViewInit(): void {
  // setTimeout(() => {
  //   this.mapDueBills();
  // }, 200);
}
getStudentDetails() {
  // const queryParms = `?pagesize=${this.postsPerPage}&page=${this.currentPage}`;
  this.regService.getStudentDetails().subscribe(res => {
    console.log('getDataMDB',res);
    this.lists = res.post;
    this.stuData = res.post;
    this.mapDueBills();
  });
}
openEdit(form: any): void {

    // if(form){
    //   let shortName = this.profileForm.value.name.split(' ');
    //   let displayName = '';
    //   if (shortName.length>2){
    //     displayName = shortName[0] + ' ' + shortName[1];
    //   } else {
    //     displayName = this.profileForm.value.name;
    //   }
    //   this.name = displayName;
    // }
    const dialogRef = this.dialog.open(EditRegistrationDialogComponent, {
      data: form,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      // this.animal = result;
      setTimeout(() => {
        this.getStudentDetails();
      }, 500);

    });

}
showDetails(form: any) {
  this.editForm = true;
  // setTimeout(() => {
  //   form.imagePath = new FormData();
  //   this.reg.setFormData(form);
  // }, 500);
  // form.imagePath = new FormData();

  this.openEdit(form);
}

onDelete(id: string){
  this.regService.deletedPost(id).subscribe(res => {
    console.log('deletedPost',res);
    this.getStudentDetails();

  });
}
onClear() {
  this.selectedNode = '';
  this.selectedItem = '';
}
onCreate() {
  this.route.navigate(['/registration'])
}
onCreateOld(){
  this.route.navigate(['/oldregistration'])
}
onBntClick(list: any) {
  this.selectedItem = list.name;
  this.selectedNode = list;
  // this.showDetails(list);
}
onFilterChange(e:string) {
 this.lists = this.stuData.filter((ele:any)=>{
   return ele.name.toLocaleLowerCase().includes(e.toLocaleLowerCase());
  })
}
}
