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
    	minLength: 3,
      source: function( request, response ) {
          var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
          response( $.grep( nameSource, function( item ){
              return matcher.test( item );
          }) );
      }
    });

    $(function () { 
    
var myChart = Highcharts.chart('.charts', {

    chart: {
        polar: true,
        type: 'line'
    },

    title: {
        text: 'Budget vs spending',
        x: -80
    },

    pane: {
        size: '80%'
    },

    xAxis: {
        categories: ['Sales', 'Marketing', 'Development', 'Customer Support',
                'Information Technology', 'Administration'],
        tickmarkPlacement: 'on',
        lineWidth: 0
    },

    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
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
        name: 'Allocated Budget',
        data: [43000, 19000, 60000, 35000, 17000, 10000],
        pointPlacement: 'on'
    }, {
        name: 'Actual Spending',
        data: [50000, 39000, 42000, 31000, 26000, 14000],
        pointPlacement: 'on'
    }]

});
});

});