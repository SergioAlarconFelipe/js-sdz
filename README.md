# JSDZ
JavaScript Framework

## Uso
Inclusión en el proyecto de forma manual.

```html
<script src="js/jsdz-core.js"></script>

<script src="js/jsdz-swipe.js"></script>

<script src="js/jsdz-onepage.js"></script>
<link href="css/jsdz-onepage.css" rel="stylesheet" >

<script src="js/jsdz-hidemenu.js"></script>
<link href="css/jsdz-hidemenu.css" rel="stylesheet" >
```

El paquete *jsdz-core.js* es la base obligatoria para que el resto funcionen.

En caso de que no se incluya antes del resto, se notificara una excepción en la consola de depuración.

El resto de paquetes son opcionales y se pueden incluir los que se necesiten, de forma automática se auto combinaran entre ellos.

## Paquetes
### JSDZ - Swipe
Con este paquete, podemos gestionar los eventos *swiperight* y *swipeleft* que se ejecutan cuando el usuario presiona hacia abajo y desliza en la dirección correspondiente (un mínimo de 100px horizontalmente) sobre los nodos del árbol DOM que nos interesen.

Este paquete está preparado para funcionar tanto en los dispositivos con puntero como en los dispositivos móviles.

```javascript
document.addEventListener( 'DOMContentLoaded', function() {
	document.getElementById( 'app' ).addEventListener( 'swiperight', function( event ) {
		console.log( 1, event );
	} );
	
	document.getElementById( 'app' ).addEventListener( 'swipeleft', function( event ) {
		console.log( 2, event );
	} );
} );
```

### JSDZ - One Page
Con este paquete, podemos gestionar una aplicación "one page" en la que las distintas secciones se irán ocultando o mostrando cuando necesitemos.

Sera necesario crear las distintas páginas como un div con un atributo *data-role="page"*.

Estas secciones irán intercambiándose la clase *visible* para mantener una activa.

Opcionalmente, podemos añadir la clase *fade-effect* si queremos activar una animación de plegado al visualizar u ocultar una sección.

```html
<div id="page-1" data-role="page" class="fade-effect visible">
	<p>
		<span data-role="pageLink" data-target="#page-1">Page 1</span>
		<span data-role="pageLink" data-target="#page-2">Page 2</span>
	</p>
	
	<p>Page 1</p>
</div>

<div id="page-2" data-role="page" class="fade-effect visible">
	<p>
		<span data-role="pageLink" data-target="#page-1">Page 1</span>
		<span data-role="pageLink" data-target="#page-2">Page 2</span>
	</p>
	
	<p>Page 2</p>
</div>
```
Automaticamente las etiquetas *span* que posean el atributo *data-role="pageLink"* se vincularan para mostrar las páginas indicadas con su atributo *data-target*.

Cada página posee los siguientes metodos:

Metodo|Explicación
------|-----------
show|Muestra la sección indicada
hide|Oculta la sección indicada
showOnly|Muestra la sección indicada y oculta el resto que puedieran estar visibles

Seria fácil usar los eventos del paquete *swipe* explicados anteriormente para controlar la visualizacion de las distintas páginas.

```javascript
document.addEventListener( 'DOMContentLoaded', function() {
	document.querySelectorAll( '#app [data-role = "page"]' ).forEach( function( page ) {
		page.addEventListener( 'swipeleft', function( event ) {
			document.getElementById( 'page-2' ).showOnly();
		} );
	} );

	document.querySelectorAll( '#app [data-role = "page"]' ).forEach( function( page ) {
		page.addEventListener( 'swiperight', function( event ) {
			document.getElementById( 'page-1' ).showOnly();
		} );
	} );
} );
```

Cada página ejecuta los siguientes callbacks cuando se muestran o se ocultan.

Callback|Explicación
--------|-----------
beforeHide|Antes de que cualquier página visible se oculte
afterHide|Despues de que cualquier página visible se oculte

```javascript
document.addEventListener( 'DOMContentLoaded', function() {
	document.getElementById( 'page-1' ).addEventListener( 'beforeHide', function( event ) { 
		console.log( 1, event ); } 
	);
	document.getElementById( 'page-1' ).addEventListener( 'afterHide', function( event ) { 
		console.log( 2, event ); } 
	);
	document.getElementById( 'page-2' ).addEventListener( 'beforeHide', function( event ) { 
		console.log( 3, event ); } 
	);
	document.getElementById( 'page-3' ).addEventListener( 'afterHide', function( event ) { 
		console.log( 4, event ); } 
	);
} );
```

### JSDZ - Hide Menu
