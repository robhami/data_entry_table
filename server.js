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

console.log(db.select('*').from('users'));

const database ={
	users: [
		{
		Type: "DC", 
		Tool: "tool", 
		OD: "0", 
		ID: "0", 
		No: "1",
		},
		{id: '124', 
		name:'Sally', 
		email:'sally@gmail.com', 
		password:'bannanas', 
		entries:0, 
		joined: new Date()
		}
	],
	login: [
		{
			id:'987',
			has:'',
			email: 'john@gmail.com'
		}
	]
}

app.get('/' ,(req, res)=>{
	res.send(database.users);

})

app.put('/',(req,res)=>{
	console.log(req.body);
	const newRows = req.body;
	
	console.log(newRows[0].No);
	database.users.push(
		// Type: "DC", 
		// Tool: "xtool", 
		// OD: "0", 
		// ID: "0", 
		// No: "1"
	// db('bhainput')
	// .returning('*')
	// .insert({
		newRows
		// No: req.body(No), 
		// Type: Type, 
		// Tool: Tool, 
		// OD: OD, 
		// ID: ID, 
		// Weight: Weight, 
		// Length: Length
		)

		
	// .then(response => {
	// 	res.json(response);
	// })

	
	res.json(database.users[database.users.length-1]);
	// res.json(body);
	// res.('hello');
})








app.listen(3000, ()=>{
	console.log('app is running on port 3000');
});