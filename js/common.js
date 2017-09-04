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
			
			let lineClick = document.getElementById(lines[i].id),
				clickedLineObject = {};
					
				lineClick.addEventListener('click', function(event) {
				
				let eventLineId = event.target.parentNode.attributes[0].value,
					eventLineName = event.target.textContent,
					eventLineNumber = event.target.parentNode.attributes[1].value,
						elCloseParent = document.querySelector('#listStation'),
			  			elCloseChild = elCloseParent.childNodes,
			  			elCloseSelectedParent = document.querySelector('#listSelectStation'),
			  			elCloseSelectedChild = elCloseSelectedParent.childNodes,
			  			elCloseLineParent = document.querySelector("#scheme-layer-labels"),
			  			elCloseLineChild = elCloseLineParent.childNodes;
			  			

				lineClick.classList.add("selected");

				eventLineId = eventLineId;

				if(!eventLineName) {
					return false;
				}

				clickedLineObject.id = eventLineId;
				clickedLineObject.name = eventLineName;
				clickedLineObject.line = eventLineNumber;

				for(let i=0;i<clickedLineArray.length; i++) {
					if(clickedLineObject.id == clickedLineArray[i]['id']) {
						for(let j=0; j<elCloseLineChild.length; j++) {
			  				if(j%2) {
			  				
			  					let elCloseLineId = elCloseLineChild[j].id;
								
								if(elCloseLineId == eventLineId)	{
									elCloseLineChild[j].removeAttribute("class");
									
								}		  				
			  				}
			  				
			  			}
			  			clickedLineArray.splice(i,1);
			  			for(k=0; k<elCloseChild.length; k++) {
			  				if(elCloseChild[k].getAttribute('data-stationLiId') == eventLineId) {
			  					elCloseChild[k].remove();
			  				}
			  				
			  			}
			  			
			  			
						return false;
					}					
				}

				// Delete from selectedArray when click on map
					for(let i=0;i<selectedLineArray.length; i++) {
					if(clickedLineObject.id == selectedLineArray[i]['id']) {
						for(let j=0; j<elCloseLineChild.length; j++) {
			  				if(j%2) {
			  				
			  					let elCloseLineId = elCloseLineChild[j].id;
								
								if(elCloseLineId == eventLineId)	{
									elCloseLineChild[j].removeAttribute("class");
									
								}		  				
			  				}
			  				
			  			}
			  			selectedLineArray.splice(i,1);
			  			for(k=0; k<elCloseSelectedChild.length; k++) {

			  				if(elCloseSelectedChild[k].getAttribute('data-stationLiId') == eventLineId) {
			  					elCloseSelectedChild[k].remove();
			  				}
			  				
			  			}
			  			
			  			
						return false;
					}					
				}	

				clickedLineArray.push(clickedLineObject);
				//console.log(clickedLineArray);


				// function for insert unique data for array
				function uniqueVal(value, index, self) { 
    				return self.indexOf(value) === index;
				}
				clickedLineArray.filter( uniqueVal);


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
			       	nameList = "<li data-stationLiId='"+clickedLineArrayShowed[i]['id'] +"'><span class='iconStation' style='background-color:"+colorLine+"'></span>" 
			       				+ clickedLineArrayShowed[i]['name'] + "<span class='clearStation' data-stationId='"+clickedLineArrayShowed[i]['id'] +"'>&times;</span></li>";
			       	document.getElementById("listStation").innerHTML += nameList;
			       	
			       	if(nameList) {
			       		clearAll.style.display = "block";
			       	}
		
			  	}	
			  	//elCloseParent.removeChild();
									  	

			  	// Delete clicked line
				let elClose = document.querySelectorAll('.clearStation');    
			  	for(i=0; i<elClose.length; i++) {
				
			  		elClose[i].addEventListener('click', function(event) {
			  			let elCloseId = event.target.dataset.stationid,
			  				elCloseParent = document.querySelector('#listStation'),
			  				elCloseChild = elCloseParent.childNodes,
			  				elCloseLineParent = document.querySelector("#scheme-layer-labels");
			  				elCloseLineChild = elCloseLineParent.childNodes;
			
			  			for(let i=0; i<elCloseLineChild.length; i++) {
			  				if(i%2) {
			  				
			  					let elCloseLineId = elCloseLineChild[i].id;
								
								if(elCloseLineId == elCloseId)	{
								
									elCloseLineChild[i].removeAttribute("class");
								}		  				
			  				}
			  				
			  			}

			  			for(let i=0; i<elCloseChild.length;i++) {
			  				if(elCloseChild[i].attributes[0].value == elCloseId)
			  				elCloseParent.removeChild(elCloseChild[i]);
			  			}
			  				
			  			//elCloseParent.removeChild();
			  			for(i=0;i<clickedLineArray.length; i++) {
						
			  				if(clickedLineArray[i].id == elCloseId) {
						        clickedLineArray.splice(i,1);
						    }
			  			
			  			}
			  			
			  		})
			  	
			  	} // End cycle for delete clicked line	

				 	
			}); // End EventListener LineClick

		} // End if % 2


	} // End cycle FOR lines.length 

