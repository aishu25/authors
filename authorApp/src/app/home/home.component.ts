import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  errors;
  authors = [];
  liked: any;
  constructor(
    private _httpService: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router) { }

  ngOnInit() {
  	this.getAuthorsThroughService();
  }
  getAuthorsThroughService(){
  	let observable = this._httpService.getAuthors()
  	observable.subscribe(data => {
  		console.log("successfully received the data from server",data);
  		
      if(data["message"] === "errors"){
        this.errors = data["data"]
      }
      else{
        this.authors = data["data"]
      }
      // .sort({author_name: -1})
  	})
  }

  showAuthorId(id){
    console.log(id);
    this._router.navigate(['/edit/' + id])
  }
  
  deleteAuthorsThroughService(id){
		let observable = this._httpService.deleteAuthor(id);
		observable.subscribe(data => {
			console.log("deleted the author successfully", data);
			this.getAuthorsThroughService();
		})
	};
  likeAuthor(name){
    console.log("likes method", name.likes);
    let id = name._id;
    console.log("author id : ", id)
    name.likes += 1;
    console.log("likes : ", name.likes)
    let observable = this._httpService.updateLikes(name, id);
    observable.subscribe(data => {
      console.log("increase likes", name);
      this.liked = false;
    })
  }
}
