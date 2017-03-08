(function(){
	//expanded AJAX example. Ajax isn't its own language, just a method of using PHP. 
	$('.thumbInfo img').on('click', function(){
		//DO an AJAZ call:
		$.ajax({
			url: "includes/ajaxQuery.php", //Choosing what PHP file to target (and subsequently, what database)
			data: { model: this.id }, //Goes into PHP file, which goes into the database, retrieves the id of whatever you click
			type: "GET"
		})//Putting a semicolon here will break it! This is so we can chain together methods.

		.done(function(data){
			console.log(data);

			if(data){
				data = JSON.parse(data); //Using JSON to take the data retrieved, and parsing it into an object
				renderCarInfo(data); //Calling to the function that will write out the object
			}else{
				console.log("IT BROKE YA DING DONG");
			}
		})//again, no semicolon.

		.fail(function(ajaxCall, status, error){
			console.log("AJAX has failed: ",status,", ",error); //Set a breakpoint here to get more specific error messages
			console.dir(ajaxCall); //Outputs the ajax call as an object.
		});//terminate the ajax function

		function renderCarInfo(car){ //Taking the JSON object and writing it out into the HTML pertaining to the specified classes
			$('thumbInfo img').addClass('nonActive');
			$('#'+car.model).removeClass('nonActive');

			$('.subhead span').text(" mini cooper "+car.model);
			$('.modelName').text(car.modelName);
			$('.priceInfo').text(car.pricing);
			$('.modelDetails').text(car.modelDetails);
		}
	});
})();