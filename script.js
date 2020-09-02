
let rowCount=1;




function myCreateFunction() {
	
	let T=document.getElementById('BHAentry');
	let R=document.getElementById('dataRow');
	let C =R.cloneNode(true);

	T.appendChild(C);
	rowCount++
	dataRow[rowCount-1].children[0].textContent=rowCount;
		console.log(dataRow[rowCount-1].children[0])

	// let n=document.getElementById('dataRow'.children[0]);
	// console.log(n);


  // var table = document.getElementById("BHAentry");
  // var row = table.insertRow(-1);
  // var cell1 = row.insertCell(0);
  // var cell2 = row.insertCell(1);
  // cell1.innerHTML = "NEW CELL1";
  // cell2.innerHTML = "NEW CELL2";
}