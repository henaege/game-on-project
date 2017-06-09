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
	nameSource = nameSource.slice(0, -2);
	// console.log(nameSource);
    $( "#search-input" ).autocomplete({
    	minLength: 2,
      source: function( request, response ) {
          var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
          response( $.grep( nameSource, function( item ){
              return matcher.test( item );
          }) );
      }
    });

	
Highcharts.chart('charts', {

    chart: {
        polar: true,
        type: 'line'
    },

    title: {
        text: 'Player Percentiles',
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
        name: 'step curry',
        data: [24.4, 6.4, 0.4, 4.3, 1.8, 32.2],
        pointPlacement: 'on'
    }, {
        name: 'Average',
        data: [7.3, 1.6, 0.7, 3, 0.5, 17],
        pointPlacement: 'on'
    }]

});

});