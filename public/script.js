
let rowCount=1;
let saveObject={};
let saveArray=[];
let loadData={};
let indexDD="";
let selectText=1

//populates the saved games dropdown
tablesListGet ()

// function priorDD (index, elemUpdate) {
// // added this in case need prior DD value for conversion, this value can be assigned to a global variable
// // currently only two values in units DD's so dont need prior DD value
// 		console.log("elemUpdate: ", elemUpdate)
// 		let unitsDD=document.getElementById(elemUpdate)
// 		let unitsDDVal=unitsDD.value
// 		console.log("unitsDDVal: ", unitsDDVal)
// }

function DD (indexDD, elemUpdate, loadTool) {
	// sets the value to selected or loaded DD values
	
	// selected index  (e.g. for typeSelect: 1=DC, 2=HWDP or for toolDD: 1=DC  10in x 3in  240#)
	console.log("indexDD: ", indexDD);
	// id of DD select element to be processed (is it typeSelect or toolDD ? and which number e.g typeSelect1 is 2nd row)
	console.log("elemUpdate: ", elemUpdate);
	// text of tool (e.g. DC  10in x 3in  240#), only comes with a load because cant provide indexDD.
	console.log("loadTool: ", loadTool);
	
	// set variable for the DD element being processed 
	//(e.g. <select id="typeSelect" onchange="DD(this.selectedIndex, this.id)"></select>)
	let changeDD=document.getElementById(elemUpdate);
	console.log("changeDD:", changeDD);
	
	//set valueDD to null to allow assignment in if functions below
	let valueDD 
	// when loading cannot provide a indexDD for toolDD because it changes based on toolList
	// is only possible for typeSelect column
	// therefore have to use loadTool text value  
	// due to load DD function sending a false value for indexDD for Tool, 
	// so check indexDD not false
	//

	// FOR ALL SELECTED TOOLS & TYPES and LOADED TYPES ONLY (LOADED TOOLS cannot have indexDD)
	// CHANGES DD and CELL to DD VALUE
	if(indexDD!=false) {
	//set variable for the select option element selected/loading (<option value="DC">DC</option>)
	//*****there may be a better way to do this by using loadTool for both	
		let selectOption=changeDD.children[indexDD];	
		console.log("selected option: ",selectOption);	
	// variable for selected/loaded DD value (e.g. DC) to valueDD
		valueDD=selectOption.value
		console.log("valueDD: ", valueDD)
	//changes <td> data cell value to loaded or selected valueDD
		changeDD.parentElement.setAttribute('value', valueDD);
		console.log("<td> data-cell to change: ", changeDD.parentElement)
	//sets selectedIndex of DD to loaded/selected index (e.g. indexDD 1=DC)
	//this had to be done to use load data, as it was not manually selected
		changeDD.selectedIndex=indexDD;
		console.log("selected Index: ", changeDD.selectedIndex);
	} 
	
	// variable to identify if Tool Column for toolListGet function 
	let toolCol= false;
	
	// SENDS TO GET TOOL-LIST IF ITS A TYPE DD
	// if id selected is typeSelect (i.e. its type column)
	if (elemUpdate.startsWith("typeSelect")){
	// variable that identifies cell of Tool Column needs to be populated
		let toolElement=document.getElementById(elemUpdate).parentElement.parentElement.children[2].children[0]
		console.log("toolElement", toolElement)
		console.log("toolElement children", toolElement.children.length)

		if (toolElement.children.length>1) {
			selectText=0
			toolsListClear(toolElement)
		}

	//send toolElement ( tool cell to change), tool value (value selected in Type cell), 
	// and toolCol (whether its Type or Tool cell that is selected), in this case this is false
		toolsListGet(toolElement, valueDD, toolCol)
	}


	// SENDS TO GET TOOL-LIST IF ITS A TOOL DD, ADDS loadTool & indexDD TO FUNCTION PARAMETERS
	// ****** toolDD DD and cell value are set in toolDataAdd Function 
	if (elemUpdate.startsWith("toolDD")){
	//set toolCol to true, to show that tool column is selected
		toolCol=true;
	
	//get variable that identifies cell of Tool Column selected, 
	//this will be used as a locator in toolDataExtract function
	//if this is loaded it has no value as list is loaded with nothing selected 
	//need to do a if for loaded data could use indexDD false 


		let toolElement=document.getElementById(elemUpdate).parentElement.parentElement.children[2].children[0]
		console.log("toolElement: ", toolElement)
	// get the value of the Type cell to allow correct toolList to be pulled
		valueDD=document.getElementById(elemUpdate).parentElement.parentElement.children[1].children[0].value
		
		console.log("toolElement", toolElement)
		console.log("valueDD", valueDD)
		console.log("loadTool: ", loadTool)
		
	//send toolElement (cell selected where data read from), tool value (value selected in Type cell), 
	// toolCol (whether its Type or Tool cell that is selected)
	// loadTool is text that needs loaded & indexDD is index of type that needs to loaded/selected
		toolsListGet(toolElement, valueDD, toolCol, loadTool, indexDD)
		// toolDataAdd (valueDD)

	}

	// get units from units DD's
	if (elemUpdate.startsWith("units")){

		console.log(elemUpdate)
		let unitsDD=document.getElementById(elemUpdate)
		console.log("unitsDD: ", unitsDD)
		let unitsDDVal=unitsDD.value
		console.log("unitsDDVal: ", unitsDDVal)
	// because id starts with OD then number added, have to do first row separately as its ID is OD
		let idPrefix=elemUpdate.replace("units","")
	// remove units from DD id so it becomes same as first row ID for column selected (e.g. OD)	
		convFac(idPrefix, unitsDDVal)

		for (i=1;i<rowCount;i++) {
		//loop through rows creating row ID's to send to convert
			let idNumd=idPrefix + i	
			// units=changeDD.parentElement.getAttribute("value")
			let unitsDD=document.getElementById(elemUpdate)
			console.log("unitsDD: ", unitsDD)
			let unitsDDVal=unitsDD.value
			convFac(idNumd, unitsDDVal)
		}
	}

}

