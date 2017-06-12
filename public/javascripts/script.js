$(document).ready(function(){
	$('#start-btn').click(()=>{
		function complete(){
		$('.second-section').fadeIn(1000);
		$('.login-form-container').css('display','none');			
		}
		$('.first-section').fadeOut(1000,complete);					
		$('#wrapper_bgndVideo').css('filter','blur(10px)');
	});

    $('.log-in').click(()=> {
        function complete(){
		$('.second-section').fadeIn(1000);
		$('.sign-up-form-container').css('display','none');			
		}
		$('.first-section').fadeOut(1000,complete);					
		$('#wrapper_bgndVideo').css('filter','blur(10px)');
    });
    if(registered){
        $('#accountSetting').modal('show');    
    }
	var nameSource = availableTags.split(",");
	nameSource = nameSource.slice(0, -2);
    $("#search-input").focus(function(){
        $("#search-input").attr("value", "");
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


    $("#compare-search-input").focus(function(){
        console.log(nameSource);
        $("#compare-search-input").autocomplete({
            minLength: 2,
            source: function( request, response ) {
                var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
                response( $.grep( nameSource, function( item ){
                    return matcher.test( item );
                }) );
            }
        });
    });

    $("#compare-to").change(function () {
        if($(this).val() == "Another Player"){
            $('#compare-search-input').val(undefined);
            $('#compare-search-input').css('display', 'block');

        }else if($(this).val() == "League Best"){
            $('#compare-search-input').val('League Best');
            $('#compare-search-input').css('display', 'none')
        }else{
            $('#compare-search-input').val('League Average');
            $('#compare-search-input').css('display', 'none')
        }

        console.log($('#compare-to').val())
    });

    //console.log(typeof(PPGrank));

    $(".edit-btn").click(()=>{
        var oldUsername = user
        $(".username-form-container").html("");
        $(".username-form-container").html(`<form class='username-form' action='/changeUsername' method='post'><table class='table'><thead><tr><th class='text-center'> Your User Name </th><th class='text-center'> Action </th></tr></thead><tbody><td class="text-center"><input class="username-row" type="text" name="newUsername" value="${oldUsername}"></td><td class='text-center'><button class='btn btn-warning edit-btn'> Edit</button><button class='btn btn-primary type='submit'> Save</button></td></tbody></form>`);
        $(".username-row").focus(function(){
            $(".username-row").attr("value", "");
        });
    });
    $(".edit-btn").focusout(()=>{
        $(".username-row").attr("value", "");
        
    });
    $(".cancel-btn").click(()=>{
        $(".username-form-container").html("");
        $(".username-form-container").html(`<form class='username-form' action='/changeUsername' method='post'><table class='table'><thead><tr><th class='text-center'> Your User Name </th><th class='text-center'> Action </th></tr></thead><tbody><td class="username-row text-center">${user}</td><td class='text-center'><button class='btn btn-warning edit-btn'> Edit</button><button class='btn btn-primary type='submit'> Save</button></td></tbody></form>`);
    });
	
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
        name: compName,
        data: [parseFloat(compPPGrank),parseFloat(compASSrank), parseFloat(compTHREErank), parseFloat(compREBrank), parseFloat(compSTLrank), parseFloat(compMINrank)],
        pointPlacement: 'on'
    }]

});

});