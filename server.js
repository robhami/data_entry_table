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

app.post('/',(req,res)=>{
	console.log(req.body);
	database.users.push({
		Type: "DC", 
		Tool: "tool", 
		OD: "0", 
		ID: "0", 
		No: "1"

	})
	res.json(database.users[database.users.length-1]);
})


app.listen(3000, ()=>{
	console.log('app is running on port 3000');
});