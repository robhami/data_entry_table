

let rowCount=1;
let saveObject={};
let saveArray=[];
// let saveJSON={1:1};
// let myJSON="";
let loadData={};
let selectIndex="DC";
// let loadRows="";
//populates the saved games dropdown
tablesListGet ()

// sets the value to selected DD value etc
function DD (selectIndex, selectId) {

	console.log("selectId: ", selectId);
	console.log("selectIndex: ", selectIndex);
	// set variable for the select element being processed
	let selectRow=(document.getElementById(selectId));
	// console.log("selectRow:", selectRow);
	//set variable for the select option element being processed
	let selectOption=selectRow.children[selectIndex];	
	console.log("selected option: ",selectOption);
	console.log(selectRow.value);
	//set variable with value selected in Type cell
	let toolValue=selectRow.value
	// sets the select element value to loaded or selected value
	selectRow.parentElement.setAttribute('value',selectOption.value);
	// sets select element to selected index(i.e. visible) to correct value, 
	//this had to be done to use load data
	selectRow.selectedIndex=selectIndex;
	// console.log(selectRow.selectedIndex);
	// console.log(selectRow.parentElement);
	// console.log(tool.children[0].childElementCount)
	// variable to identify if Tool Column for toolListGet function to send to correct subsequent function
	let toolCol= false;
	// if id selected is typeSelect (i.e. its type column)
	if(selectId.startsWith("typeSelect")){
	// variable that identifies cell of Tool Column is selected and needs to be populated
		let toolElement=document.getElementById(selectId).parentElement.parentElement.children[2].children[0]
		console.log("toolElement", toolElement)
	//send toolElement (cell to change), tool value (value selected in Type cell), 
	// and toolCol (whether its Type or Tool cell that is selected)
		toolsListGet(toolElement, toolValue, toolCol)
	}

	if(selectId.startsWith("toolDD")){
	//set toolCol to true, to show that tool column is selected
		toolCol=true;
	// variable that identifies cell of Tool Column selected, 
	//this will be used as a locator in toolDataExtract function
		let toolElement=document.getElementById(selectId).parentElement.parentElement.children[2].children[0]
	// get the value of the Type cell
		toolValue=document.getElementById(selectId).parentElement.parentElement.children[1].children[0].value
		console.log("toolElement", toolElement)
		console.log("toolValue", toolValue)
	//send toolElement (cell selected where data read from), tool value (value selected in Type cell), 
	// and toolCol (whether its Type or Tool cell that is selected)
		toolsListGet(toolElement, toolValue, toolCol)
		// toolDataAdd (toolValue)
	}



}

function toolsListGet (toolElement, toolValue, toolCol) {

	console.log("toolCol: ", toolCol)
	console.log("toolValue: ",toolValue)
	// console.log("loading tablesList");
	// do a GET request to get data from DB. GET request is managed by server.js	
	fetch ('http://localhost:3000/toolType?name='+ toolValue)
	//return reponse from DB as JSON
		.then(response => response.json())
		.then(toolsList => {
	  		// console.log('Success GET tool list:', toolsList);
	 //if its Type column send toolList (data to add) & toolElement (element to change) to toolsListCreate
	  	if(!toolCol) {
	  		console.log("false if worked")
			toolsListCreate (toolsList, toolElement)
	//if its Tool column send toolList (data to use) & toolElement (locator for row) to toolDataExtract
	  	} else if(toolCol) {
	  		console.log("need a function for Tool data extraction")
	  		toolDataExtract(toolsList, toolElement)
	  	}
		})

		.catch((error) => {
	  		console.error('Error:', error);
		});
}

function toolsListCreate (toolsList,toolElement) {
	console.log("toolElement: ", toolElement)
	console.log(toolsList.length)
	let toolCount=toolsList.length;
	// loop through toolsList appending it to Tool dropdown in selected row
	for(i=0;i<toolCount;i++){
		let option =document.createElement("option")
		option.text=toolsList[i].Tool;
		option.value=toolsList[i].Tool;
		// console.log(option)
		// console.log(toolsList[i])
		toolElement.appendChild(option)
	}

}



