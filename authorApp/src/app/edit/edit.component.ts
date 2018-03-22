import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: any;
  // private sub: any;
  author: any;
  errors: any;
  
  constructor(
  	private _httpService: HttpService, 
  	private _route: ActivatedRoute, 
  	private _router: Router) { }

  // ngOnInit() {
  //   this._route.params.subscribe((params: Params) => console.log(params['id']));
  // }
  
  ngOnInit() {
  	this._route.params.subscribe( params => {
  		this.id = params['id'];
  		console.log(" id : ", this.id);
  	});
  	
  	this.oneAuthorInfoRetrieve(this.id);
  }
  
  oneAuthorInfoRetrieve(id){
  	let observable = this._httpService.getOneAuthor(this.id);
    observable.subscribe ( data => {
	    console.log("Successfully got data from server", data);
	    this.author = data["data"];
  	});
  }

  updateAuthorInfoThroughService(){
  	let observable = this._httpService.updateAuthor(this.id, this.author);
  	observable.subscribe( data => {
  		console.log(data);

      if(data["message"] === "errors"){
        this.errors = data["errors"]
      }
      else{
  			console.log("successfully updated",data);
  			this._router.navigate(['/'])
      }
  	});
  }  
}
