var express = require("express");
var app = express();
var port = 8000;
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/authorApp/dist")));
app.set("views", path.join(__dirname, "./views"));

mongoose.connect("mongodb://localhost/author");
mongoose.Promise = global.Promise;


var AuthorsSchema = new mongoose.Schema({
	author_name: {
		type: String,
		required:true, 
		minlength: [3, "Minimum length is 3 characters"]
		// unique: true
 	},
 	likes: {
 		type: Number
 	},

},{ timestamps: true });


var Author = mongoose.model("Author", AuthorsSchema); 

// Reteriving all the authors from tasks DB:
app.get("/authors",function(request, response){
	Author.find({}).sort([['author_name', -1]]).exec(function(errors, data){
		if(errors){
			console.log("errors in fetching all the authors");
			console.log(errors);
			response.json({message: "errors", errors: Author.errors});
		}
		else{
			console.log("showing all authors", data);
			response.json({message: "success", data: data})
		}
	})
});


//Create a new Author

app.post("/authors/new", function(request, response){
	// console.log("POST DATA: ", request.body.name);
	console.log("POST DATA: ", request.body);
	var new_author = new Author({
		author_name : request.body.author_name,
		likes : 0
	});

	new_author.save(function(errors, data){
		if(errors){
			console.log("went wrong while creating a new author");
			console.log({message: "errors", errors: new_author.errors});
			// response.render(errors);
			response.json({message: "errors", errors: new_author.errors});

		}
		else{
			console.log("Successfully created a new author");
			response.json({message: "Success", data: data}); // or use response.send(data)
		};
	});
});

// // reterive a task with ID and then update a task using ID

//Reteriving a author by id

app.get("/authors/:id", function(request, response){
	console.log("id : ",request.params.id);
	Author.findOne({_id: request.params.id}, function(errors, data){
		if(errors){
			console.log("erros when displaying single author")
			console.log(errors);
			response.json({message: "errors", errors: Author.errors});
		}
		else{
			console.log(data);
			response.json({message: "Success", data: data})
		}
	});
});

//updating/editing

app.put("/authors/edit/:id", function(request, response){
	console.log(request.params.id);
	console.log(request.body.author_name);
	Author.findOne({_id: request.params.id}, function(errors, data){
		data.author_name = request.body.author_name;
		data.save(function(errors, data){
		if(errors){
			console.log("errors when editing an author")
			console.log({message: "errors", errors: errors});
			response.json({message: "errors", errors: errors});
		}
		else{
			console.log({message: "success", data: data});
			response.json({message: "success", data: data});
		};
	});
	});
});

// delete a task using ID

app.delete("/authors/:id", function(request, response){
	
	Author.remove({_id: request.params.id}, function(errors, data){
		if(errors){
			console.log(errors);
			response.json({message: "errors", errors: Author.errors});
		}
		else{
			response.json({message: "success", data: data});
		};
	});
});

app.put("/authors/like/:id", function(request, response){

	Author.findOne({_id: request.params.id}, function(errors, data){
		data.author_name = request.body.author_name;
		data.likes = request.body.likes
		data.save(function(errors, data){
		if(errors){
			console.log("erros when likng the author")
			console.log({message: "errors", errors: errors});
			response.json({message: "errors", errors: errors});
		}
		else{
			console.log({message: "success", data: data});
			response.json({message: "success", data: data});
		};
	});
	});
})


app.all("*", (request,response,next) => {
  response.sendFile(path.resolve("./authorApp/dist/index.html"))
});

app.listen(port, function(){
	console.log("Listening on the port 8000 for the Authors project");
})




