function toolDataExtract (toolsList, toolElement) {
	console.log("toolElement: ", toolElement)
	console.log(toolsList.length)
	let toolCount=toolsList.length;
	console.log(toolsList);
	for(i=0;i<toolCount;i++){
		
	}

}

// function toolDataAdd (toolValue) {
// 	console.log("Tool data addx");

// 	fetch ('http://localhost:3000/toolData?name='+ toolValue)
// 		//return reponse from DB as JSON
// 			.then(response => response.json())
// 			.then(toolsList => {
// 		  		console.log('Success GET tool list:', toolsList);
// 				// toolsListCreate (toolsList, toolElement)
// 			})

// 			.catch((error) => {
// 		  		console.error('Error:', error);
// 			});
	

// }





// takes value entered and sets value to cell element
function input (valuex,idx) {
//logs value and id of cell that is changed
	console.log(valuex,idx);	
	let cell = document.getElementById(idx).parentElement;
	console.log(cell);
	console.log(cell.getAttribute("value"));
	//sets parent of entered value to the value entered
	cell.setAttribute("value", valuex)
	// had to add this when loading to display
	cell.children[0].setAttribute("value", valuex);
	console.log(cell);
}


function addRow() {	

	let bhaTable=document.getElementById('BHAentry');
	let toolRow=document.getElementById('dataRow');
	let newRow =toolRow.cloneNode(true);
	clearVals(newRow);
	newRow.id=newRow.id+rowCount;
	// reset Type value to DC as it is cloning from top row that may have been changed
	// may need to do this for other values
	newRow.children[1].setAttribute("value", "DC");

	// console.log("newRow.children[1].value: ", newRow.children[1])


	// newRow.setAttribute("value",rowCount);
	// console.log("newRow: ",newRow);
	let newRowCols = newRow.children
	// console.log("newRowCols: ",newRowCols);
	// loop through newRow entries and change id based on original id + rowcount
	for(i=0;i<1;i++){
		newRowCols[i].id=newRowCols[i].id+(rowCount+1);
		console.log(newRowCols[i].id);
		
	}
	// have to do child of child for cells with input boxes
	for(i=1;i<8;i++){
		newRow.children[i].children[0].id=(newRow.children[i].children[0].id+rowCount)
	// console.log(newRow.children[0].id+rowCount);
		// console.log(newRow.children[i].children[0].id);
	}
	// append new row to table & increase row count 
	tabBody.appendChild(newRow);
	rowCount++;
	document.body.appendChild(document.createTextNode(rowCount))
	
	// change row # text and value based on increased row count
	// console.log(newRow.children[0]);
	newRow.children[0].textContent=rowCount;
	newRow.children[0].setAttribute("value",rowCount);
	// console.log(newRow.children[0].dataset.value);
}

function clearVals (newRow) {
	console.log("clearVals", newRow)
	// can do this at start addRow
	for(i=3;i<7;i++){
		// console.log(newRow.children[i]);
		newRow.children[i].setAttribute("value",0);
		newRow.children[i].children[0].setAttribute("value",0);
	}
	let selectTool=newRow.children[2].children[0]
	let childCount=selectTool.childElementCount
	//loop through select element deleting all added values
	for(j=childCount;j>0;j--){
		selectTool.remove(j)
	}
}

function myDeleteFunction(rowDelButt) {	
	console.log("row: ",rowDelButt);
	// console.log("row count del func start: ", rowCount)
	if(rowCount<2 || rowDelButt.id==="delButt"){
		alert("Cannot delete final row");
	} else if (rowCount>1) {
		// console.log(rowDelButt.parentElement.parentElement);
		rowDelButt.parentElement.parentElement.remove();
		rowCount--;

		// console.log("row count del func end: ",rowCount);
	}
}

