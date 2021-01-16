

let rowCount=1;

let saveObject={};
let saveArray=[];
let saveJSON={1:1};
let myJSON="";
let loadData={};
let selectIndex="";

// fetch('http://localhost:3000/')
// .then(response => response.json())
// .then(data => console.log(data))

function DD (selectIndex, selectId) {
// this is the row where the DD change made	
console.log("selectId: ", selectId);
console.log("selectIndex: ", selectIndex);
	let selectRow=(document.getElementById(selectId));
	console.log(selectRow);
//this is the DD value selected
	let selectOption=selectRow.children[selectIndex];	
	console.log("selected option: ",selectOption);
	console.log(selectRow.value);
	
	selectRow.parentElement.setAttribute('value',selectOption.value);
	selectRow.selectedIndex=selectIndex;
	console.log(selectRow.selectedIndex);
	console.log(selectRow.parentElement);
}


function input (valuex,idx) {
//logs value and id of cell that is changed
	console.log(valuex,idx);
	
	let cell = document.getElementById(idx).parentElement;
	console.log(cell);
	console.log(cell.getAttribute("value"));
	//sets parent of entered value to the value entered
	cell.setAttribute("value", valuex)
	console.log(cell);
}

function addRow() {	

	let bhaTable=document.getElementById('BHAentry');
	let toolRow=document.getElementById('dataRow');
	let newRow =toolRow.cloneNode(true);
	newRow.id=newRow.id+rowCount;
	// newRow.setAttribute("value",rowCount);
	console.log(newRow);
	let newRowCols = newRow.children

// loop through newRow entries and change id based on original id + rowcount
	for(i=0;i<1;i++){
		newRowCols[i].id=newRowCols[i].id+(rowCount+1);
		// console.log(newRowCols[i].id);
		// console.log(newRow.children[i].children[0])
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

	
// change row # text and value based on increased row count
	// console.log(newRow.children[0]);
	newRow.children[0].textContent=rowCount;
	newRow.children[0].setAttribute("value",rowCount);
	// console.log(newRow.children[0].dataset.value);
}

function myDeleteFunction(rowDelButt) {	
	// console.log("row: ",rowDelButt);
	// console.log("row count del func start: ", rowCount)
	if(rowCount<2){
		alert("Cannot delete final row");
	} else if (rowCount>1) {
		// console.log(rowDelButt.parentElement.parentElement);
		rowDelButt.parentElement.parentElement.remove();
		rowCount--;
		// console.log("row count del func end: ",rowCount);
	}
}

function mySaveFunction () {
	deleteRows();
	saveArray=[];

	for(j=0;j<rowCount;j++) {
	//set save row for each step of loop from 0 to rowCount
		let saveRow=(tabBody.children[j])
		// console.log(saveRow);
		
		for(k=0;k<7;k++) {
			//get property from row headers
			let prop=headers.children[k].textContent;
			// console.log("saveRow.children[k]: ",saveRow.children[k])
			let val=saveRow.children[k].getAttribute("value");
			// console.log("prop",prop);
			// console.log("val",val);
			
			Object.defineProperty(saveObject,prop,{value: val, enumerable: true, configurable: true});
			
		}
		// console.log("save Object: ", saveObject)
		myJSON=JSON.stringify(saveObject);
		
		// JSON.parse(saveObject);
		// console.log("myJSON: ", myJSON)

		saveArray.push(saveObject);

		saveObject={};

	}
	
	console.log("SaveArray",saveArray);

	fetcher(saveArray);
}


function fetcher (saveArray) {
	console.log("rowCount: ",rowCount);

//do the loop here
	for(i=0;i<rowCount;i++){
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
		  		console.log('Success:', json);
			})
			.catch((error) => {
		  		console.error('Error:', error);
			});
	}


}


function myLoadFunction () {
	
	fetch ('http://localhost:3000/')
			.then(response => response.json())
			.then(json => {
		  		console.log('Success GET:', json);
		  		// loadData=json;
		  		// console.log("loadData:",loadData);
		  		deleteOldRows();

		  		returnData(json);
			})
			.catch((error) => {
		  		console.error('Error:', error);
			});
	

}


function deleteOldRows () {
let startRowCount=rowCount;
	for(l=startRowCount-1;l>0;l--){
		let delId = ("delButt"+l);
		// console.log(delId)
		let rowDelButt=document.getElementById(delId);
		// console.log("rowDelButt: ", rowDelButt);
		// console.log("rowCount: ", rowCount);
		// console.log("l: ", l)
		myDeleteFunction(rowDelButt)
	}
}

function returnData (json) {
	loadData=json;
	console.log("loadData: ",loadData);	
	let loadRows =	loadData.length;
	console.log("loadData length: ",loadRows);
	
	for(j=1;j<loadRows;j++) {
		addRow();
		
	}

	for(k=0;k<loadRows;k++) {
		let selectId =tabBody.children[k].children[1].children[0];
		console.log("selectId: ", selectId);
		let selectedType=loadData[k].Type;
		console.log("selectedType: ", selectedType);
		switchFunc (selectedType);
		console.log("selected index: ", selectIndex);
		DD(selectIndex, selectId.id)
		//need to get order of selectedIndex, do a switch? 
	}

// onclick="DD(this.selectedIndex, this.id)"
}

function switchFunc (selectedType) {

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

		case "Motor_RSS":
		selectIndex=4;
		break;

		case "Sub_XO":
		selectIndex=5;





	}
}
	

	
function deleteRows () {
	fetch ('http://localhost:3000/'
		, {
		method: 'DELETE',
	})
	.then(response => console.log(response));

	// mySaveFunction();
}


