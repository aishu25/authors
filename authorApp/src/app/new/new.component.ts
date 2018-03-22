import { Component, OnInit } from '@angular/core';
import { HttpService } from "./../http.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  author: any;
  errors: any;
  // message: any;

  constructor(
  	private _httpService: HttpService,
    private _router: Router
    ) { }

  ngOnInit() {
  	this.author = { name: ""}
}

	addAuthorThroughService(){
		let observable = this._httpService.addAuthor(this.author);
		observable.subscribe(data => {
			if (data["errors"]) {
	        	this.errors = data["errors"]
	        	console.log(this.errors)
	      	}
	      	else {
	        console.log("Successfully added data to server!", data);
	        this._router.navigate(["/"])
	    	}
	    })
	}
}



