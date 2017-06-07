$(document).ready(function(){
	$('#start-btn').click(()=>{
		function complete(){
		// $('.second-section').css('visibility','visible');
		$('.second-section').fadeIn(1000);			
		}
		$('.first-section').fadeOut(1000,complete);					
		$('#wrapper_bgndVideo').css('filter','blur(10px)');
	});
});