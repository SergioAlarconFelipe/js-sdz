( function() {
	if( window.jsdz === undefined ) {
		throw new Error( '\njsdz no se ha defectado.\nPara masinformacion visita: https://github.com/SergioAlarconFelipe/jsdz' );
	}

	window.jsdz.menuUpdate = function() {
		document.querySelectorAll( 'div[ data-role = "menu" ]' ).forEach( function( menu ) {
			if( menu.show === undefined ) {
				menu.show = function() {
					this.dispatchEvent( window.jsdz.customEvent( 'beforeShow' ) );
					this.classList.add( 'visible' );
					document.querySelectorAll( 'div[ data-link = "#' + this.id + '" ]' ).forEach( function( background ) {
						background.classList.add( 'visible' );
					} );
					this.dispatchEvent( window.jsdz.customEvent( 'afterShow' ) );
				};
			}

			if( menu.hide === undefined ) {
				menu.hide = function() {
					this.dispatchEvent( window.jsdz.customEvent( 'beforeHide' ) );
					this.classList.remove( 'visible' );
					document.querySelectorAll( 'div[ data-link = "#' + this.id + '" ]' ).forEach( function( background ) {
						background.classList.remove( 'visible' );
					} );
					this.dispatchEvent( window.jsdz.customEvent( 'afterHide' ) );
				};
			}

			if( menu.toggle === undefined ) {
				menu.toggle = function() {
					if( !this.classList.contains( 'visible' ) ) {
						this.show();
					}
					else {
						this.hide();
					}
				};
			}
		} );
	};
    
    function menuLinkClick() {
        var target = document.getElementById( this.getAttribute( 'data-target' ) ) || null;
        if( target && target.getAttribute( 'data-role' ) === 'menu' ) {
            target.show();
        }
    }

	window.jsdz.menuLinkUpdate = function() {
		document.querySelectorAll( 'span[ data-role = "menuLink" ]' ).forEach( function( link ) {
			link.removeEventListener( 'click', menuLinkClick );
			link.addEventListener( 'click', menuLinkClick );
		} );
	};

	document.addEventListener( 'DOMContentLoaded', function() {
		document.querySelectorAll( 'div[ data-role = "menu" ]' ).forEach( function( menu ) {
			var fondo = document.createElement("div");
			fondo.setAttribute( 'data-role', 'menuBackground' );
			fondo.setAttribute( 'data-link', '#' + menu.id );

			menu.parentElement.insertBefore( fondo, menu.parentElement.firstChild );

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
