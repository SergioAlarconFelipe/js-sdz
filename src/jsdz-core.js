( function() {
	let jsdz = function() {
        this.customEvent = function( type ) {
            if( type === undefined || typeof type !== 'string' ) {
                return null;
            }
            
            var options = {
                bubbles: true,
                cancelable: true,
            };

            return new CustomEvent(
                type, 
                options
            );
        }
	};

	window.jsdz = new jsdz();
} )();
