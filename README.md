# Challenge Frontend React - Alkemy

### Objetivo

<aside>
💡 Desarrollar una aplicación para crear una carta de opciones de menús para un hotel que consumirá una API externa y mostrará diferentes atributos a nivel individual de cada plato y del menú finalizado.

</aside>

<aside>
👉 Consumir los endpoints de la siguiente **[API](https://spoonacular.com/food-api/docs#Search-Recipes-Complex)** para realizar las distintas operaciones. Deberás
autenticarte en la plataforma para obtener una ApiKey y poder realizar las peticiones.

</aside>

### Requerimientos funcionales

En la pantalla de Home se deberá mostrar, además de los platos que conforman el menú:

- [x] Acumulativo de precio del menú (TOTAL).
- [x] Promedio de tiempo de preparación entre todos los platos.
- [x] Promedio de Healt Score entre todos los platos.
- [x] El menú debe tener 4 platos. Debe haber 2 veganos y 2 que no lo sean. Esto debe validarse al intentar agregar un nuevo plato.
- [x] Se deberá poder eliminar un plato del menú, lo que generará nuevamente los promedios y acumulativos (los mismos deben estar almacenados en el estado del componente utilizando Hooks)

### Requerimientos técnicos

Aprovechando las características de React, deberán crearse las siguientes secciones, y modularizar
las mismas en componentes reutilizables.

Además, para el manejo de peticiones HTTP deberá utilizarse la librería `axios`. Y el sitio deberá ser
`responsive`, y utilizar `Bootstrap` como punto de partida para aprovechar las características de la
librería.

- **Formulario de Login** `done!`
  - [x] El formulario se deberá renderizar al ingresar a cualquier ruta si el usuario no está autenticado,
        conteniendo los campos: 1. Email. 2. Password. 3. Botón de “Enviar”.
  - [x] Al hacer click en “Enviar”, se deberá validar que ambos campos no estén vacíos, y mostrar un mensaje
        al usuario si lo estuviesen. Caso contrario, se deberá realizar una petición POST a la siguiente [url](http://challenge-react.alkemy.org/), con
        los campos email y password en el BODY.
        Los datos válidos para obtener un token son: 1. Email: [challenge@alkemy.org](mailto:challenge@alkemy.org) 2. Password: react
  - [x] Se debe mostrar algún tipo de feedback al usuario mientras se está procesando la petición, no
        permitiendo que vuelva a accionar el botón de login hasta obtener una respuesta.
  - [x] En el caso de obtener un error de la API, se deberá mostrar una alerta (utilizando `sweet alert`), mientras
        que si es satisfactorio deberá redirigir al Home y almacenar el token obtenido en `localStorage`. Para
        realizar las validaciones no es necesario utilizar ninguna librería.
- **Platos** `parcial done!`
  - [x] El Home de la aplicación mostrará los platos del menú en un listado. Cada ítem (el cuál debe ser un componente separado) del listado contendrá:
  1. Nombre del plato.
  2. Imagen.
  3. Características del plato. A modo de tag (?)
  4. Acciones para ver el detalle o eliminarlo del menú. `todo`
- **Buscador de Platos** `done!`
  - [x] Para agregar un plato al menú, se deberá visualizar un formulario que realice una petición GET al
        endpoint de búsqueda y muestre los resultados disponibles en un grid, utilizando el componente de ítem del punto anterior.
  - [x] El formulario deberá buscar únicamente si hay más de 2 caracteres en el filtro, caso contrario no debe mostrar nada. La validación deberá realizarse utilizando la librería [Formik](https://formik.org/). `No se usó, pero la validación se hace cuando se hace click en botón "buscar"`
- **Detalle del Plato** `done!`
  - [x] Al hacer click en un plato del menú, se mostrarán los detalles de los campos acumulados y promediados en el menú. `Se muestra siempre`
- **Navegación entre secciones** `done!`
  - [x] Las diferentes secciones que tendrá la app deberán protegerse verificando que el usuario autenticado disponga de un token que se almacenará en localStorage. El mismo, se obtendrá de una API con datos de muestra. Si un usuario intenta ingresar a cualquier ruta sin estar autenticado, deberá ser redirigido al login. Para el manejo de rutas se deberá utilizar `ReactRouterDom`.
