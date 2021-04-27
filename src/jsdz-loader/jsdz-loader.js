( function( element ) {
	if( window.jsdz === undefined ) {
		throw new Error( '\njsdz no se ha detectado.\nPara mas informacion visita: https://github.com/SergioAlarconFelipe/jsdz' );
	}
	
	function configLoader() {
		var loader = document.querySelector( 'div[ data-role = "loader" ]' );
		
		loader.visible = false;
		loader.hide = function( fade ) {
			if( fade === undefined ) {
				fade = loader.classList.contains( 'fade-effect' );
			}

			loader.dispatchEvent( window.jsdz.customEvent( 'beforeHide' ) );
			loader.visible = false;
			// loader.classList.remove( 'visible' );
			loader.style.opacity = 0;
			if( fade ) {
				setTimeout( function() {
					loader.style.display = 'none';
					loader.dispatchEvent( window.jsdz.customEvent( 'afterHide' ) );
				}, 250 );
			}
			else {
				loader.style.display = 'none';
				loader.dispatchEvent( window.jsdz.customEvent( 'afterHide' ) );
			}
		}
		loader.show = function( fade ) {
			if( fade === undefined ) {
				fade = loader.classList.contains( 'fade-effect' );
			}

			loader.dispatchEvent( window.jsdz.customEvent( 'beforeShow' ) );
			loader.style.display = 'block';
			if( fade ) {
				setTimeout( function() {
					// loader.classList.add( 'visible' );
					loader.style.opacity = 1;
					loader.visible = true;
					loader.dispatchEvent( window.jsdz.customEvent( 'afterShow' ) );
				}, 250 );
			}
			else {
				// loader.classList.add( 'visible' );
				loader.style.opacity = 1;
				loader.visible = true;
				loader.dispatchEvent( window.jsdz.customEvent( 'afterShow' ) );
			}
		}
		loader.toggle = function( fade ) {
			if( fade === undefined ) {
				fade = loader.classList.contains( 'fade-effect' );
			}

			if( loader.isVisible() ) {
				loader.hide( fade );
			}
			else {
				loader.show( fade );
			}
		}
		loader.isVisible = function() {
			// return loader.classList.contains( 'visible' );
			return loader.visible;
		}
		
		window.jsdz.loader = loader;
		
		loader.show( false );
		
		if( loader.dataset.autohide !== undefined ) {
			var time = parseInt( loader.dataset.autohide );
			loader.removeAttribute( 'data-autohide' );
			if( isNaN( time ) ) {
				time = 2500;
			}
			time -= 250;
			
			setTimeout( function() {
				loader.hide( true );
			}, time );
		}
	}
	
	if( document.readyState !== 'loading' ) {
		configLoader();
	} else {
		document.addEventListener( 'DOMContentLoaded', function() {	
			configLoader();
		} );
	}
} )();

/* */
document.addEventListener( 'DOMContentLoaded', function() {	
	document.querySelector( 'div[ data-role = "loader" ]' ).addEventListener( 'afterShow', function() {
		console.log( 'afterShow' );
	} )
	document.querySelector( 'div[ data-role = "loader" ]' ).addEventListener( 'afterHide', function() {
		console.log( 'afterHide' );
	} )
	document.querySelector( 'div[ data-role = "loader" ]' ).addEventListener( 'beforeHide', function() {
		console.log( 'beforeHide' );
	} )
	document.querySelector( 'div[ data-role = "loader" ]' ).addEventListener( 'beforeShow', function() {
		console.log( 'beforeShow' );
	} )
} );
/* */
