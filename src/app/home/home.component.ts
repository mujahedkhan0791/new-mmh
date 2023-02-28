import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { HomeService } from './home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private route: Router, private homeService: HomeService,
     private routParam: ActivatedRoute, private authService: AuthService) { }
     lists: any;
     title: string = '';
     content: string = '';
     active = false;
     selectedItem = '';
     selectedNode: any;
     mode = 'create';
     postId: any;
     url: any = '';
     file: any;
     totalPosts=10;
     postsPerPage = 2;
     currentPage = 1;
     pageSizeOptions = [1,2,5,10];
     private authListenerSubs: Subscription = new Subscription;
     public userIsAuthnticated = false;
     public userId: string = '';

     contactList = [
       {id:1, name:'Email'},
       {id:2, name:'Ph'}

      ];
      logOut(){
        this.authService.logOut();
      }
      ngOnInit(): void{
        this.userIsAuthnticated =  this.authService.getIsAuth();
        this.userId = this.authService.getUserID();
        this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthticated =>{
          this.userIsAuthnticated = isAuthticated
          this.userId = this.authService.getUserID();
        });
        this.routParam.paramMap.subscribe(paramMap => {

          if(paramMap.has('postId')) {
            this.mode= 'edit';
            this.postId = paramMap.get('postId');
          } else {
            this.mode= 'create';
            this.postId = null;
          }
          console.log('ngOnInit',this.mode);

        });
      }
      ngOnDestroy(): void {
        this.authListenerSubs.unsubscribe();
      }
      test() {
        this.route.navigate(['/loader']);
      }
      getData() {

        this.homeService.getList().subscribe(response => {
          this.lists = response;
        });

        // this.homeService.getpPost();
      }
      getDataMDB() {
    // postsPerPage: number, currentPage: number
    // this.homeService.getData()
    //   .pipe(map((postData)=> {
    //   return postData.posts.map((post: { title: any; content: any; _id: any; }) => {
    //     return {
    //       title: post.title,
    //       content: post.content,
    //       id: post._id
    //     };
    //   });
    // }))
    // .subscribe(transformPosts => {
    //   console.log('transformPosts',transformPosts );


    // });
    const queryParms = `?pagesize=${this.postsPerPage}&page=${this.currentPage}`;
    this.homeService.getData(queryParms).subscribe(res => {
      console.log('getDataMDB',res);
      this.lists = res.post;
    });

  }
  deletedPost(id: string){
    this.homeService.DeletedPost(id).subscribe(res => {
      console.log('deletedPost',res);

    });
  }
  getpPost() {
    // const obj = {title: this.title, content: this.content, image: this.url};
    const postData = new FormData();
    postData.append('title', this.title);
    postData.append('content', this.content);
    postData.append('image', this.file);

    if (this.mode == 'create') {
      this.homeService.getpPost(postData).subscribe(res => {
        console.log('POST',res);
      })
    } else {
      let img = this.selectedNode.imagePath;
      if(this.file) {
        img = this.file;
      }
      let postData;
      if(typeof(img) === 'object' ) {
         postData = new FormData();
        postData.append('id', this.selectedNode._id);
        postData.append('title', this.title);
        postData.append('content', this.content);
        postData.append('imagePath', img);
      } else {
         postData = {id: this.selectedNode._id, title: this.title, content: this.content, imagePath: img};

      }
      this.homeService.updatePost(this.selectedNode._id,postData).subscribe(res => {
        console.log('putPost', res);
      });
    }
  }
  submit(f: any) {
    console.log(f);
this.title = f.form.controls.firstName.value;
this.content = f.form.controls.comment.value;
this.getpPost();
  }
  onBntClick(list: any) {
    this.selectedItem = list.title;
    // this.deletedPost(list._id);
    this.selectedNode = list;
    // let index = this.lists.indexOf(list);
    //   if(this.lists[index]) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // document.getElementById('firstName').value = '';

  }
deleteRow() {
  this.deletedPost(this.selectedNode._id);
}
updateRow() {
  // this.route.navigate(['/home', this.selectedNode.id]);
  this.mode = 'edit';
}
onImageChange(event: any) {
  if(event.target.files && event.target.files[0])  {
     this.file =  event.target.files[0];
     console.log('filetype',this.file);

    let reader = new FileReader();

    reader.readAsDataURL(this.file); // read file as data url

    reader.onload = () => { // called once readAsDataURL is completed
      this.url = reader.result;
    }
  }
}
redirectRegistration() {
  this.route.navigate(['registration']);
}
redirectBilling() {
  this.route.navigate(['billing']);

}
}
