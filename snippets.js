


$(document).ready(function(){								//create a jQuery document and start function
															//as soon as it is ready

});




$('article').append("<p>New paragraph</p>");				//select the element and append a new element









var para = document.createElement("P");                    	// Create a <p> node
var t = document.createTextNode("New paragraph.");      	// Create a text node
para.appendChild(t);                                        // Append the text to <p>
document.getElementById("myDIV").appendChild(para);         // Append <p> to <div> with id="myDIV"
