const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
// const c = require ('./public/script.js');

// console.log(c.saveObject);

app.use(cors());
app.use(bodyParser.json());
// app.use(express.static(__dirname + '/Public'))

// app.get('/request', function(req, res){
// 	console.log()
//     // run your request.js script
//     // when index.html makes the ajax call to www.yoursite.com/request, this runs
//     // you can also require your request.js as a module (above) and call on that:
//     res.send(datax.saveJSON); 
// });

const knex = require ('knex') 


const db  = knex({
  	client: 'pg',
  	connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Ham&1974',
    database : 'bhadata'
  }
});

console.log(db.select('*').from('bhainput'));



app.get('/' ,(req, res)=>{
	
	db.select('*').from('bhainput').then(function(data) {

		res.send(data);
		// let saveData=res.send(data);
	});
	
	// res.send("hello");
	console.log("hello", req.body);

});

app.put('/',(req,res)=>{
	
	// console.log("rowCount", rowCount);
	const newRows=req.body;
	console.log("new rows put",req.body);
	

	 db('bhainput')
	 	
		.returning('*')
		.insert({
			No: newRows.No,	
			Type: newRows.Type,
			Tool: newRows.Tool,
			OD: newRows.OD,
			ID: newRows.ID,
			Weight: newRows.Weight,
			Length: newRows.Length


		})
		
	.then(response => {
		res.json(response);
		
	})

	
	// res.json(database.users[database.users.length-1]);
	// res.json(body);
	// res.('hello');
})


app.delete('/',(req,res)=>{
console.log("serv delete");
	db('bhainput')	 	
		 .del()
		.then(response => {
			res.json(response)
		})

	})





app.listen(3000, ()=>{
	console.log('app is running on port 3000');
});