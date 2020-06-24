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
							if( page.classList.contains( 'visible' ) ) {
								page.dispatchEvent( window.jsdz.customEvent( 'beforeHide' ) );
								page.classList.remove( 'visible' );
								page.dispatchEvent( window.jsdz.customEvent( 'afterHide' ) );
							}
						} );
						this.dispatchEvent( window.jsdz.customEvent( 'beforeShow' ) );
						this.classList.add( 'visible' );
						this.dispatchEvent( window.jsdz.customEvent( 'afterShow' ) );
					};
				};
			}

			if( page.show === undefined ) {
				page.show = function() {
					if( !page.classList.contains( 'visible' ) ) {
						this.dispatchEvent( window.jsdz.customEvent( 'beforeShow' ) );
						this.classList.add( 'visible' );
						this.dispatchEvent( window.jsdz.customEvent( 'afterShow' ) );
					}
				};
			}

			if( page.hide === undefined ) {
				page.hide = function() {
					if( !this.classList.contains( 'visible' ) ) {
						if( page.classList.contains( 'visible' ) ) {
							this.dispatchEvent( window.jsdz.customEvent( 'beforeHide' ) );
							this.classList.remove( 'visible' );
							this.dispatchEvent( window.jsdz.customEvent( 'afterHide' ) );
						}
					};
				};
			}
		} );
	};
	
	function pageLinkClick() {
		var targets = document.querySelectorAll( this.getAttribute( 'data-target' ) ) || [];

		targets.forEach( function( target ) {
			if( target.getAttribute( 'data-role' ) === 'page' ) {
				target.showOnly();
			}
		} );
	}

	window.jsdz.pageLinkUpdate = function() {
		document.querySelectorAll( 'span[ data-role = "pageLink" ]' ).forEach( function( link ) {
			link.removeEventListener( 'click', pageLinkClick );
			link.addEventListener( 'click', pageLinkClick );
		} );
	};

	document.addEventListener( 'DOMContentLoaded', function() {
		window.jsdz.pageLinkUpdate();
		window.jsdz.pageUpdate();
	} );
} )();
