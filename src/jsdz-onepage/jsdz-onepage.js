( function() {
	if( window.jsdz === undefined ) {
		throw new Error( '\njsdz no se ha defectado.\nPara masinformacion visita: https://github.com/SergioAlarconFelipe/jsdz' );
	}

	window.jsdz.pageUpdate = function() {
		document.querySelectorAll( 'div[ data-role = "page" ]' ).forEach( function( page ) {
			if( page.showOnly === undefined ) {
				page.showOnly = function() {
					if( !this.classList.contains( 'visible' ) ) {
						document.querySelectorAll( 'div[ data-role = "page" ]' ).forEach( function( page ) {
							page.classList.remove( 'visible' );
						} );
						this.classList.add( 'visible' );
					};
				};
			}
			
			if( page.show === undefined ) {
				page.show = function() {
					this.classList.add( 'visible' );
				};
			}
			
			if( page.hide === undefined ) {
				page.hide = function() {
					if( !this.classList.contains( 'visible' ) ) {
						this.classList.remove( 'visible' );
					};
				};
			}
		} );
	}

	window.jsdz.pageLinkUpdate = function() {
		function pageLinkClick() {
			var target = document.getElementById( this.getAttribute( 'data-target' ) ) || null;
			if( target && target.getAttribute( 'data-role' ) === 'page' ) {
			    target.showOnly();
			}
		}
		document.querySelectorAll( 'span[ data-role = "pageLink" ]' ).forEach( function( link ) {
			link.removeEventListener( 'click', pageLinkClick );
			link.addEventListener( 'click', pageLinkClick );
		} );
	}

	document.addEventListener( 'DOMContentLoaded', function() {
		window.jsdz.pageLinkUpdate();
		window.jsdz.pageUpdate();
	} );
} )();
