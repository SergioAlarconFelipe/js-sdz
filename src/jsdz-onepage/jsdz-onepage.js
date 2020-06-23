document.addEventListener( 'DOMContentLoaded', function() {
	window.jsdz.pageUpdate = function() {
		document.querySelectorAll( 'div[ data-role = "page" ]' ).forEach( function( page ) {
			if( page.show === undefined ) {
				page.show = function() {
					if( !this.classList.contains( 'active' ) ) {
						document.querySelectorAll( 'div[ data-role = "page" ]' ).forEach( function( page ) {
							page.classList.remove( 'active' );
						} );
						this.classList.add( 'active' );
					};
				};
			}
		} );
	}

	window.jsdz.pageLinkUpdate = function() {
		function pageLinkClick() {
			document.querySelector( this.getAttribute( 'data-target' ) ).show();
		}
		document.querySelectorAll( 'span[ data-role = "pageLink" ]' ).forEach( function( link ) {
			link.removeEventListener( 'click', pageLinkClick );
			link.addEventListener( 'click', pageLinkClick );
		} );
	}
	
	window.jsdz.pageLinkUpdate();
	window.jsdz.pageUpdate();
} );
