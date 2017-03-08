(function(){

		$('.thumb').on('click', function(){
			$.getJSON('includes/ajaxQuery.php',{model:this.id}, function(data){
				//console.log(data);

				$('.modelName').text(data.modelName);
				$('.priceInfo').text('$'+data.pricing);
				$('.modelDetails').text(data.modelDetails); 
			});
		});
})();