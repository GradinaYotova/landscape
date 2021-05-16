// API KEY NEEDED FOR THE WEATHER API
const apikey = '129d02865a55ac33f706341ff73aa1ca';

let timeline, titlebar, 			// REFERENCES TO THE TITLEBAR AND GRAPH OUTPUT
	locationfield, submitbutton,	// REFERENCES TO THE LOCATION INPUT AND SUBMIT BUTTON
		
	city = '',
	max_temp = 40,
	refresh_delay = 60000,
	remove_timeout, refresh_interval;

function displayResult( result ) {
	let temp = result.main.temp;

	let temp_output = document.querySelector( '#temp' );
	temp_output.innerHTML = temp + '&deg;C';

	let folder = 'content' + Math.floor( temp / 5 );
	let file = folder + '/' + Math.floor( Math.random( ) * 19 ) + '.jpeg';

	let img = document.createElement( 'img' );
    img.src = file;
    img.className = 'change-me';
    timeline.appendChild( img );

	//timeline.innerHTML += '<img class="change-me" src="' + file + '" />';
	console.log( temp + ' -> ' + folder + '/' + Math.floor( Math.random( ) * 19 ) + '.jpeg' );
	console.log( timeline.innerHTML );

	setTimeout( ( ) => {
		let img = timeline.querySelector( ':scope img:last-child' );
		img.classList.remove( 'change-me' );
	}, 100 );

	remove_timeout = setTimeout( ( ) => {
		let img = timeline.querySelector( ':scope img:first-child' );
		img.remove( );
	}, 2 * refresh_delay );
}

function clearResults( ) {
	console.log( 'clearResults' );

	let imgs = timeline.querySelectorAll( ':scope img' );
	imgs.forEach( ( img ) => { img.remove( ) } );

	clearTimeout( remove_timeout );
	clearInterval( refresh_interval );
}

function fetchApiData(city) {
	console.log( 'fetchApiData( ' + city + ')' );
	// fetch( 'http://api.openweathermap.org/data/2.5/weather'
	fetch( '//api.openweathermap.org/data/2.5/weather'
			+ '?q=' + city 
			+ '&units=metric'
			+ '&appid=' + apikey )
			
		.then( res => res.json( ) )
		.then( ( out ) => {
			//timeline.innerHTML='';

			displayResult( out );
		});	
}
	
function loadData( ) {
	// GET THE CURRENT FIELD DATA HERE
	let location = locationfield.value;
	location = location.trim();
	
	// CHECK IF IT'S NOT EMPTY
	if (location != '') {
		// clearResults( );
		//clearResults( );
		// IF NOT, LOAD THE WEATHER FORECAST
		city = location;
		// first time call the fetchApiData function
		fetchApiData(city);
		// multiple times cacll the fetchApiData function
		refresh_interval = setInterval(() => {
			fetchApiData(city);
		}, refresh_delay );
	}
}

function initSite( ) {
	// SELECT AND STORE THE TITLEBAR AND GRAHOUTPUT (TIMELINE)
	titlebar = document.querySelector( '#title' );
	timeline = document.querySelector( '#timeline' );
	// ADD FORM FIELD BEHAVIOUR HERE
	locationfield = document.querySelector('#title input[name="location"]');
	locationfield.addEventListener('keydown', function(event){
	if (event.keyCode == 13 ) loadData( );
	});

		locationfield.addEventListener( 'focus', function( event ) {
		this.value = '';
	} );

		locationfield.addEventListener( 'blur', function( event ) {
		this.value = city;
	} );

	locationfield.focus( );
	
	submitbutton = document.querySelector('#title input[type="submit"]');

}

window.onload = initSite;

$('#timeline').resizable({
    handles: {
        'ne': '#negrip',
        'se': '#segrip',
        'sw': '#swgrip',
        'nw': '#nwgrip',
        'n': '#ngrip',
        'e': '#egrip',
        's': '#sgrip',
        'w': '#wgrip'
    }
});