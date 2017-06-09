$(document).ready(function(){
	$('#start-btn').click(()=>{
		function complete(){
		// $('.second-section').css('visibility','visible');
		$('.second-section').fadeIn(1000);			
		}
		$('.first-section').fadeOut(1000,complete);					
		$('#wrapper_bgndVideo').css('filter','blur(10px)');
	});
    console.log(availableTags);
	var nameSource = availableTags.split(",");
	nameSource = nameSource.slice(0, -2);
    $("#search-input").focus(function(){
        console.log(nameSource);
        $("#search-input").autocomplete({
    	    minLength: 2,
            source: function( request, response ) {
            var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
            response( $.grep( nameSource, function( item ){
              return matcher.test( item );
            }) );
            }
        });
    });

    console.log(typeof(PPGrank));
	
Highcharts.chart('charts', {

    chart: {
        polar: true,
        type: 'line'
    },

    title: {
        text: 'Player Ranking',
        x: -80
    },

    pane: {
        size: '80%'
    },

    xAxis: {
        categories: ['Points/Game', 'Assists/Game', '3 Point Made/Game', 'Rebounds/Game',
                'Steals/Game', 'Minutes/Game'],
        tickmarkPlacement: 'on',
        lineWidth: 0,
    },

    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0,
        max: 100,
        
    },

    tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
    },

    legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 70,
        layout: 'vertical'
    },

    series: [{
        name: fullName,
        data: [parseFloat(PPGrank),parseFloat(ASSrank), parseFloat(THREErank), parseFloat(REBrank), parseFloat(STLrank), parseFloat(MINrank)],
        pointPlacement: 'on'
    }, {
        name: 'Average',
        data: [50, 50, 50, 50, 50, 50],
        pointPlacement: 'on'
    }]

});

});