RECEIVE_URL='https://spreadsheets.google.com/feeds/list/1Ca9Grr_TcSyuU_i-s8rukzlRVMmyr8kwyDdLuDTBSQo/1/public/basic?alt=json';
SUBMIT_URL="";

$(document).ready(function() {

	$.ajax({
      url: RECEIVE_URL,
      success: function(data){
        console.log(data)
        readDataAndAppend(data);
      }
  })

};

	//this is SUBMITTING DATA to Google Spreadsheets
  //on submission of unicorn form, make an ajax call to send data to Google Spreadsheet
	$("#unicorn-form").submit(function(event){
    //prevent the default behaviour of the page to reload
		event.preventDefault();

    //gather all the data from the form into a serialized format
		var data = $(this).serialize();
		console.log(data)

    //make the ajax call 
		$.ajax({
    	url: SUBMIT_URL,
      type: "POST",
		  data: data
  	});
	})

})


function readDataAndAppend(data){
  var allUnicornData = [];
  var cells = data.feed.entry;
  
  for (var i = 0; i < cells.length; i++){
    var rowObj = {};
    rowObj.timestamp = cells[i].title.$t;
    var rowCols = cells[i].content.$t.split(',');
    for (var j = 0; j < rowCols.length; j++){
        var keyVal = rowCols[j].split(':');
        rowObj[keyVal[0].trim()] = keyVal[1].trim();
    }
    allUnicornData.push(rowObj);
  }
  console.log(allUnicornData)
}


    //code to parse through allUnicornData array and grab the data you need from key value pairs, and append it 
    for (var i = 0; i < rows.length; i++) {
    	//rename allUnicornData just to make sure I know what I am working with
    	var unicornObject = allUnicornData[i];

    	//access each object value through it's respective key, and turn into html strings using interpolation
    	var headerName = "<h3>" + unicornObject.name + "</h3>"
    	var colorText = "<p>" + unicornObject.color + "</p>"
    	var magicPowerText = "<p>" + unicornObject.magic + "</p>"

    	//add all the strings together into an html string that gets appended to a div that already exists on my HTML
    	$("#display-unicorns").append(headerName + colorText + magicPowerText)
    }
}