function sendSaveName (isSave) {
	console.log("isSave: ", isSave)
	let saveSelect =document.getElementById('saveInput').value;
	console.log("saves: ", saveSelect);
	let saveJSON= {"name" : saveSelect}
	console.log("saveJson: ",saveJSON)
	if(isSave) {
		savesExist(saveSelect, saveJSON)
	}
	
	fetch ('http://localhost:3000/saveName'
		,{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(
				saveJSON
				)
			})
			.then(response => response.json())
			.then(saveNamex => {
		  		console.log('Success:', saveNamex);
			})
			.catch((error) => {
		  		console.error('Error:', error);
			});
}



//WHEN HIT SAVE BUTTON
function mySaveFunction () {
	console.log("FUNCTION mySaveFunction");
	//clear any existing data in saveArray
	saveArray=[];
	// send saveName to server ??????
	
	
	for(j=0;j<rowCount;j++) {
	//set save row for each step of loop from 0 to rowCount
		let saveRow=(tabBody.children[j])
		// console.log(saveRow);
	//loop through each column in the row	
		for(k=0;k<7;k++) {
			//get object property from row headers
			let prop=headers.children[k].textContent;
			// get object value from row
			let val=saveRow.children[k].getAttribute("value");
			// console.log("prop",prop);
			// console.log("val",val);
			//add property to saveObject
			Object.defineProperty(saveObject,prop,{value: val, enumerable: true, configurable: true});	
		}
		console.log("save Object: ", saveObject)
		// convert object to JSON
		let myJSON=JSON.stringify(saveObject);
	
		// console.log("myJSON: ", myJSON)
		// add saveObject to saveArray
		saveArray.push(saveObject);
		//clear saveObject ready for next row
		saveObject={};

	}
	
	console.log("SaveArray",saveArray);
	// sends sendArray to putData function to allow saving to DB
	//THIS NEEDS TO WAIT ON TABLE
	// putData(saveArray);
	sendSaveName (true)
}

function sendSaveName (isSave) {
	console.log("FUNCTION sendSaveName");
	console.log("isSave: ", isSave)
	let saveSelect =document.getElementById('saveInput').value;
	console.log("saveSelect: ", saveSelect);
	let saveJSON= {"name" : saveSelect}
	console.log("saveJson: ",saveJSON)
	

	fetch ('http://localhost:3000/saveName'
		,{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(
				saveJSON
				)
			})
			.then(response => response.json())
			.then(saveNamex => {
		  		console.log('Success sandSaveName:', saveNamex);
			})
			.catch((error) => {
		  		console.error('Error:', error);
			});

	if(saveSelect){
		// not sure why we need to test if true
		if(isSave) {
			savesExist(saveSelect, saveJSON)
		}
	} else {
		throw(alert("False value entered please enter or select save name"))
	}

	//send the the save name in JSON to the server

}

function savesExist (saveSelect, saveJSON) {
	console.log("FUNCTION savesExist");
	// set saveExistCheck to false to show no match 
	let saveExistCheck= false;
	
	// set saveExist value based on function saveLoopList
	saveExistCheck=saveLoopList (saveSelect);
	console.log("true: ", saveExistCheck)
		
	//check if saveLoopList has found a match
	if (saveExistCheck){
	console.log("exists")
		if(confirm(saveSelect + " already exists overwrite it?")){
			console.log("Proceeding to save");
			deleteRows();
			console.log(saveArray);
			putData(saveArray)

		} else {
			throw(alert("Please select save name. Not Saved"));				
		}
	} 
	else {
	console.log("doesn't exist")

	if(confirm(saveSelect + " does not exist create new save file?")){
			console.log("Proceeding to save");
			newSaveFile();
	
			async function newSaveFile () {
				const response =createNewSaveFile (saveSelect, saveJSON);
				const data = await response;
				console.log("data async",data);
			}

			

		} else {
			throw(alert("Please select save name. Not Saved"));			
		}
	}	
}

