import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAuthors(){
    return this._http.get("/authors");
  }

  getOneAuthor(id){
  	return this._http.get("/authors/" + id);
  }
  updateAuthor(id, data){
  	return this._http.put("/authors/edit/"+ id, data)
  }
  addAuthor(data){
  	return this._http.post("/authors/new", data)
  }
  deleteAuthor(id){
  	return this._http.delete("/authors/" + id);
  }
  updateLikes(name, id){
  	return this._http.put("/authors/like/" + id, name,id)
  }
};