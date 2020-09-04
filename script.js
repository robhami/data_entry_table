
let rowCount=1;

function myCreateFunction() {	
	let bhaTable=document.getElementById('BHAentry');
	let toolRow=document.getElementById('dataRow');
	let newRow =toolRow.cloneNode(true);

	bhaTable.appendChild(newRow);
	rowCount++
	let newNumCol=dataRow[rowCount-1].children[0]
	newNumCol.textContent=rowCount;
	console.log(newNumCol);
}

function myDeleteFunction(row) {	
	console.log(row.parentElement.parentElement);
	row.parentElement.parentElement.remove();
}