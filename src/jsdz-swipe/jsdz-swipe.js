( function( element ) {
	if( window.jsdz === undefined ) {
		throw new Error( '\njsdz no se ha defectado.\nPara masinformacion visita: https://github.com/SergioAlarconFelipe/jsdz' );
	}

	element.addEventListener( 'touchstart', start, false );
	element.addEventListener( 'touchmove', move, false ); 
	element.addEventListener( 'touchend', end, false );

	element.addEventListener( 'mousedown', start, false );
	element.addEventListener( 'mousemove', move, false );
	element.addEventListener( 'mouseup', end, false );

	var pxSensibilityX = 100;
	var pxSensibilityY = 50;
	var touching = false;
	var direction = 'none';
	var touchX = false;
	var cE = null;

	function start( event ) {
		if( event.changedTouches !== undefined ) {
		    event.x = event.changedTouches[ 0 ].clientX;
		    event.y = event.changedTouches[ 0 ].clientY;
		}

		touching = true;
		touchX = event.x;
		touchY = event.y;
	}
	function end( event ) {
		if( event.changedTouches !== undefined ) {
		    event.x = event.changedTouches[ 0 ].clientX;
		    event.y = event.changedTouches[ 0 ].clientY;
		}

		touching = false;
		direction = 'none';
	}
	function move( event ) {
		if( touching ) {
		    if( event.changedTouches !== undefined ) {
				event.x = event.changedTouches[ 0 ].clientX;
				event.y = event.changedTouches[ 0 ].clientY;
		    }

			if( direction === 'none' ) {
				if( event.x > touchX ) {
					direction = 'right';
				}
				else if( event.x < touchX ) {
					direction = 'left';
				}
			}

			if( direction === 'right' && event.x < touchX ) {
				touching = false;
				direction = 'none';
			}
			else if( direction === 'left' && event.x > touchX ) {
				touching = false;
				direction = 'none';
			}
			
			if( event.y < touchY - pxSensibilityY ) {
				touching = false;
				direction = 'none';
			}
			else if( event.y > touchY + pxSensibilityY ) {
				touching = false;
				direction = 'none';
			}

			if( event.x >= touchX + pxSensibilityX ) {
				touching = false;
				direction = 'none';
				event.srcElement.dispatchEvent( window.jsdz.customEvent( 'swiperight' ) );
			}
			else if( event.x <= touchX - pxSensibilityX ) {
				touching = false;
				direction = 'none';
				event.srcElement.dispatchEvent( window.jsdz.customEvent( 'swipeleft' ) );
			}
		}
	}
} )( document );
