( function( element ) {
	element.addEventListener( 'touchstart', start, false );
	element.addEventListener( 'touchmove', move, false ); 
	element.addEventListener( 'touchend', end, false );

	element.addEventListener( 'mousedown', start, false );
	element.addEventListener( 'mousemove', move, false );
	element.addEventListener( 'mouseup', end, false );

	var pxSensibility = 100;
	var touching = false;
	var direction = 'none';
	var touchX = false;
	var cE = null;

	function start( event ) {
		touching = true;
		touchX = event.x;
	}
	function end( event ) {
		touching = false;
		direction = 'none';
	}
	function move( event ) {
		if( touching ) {
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

			if( event.x >= touchX + pxSensibility ) {
				touching = false;
				direction = 'none';

				cE = new CustomEvent(
					'swiperight', 
					{
						bubbles: true,
						cancelable: true
					}
				);
				event.srcElement.dispatchEvent( cE );
			}
			else if( event.x <= touchX - pxSensibility ) {
				touching = false;
				direction = 'none';

				cE = new CustomEvent(
					'swipeleft', 
					{
						bubbles: true,
						cancelable: true
					}
				);
				event.srcElement.dispatchEvent( cE );
			}
		}
	}
} )( document );