//PULL THE ASSOCIATED TOOL LIST
function toolsListGet (toolElement, valueDD, toolCol, loadTool, indexDD) {
	console.log("TOOLSLISTGET");
//gets Type and Tool data then sends to appropriate function depending if its Type or Tool 
	console.log("toolCol: ", toolCol)
	console.log("valueDD: ",valueDD)

	// console.log("loading tablesList");
	// do a GET request to get toolList data from DB using valueDD (e.g. DC). GET request is managed by server.js	
	fetch ('http://localhost:3000/toolType?name='+ valueDD)
	//return reponse from DB as JSON as toolsList
		.then(response => response.json())
		.then(toolsList => {
	// console.log('Success GET tool list:', toolsList); 
	//if its Type column send toolList (data to add) & toolElement (element to change) to toolsListCreate
	console.log("HELLO")

		  	if(!toolCol) {	  	
		  		console.log("!toolCol")	
				toolsListCreate (toolsList, toolElement)
		//if its Tool column send toolList (data to use), toolElement (element to change) 
		// loadTool (text of tool (e.g. DC  10in x 3in  240#)) or toolElement.value (DC) **** this looks wrong**** to toolDataExtract
		  	} else if(toolCol) {
		//should be able to send loadTool but will need a if to differentiate loaded vs. selected data 
				if(!indexDD) {
					toolDataExtract(toolsList, loadTool, toolElement)
				} else {
					toolDataExtract(toolsList, toolElement.value, toolElement)
				}		  		
		  	}
		})

		.catch((error) => {
	  		console.error('Error:', error);
		});

}

function toolsListCreate (toolsList,toolElement) {
	console.log("TOOLSLISTCREATE");
	// toolsListClear ()
	// populates toolList
	console.log("toolElement.id: ", toolElement.id)
	console.log(toolsList.length)
	debugger
	
	let toolCount=toolsList.length;
	// loop through toolsList appending it to Tool dropdown in selected row
	for(i=0;i<toolCount;i++){
		// create option element
		let option =document.createElement("option")
		//set option element text and value as per tool name
		option.text=toolsList[i].Tool;
		option.value=toolsList[i].Tool;
		// console.log(option)
		// console.log(toolsList[i])
		//append option data to toolElement (Tool cell on row selected)
		toolElement.appendChild(option)	
	}

	console.log("toolElement.option: ", toolElement.children[0])
	toolDataExtract(toolsList, toolElement.value, toolElement)
	// toolDataAdd(toolElement.children[0], toolElement, 0 )
	//needs to go to tool data extract

}

