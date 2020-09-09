
let rowCount=1;
let saveObject={};
let saveArray=[];


function myCreateFunction() {	

	let bhaTable=document.getElementById('BHAentry');
	let toolRow=document.getElementById('dataRow');
	let newRow =toolRow.cloneNode(true);
	newRow.id=newRow.id+rowCount;

// loop through newRow entries and change id based on original id + rowcount
	for(i=0;i<3;i++){
		newRow.children[i].id=(newRow.children[i].id+rowCount)
		let newId=
		console.log(newRow.children[i].id);

	}
// have to do child of child for cells with input boxes
	for(i=3;i<7;i++){
		newRow.children[i].children[0].id=(newRow.children[i].children[0].id+rowCount)
	// console.log(newRow.children[0].id+rowCount);
		console.log(newRow.children[i].children[0].id);
	}
// append new row to table & increase row count 
	tabBody.appendChild(newRow);
	rowCount++;
//set new row id
	
// change row # text based on increased row count
	console.log(newRow.children[0]);
	newRow.children[0].textContent=rowCount;
	newRow.children[0].setAttribute("data-value",rowCount);
	console.log(newRow.children[0].dataset.value);
}

function myDeleteFunction(row) {	
	if(rowCount<2){
		alert("Cannot delete final row");
	} else if (rowCount>1) {
		console.log(row.parentElement.parentElement);
		row.parentElement.parentElement.remove();
		rowCount--;
		console.log(rowCount);
	}
}

function mySaveFunction (prop) {
	saveArray=[];

	for(j=0;j<rowCount;j++) {

		let saveRow=(tabBody.children[j])
		// console.log(saveRow);
		
		for(k=0;k<7;k++) {
			let prop=headers.children[k].textContent;
			let val=saveRow.children[k].dataset.value;
			// console.log("prop",prop);
			// console.log("val",val);
			
			Object.defineProperty(saveObject,prop,{value: val, enumerable: true})
		}
		console.log(saveObject);
		let saveJSON = JSON.stringify(saveObject);
		console.log(saveJSON);
		
		saveArray.push(saveJSON);
		saveObject={};
	}
	console.log(saveArray);	
}




function DD (selectIndex) {
	//can also pass id to make it usable by other DD
	console.log(selectIndex);
	// console.log(typeDD[selectIndex].text);
	typeTd.value=typeSelect[selectIndex].text;
	console.log(typeTd.dataset.value);
	// console.log(documentGetElementById(typeDD).options(selectIndex).text);
}


function input (valuex,idx) {
	console.log(valuex,idx);
	let parentVal=document.getElementById(idx).parentElement;
	parentVal.dataset.value=valuex;
	console.log(parentVal.dataset.value);


}

