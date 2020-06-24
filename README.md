# JSDZ
JavaScript Framework

## Uso
Inclusión en el proyecto de forma manual
```html
<script src="js/jsdz-core.js"></script>

<script src="js/jsdz-swipe.js"></script>

<script src="js/jsdz-onepage.js"></script>
<link href="css/jsdz-onepage.css" rel="stylesheet" >

<script src="js/jsdz-hidemenu.js"></script>
<link href="css/jsdz-hidemenu.css" rel="stylesheet" >
```

El paquete "jsdz-core.js" es la base obligatoria para que el resto funcionen.

En caso de que no se incluya antes del resto, se notificara una excepción en la consola de depuración.

El resto de paquetes son opcionales y se pueden incluir los que se necesiten, de forma automatica se auto combinaran entre ellos.

## Paquetes
### JSDZ - Swipe
Para cada elemento del arbol DOM podemos gestionar los eventos "swiperight" y "swipeleft" que se lanzan cuando el ususuario presiona hacia abajo y desliza en la dirección correspondiente (un minimo de 100 px horizontalmente).
```javascript
document.addEventListener( 'DOMContentLoaded', function() {
	document.getElementById( 'app' ).addEventListener( 'swiperight', function( event ) {
		console.log( 1, event );
	} );
} );
```
