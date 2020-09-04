
let rowCount=1;

function myCreateFunction() {	

	let bhaTable=document.getElementById('BHAentry');
	let toolRow=document.getElementById('dataRow');
	let newRow =toolRow.cloneNode(true);

	bhaTable.appendChild(newRow);
	rowCount++
	console.log(rowCount);
	let newNumCol=dataRow[rowCount-1].children[0]
	newNumCol.textContent=rowCount;
	console.log(newNumCol);
}

function myDeleteFunction(row) {	
	if(rowCount<2){
		alert("Can delete final row");
	} else if (rowCount>1) {
		console.log(row.parentElement.parentElement);
		row.parentElement.parentElement.remove();
		rowCount--;
		console.log(rowCount);
	}
}