async function   createNewSaveFile (saveSelect, saveJSON) {
 	console.log ("creating new save file: ", saveSelect, saveJSON)
 
 	const settings =
 			{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: 
				JSON.stringify(
					saveJSON
				)

	};
	// not sure I need this to be async await but left it there. 
	//I think the async await in saveExists is making sure table created before proceeding
			try {
        		const fetchResponse = await fetch('http://localhost:3000/', settings);
        		const data = await fetchResponse.json();
        		console.log("awaited",data)
        		putData(saveArray)
        		return("awaited", data);
    		}

			catch(error) {
		  		console.error('Error:', error);
			}
}

function saveLoopList (saveSelect) {
	let savesLength=saves.children.length;
	// console.log(savesLength);
	// console.log("saveSelect: ", saveSelect);
	
		for(x=0;x<savesLength;x++){
				// console.log("x: ", x);
				// console.log("test against: ", saves.children[x].value);
				if(saves.children[x].value===saveSelect) {
					console.log(saveSelect," already exists overwrite it?");				
						return (true)
				} 
		}
		
}

function putData (saveArray) {
	console.log("putData function");
	console.log("rowCount: ",rowCount);

	//loop thru saveArray doing a PUT request that is managed by server.js
	for(i=0;i<rowCount;i++){
		console.log("i: ",i);
		
		fetch ('http://localhost:3000/'
			, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: 
				JSON.stringify(
					saveArray[i]
				)

			})
			.then(response => response.json())
			.then(json => {
		  		console.log('Success putData:', json);
			})
			.catch((error) => {
		  		console.error('Error:', error);
			});
	}


}


function myLoadFunction () {
	
	sendSaveName (false)
	// console.log("loading: ", saveName.name);
	// do a GET request to get data from DB. GET request is managed by server.js	
	fetch ('http://localhost:3000/')
	//return reponse from DB as JSON
			.then(response => response.json())
			.then(json => {
		  		console.log('Success GET:', json);
	//delete existing rows in browser
		  		deleteOldRows();
	//send JSON data to returnData function
		  		returnData(json);
			})
			.catch((error) => {
		  		console.error('Error:', error);
			});
}

function deleteOldRows () {
	// set startRowCount variable to initial rowCount
	console.log("deleteOldRows");
	let startRowCount=rowCount;
	// loop through rows backwards except first row
	for(l=startRowCount-1;l>0;l--){
	//create variable that matches delButt id using l
		let delId = ("delButt"+l);
		// console.log(delId)
	//get button element with delButt id
		let rowDelButt=document.getElementById(delId);
		// console.log("rowDelButt: ", rowDelButt);
		// console.log("rowCount: ", rowCount);
		// console.log("l: ", l)
	// send button element to myDeleteFunction for deletion
		myDeleteFunction(rowDelButt)
	}
}

function returnData (json) {
	// adds rows
	//set loadData variable to loaded JSON from DB
	loadData=json;
	console.log("loadData: ",loadData);	
	//sort load data because was coming out of sequence prob due to asynchronous behaviour
	loadData.sort((a,b)=>(a.No > b.No) ? 1:-1);
	console.log("loadData sorted: ",loadData);	
	// set loadRows to length of loadData (i.e. number of rows)
	loadRows =	loadData.length;
	console.log("loadData length: ",loadRows);
	// loop through loadRows and use addRow function to add same number of rows	
	for(j=1;j<loadRows;j++) {
		addRow();		
	}
	
	loadDD(loadData,loadRows);
	loadNum(loadData,loadRows)

	console.log(loadRows);
	
	
// NEED TO ADD FUNCTION FOR ADDING NUMERICAL DATA USE INPUT FUNCTION
}

function loadDD (loadData,loadRows) {
	for(k=0;k<loadRows;k++) {
		// loops through added rows & loadData for tool type column
		// then sends to DD function to set loaded values
		// gets the select element from table
			console.log("k: ", k);
			let selectId =tabBody.children[k].children[1].children[0];
			console.log("selectId: ", selectId);
		//gets the tool type for dropdown from JSON
			let selectedType=loadData[k].Type;
			console.log("selectedType: ", selectedType);
		// sends tool type to switch function to return the select index that tool type is at
			switchFunc (selectedType);
			console.log("selected index: ", selectIndex);
		// sends index and id to DD function so they can be loaded 
			DD(selectIndex, selectId.id)
			//need to get order of selectedIndex, do a switch? 
		}

}

