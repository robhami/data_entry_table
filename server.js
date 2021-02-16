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

// console.log("DBX", db.select('*').from('bhainput'));

let saveName = {"name" : "bhainput"};
//pulls data from database
app.get('/' ,(req, res)=>{
	console.log("loading ", saveName.name)
	db.select('*').from(saveName.name).then(function(data) {

		res.send(data);
		// let saveData=res.send(data);
	});
	
	// res.send("hello");
	

});

//get list of table names
app.get('/tableName' ,(req, res)=>{
		
	db('pg_catalog.pg_tables')
	.select('tablename')
	.where({schemaname:'public'})

	.then(function(data) {
		res.send(data);
	});
});



//update variable saveName
app.put('/saveName', (req, res)=>{
	
	saveName = req.body
	res.send(saveName)
	console.log("This save name has been sent to server: ",saveName)
	
})

//add new data to existing table, need to make table name dynamic
app.put('/',(req,res)=>{
	
	// console.log("rowCount", rowCount);
	const newRows=req.body;
	console.log("below row added to table ",saveName.name,req.body);
	// console.log("req params",req.params);
	// console.log("above data added to this table: ",saveName.name);
	 db(saveName.name)
	 	
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
	.catch((error) => {
	  		console.error('Error:', error);
	});
})

//create new table, need function is script.js to send req.body.name
app.post('/',(req,res)=>{
	
	let newTable=req.body.name;
	console.log(newTable);
	// res.send(newTable);
	db.schema.createTable(newTable, function(table) {
	 	table.integer('No');
	 	table.string('Type')
	 	table.string('Tool');
	 	table.decimal('OD');
	 	table.decimal('ID');
	 	table.decimal('Weight');
	 	table.decimal('Length');
	 	// table.timestamps();
	 })

	.then(function(data) {

		res.send(data);
		// let saveData=res.send(data);
	});

})

//deletes rows from database, used when new saveFunction called
app.delete('/',(req,res)=>{
console.log("deleting saveName: ", saveName.name);
	db(saveName.name)	 	
		 .del()
		.then(response => {
			res.json(response)
		})

	})

app.listen(3000, ()=>{
	console.log('app is running on port 3000');
});