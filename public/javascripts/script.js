$(document).ready(function(){
	$('#start-btn').click(()=>{
		function complete(){
		// $('.second-section').css('visibility','visible');
		$('.second-section').fadeIn(1000);			
		}
		$('.first-section').fadeOut(1000,complete);					
		$('#wrapper_bgndVideo').css('filter','blur(10px)');
	});
	var nameSource = availableTags.split(",");
	console.log(nameSource);
    $( "#search-input" ).autocomplete({
    	minLength: 3,
      source: function( request, response ) {
          var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
          response( $.grep( nameSource, function( item ){
              return matcher.test( item );
          }) );
      }
    });
});