function loadNum (loadData,loadRows) {
	for(m=0;m<loadRows;m++) {
		let loadRow=(tabBody.children[m]);
		console.log(loadRow);

		for(n=3;n<7;n++){
			let loadRowNumCol=loadRow.children[n].children[0];
			
			let idx=loadRowNumCol.id;
			console.log("idx: ", idx);
			let prop=headers.children[n].textContent;
			console.log("prop: ", prop);
			let valuex=loadData[m][prop];
			console.log("valuex: ", valuex)
			input (valuex,idx);
		}

	}
}



function switchFunc (selectedType) {
	console.log("SwithchFunc");
	// returns index for tool type given in JSON
	switch (selectedType) {

		case "DC":
		selectIndex=0;
		break;
	
		case "HWDP":
		selectIndex=1;
		break;

		case "DP":
		selectIndex=2;
		break;

		case "Stab":
		selectIndex=3;
		break;

		case "M_LWD":
		selectIndex=4;
		break;

		case "Motor_RSS":
		selectIndex=5;
		break;

		case "Sub_XO":
		selectIndex=6;
	}
	console.log("selectIndex: ", selectIndex)
}
	

//	
function deleteRows () {
	//deletes rows from database, used when new saveFunction called
	// sendSaveName ()
	fetch ('http://localhost:3000/deleteRows'
		, {
		method: 'DELETE',
	})
	.then(response => console.log(response));

}



function tablesListGet () {
	// console.log("loading tablesList");
	// do a GET request to get data from DB. GET request is managed by server.js	
	fetch ('http://localhost:3000/tableName')
	//return reponse from DB as JSON
		.then(response => response.json())
		.then(tablesList => {
	  		console.log('Success GET tableName:', tablesList);
			tablesListCreate (tablesList)
		})

		.catch((error) => {
	  		console.error('Error:', error);
		});
}

function tablesListCreate (tablesList) {
	console.log('Success GET tableListCreate:', tablesList);
	let tableCount=tablesList.length;
	console.log(tableCount);
	// loop through tablesList and append to savesList if not del prefix
	for (i=0;i<tableCount;i++){
		let tableName=tablesList[i].tablename
			// console.log(tableName);

		let isDeleted=tableName.startsWith("del_")
		if  (isDeleted){
			// console.log(tableName," is a deleted file")
		} else {
			let savesList = document.getElementById("saves");
			let newOption = document.createElement("option");
			savesList.appendChild(newOption);
			newOption.id=(tablesList[i].tablename);
			newOption.textContent=(tablesList[i].tablename);
		}
	}

}

function tablesListClear () {
 let savesToDel=document.getElementById("saves")
	while(savesToDel.hasChildNodes()){
		savesToDel.removeChild(savesToDel.childNodes[0])
		// console.log(savesToDel.hasChildNodes);
	}
}

function dropTable () {
	fetch ('http://localhost:3000/dropTable'
		, {
		method: 'DELETE',
	})
	.then(response => console.log(response));

}


function delName () {

	let saveInputVal=document.getElementById("saveInput").value;

	console.log("renaming table to: del_", saveInputVal)
	fetch ('http://localhost:3000/rename?name='+ saveInputVal)
		
	
	.then(response => response.json())
	.then(log =>{
		console.log('delName success: ', log)
	})
	document.getElementById('saveInput').value="";
	tablesListClear()
	tablesListGet ()
}


function createInput (thisx,selectedIndex) {
	let optionSelect=thisx[selectedIndex].id
	console.log(thisx[selectedIndex].id);
	// console.log(selectedIndex,id);
	// if(optionSelect==="saveOption"){
	// 	let inputElement = document.createElement('input');
	// 	inputGroupSelect04.parentElement.replaceChild(inputElement,inputGroupSelect04);
	// }
	
}


