( function() {
	let jsdz = function() {
		this.customEvent = function( type ) {
		    if( type === undefined || typeof type !== 'string' ) {
				return null;
		    }
			
		    return new CustomEvent(
				type, 
				{
					bubbles: true,
					cancelable: true,
				}
		    );
		}
	};

	window.jsdz = new jsdz();
} )();