function toolsListClear (toolElement) {
	//clears saves list
	console.log("toolsListClear with:", toolElement.id)
	
	//only seems to do top row
	 let toolsToDel=document.getElementById(toolElement.id)

		while(toolsToDel.children.length>0){
			toolsToDel.removeChild(toolsToDel.childNodes[0])
			console.log(toolsToDel.children.length);

		}
		
}

function toolDataExtract (toolsList, toolVal, toolElement) {
	//match tool Element selected or loaded with value on list 
	console.log("TOOLDATEXTRACT");
	console.log("toolVal: ", toolVal)
	console.log("toolsList: ", toolsList)
	console.log("toolElement: ", toolElement)
	// console.log("valueDD: ", valueDD)
	console.log(toolsList.length)
	//get length of toolsList
	let toolCount=toolsList.length;
	// console.log(toolsList);

	// loop through toolsList looking for match with toolElement.value (selected or loaded tool)
	for(i=0;i<toolCount;i++){
		// console.log(toolsList[i].Tool)
		if(toolsList[i].Tool===toolVal){
			console.log("MATCH: ", toolsList[i], "i", i)

			let matchTool = toolsList[i]
		//this jumps 1 because getting rid of "Select Tool" text 
			let toolIndex=i+selectText;
		
			toolDataAdd(matchTool, toolElement, toolIndex)

			break;
		}
	}

}

function toolDataAdd (matchTool, toolElement, toolIndex) {
	//add data to number cells & change Tool dropdown shown value to match loaded or selected
	console.log(toolIndex)
	console.log("toolDataAdd");
	// console.log("toolOD: ", matchTool.OD)
	
	let toolArray=Object.values(matchTool)
	console.log("toolArray: ", toolArray)
	
	// add numbers to numEnt cells
	for(i=3;i<7;i++){
		let cell = toolElement.parentElement.parentElement.children[i]
		console.log("cell: ", cell)
		console.log(toolArray[i])
		cell.value= toolArray[i]
		cell.children[0].value=toolArray[i]
		console.log(cell.children[0])
	}

	let cell = toolElement.parentElement.parentElement.children[2]
	console.log("toolCell: ", cell)
	//sets value of tool DD cell & DD select index
	console.log("matchTool.Tool: ",matchTool.Tool)
	
	cell.children[0].setAttribute("value",matchTool.Tool)
	cell.children[0].selectedIndex=toolIndex
	console.log(cell.children[0].selectedIndex)
	console.log(cell.children[0].selectedIndex[1])
	
}


function convFac(inputId, units) {
	console.log("convert: ", inputId)
	console.log("unitsDDVal: ", units)

	switch (units) {

		case "mm": 
		let mm=25.39998628
		doConv(inputId, units, mm)
		break;

		case "in":
		let inc=0.0393701
		doConv(inputId, units, inc)
		break;

		case "# ft":
		let lb=2.2046226
		doConv(inputId, units, lb)
		break;

		case "kg ft":
		let kgft=0.4535923745
		doConv(inputId, units, kgft)
		break;

		case "ft":
		let ft=3.280839895

		doConv(inputId, units, ft)
		break;

		case "m":
		let m=0.3048
		doConv(inputId, units, m)
		break;

	}
}

function doConv (inputId, units, fac) {
	let numUnitConv=document.getElementById(inputId).value
	console.log(numUnitConv)
	let conVal=(fac*numUnitConv).toPrecision(3)
	

	console.log(conVal)
	input(conVal, inputId)

}

// takes value entered and sets value to cell element
function input (valuex,idx,keyed) {
	console.log("INPUT")
//logs value and id of cell that is changed
	console.log(valuex,idx);	
	let cellx = document.getElementById(idx).parentElement;
	console.log(cellx);
	//sets parent of entered value to the value entered
	cellx.value=valuex
	// had to add this when loading to display
	cellx.children[0].value=valuex	
}


