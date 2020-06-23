( function() {
	if( window.jsdz === undefined ) {
		throw new Error( '\njsdz no se ha defectado.\nPara masinformacion visita: https://github.com/SergioAlarconFelipe/jsdz' );
	}

	window.jsdz.pageUpdate = function() {
		document.querySelectorAll( 'div[ data-role = "menu" ]' ).forEach( function( menu ) {
			if( menu.show === undefined ) {
				menu.show = function() {
					this.classList.add( 'visible' );
					document.querySelectorAll( 'div[ data-link = "#' + this.id + '" ]' ).forEach( function( background ) {
						background.classList.add( 'visible' );
					} );
				};
			}

			if( menu.hide === undefined ) {
				menu.hide = function() {
					this.classList.remove( 'visible' );
					document.querySelectorAll( 'div[ data-link = "#' + this.id + '" ]' ).forEach( function( background ) {
						background.classList.remove( 'visible' );
					} );
				};
			}

			if( menu.toggle === undefined ) {
				menu.toggle = function() {
					if( !this.classList.contains( 'visible' ) ) {
						this.classList.add( 'visible' );
					}
					else {
						this.classList.remove( 'visible' );
					}
				};
			}
		} );
	}

	window.jsdz.menuLinkUpdate = function() {
		function pageLinkClick() {
			var target = document.getElementById( this.getAttribute( 'data-target' ) ) || null;
			if( target && target.getAttribute( 'data-role' ) === 'menu' ) {
				target.show();
			}
		}
		document.querySelectorAll( 'span[ data-role = "menuLink" ]' ).forEach( function( link ) {
			link.removeEventListener( 'click', pageLinkClick );
			link.addEventListener( 'click', pageLinkClick );
		} );
	}

	document.addEventListener( 'DOMContentLoaded', function() {
		document.querySelectorAll( 'div[ data-role = "menu" ]' ).forEach( function( menu ) {
			var fondo = document.createElement("div");
			fondo.setAttribute( 'data-role', 'menuBackground' );
			fondo.setAttribute( 'data-link', '#' + menu.id );
			// fondo.appendChild( document.createTextNode("Water") );

			menu.parentElement.insertBefore( fondo, menu.parentElement.firstChild );
			// menu.parentElement.appendChild( fondo );

			document.querySelectorAll( 'div[ data-role = "menuBackground" ]' ).forEach( function( background ) {
				background.addEventListener( 'click', function() {
					document.querySelectorAll( this.getAttribute( 'data-link' ) ).forEach( function( menu ) {
						menu.hide();
					} );
				} );
			} );
		} );

		window.jsdz.menuLinkUpdate();
	} );
} )();
