# JSDZ
JavaScript Framework

1. [Instalación](#instalación)
2. [JSDZ - Swipe](#jsdz---swipe)
3. [JSDZ - One Page](#jsdz---one-page)
4. [JSDZ - Hide Menu](#jsdz---hide-menu)
5. [JSDZ - Loader](#jsdz---loader)

## Instalación
Inclusión en el proyecto de forma manual.

```html
<script src="js/jsdz-core.js"></script>

<script src="js/jsdz-swipe.js"></script>

<script src="js/jsdz-onepage.js"></script>
<link href="css/jsdz-onepage.css" rel="stylesheet" >

<script src="js/jsdz-hidemenu.js"></script>
<link href="css/jsdz-hidemenu.css" rel="stylesheet" >

<script src="js/jsdz-loader.js"></script>
<link href="css/jsdz-loader.css" rel="stylesheet" >
```

El paquete **jsdz-core.js** es la base obligatoria para que el resto funcionen.

En caso de que no se incluya antes del resto, se notificara una excepción en la consola de depuración.

El resto de paquetes son opcionales y se pueden incluir los que se necesiten, de forma automática se auto combinaran entre ellos.

[Ir arriba](#jsdz)

## Paquetes
### JSDZ - Swipe
Con este paquete, podemos gestionar los eventos **swiperight** y **swipeleft** que se ejecutan cuando el usuario presiona hacia abajo y desliza en la dirección correspondiente (un mínimo de 100px horizontalmente) sobre los nodos del árbol DOM que nos interesen.

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

[Ir arriba](#jsdz)

### JSDZ - One Page
Con este paquete, podemos gestionar una aplicación "one page" en la que las distintas secciones se irán ocultando o mostrando cuando necesitemos.

Sera necesario crear las distintas páginas como un div con un atributo **data-role="page"**.

Estas secciones irán intercambiándose la clase **visible** para mantener una activa.

Opcionalmente, podemos añadir la clase **fade-effect** si queremos activar una animación de plegado al visualizar u ocultar una sección.

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

> Si se generan páginas de forma dinámica mediante programacion, se debe ejecutar el siguiente comando despues de añadirlas al árbol DOM.\
> window.jsdz.pageUpdate();

Automaticamente las etiquetas **span** que posean el atributo **data-role="pageLink"** se vincularan para mostrar las páginas indicadas con su atributo **data-target**.

> Si se generan *span links* a a las páginas de forma dinámica mediante programacion, se debe ejecutar el siguiente comando despues de añadirlos al árbol DOM.\
> window.jsdz.pageLinkUpdate();

Cada página posee los siguientes metodos:

Metodo|Explicación
------|-----------
show|Muestra la sección indicada
hide|Oculta la sección indicada
showOnly|Muestra la sección indicada y oculta el resto que puedieran estar visibles

Seria fácil usar los eventos del paquete [**swipe**](#jsdz---swipe) explicados anteriormente para controlar la visualizacion de las distintas páginas.

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
beforeShow|Antes de que cualquier página no visible se visualice
afterShow|Despues de que cualquier página no visible se visualice

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
	document.getElementById( 'page-2' ).addEventListener( 'afterHide', function( event ) { 
		console.log( 4, event ); } 
	);
} );
```

[Ir arriba](#jsdz)

### JSDZ - Hide Menu
Con este paquete, podemos gestionar menús laterales que se muestran o se esconden a nuestro gusto, principalmente diseñados para dispositivos móviles.

Sera necesario crear los distintos menús como un div con un atributo **data-role="menu"**.

Estos menús irán intercambiándose la clase **visible** para visualizarse u ocultarse.

Opcionalmente, podemos añadir el attributo **data-position** con los valores **left** o **right** si queremos seleccionar el lateral de la pantalla por el que se esconderá el menú.

Opcionalmente, podemos añadir la clase **fade-effect** si queremos activar una animación de deslizamiento al visualizar u ocultar el menú.

> No indicar la posición funcionara igual que indicar la posición "left".

```html
<div id="menu-1" data-role="menu" data-position="right" class="fade-effect">
	<p>Menu 1</p>
</div>
```

> Si se generan menús de forma dinámica mediante programación, se debe ejecutar el siguiente comando después de añadirlos al árbol DOM.\
> window.jsdz.menuUpdate();

Automáticamente las etiquetas **span** que posean el atributo **data-role="menuLink"** se vincularan para mostrar los menús indicados con su atributo **data-target**.

```html
<span data-role="menuLink" data-target="#menu-1">Menu</span>
```

> Si se generan *span links* a a los menus de forma dinámica mediante programación, se debe ejecutar el siguiente comando después de añadirlos al árbol DOM.\
> window.jsdz.menuLinkUpdate();

Cada menú posee los siguientes métodos:

Método|Explicación
------|-----------
show|Muestra el menú indicado
hide|Oculta el menú indicado
toggle|Muestra el menú indicado si estaba oculto o lo oculta si estaba visible
visible|Devuelve **true** si el menu indicado esta visible o **false** en caso contrario

Seria fácil usar los eventos del paquete [**swipe**](#jsdz---swipe) explicados anteriormente para controlar la visualizacion de los distintos menus.

```javascript
document.addEventListener( 'DOMContentLoaded', function() {
	document.addEventListener( 'swipeleft', function( event ) {
		document.getElementById( 'menu-1' ).show();
	} );

	document.addEventListener( 'swiperight', function( event ) {
		document.getElementById( 'menu-1' ).hide();
	} );
} );
```

Cada menu ejecuta los siguientes callbacks cuando se muestran o se ocultan.

Callback|Explicación
--------|-----------
beforeHide|Antes de que el menu indicado se oculte
afterHide|Despues de que el menu indicado se oculte
beforeShow|Antes de que el menu indicado se visualice
afterShow|Despues de que el menu indicado se visualice

```javascript
document.addEventListener( 'DOMContentLoaded', function() {
	document.getElementById( 'menu-1' ).addEventListener( 'beforeHide', function( event ) { 
		console.log( 1, event ); } 
	);
	document.getElementById( 'menu-1' ).addEventListener( 'afterHide', function( event ) { 
		console.log( 2, event ); } 
	);
	document.getElementById( 'menu-1' ).addEventListener( 'beforeShow', function( event ) { 
		console.log( 3, event ); } 
	);
	document.getElementById( 'menu-1' ).addEventListener( 'afterShow', function( event ) { 
		console.log( 4, event ); } 
	);
} );
```

[Ir arriba](#jsdz)

### JSDZ - Loader
Con este paquete, podemos gestionar un div que utilizaremos como loader o splashscreen.

Sera necesario el loader como un div con un atributo data-role="loader".

Si queremos que el loader funcione como splascreen al inicio de nuestra aplicacion, debemos indicar el atribuso data-autohide con el valor de los milisegundos tras los que deseamos que se oculte.

> Si no existe el atributo data-autohide, el loader no se mostrara por defecto con el inicio de la aplicación y podremos forzarlo nosotros cuando nos interese.
> Un valor de 0 milisegundos mostrara el loader al iniciar la aplicacion y desactivara el auto ocultado obligandonos a hacerlo nosotros mediante JavaScript.

Opcionalmente, podemos añadir la clase fade-effect si queremos activar una animación de desvanecimiento al visualizar u ocultar el loader.

```html
<div data-role="loader" data-autohide="2500" class="fade-effect"></div>
```

> Dentro del loader podriamos diseñar cualquier contenido que necesitasemos.

El loader posee los siguientes métodos:

Método|Explicación
------|-----------
show|Muestra el loader
hide|Oculta el loader
toggle|Muestra el loader si estaba oculto o lo oculta si estaba visible
visible|Devuelve **true** si el menu indicado esta visible o **false** en caso contrario

El loader ejecuta los siguientes callbacks cuando se muestra o se oculta.

Callback|Explicación
--------|-----------
beforeHide|Antes de que el loader se oculte
afterHide|Despues de que el loader se oculte
beforeShow|Antes de que el loader se visualice
afterShow|Despues de que el loader se visualice

```javascript
document.addEventListener( 'DOMContentLoaded', function() {	
	document.querySelector( 'div[ data-role = "loader" ]' ).addEventListener( 'afterShow', function( event ) {
		console.log( '1', event );
	} )
	document.querySelector( 'div[ data-role = "loader" ]' ).addEventListener( 'afterHide', function( event ) {
		console.log( '2', event );
	} )
	document.querySelector( 'div[ data-role = "loader" ]' ).addEventListener( 'beforeHide', function( event ) {
		console.log( '3', event );
	} )
	document.querySelector( 'div[ data-role = "loader" ]' ).addEventListener( 'beforeShow', function( event ) {
		console.log( '4', event );
	} )
} );
```

[Ir arriba](#jsdz)
