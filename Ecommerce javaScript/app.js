/*Por medio del método getElementId capturo el id del contenido HTML y en este caso se refiere al div creado en el index*/
const foodcontent = document.getElementById("foodcontent");

/*Por medio del método getElementId capturo el id del contenido HTML y en este caso se refiere al h1 que contiene el logo del carrito*/
const verCarrito = document.getElementById("verCarrito");

/*Por medio del método getElementId capturo el id del contenido HTML y en este caso se refiere al menú del carrito*/
const carritoContainer = document.getElementById("carritoContainer");


/*Parse me sirve para obtener el contenido almacenado anteriormente por medio de "setItem" y uso JSON.parse para parsear el contenido,
es decir transformar de string a objeto del array nuevamente*/
/*Además introduzco la línea de "getItem" en mi array vacío con el comando "or" para indicarle a la variable que tome el valor del localstorage,
y si no hay nada almacenado tome el contenido vacío tal cual era antes de agregar contenido en el almacenamiento del navegador*/
let carrito = JSON.parse(localStorage.getItem("productos")) || [];


/*Creo una funcion y uso localStorage para almacenar informacion en forma local en mi navegador y uso JSON.stringify para que lo almacene como string.
Esta función creada me va a servir para luego invocarla en otra parte de mi proyecto*/
const local = () => {
  localStorage.setItem("productos", JSON.stringify(carrito));
}

/*Creo una función asyncrona para invocar a mis productos que se encuentran en el archivo JSON*/
const getProducts = async () => {
  try { //Uso try para ejecutar esta función para que en caso de no cargar los productos me dé un mensaje de error
  const response = await fetch("data.json"); /*Creo una constante con la que voy a almacenar una respuesta y capturo el contenido por medio de fetch*/
  const data = await response.json(); /*Acá almaceno los datos pasados a json*/

  /*Por medio del método forEach recorro mi array que contiene los productos en data.json para luego mostrarlos*/
data.forEach((product) => {
  let content = document.createElement("div"); /*Creo la variable content y dentro el elemento div en mi "document" por medio de la función createElement*/
  content.className = "card"; /*Le asigno una clase con la propiedad className para agregar luego estilo css*/
  content.innerHTML = `
  <img src="${product.img}">
<h3>${product.nombre}</h3>
<p class="price">$${product.precio}</p>
`; /*Inserto contenito HTML con la propiedad innerHTML al elemento div creado anteriormente*/

  /*Inserto los elementos creados dentro de mi div a un div padre que cree previamente en el index llamado foodcontent y todo esto mediante la función append*/
  foodcontent.append(content);

  /*Creo el botón a través de la función createElement que va permitir al usuario comprar alguno de los productos que aparecen en el documento HTML*/
  let comprar = document.createElement("button");
  comprar.innerText = "Comprar"; /*A través de la propiedad innerText inserto texto que va ir dentro del botón */
  comprar.className = "compra"; /*Le asigno una clase con la propiedad className para agregar luego estilo css*/

  /*A través de la función append inserto mi botón creado en el paso anterior a content que es el contenido que ya aparece en index*/
  content.append(comprar);

  /*Por medio de la función addEventListener le doy funcionalidad a mi botón y en este caso al hacer click va a disparar algún evento*/
  comprar.addEventListener("click", () => {
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Su pedido fué agregado al carrito",
      showConfirmButton: false,
      timer: 1500
    });

    /*Creo una constante llamada repeat y por medio del método some recorro mi array llamado carrito
    para verificar si hay un producto repetido comparando repeatProduct.id con product.id para que luego
    some me devuelva un true o un false*/
    const repeat = carrito.some((repeatProduct) => repeatProduct.id == product.id);

    /*Si repeat es igual a true (ya hay un elemento igual) recorro mi carrito con el método
    map para crear un nuevo array modificado pasandole la variable prod para que realice una nueva evaluación
    en la que compare a prod.id con product.id y si es igual a prod.id le sume uno más con el comando de incremento ++ */
    if(repeat == true){
      carrito.map((prod) => {
        if(prod.id == product.id){
          prod.cantidad++;
        }
      });
    } else {
  /*si repeat es igual a false va a pushear los elementos del array al carrito por medio del método push*/
    carrito.push({
      img: product.img,
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      cantidad: product.cantidad,
    });
  }
    console.log(carrito);
    
    /*Invoco la funcón local para que almacene la información en el navegador como lo indiqué mas arriba*/
    local();
  });
});
  } catch (error) {
    const msjError = document.createElement("div");
    msjError.innerHTML = `
    <h1>Error al cargar los productos</h1>
    `;
    foodcontent.append(msjError)
    console.error("Error al cargar los productos") //en caso de no responder la función asyncrona me da error en consola y por DOM
  }
  
};

