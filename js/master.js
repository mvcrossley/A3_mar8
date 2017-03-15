(function(){

	var selectedCar, saveButton = document.querySelector('.fa-download').parentNode; //ParentNode is the element's wrapper, whatever it is nested within
	var name = document.querySelector('.modelName'), 
		price = document.querySelector('.priceInfo'), 
		deets = document.querySelector('.modelDetails');
		
	function loadStuff(){
			if(window.localStorage.getItem('savedCar')){
				var data = window.localStorage.getItem('savedCar', selectedCar);
				data = JSON.parse(data);
				renderCarInfo(data);
			}
		}
	//expanded AJAX example. Ajax isn't its own language, just a method of using PHP. 
	$('.thumbInfo img').on('click', function(){

		//DO an AJAZ call:
		$.ajax({
			url: "includes/ajaxQuery.php", //Choosing what PHP file to target (and subsequently, what database)
			data: { model: this.id }, //Goes into PHP file, which goes into the database, retrieves the id of whatever you click
			type: "GET"
		})//Putting a semicolon here will break it! This is so we can chain together methods.

		.done(function(data){
			//console.log(data);

			if(data && data != "null"){ //Will not move forward if the object is Null
				selectedCar = data;

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

	});

	

	function renderCarInfo(car){ //Taking the JSON object and writing it out into the HTML pertaining to the specified classes
		var currentThumb = $('#'+car.model);

		var animIndex = parseInt(currentThumb.data('roundaboutindex'), 8);
		$('#cars').roundabout('animateToChild', animIndex);

		$('thumbInfo img').addClass('nonActive');
		$('#'+car.model).removeClass('nonActive');

		$('.subhead span').text(" mini cooper "+car.model);
		$('.modelName').text(car.modelName);
		$('.priceInfo').text(car.pricing);
		$('.modelDetails').text(car.modelDetails);
	}

	function saveData()
	{
		console.log("Clicked!")
		//debugger;
		if(window.localStorage){
			window.localStorage.setItem('savedCar', selectedCar);
		}

		//localStorage.setItem('carname', name.innerHTML);
		//localStorage.setItem('carprice', price.innerHTML);
		//localStorage.setItem('cardeets', deets.innerHTML);
	}

	saveButton.addEventListener('click', saveData, false);

	//----------------------------------------------------------------------------------------------JQUERY BELOW

	$(window).load(function(){ //Checking to see if the window is done loading. (All the content, not just the skelly)
		//Set up the roundabout container
		$('#cars').roundabout({
			childSelector: 'img',
			minOpacity: 0.8,
			minScale: 0.4,
			duration: 1200 //just over 1 sec
		});

		$('#cars').css('opacity', 1); //Instead of adding a class, just pass in a css property that you want to change

		loadStuff();

	}); 





})();