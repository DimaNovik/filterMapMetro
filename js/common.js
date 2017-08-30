// ------------ Open modal window
let modal = document.querySelector('.modal'),
	btn = document.querySelector('.modal-btn__open'),
	btn__close = document.querySelector('.close');

btn.addEventListener('click', function() {
	modal.style.display = "block";
})

btn__close.addEventListener('click', function() {
	modal.style.display = "none";
})

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// ------------ End work with modal window

// ------------ Start work with map


// Checked line to red from Select
let lineArea = document.querySelector('#scheme-layer-labels'),
	lines = lineArea.childNodes,
	clickedLineArrayShowed = [],
	clickedLineArray = [],
	elClose = [],
	clearAll =  document.querySelector('.clearAll');

	

	for(let i=0; i<lines.length; i++) {
		if(i % 2) {
			let lineClick = document.querySelector('#'+lines[i].id),
				clickedLineObject = {};
				lineClick.addEventListener('click', function(event) {
		
				let eventLineId = event.path[1].id,
					eventLineName = event.target.textContent,
					eventLineNumber = event.path[1].attributes[1].value;

				lineClick.classList.add("selected");

				eventLineId = eventLineId.split('-');

				clickedLineObject.id = eventLineId[1];
				clickedLineObject.name = eventLineName;
				clickedLineObject.line = eventLineNumber;

				for(let i=0;i<clickedLineArray.length; i++) {
					if(clickedLineObject.id == clickedLineArray[i]['id']) {
						return false;
					}
					
				}
				clickedLineArray.push(clickedLineObject);
				//console.log(clickedLineArray);



				function uniqueVal(value, index, self) { 
    				return self.indexOf(value) === index;
				}
				clickedLineArray.filter( uniqueVal); // ["кришна", "харе", "8-()"]
			
				clickedLineArrayShowed = clickedLineArray;

				// функция для сортировки в прямом порядке (по возрастанию)
				function compareObjects (a, b) {
  				if (a.line > b.line) return 1;
  				if (a.line < b.line) return -1;
  				return 0;
				};		
				clickedLineArrayShowed.sort(compareObjects);
				
				
		
				// add selected station in ul list
				document.getElementById("listStation").innerHTML = "";
				elClose = [];
				for (let i = 0; i < clickedLineArrayShowed.length; i++)
			  	{
			  		// checked line number to create background color for li
			  		let colorLine = "";
			  		switch(clickedLineArray[i]['line']) {
			  			case "1": 
			  				colorLine = "rgb(239, 30, 37)";
			  				break;
			  			case "2": 
			  				colorLine = "rgb(1, 158, 224)";
			  				break;
			  			case "3": 
			  				colorLine = "rgb(2, 154, 85)";
			  				break;
			  			case "4": 
			  				colorLine = "rgb(251, 170, 51)";
			  				break;
			  			case "5": 
			  				colorLine = "rgb(182, 29, 142)";
			  				break;

			  		} 
			       	nameList = "<li><span class='iconStation' style='background-color:"+colorLine+"'></span>" 
			       				+ clickedLineArrayShowed[i]['name'] + "<span class='clearStation' data-stationId='"+clickedLineArrayShowed[i]['id'] +"'>&times;</span></li>";
			       	document.getElementById("listStation").innerHTML += nameList;
			       	
			       	if(nameList) {
			       		clearAll.style.display = "block";
			       	}

			        elClose.push(document.querySelector("span[data-stationId='"+clickedLineArrayShowed[i]['id'] +"']"));
					
				
					
					
			  	}	

			  	for(i=0; i<elClose.length; i++) {

			  		elClose[i].addEventListener('click', function(event) {
			  			
			  		})
			  	
			  	}	


						 	
			});

		}


	}





// When select name line color to red all label

let select = document.querySelector('#line-name'),
	selectedLineObject = {};

select.addEventListener('change', function(event) {
	let selectedNumberLine = event.target.value,
		selectedNameLine = event.target.selectedOptions["0"].text;


	for(let i=0; i<lines.length; i++) {
		if(i % 2) {
			let numberLine = lines[i].getAttribute("data-line");
			if (selectedNumberLine === numberLine) {
				lines[i].classList.add("selected");
				selectedLineObject.id = "";
				selectedLineObject.name = selectedNameLine;
				selectedLineObject.line = selectedNumberLine;
	
				clickedLineArray.push(selectedLineObject);
			
			
			}
		}
	}
	for (let k = 0; k < selectedLineArrayShowed.length; k++) {
		if (!selectedLineArrayShowed[k].id) {
			nameList = "<li><span class='iconStation'></span>" 
			       	+ selectedLineArrayShowed[k]['name'] + "<span class='clearStation'>&times;</span></li>";
			document.getElementById("listStation").innerHTML += nameList;
		}
		
	}
	//selectedLineArray = selectedLineArray;

})

// Event for clear all array station
clearAll.addEventListener('click', function() {
	let lineArea = document.querySelector('#scheme-layer-labels');
	lines = lineArea.childNodes;

	for(let i=0; i<lines.length; i++) {
		if(i%2) {
			lines[i].removeAttribute("class");
		}
		
	}
	clickedLineArray = [];
	clickedLineArrayShowed = [];
	document.getElementById("listStation").innerHTML = "";

})

console.log(clickedLineArray);