function addRow() {
	// adds new row
	let bhaTable=document.getElementById('BHAentry');
	let toolRow=document.getElementById('dataRow0');
	let newRow =toolRow.cloneNode(true);
	clearVals(newRow);
	console.log("newRow: ", newRow)
	newRow.id=newRow.id+rowCount;
	// reset Type value to DC as it is cloning from top row that may have been changed
	// may need to do this for other values
	newRow.children[1].setAttribute("value", "DC");
	console.log("newRow.children[1].value: ", newRow.children[1])
	// newRow.setAttribute("value",rowCount);
	// console.log("newRow: ",newRow);
	let newRowCols = newRow.children
	// console.log("newRowCols: ",newRowCols);
	// loop through newRow entries and change id for No column based on original id + rowcount
	for(i=0;i<1;i++){	
		newRowCols[i].id=newRowCols[i].id+(rowCount+1);
		console.log(newRowCols[i].id);	
	}
	// have to do child of child for cells with input boxes
	for(j=1;j<8;j++){
		
		newRow.children[j].children[0].id=(newRow.children[j].children[0].id+rowCount)
		// console.log(newRow.children[0].id+rowCount);
		console.log(newRow.children[j].children[0].id);
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
	console.log("clearVals", newRow);
	// clears values in new row because cloning previous row in addRow
	for(i=3;i<7;i++){
		console.log("clear val info: ", newRow.children[i]);
		newRow.children[i].setAttribute("value","");
		newRow.children[i].children[0].setAttribute("value","");
		// newRow.children[i].value=0
		// newRow.children[i].children[0].value=0
		console.log("cleared val info: ", newRow.children[i].children[0]);

	}
	let selectTool=newRow.children[2].children[0]
	// console.log("selectTool: ", selectTool)
	let childCount=selectTool.childElementCount
	// console.log("childCount: ", childCount)
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


//WHEN HIT SAVE BUTTON
function mySaveFunction () {
	console.log("FUNCTION mySaveFunction");
	//clear any existing data in saveArray
	saveArray=[];
	// send saveName to server ??????
	
	//do  loop to set td class=select to its selectedIndex

	for(x=0;x<rowCount;x++){
		
		let selectVal = tabBody.children[x].children[2].children[0].value
		console.log("selectVal: ", selectVal)
		let TDVal = tabBody.children[x].children[2]

		TDVal.setAttribute("value",selectVal)
		console.log("TDVal: ", TDVal)
	}
	
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
			console.log("prop",prop);
			console.log("val",val);
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

async function sendSaveName (isSave) {
	//this function sends save name to server
	console.log("FUNCTION sendSaveName");
	console.log("isSave: ", isSave)
	// get value entered in input box
	let saveSelect =document.getElementById('saveInput').value;
	console.log("saveSelect: ", saveSelect);
	// convert save name to JSON format
	let saveJSON= {"name" : saveSelect}
	console.log("saveJson: ",saveJSON)
	
	// send saveJSON to server
	await fetch ('http://localhost:3000/saveName'
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
		  		console.log('Success sendSaveName:', saveNamex);
			})
			.catch((error) => {
		  		console.error('Error:', error);
			});

	// if saveSelect has value in 
	if(saveSelect){
		// not sure why we need to test if true
		//if its a save action that the name is being sent for check against 
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


async function myLoadFunction () {
	//sends value in input box to server via sendSaveName function and identifies that its not save action
	await sendSaveName (false)
	// console.log("loading: ", saveName.name);
	// do a GET request to get data from DB. GET request is managed by server.js

	//need to await here	
	await fetch ('http://localhost:3000/')
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
	//deletes old rows when load function called
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
	for(xc=0;xc<loadRows-1;xc++) {
		console.log("ADD ROW: ",xc)
		addRow();		
	}
	
	loadDD(loadData,loadRows);
	loadNum(loadData,loadRows)

	console.log(loadRows);
	
	
// NEED TO ADD FUNCTION FOR ADDING NUMERICAL DATA USE INPUT FUNCTION
}

function loadDD (loadData,loadRows) {
	console.log(loadRows)
	// selectText=0
	// loops through added rows & loadData for tool & type columns
	// then sends to DD function to set loaded values
	for(k=0;k<loadRows;k++) {
		// console.log("k: ", k);
		// set variable for type element to be updated
			let typeElemUpdate =tabBody.children[k].children[1].children[0];
			console.log("typeElemUpdate: ", typeElemUpdate);
		// set variable for tool element to be updated	
			let toolElemUpdate =tabBody.children[k].children[2].children[0];
			console.log("toolElemUpdate: ", toolElemUpdate);
		// set variable for type value (e.g. DC) to load from JSON file from db 
		// used in switch function (switchFunc) to get index for type
			let loadType=loadData[k].Type;
			console.log("loadType: ", loadType);
		//  set variable for tool value (e.g. DC 10in x 3in 240#) to load from JSON file from db
			let loadTool=loadData[k].Tool;
			console.log("loadTool: ", loadTool);
		// sends type value to switch function to return the selected index for type
			switchFunc (loadType);
			console.log("selected index: ", indexDD);
		// sends type index and id to update to DD function so they can loaded, no loadTool data so send false 
			DD(indexDD, typeElemUpdate.id, false)
		// sends loadTool (e.g. DC 10in x 3in 240#) text and id to update to DD function, 
		// no selected index possible for tool as type varies options so send false
			DD(false, toolElemUpdate.id, loadTool)	 
		}

}

function loadNum (loadData,loadRows) {
	console.log("*****************************LD******",loadData)
	for(m=0;m<loadRows;m++) {
		let loadRow=(tabBody.children[m]);
		// console.log(loadRow);

		for(n=3;n<7;n++){
			let loadRowNumCol=loadRow.children[n].children[0];
			
			let idx=loadRowNumCol.id;
			console.log("idx: ", idx);
			let prop=headers.children[n].textContent;
			console.log("prop: ", prop);
			//seems like this value sticks maybe because its json
			//conversion works when its loaded put not typed
			//maybe need to write to json 
			let valuex=loadData[m][prop];
			console.dir("valuex: ", valuex)
			input (valuex,idx);
		}

	}
}



function switchFunc (loadType) {
	// console.log("SwithchFunc");
	// returns index for tool type given in JSON
	switch (loadType) {

		case "DC":
		indexDD=1;
		break;
	
		case "HWDP":
		indexDD=2;
		break;

		case "DP":
		indexDD=3;
		break;

		case "Stab":
		indexDD=4;
		break;

		case "M_LWD":
		indexDD=5;
		break;

		case "Motor_RSS":
		indexDD=6;
		break;

		case "Sub_XO":
		indexDD=7;
	}
	// console.log("indexDD: ", indexDD)
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
	//clears saves list
	 let savesToDel=document.getElementById("saves")
		while(savesToDel.hasChildNodes()){
			savesToDel.removeChild(savesToDel.childNodes[0])
			// console.log(savesToDel.hasChildNodes);
		}
}








function dropTable () {
	// dont think this is used
	fetch ('http://localhost:3000/dropTable'
		, {
		method: 'DELETE',
	})
	.then(response => console.log(response));

}


function delName () {
	// send deleted tables to server to have del prefix added 
	let saveInputVal=document.getElementById("saveInput").value;

	console.log("renaming table to: del_", saveInputVal)
	fetch ('http://localhost:3000/rename?name='+ saveInputVal)
		
	
	.then(response => response.json())
	.then(log =>{
		console.log('delName success: ', log)
	})
	document.getElementById('saveInput').value="";
	//clear and readd tablesList
	tablesListClear()
	tablesListGet ()
}

function moveRowsUp (buttClick) {
	//buttClick is move button element
	console.log("buttClick: ", buttClick)
	//set variable on row that buttClick is on 
	let rowToMove=buttClick.parentElement.parentElement 
	console.log("rowMove: ", rowToMove)
	//set variable to row above 
	let prev=rowToMove.previousSibling;
	console.log("prev: ", prev)
	//set variable to parent of row which is actually table body
	let par=rowToMove.parentNode
	console.log("par: ", par)
	// delete row to move
	par.removeChild(rowToMove)
	// insert row to move above prev row
	par.insertBefore(rowToMove, prev)

	
}

function moveRowsDown (buttClick) {
	//buttClick is move button element
	console.log("buttClick: ", buttClick)
	//set variable on row that buttClick is on 
	let rowToMove=buttClick.parentElement.parentElement 
	console.log("rowMove: ", rowToMove)
	//set variable to row above 
	let next=rowToMove.nextSibling.nextSibling;
	console.log("next: ", next)
	//set variable to parent of row which is actually table body
	let par=rowToMove.parentNode
	console.log("par: ", par)
	// delete row to move
	par.removeChild(rowToMove)
	// insert row to move above prev row
	par.insertBefore(rowToMove, next)

	
}
function createInput (thisx,selectedIndex) {
	// don't think this is used
	let optionSelect=thisx[selectedIndex].id
	console.log(thisx[selectedIndex].id);
	// console.log(selectedIndex,id);
	// if(optionSelect==="saveOption"){
	// 	let inputElement = document.createElement('input');
	// 	inputGroupSelect04.parentElement.replaceChild(inputElement,inputGroupSelect04);
	// }
	
}