/*Invoco la función getProducts para traer la información desde "data.json" */
getProducts();


/*Para crear el menú de mi carrito de compras lo voy a crear en 3 partes
las cuales constan de:
Header(contiene un titulo y un botón para cerrar)
Cuerpo (contiene el detalle de las compras a realizar y un botón de eliminar productos)
Footer (contiene el total a pagar de la compra)*/


/*------------------------------------HEADER DEL CARRITO--------------------------------- */
/*Para empezar creo una función en el Header que luego llamaré para su ejecución */
const llenarCarrito = () =>{
    carritoContainer.innerHTML =""; /*Esto me sirve para limpiar todo antes de volver a repetir todo el proceso y no se duplique el contenido*/
    carritoContainer.style.display = "flex"; /*Por medio de esta línea puedo volver a visualizar el menú carrito después de cerrarlo*/
    const carritoHeader = document.createElement("div"); /*Creo un elemento div*/
    carritoHeader.className = "carrito-Header";
    carritoHeader.innerHTML = `
      <h1 class="carrito-header-title">Su Pedido</h1>
      `; /*Le inserto contenido HTML (título) */
  
      /*Creo un contenedor padre en el index llamado carritoContainer y en él inserto el div creado acá */
      carritoContainer.append(carritoHeader);
  
    /*Procedo a la creación del botón cerrar mediante un span con texto adentro que será una "X" */
    const carritobutton = document.createElement("span");
    carritobutton.innerText = "X";
    carritobutton.className = "carrito-header-button";
  
    /*Por medio de la herramienta addEventListener le doy la orden de que desaparezca el menú al hacer click*/
    carritobutton.addEventListener("click", () => {
    carritoContainer.style.display = "none"; /*Al hacer click mediante la propiedad de css "none" el contenido desaparece*/
  });
  
  /*Inserto el botón a carritoHeader*/
  carritoHeader.append(carritobutton);



/*----------------------------------CUERPO O BODY DEL CARRITO------------------------------------ */
/*En la segunda parte de mi menú voy a insertar el contenido de mi carrito:
  Primero: recorro mi array con el método forEach*/
  carrito.forEach((product) => {
    /*segundo: creo la etiqueta div e inserto contenido HTML que contiene los elementos
    de mis productos existentes en el array*/
    let carritoContent = document.createElement("div");
    carritoContent.className = "carrito-content";
    carritoContent.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
  <p>$${product.precio}</p>
  <p>Cantidad: ${product.cantidad}</p>
  <p>Total: ${product.cantidad * product.precio}<p>
  <span class="delete-product"> ❌ </span>
    `;
  
    /*Inserto el contenido del menú carrito al div padre creado en el index por medio de la función append */
    carritoContainer.append(carritoContent);
    

  let eliminar = carritoContent.querySelector(".delete-product");


/*Creo la función para darle funcionalidad al botón "eliminar" */
const eliminarProducto = (id) => {
  /*Creo la constante foundId y con el método "find" busco el id del producto que el usuario está queriendo eliminar*/
  const foundId = carrito.find((element) => element.id == id);

  /*Con el método "filter" sobreescribo el valor de carrito con todos los resultados
  excepto el id que encontré anteriormente con "find", lo hago comparando la constante
  creada anteriormente llamada foundId con el parámetro enviado llamado carritoId y
  de esta forma con return devuelve todos los elementos excepto el id encontrado con find*/
  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });

  llenarCarrito(); /*Por último utilizo la función creada anteriormente llenarCarrito para mostrar el resultado */
  local(); /*Invoco esta función para que al momento de eliminar algún producto lo tenga en cuenta al momento de refrescar la página,
  de lo contrario si elimino y actualizo la página ese elemento eliminado vuelve a aparecer*/
};
    
/*Asocio la función "eliminarProducto" por medio de addEventListener
al botón eliminar para indicar cuando ejecutar el proceso */  
eliminar.addEventListener("click", ()=> {
  Swal.fire({
    title: "¿Desea Eliminar?",
    text: "Su Producto Se Eliminará Del Carrito",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Si, Eliminar!",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      eliminarProducto(product.id);
      Swal.fire({
        title: "Eliminado",
        text: "Su Producto Fué Eliminado Del Carrito.",
        icon: "success",
      });
    }
  });
 
});

  });

  

  /*---------------------------------FOOTER DEL CARRITO----------------------------------- */
  /*Para crear el Footer del menú carrito utilizo el método "reduce"
  que sirve para calcular los valores que estén dentro del carrito */
  /*Los parámetros que le paso a este método son acc(acumulador), el(elemento)
  sumo el acumulador con el precio y lo multiplico con la cantidad. El acumulador inicia en 0*/
 
  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  
  /*En este paso creo un elemento div para introducir el resultado de la constante "total"*/
  const totalBuying = document.createElement("div")
  totalBuying.className = "total-content"
  totalBuying.innerHTML = `
  <p>Total a pagar: $${total}</p>
  `;
 
 /*Por último inserto mi Footer en el contenedor padre llamado carritoContainer*/
  carritoContainer.append(totalBuying);
  };
  
  /*Por medio de la función addEventListener voy a lograr desplegar mi menú carrito especificando
que a través de un click en el h1 creado anteriormente llamado verCarrito
ejecute la función llenarCarrito */
verCarrito.addEventListener("click", llenarCarrito);



/*------------------------------------------------------INPUTS----------------------------------------------------------------- */

/*Creo esta función que va a permitir que aparezca y desaparezca el formulario de inicio de sesión*/
const menuSesion = () =>{
  input.innerHTML =""; /*Esto me sirve para limpiar todo antes de volver a repetir todo el proceso y no se duplique el contenido*/
  input.style.display = "flex";
  const inputHeader = document.createElement("div"); /*Creo un elemento div*/
  inputHeader.className = "input-Header";
  inputHeader.innerHTML = `
  <h1 class="input-header-title">Inicio de Sesion</h1>
  `; /*Inyecto un h1 al HTML*/
  
  /*Inserto al div el elemento recién creado*/
  input.append(inputHeader);
  
  /*Creo un botón el cuál permitirá cerrar el menú*/
  const inputbutton = document.createElement("span");
      inputbutton.innerText = "X";
      inputbutton.className = "input-header-button";
    
      /*Por medio de la herramienta addEventListener le doy la orden de que desaparezca el menú al hacer click*/
      inputbutton.addEventListener("click", () => {
      input.style.display = "none"; /*Al hacer click mediante la propiedad de css "none" el contenido desaparece*/
    });
  
    inputHeader.append(inputbutton);
  
    /*Creo el div con los input del formulario*/
    let inputContent = document.createElement("div");
      inputContent.className = "input-content";
      inputContent.innerHTML = `
      <label>Ingrese su nombre:</label>
      <input id="ingreso">
      <label class="label2">Ingrese su contraseña:</label>
      <input id="clave" type="password">
      <button id="boton" class="boton">Ingresar</button>
      <p id="mensaje"></p>
      `;
  /*Inserto el formulario dentro del div "input"*/
      input.append(inputContent);
  
      //Creo una variable llamada "nombre" la cual reutilizaré cuando el usuario ingrese un valor
  let nombre;
  
  //Le doy funcionalidad al botón cuando el usuario haga click en el
  document.getElementById("boton").addEventListener("click",datos);
  
  //Creo un nuevo evento para que al dar enter también sea posible acceder
  document.getElementById("clave").addEventListener("keydown", teclado);
  
  //uso esta funcion para limpiar al principio
  limpiar();
  
  //Creo la primer funcion la cual permitirá evaluar lo que el usuario ingrese
  function datos(){
      if (document.getElementById("clave").value=="12345"){
          
      //Evalúa los datos ingresados
      //uso la función "trim" para eliminar los espacios al principio y al final del contenido y de esta forma no los contemplará
      //uso "toUpperCase" para convertir el contenido en mayúscula
      nombre = document.getElementById("ingreso").value.trim().toUpperCase();
      //Cuando la variable "nombre" sea igual a algo inyecto en mi html un saludo
      (nombre) && (document.getElementById("mensaje").innerHTML=`✅ Hola ${nombre} Bienvenido a Sabor Urbano por favor seleccione su pedido`);
  
      }
      else {
          //Si la contraseña no coincide con la correcta envía un mensaje de error
          document.getElementById("mensaje").innerHTML=`❌ Su contraseña es incorrecta, por favor ingresela nuevamente`;
      }
  
      //llamo a la función para limpiar el contenido
      limpiar()
  }
  
  //Creo mi función para que tome la tecla enter y permita acceder de este modo al igual que haciendo click
  function teclado(e){
      //funciona cuando "e.key" que es la propiedad que indica que pulse una tecla es igual a enter y además ejecuta la función "verificarClave"
      (e.key==="Enter") && datos()
  }
  
  //creo una nueva función que voy a utilizar para limpiar el contenido de mi input y meter el cursor nuevamente adentro luego de escribir algo
  function limpiar(){
      //creo esta constante para ahorrarme de volver a escribir nuevamente toda la línea document.etc
      const input1=document.getElementById("ingreso");
      const input2=document.getElementById("clave");
      //ahora la constante "elemnet" se mete en mi input y lo limpia
      input1.value="";
      input2.value="";
      //con la función focus el cursor se mantiene siempre dentro del input
      input1.focus();
      input2.focus();
  }
  }
  
  /*Creo el evento que le da funcionalidad al ícono de inicio de sesión*/
  inicioSesion.addEventListener("click", menuSesion);