// When select name line color to red all label

let select = document.querySelector('#line-name'),

	selectedLineArrayShowed = [],
	selectedLineArray = [];


select.addEventListener('change', function(event) {
	let selectedNumberLine = event.target.value,
		selectedNameLine = event.target.selectedOptions["0"].text,
		lineArea = document.querySelectorAll("#scheme-layer-labels g");

	for(let i=0; i<select.length; i++) {
		select[0].removeAttribute('selected');
	}

	for(let j=0; j<lineArea.length; j++) {
		let dataLine = lineArea[j].attributes[1].value,
			lineName = lineArea[j].childNodes[2].nextSibling.innerHTML;
			lineId = lineArea[j].id;

		let	selectedLineObject = {};
		if(selectedNumberLine == dataLine) {
			// Decorate color selected line
			lineArea[j].classList.add("selected");

			selectedLineObject.id = lineId;
			selectedLineObject.name = lineName;
			selectedLineObject.line = dataLine;

			for(let i=0; i<selectedLineArray.length; i++) {
				if(selectedLineArray[i]['id'] === selectedLineObject.id) {
					selectedLineArray.splice(i,1);			
				}
			}
			selectedLineArray.push(selectedLineObject);
			// Push into array selected object
			
			// function for insert unique data for array
			function uniqueVal(value, index, self) { 
    			return self.indexOf(value) === index;
			}
			selectedLineArray.filter(uniqueVal);
			


			for(let i=0; i<clickedLineArray.length; i++) {
				for(let k=0; k<selectedLineArray.length; k++) {
					if(clickedLineArray[i]['id'] === selectedLineArray[k]['id']) {
						selectedLineArray.splice(k,1);
					}

				}

			}	

				selectedLineArrayShowed = selectedLineArray;

				// функция для сортировки в прямом порядке (по возрастанию)
				function compareObjects (a, b) {
  				if (a.line > b.line) return 1;
  				if (a.line < b.line) return -1;
  				return 0;
				};		
				selectedLineArrayShowed.sort(compareObjects);
				
				
		
				// add selected station in ul list
				document.getElementById("listSelectStation").innerHTML = "";
				
				for (let i = 0; i < selectedLineArrayShowed.length; i++)
			  	{
			  		// checked line number to create background color for li
			  		let colorLine = "";
			  		switch(selectedLineArray[i]['line']) {
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
			       	nameList = "<li data-stationLiId='"+selectedLineArrayShowed[i]['id'] +"'><span class='iconStation' style='background-color:"+colorLine+"'></span>" 
			       				+ selectedLineArrayShowed[i]['name'] + "<span class='clearStation' data-stationId='"+selectedLineArrayShowed[i]['id'] +"'>&times;</span></li>";
			       	document.getElementById("listSelectStation").innerHTML += nameList;
			       	
			       	if(nameList) {
			       		clearAll.style.display = "block";
			       	}
		
			  	}	
				// Delete clicked line
				let elClose = document.querySelectorAll('.clearStation');    
				for(i=0; i<elClose.length; i++) {
					elClose[i].addEventListener('click', function(event) {
						let elCloseId = event.target.dataset.stationid,
							elCloseParent = document.querySelector('#listSelectStation'),
							elCloseChild = elCloseParent.childNodes,
							elCloseLineParent = document.querySelector("#scheme-layer-labels");
							elCloseLineChild = elCloseLineParent.childNodes;
												
							for(let i=0; i<elCloseLineChild.length; i++) {
								if(i%2) {
									let elCloseLineId = elCloseLineChild[i].id;
										if(elCloseLineId == elCloseId)	{
											elCloseLineChild[i].removeAttribute("class");
										}		  				
								}
							}

							for(let i=0; i<elCloseChild.length;i++) {
								if(elCloseChild[i].attributes[0].value == elCloseId)
									elCloseParent.removeChild(elCloseChild[i]);
								}
									  				
							//elCloseParent.removeChild();
							for(i=0;i<selectedLineArray.length; i++) {
								if(selectedLineArray[i].id == elCloseId) {
									 selectedLineArray.splice(i,1);
								}
									  			
							}

						})
									  	
					} // End cycle for delete clicked line				  	
		}
	}	
});

// Refresh selected option.
let selectChild = select.childNodes;
select.addEventListener('blur', function(event) {
	for(let i=0; i<select.length; i++) {
		select[0].setAttribute('selected', 'selected');
	}
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
	selectedLineArray = [];
	selectedLineArrayShowed = [];
	document.getElementById("listStation").innerHTML = "";
	document.getElementById("listSelectStation").innerHTML = "";

});

// Get JSON from file
// Search input method
let search = document.querySelector('.search__data');
search.addEventListener('keyup', function(event) {
	let inputValue = event.target.value;
	const xmlhttp = new XMLHttpRequest();
	let url = "stations.json";
	console.log(1);
	if(inputValue.length <= 3) {
		document.querySelector('#searchList').style.display = "none";
	}

	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        var searchArr = JSON.parse(this.responseText);
	        searchStation(searchArr);
	    }
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();


	function searchStation(searchArr) {
    let liSearch = "",
    	ulSearch = "";


    for(let i = 0; i < searchArr.length; i++) {
    		ulSearch = document.querySelector('#searchList');		
    		
    	if(inputValue.length > 3) {
    		ulSearch.style.display = "block";
    		if (searchArr[i].name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) {
	    		liSearch += '<li id="' + searchArr[i].id + '" data-line="'+searchArr[i].line+'">' + 
	        	searchArr[i].name + '</li>';
	        	
	    		ulSearch.innerHTML = liSearch;

	    		// Event for check search Li and add to array
				// let findedList = document.querySelector('#searchList'),
				let findedChild = ulSearch.childNodes;
				for(let k=0; k<findedChild.length; k++) {
					findedChild[k].addEventListener('click', function(event) {
						let lineArea = document.querySelector('#scheme-layer-labels'),
							clickedLineObject = {},
							lines = lineArea.childNodes;
						for(j=0; j<lines.length; j++) {
							if(j%2) {
								if(lines[j].id === findedChild[k].id) {
									lines[j].classList.add("selected");

									clickedLineObject.id = lines[j].id;
									clickedLineObject.name = lines[j].childNodes[3].innerHTML;
									clickedLineObject.line = lines[j].attributes[1].value;

									clickedLineArray.push(clickedLineObject);

										// function for insert unique data for array
										function uniqueVal(value, index, self) { 
						    				return self.indexOf(value) === index;
										}
										clickedLineArray.filter( uniqueVal);
									
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
									       	nameList = "<li data-stationLiId='"+clickedLineArrayShowed[i]['id'] +"'><span class='iconStation' style='background-color:"+colorLine+"'></span>" 
									       				+ clickedLineArrayShowed[i]['name'] + "<span class='clearStation' data-stationId='"+clickedLineArrayShowed[i]['id'] +"'>&times;</span></li>";
									       	document.getElementById("listStation").innerHTML += nameList;
									       	
									       	if(nameList) {
									       		clearAll.style.display = "block";
									       	}


								
									  	}	
									  	// Delete clicked line
										let elClose = document.querySelectorAll('.clearStation');    
									  	for(i=0; i<elClose.length; i++) {
										
									  		elClose[i].addEventListener('click', function(event) {
									  			let elCloseId = event.target.dataset.stationid,
									  				elCloseParent = document.querySelector('#listStation'),
									  				elCloseChild = elCloseParent.childNodes,
									  				elCloseLineParent = document.querySelector("#scheme-layer-labels");
									  				elCloseLineChild = elCloseLineParent.childNodes;
									
									  			for(let i=0; i<elCloseLineChild.length; i++) {
									  				if(i%2) {
									  				
									  					let elCloseLineId = elCloseLineChild[i].id;
														
														if(elCloseLineId == elCloseId)	{
														
															elCloseLineChild[i].removeAttribute("class");
														}		  				
									  				}
									  				
									  			}

									  			for(let i=0; i<elCloseChild.length;i++) {
									  				if(elCloseChild[i].attributes[0].value == elCloseId)
									  				elCloseParent.removeChild(elCloseChild[i]);
									  			}
									  				
									  			//elCloseParent.removeChild();
									  			for(i=0;i<clickedLineArray.length; i++) {
												
									  				if(clickedLineArray[i].id == elCloseId) {
												        clickedLineArray.splice(i,1);
												    }
									  			
									  			}
									  			
									  		})
									  	
									  	} // End cycle for delete clicked line	

								}
							}
						}
						document.querySelector('#searchList').style.display = "none";
						inputValue = "";
					})

				}
    		} 	    
    	}
   
	}
}

});

// Event for clear ul block
search.addEventListener('click', function() {
	document.querySelector('#searchList').style.display = "none";
});


// Send JSON Array
let clickSend = document.querySelector('.btn__send');
clickSend.addEventListener('click', function() {

let selectedLinesData = [];

selectedLinesData.push(clickedLineArray);
selectedLinesData.push(selectedLineArray);
selectedLinesData.concat(selectedLinesData);

 fetch('http://metro.sem-dev.co.ua/', {
  method: 'post',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(selectedLinesData)})
  .then(res=>res.json())
});