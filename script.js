
let rowCount=1;
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
// change row # text based on increased row count
	newRow.children[0].textContent=rowCount;
	
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

function mySaveFunction () {
	for(j=0;j<3;j++) {
		let saveRow=(tabBody.children[j])
		console.log(saveRow);
		for(k=0;k<7;k++) {
			console.log(saveRow.children[k].textContent)
			// saveArray.push(saveRow.children[k].value);
		}
	}

// console.log(saveArray);
}

function DD (text) {
	console.log(text);
}