import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  lists: any;
  selectedItem = '';
  selectedNode: any;
  courseName = '';
  courseValue = '';
  fee = 3000;
  constructor(private settingService: SettingsService){}
  ngOnInit(): void {
    this.getCourses();
  }
  onBntClick(list: any) {
    this.selectedItem = list.courseName;
    this.selectedNode = list;
    // this.showDetails(list);
    this.courseName = this.selectedNode.courseName;
    this.courseValue = this.selectedNode.courseValue;
    this.fee = this.selectedNode.fee;
  }
  onCourseChange(e: any){
console.log(e);
  }
  onAdd(){
    const obj = {courseName: this.courseName, courseValue: this.courseValue, fee: this.fee};
    this.settingService.createPost(obj).subscribe(res => {
      this.onClear();
      this.getCourses();
  });
  }
  getCourses() {
    this.settingService.getCoursesDetails().subscribe(res=>{
      if(res.courses){
        this.lists = res.courses;
      }
    })
  }
  onUpdate(node: any) {
    let updateCourse;
    let obj = {courseName: this.courseName, courseValue: this.courseValue, fee: this.fee, id: this.selectedNode._id};
    updateCourse = obj;

      this.settingService.updatePost(this.selectedNode._id, updateCourse).subscribe(res => {
    if(res) {
      this.onClear();
      this.getCourses();
    }
  });
  }
  onDelete(id: string){
    this.settingService.deletedPost(id).subscribe(res => {
      this.onClear();
      this.getCourses();
    });
  }
  onClear(){
    this.selectedNode = '';
    this.selectedItem = '';
    this.courseName = '';
    this.courseValue = '';
    this.fee = 0;
  }
}
