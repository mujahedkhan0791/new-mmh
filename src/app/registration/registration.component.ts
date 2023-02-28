import { AfterViewInit, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { SettingsService } from '../settings/settings.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { PhotoPreviewComponent } from './phot-preview-dialog';
import { RegistrationService } from './registration.service';


@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, AfterViewInit {

  panelOpenState = false;
  multi = false;
 file: any;
 url: any = '';
 animal: string = 'Tiger';
 name: string = 'MMH';
 profileForm: any;
 selectedNode:any;
 uodateBill = false;
 certificateIssued = false;
 disabledSlider = true;
 @Input() addOldStudent = false;
 @Input() certificateNumberFlag = false;


//  @Input() createNew = true;
 private authListenerSubs: Subscription = new Subscription;
 public userIsAuthnticated = false;
 public userId: string = '';
 @Input() create = true;
 @ViewChild(SnackBarComponent)
 snack!: SnackBarComponent;
 courses= [
  {courseValue: 'DCA', courseName: 'DCA', fee: 3000},
  {courseValue: 'HDD', courseName: 'HardWare', fee: 3000},
  {courseValue: 'NW', courseName: 'Networking', fee: 3000},
  {courseValue: 'CP', courseName: 'C Programming', fee: 3000},
];
dataSource: any;
//  ELEMENT_DATA = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},

// ];
displayedColumns: string[] = ['amountPaid', 'paymentDate', 'billNo', 'recivedBy'];
// dataSource: any;
// dataSource = this.ELEMENT_DATA;
 constructor(private settingsService: SettingsService ,private fb: FormBuilder, public dialog: MatDialog, private regService: RegistrationService, private activeRoute: ActivatedRoute,
  private authService: AuthService, private route: Router, private navBarService: NavBarService) { }
  ngAfterViewInit(): void {
    if(!this.create) {
      setTimeout(() => {
        this.getBillDetails();
      }, 1000);
    }
  }
  getCurrentRoute(): any {
    // return this.activeRoute.snapshot.routeConfig.path;
    return this.activeRoute.snapshot.routeConfig?.path;
  }
  getCourseDetails(){
    this.settingsService.getCoursesDetails().subscribe(res=>{
      if(res.courses){
        console.log(res.courses);

        this.courses = res.courses;
      }
    })
  }
  getFees(courseValue: string): any {
    let node: any;
    this.courses.forEach(ele=> {
      if(ele.courseValue == courseValue){
        node = ele;
      }
    });
    if(node){
      return node.fee;
    } else {
      return 3000
    }
  }
  ngOnInit(): void {
    this.getCourseDetails();
    const currentRout = this.getCurrentRoute();
    console.log('currentRout',currentRout);
    if(currentRout == 'oldregistration'){

      this.addOldStudent = !this.addOldStudent;

    }
    this.initializeForm();
    this.userIsAuthnticated =  this.authService.getIsAuth();
    this.userId = this.authService.getUserID();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthticated =>{
      this.userIsAuthnticated = isAuthticated
      this.userId = this.authService.getUserID();
    });
    if(this.create) {
      this.getStudenDetails();
    } else {
      this.uodateBill = true;
      // this.getBillDetails();
    }
  }
  getStudenDetails(){
    this.regService.getStudentDetails().subscribe(res=>{
      if(res.post){
        const sid = res.post[res.post.length - 1].studentID + 1;
        this.profileForm.get('studentID').setValue(sid);
        setTimeout(() => {
          this.onCourseChange();
        });
      } else {
        // this.updateSnackMessage('No Record Found');
        // this.snack.openSnackBar();
        this.profileForm.get('studentID').setValue(4000);
      }
    });
  }
  getBillDetails() {
    const std = this.profileForm.value.studentID;
    console.log(this.profileForm.value.studentID);

    this.navBarService.getBill(std).subscribe(res=>{
      if(res.bills){
        // this.ELEMENT_DATA = res.bills;


        this.dataSource = res.bills;

        if(res.bills && res.bills[res.bills.length -1].dueAmount == 0){
            this.disabledSlider = false;
        }
        console.log(res.bills);

      }
    })
  }
  onChange(e: any){
    if(e.checked) {
      // this.certificateIssued
    }
    console.log(e);

  }
  onngModelChange(e: any){
    if(!e && this.profileForm.value.certificateNumber){
      this.profileForm.get('certificateIssued').setValue(true);
    }
    console.log(e);

  }
initializeForm(obj?: any) {
  this.profileForm = this.fb.group({
    name: [obj?.name ||'', Validators.required],
    fatherName: [obj?.fatherName ||''],
    imagePath: [obj?.imagePath || Blob],
    address: [obj?.address || ''],
    dob: [obj?.dob || ''],
    education: [obj?.education || ''],
    previousKnowledge: [obj?.previousKnowledge || ''],
    phone: [obj?.phone || ''],
    courseApplied: [obj?.courseApplied || 'DCA'],
    certificateIssued: [obj?.certificateIssued || false],
    certificateNumber: [obj?.certificateNumber || ''],
    comment: [obj?.comment || ''],
    referBy: [obj?.referBy || ''],
    doa: [obj?.doa || new Date()],
    signP:[obj?.signP || ''],
    signS: [obj?.signS || ''],
    regNo: [obj?.regNo || '', Validators.required],
    courseName: [obj?.courseName || ''],
    totalFee: [obj?.totalFee || 3000],
    studentID:[obj?.studentID || null],
    doP:[obj?.doP || new Date()],
    signCo:[obj?.signCo || '']

  });
  if(obj){
    this.url = obj.imagePath;
  }
}

  // displayedColumns: string[] = ['amountPaid', 'date', 'dueAmount', 'recivedBy'];
  // dataSource =  [
  //   { amountPaid: 1500, date: new Date(2022/7/21), dueAmount: 500, recivedBy: 'Shahaz'},
  // ];


  onImageChange(event: any) {
    console.log('event',event);

    if(event.target.files && event.target.files[0])  {
       this.file =  event.target.files[0];
      let reader = new FileReader();

      reader.readAsDataURL(this.file); // read file as data url

      reader.onload = () => { // called once readAsDataURL is completed
        this.url = reader.result;
      }
    }
  }
  submit(f: any) {
    console.log(f);
    console.log(f.value.name);
// this.title = f.form.controls.firstName.value;
// this.content = f.form.controls.comment.value;
}
createPost() {
  if(!this.profileForm.value.name){
    return
  }
    this.getpPost();
  }
  openDialog(): void {
    if(this.profileForm.value.name){
      let shortName = this.profileForm.value.name.split(' ');
      let displayName = '';
      if (shortName.length>1){
        displayName = shortName[0] + ' ' + shortName[1];
      } else {
        displayName = this.profileForm.value.name;
      }
      this.name = displayName;
    }
    console.log( 'profileForm',this.profileForm.value.name,this.profileForm.get('name'));
    const dialogRef = this.dialog.open(PhotoPreviewComponent, {
      data: {name: this.name,  url: this.url},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      // this.animal = result;
    });
  }
  private formGroupToFormData(formGroup: FormGroup, update?:Boolean): FormData {
    const formData = new FormData();
    Object.keys(formGroup.controls).forEach(key => {
      const value = formGroup.controls[key].value;
      formData.append(key, value);
    });
    if(update && this.selectedNode._id) {
      formData.append('id', this.selectedNode._id);
    }
    return formData;
  }
  getpPost() {
    if(this.file) {
      this.profileForm.get('imagePath').setValue(this.file);
    }
    // const postData = this.profileForm.value;
    const postData = this.formGroupToFormData(this.profileForm);

      this.regService.createPost(postData).subscribe(res => {
        console.log('POST',res);
        if(res){
          this.updateSnackMessage('Created Record')
          this.snack.openSnackBar();

        }
        this.uodateBill = true;
      })

  }
  updateSnackMessage(message: string) {
    if(message){
      this.snack.message = message;
    }
  }
  updatePost() {
    let postData;
    if(this.file) {
      this.profileForm.get('imagePath').setValue(this.file);
      this.initializeForm(this.profileForm.value);
    }
      let updatePostData = this.profileForm.value;

      let temPost = this.profileForm.get('imagePath').value;
      if(typeof(temPost) === 'object' ) {
         postData = this.formGroupToFormData(this.profileForm, true);

      }else {
        updatePostData['id'] = this.selectedNode._id;
        postData = updatePostData;
      }
          this.regService.updatePost(this.selectedNode._id, postData).subscribe(res => {
        console.log('putPost', res);
        if(res) {
          this.updateSnackMessage('Updated Record')
          this.snack.openSnackBar();
        }
      });
  }
  setFormData(formData: any) {
    console.log('before',formData);
    this.selectedNode = formData;
    // this.profileForm.value.name = formData.name;
    // this.profileForm.get('name')?.setValue(formData.name);
    this.initializeForm(formData);
    console.log('before',this.profileForm);

  }

  setTimeStamp(date: any) {
    if (date === null) return;
    const dateStamp = new Date();
    dateStamp.setDate(date.day);
    dateStamp.setMonth(date.month - 1);
    dateStamp.setFullYear(date.year);
    return dateStamp.getTime();
  }
  onCourseChange(e?: any){
    // if(!this.profileForm.value.courseApplied) {
    //   this.profileForm.get('courseApplied').setValue('DCA');
    // }
    const regNo = this.profileForm.value.studentID + '/' + this.profileForm.value.courseApplied  + '/' + new Date().getFullYear();
    this.profileForm.get('regNo').setValue(regNo);
    this.profileForm.get('courseName').setValue(this.profileForm.value.courseApplied);
    this.profileForm.get('totalFee').setValue(this.getFees(e));
    console.log(e);

  }
  openFeesDialog(){
    const dialogRef = this.dialog.open(NavBarComponent, {
      data: {totalFee: this.profileForm.value.totalFee,  studentID: this.profileForm.value.studentID},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ',result);
      this.getBillDetails();
    });
  }
  studentList(){
    this.route.navigate(['/student']);

    // if(this.create) {
    //   this.route.navigate(['/student']);
    // }else {
    //   this.dialog.closeAll();
    // }
  }
  // openSnackBar() {
  //   this._snackBar.open('Created Record!!', 'Ok', {
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //   });
  // }
}
