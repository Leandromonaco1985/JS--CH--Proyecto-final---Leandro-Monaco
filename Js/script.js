//declaro objeto jugador
let jugador;
//declaro variables globales
let nombre, disparo, gambeta, tecnica, posicionamiento,estadoFisico, temperaturaPectoral, quite, arquero, promedio;
// creo array para la lista de jugadores
let listaJugadores = [];

//lo guardo en local storage
const listaJugadoresLocalStorage = localStorage.getItem("lista de jugadores");

if (listaJugadoresLocalStorage) {
  listaJugadores = JSON.parse(listaJugadoresLocalStorage);
} 
//creo array jugadores historicos para traer con fetch desde archivo .json
let jugadoresHistoricos = [];

 // Cargo listaJugadores desde el Local Storage
actualizarTabla();

//creo arrays para equipos
let equipo1 = [];
let equipo2 = [];
// función promediar habilidad de un jugador
function promediarHabilidades(n1, n2, n3, n4, n5, n6, n7, n8){

    let promedio = (n1+n2+n3+n4+n5+n6+n7+n8)/8;
    return promedio.toFixed(1)

}

//promediar sumas, se usará en comparación de equipos
function promediarSumas(h1, h2){
  let mediaHabilidad = ((h1 + h2)/2)/equipo1.length;
return mediaHabilidad.toFixed(1)
}

//funcionalidad boton para traer jugadores de Json mediante fetch
let btnJson = document.getElementById("btnJson")
btnJson.addEventListener("click", traerJson)
function traerJson(){
  fetch("js/jugadores_historicos.json")
  .then (respuesta => respuesta.json())
  .then (datos => {
      jugadoresHistoricos = datos;
      // Calcula el promedio de habilidades para cada jugador ya que este dato no es almacenado
          listaJugadores = jugadoresHistoricos.map((jugador) => ({
            ...jugador,
            promedio: promediarHabilidades(
              jugador.disparo,
              jugador.gambeta,
              jugador.tecnica,
              jugador.posicionamiento,
              jugador.estadoFisico,
              jugador.temperaturaPectoral,
              jugador.quite,
              jugador.arquero
            ),
          }));
      actualizarTabla();
  })
}
//declaro funcion actualizar equipos y creo nodo
function actualizarTablaEquipos() {
  let tablaEquipo1 = document.getElementById("tablaEquipo1");
  let tablaEquipo2 = document.getElementById("tablaEquipo2");

  // Función para eliminar un jugador del equipo 1
function eliminarJugadorEquipo1(index) {
  // Elimina el elemento del array en la posición `index`
  equipo1.splice(index, 1); 
  //mostramos una tostada para avisar que se eliminó al jugador
  Toastify({
    text: "Eliminaste al jugador del equipo 1",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#F2C12E",
      color: "rgb(75, 35, 35)",
    },
    onClick: function(){} // Callback after click
  }).showToast();
  // Vuelve a actualizar la tabla del equipo 1 sin el jugador eliminado
  actualizarTablaEquipos(); 
}
function eliminarJugadorEquipo2(index) {
  equipo2.splice(index, 1);
    //mostramos una tostada para avisar que se eliminó al jugador
    Toastify({
      text: "Eliminaste al jugador del equipo 2",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#F2C12E",
        color: "rgb(75, 35, 35)",
      },
      onClick: function(){} // Callback after click
    }).showToast();
  actualizarTablaEquipos();
}
// Limpiar las tablas de los equipos
while (tablaEquipo1.rows.length > 1) {
        tablaEquipo1.deleteRow(1);
  }
while (tablaEquipo2.rows.length > 1) {
        tablaEquipo2.deleteRow(1);
  }

// Actualizar tabla del equipo 1
  for (let i = 0; i < equipo1.length; i++) {
    let fila = tablaEquipo1.insertRow();

    let celdaNombre = fila.insertCell();
    celdaNombre.innerHTML = equipo1[i].nombre;
    
    let celdaGambeta = fila.insertCell();
    celdaGambeta.innerHTML = equipo1[i].gambeta

    let celdaTecnica = fila.insertCell();
        celdaTecnica.innerHTML = equipo1[i].tecnica;

    let celdaDisparo = fila.insertCell();
    celdaDisparo.innerHTML = equipo1[i].disparo;

    let celdaEstadoFisico = fila.insertCell();
    celdaEstadoFisico.innerHTML = equipo1[i].estadoFisico;

    let celdaPosicionamiento = fila.insertCell();
    celdaPosicionamiento.innerHTML = equipo1[i].posicionamiento;

    let celdaTemperaturaPectoral = fila.insertCell();
    celdaTemperaturaPectoral.innerHTML = equipo1[i].temperaturaPectoral;

    let celdaQuite = fila.insertCell();
    celdaQuite.innerHTML = equipo1[i].quite;

    let celdaArquero = fila.insertCell();
    celdaArquero.innerHTML = equipo1[i].arquero;

    let celdaPromedioJugador = fila.insertCell();
    celdaPromedioJugador.innerHTML = equipo1[i].promedio;

    let celdaBtnEliminarE1 = fila.insertCell();
    let btnEliminarE1= `<button id="EliminarE1-${i}" class ="btnEliminar"> X </button>`;
    celdaBtnEliminarE1.innerHTML = btnEliminarE1;
    const botonE1 = document.getElementById(`EliminarE1-${i}`);
  // Agrego evento al botón capturado.
  botonE1.addEventListener("click", () => {
    const equipo = document.getElementById(`equipo-${i}`).value;
    eliminarJugadorEquipo1(i)({ ...equipo1[i], equipo: equipo });
});
  }

  // Actualizar tabla del equipo 2
  for (let i = 0; i < equipo2.length; i++) {
    let fila = tablaEquipo2.insertRow();

    let celdaNombre = fila.insertCell();
    celdaNombre.innerHTML = equipo2[i].nombre;

    let celdaGambeta = fila.insertCell();
    celdaGambeta.innerHTML = equipo2[i].gambeta;

    let celdaTecnica = fila.insertCell();
    celdaTecnica.innerHTML = equipo2[i].tecnica;

    let celdaDisparo = fila.insertCell();
    celdaDisparo.innerHTML = equipo2[i].disparo;

    let celdaEstadoFisico = fila.insertCell();
    celdaEstadoFisico.innerHTML = equipo2[i].estadoFisico;

    let celdaPosicionamiento = fila.insertCell();
    celdaPosicionamiento.innerHTML = equipo2[i].posicionamiento;

    let celdaTemperaturaPectoral = fila.insertCell();
    celdaTemperaturaPectoral.innerHTML = equipo2[i].temperaturaPectoral;

    let celdaQuite = fila.insertCell();
    celdaQuite.innerHTML = equipo2[i].quite;

    let celdaArquero = fila.insertCell();
    celdaArquero.innerHTML = equipo2[i].arquero;

    let celdaPromedioJugador = fila.insertCell();
  celdaPromedioJugador.innerHTML = equipo2[i].promedio;

  let celdaBtnEliminarE2 = fila.insertCell();
  let btnEliminarE2= `<button id="EliminarE2-${i}" " class ="btnEliminar"> X </button>`;
  celdaBtnEliminarE2.innerHTML = btnEliminarE2;
  const botonE2 = document.getElementById(`EliminarE2-${i}`);
// Agrego evento al botón capturado.
botonE2.addEventListener("click", () => {
  const equipo = document.getElementById(`equipo-${i}`).value;
  eliminarJugadorEquipo2(i)({ ...equipo2[i], equipo: equipo });
});

  }
}

// creo función para agregar objeto "jugador" mediante un formulario
function agregarJugador() {
      let nombreInput = document.getElementById("nombreInput");
      let disparoInput = document.getElementById("disparoInput");
      let gambetaInput = document.getElementById("gambetaInput");
      let tecnicaInput = document.getElementById("tecnicaInput");
      let posicionamientoInput = document.getElementById("posicionamientoInput");
      let estadoFisicoInput = document.getElementById("estadoFisicoInput");
      let temperaturaPectoralInput = document.getElementById("temperaturaPectoralInput");
      let quiteInput = document.getElementById("quiteInput");
      let arqueroInput = document.getElementById("arqueroInput");

      nombre = nombreInput.value;
      disparo = parseInt(disparoInput.value);
      gambeta = parseInt(gambetaInput.value);
      tecnica = parseInt(tecnicaInput.value);
      posicionamiento = parseInt(posicionamientoInput.value);
      estadoFisico = parseInt(estadoFisicoInput.value);
      temperaturaPectoral = parseInt(temperaturaPectoralInput.value);
      quite = parseInt(quiteInput.value);
      arquero = parseInt(arqueroInput.value);
      promedio = promediarHabilidades(disparo, gambeta, tecnica, posicionamiento, estadoFisico, temperaturaPectoral, quite, arquero);

// Verifica si los valores seleccionados están dentro del rango permitido
  if (
    disparo >= 1 && disparo <= 10 &&
    gambeta >= 1 && gambeta <= 10 &&
    tecnica >= 1 && tecnica <= 10 &&
    posicionamiento >= 1 && posicionamiento <= 10 &&
    estadoFisico >= 1 && estadoFisico <= 10 &&
    temperaturaPectoral >= 1 && temperaturaPectoral <= 10 &&
    quite >= 1 && quite <= 10 &&
    arquero >= 1 && arquero <= 10
  ) {
    let jugador = {
      nombre: nombre,
      disparo: disparo,
      gambeta: gambeta,
      tecnica: tecnica,
      posicionamiento: posicionamiento,
      estadoFisico: estadoFisico,
      temperaturaPectoral: temperaturaPectoral,
      quite: quite,
      arquero: arquero,
      promedio: promedio
    };
/// Agrego el objeto jugador al array lista de jugadores
listaJugadores.push(jugador);

// Guardo la lista de jugadores en el Local Storage
const listaJugadoresJSON = JSON.stringify(listaJugadores);
localStorage.setItem("lista de jugadores", listaJugadoresJSON);
  //actualizo
  actualizarTabla();
  limpiarFormulario();

  } else {
    // Mostrar un mensaje de error cuando los valores estén fuera de rango.
    Swal.fire({
      icon: 'error',
      text: 'Los valores de habilidad deben estar entre 1 y 10.',
    
    })
  }
}

  //funcion para actualizar tabla jugadores
    function actualizarTabla() {
      let tablaJugadores = document.getElementById("tablaJugadores");
      
      // Limpiar la tabla para seguir agregando jugadores
      while (tablaJugadores.rows.length > 1) {
        tablaJugadores.deleteRow(1);
      }
      let fila = tablaJugadores.insertRow();

      // recorro array para agregar jugadores a la tabla de html
      for (let i = 0; i < listaJugadores.length; i++) {
        let fila = tablaJugadores.insertRow();
        
        let celdaNombre = fila.insertCell();
        celdaNombre.innerHTML = listaJugadores[i].nombre;

        let celdaGambeta = fila.insertCell();
        celdaGambeta.innerHTML = listaJugadores[i].gambeta;

        let celdaTecnica = fila.insertCell();
        celdaTecnica.innerHTML = listaJugadores[i].tecnica;

        let celdaDisparo = fila.insertCell();
        celdaDisparo.innerHTML = listaJugadores[i].disparo;

        let celdaEstadoFisico = fila.insertCell();
        celdaEstadoFisico.innerHTML = listaJugadores[i].estadoFisico;

        let celdaPosicionamiento = fila.insertCell();
        celdaPosicionamiento.innerHTML = listaJugadores[i].posicionamiento;

        let celdaTemperaturaPectoral = fila.insertCell();
        celdaTemperaturaPectoral.innerHTML = listaJugadores[i].temperaturaPectoral;

        let celdaQuite = fila.insertCell();
        celdaQuite.innerHTML = listaJugadores[i].quite;

        let celdaArquero = fila.insertCell();
        celdaArquero.innerHTML = listaJugadores[i].arquero;

        let celdaPromedioJugador = fila.insertCell();
        celdaPromedioJugador.innerHTML = listaJugadores[i].promedio;
        let celdaSelEquipo= fila.insertCell();
        let selEquipo = `
  <div class="selEquipo">
    <select id="equipo-${i}">
      <option selected="true" value="1">Equipo 1</option>
      <option value="2">Equipo 2</option>
    </select>
  </div>
`;
        celdaSelEquipo.innerHTML = selEquipo;
        let celdaBtn = fila.insertCell();
        let btnAgregar = `<button id="agregar-${i}" class="bi bi-check-circle-fill btnAgregar"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg></button>`;
        celdaBtn.innerHTML = btnAgregar;
        const boton = document.getElementById(`agregar-${i}`);
		  // Agrego evento al botón capturado.
      boton.addEventListener("click", () => {
        const equipo = document.getElementById(`equipo-${i}`).value;
        agregarAlEquipo({ ...listaJugadores[i], equipo: equipo });
		});
    
    let celdaBorrarJugador = fila.insertCell();
    let btnBorrarJugador = `<button id="borrarJugador-${i}" " class ="btnEliminar"> X </button>`;
    celdaBorrarJugador.innerHTML = btnBorrarJugador;

    // Capturo el botón
    const botonBorrar = document.getElementById(`borrarJugador-${i}`);

    // Agrego un evento al botón capturado
    botonBorrar.addEventListener("click", () => {
      listaJugadores.splice(i, 1);
      
  // Guardo la lista de jugadores actualizada en el Local Storage
    const listaJugadoresJSON = JSON.stringify(listaJugadores);
    localStorage.setItem("lista de jugadores", listaJugadoresJSON);
    //actualizo
  
      actualizarTabla();
      limpiarFormulario();
    });
      }
      
      }

// Función para agregar jugador del array jugadores al equipo seleccionado
function agregarAlEquipo(jugador){
// Primero  verificio que no este en uno de los 2 equipos y luego lo agrego al equipo seleccionado
const buscoJugadorEquipo1 = equipo1.some(objeto => objeto.nombre == jugador.nombre);
const buscoJugadorEquipo2 = equipo2.some(objeto => objeto.nombre == jugador.nombre);
  if (buscoJugadorEquipo1 || buscoJugadorEquipo2) {
    Swal.fire({
      icon: 'error',
      text: 'El jugador ya forma parte de un equipo.',
    
    })
     }
      else if (jugador.equipo === "1") {
        equipo1.push(jugador);
        actualizarTablaEquipos();
        }
       else if (jugador.equipo === "2") { 
        equipo2.push(jugador);
        actualizarTablaEquipos();
      }
      actualizarTablaEquipos();
  }
    //funcion limpiar formulario para reutilizar el formulario
    function limpiarFormulario() {
      document.getElementById("formularioJugador").reset();
    }

    //escucho el evento click en boton crear jugador 
    document.getElementById("crearJugador").addEventListener("click", agregarJugador);

  // Actualizar todas las tablas
  actualizarTabla();

  // Actualiza la tabla de jugadores
  actualizarTabla();

/*------------------------------lógica para comparación de equipos---------------------------*/

//capturo botón de html para procesar datos y crear informe
let btnCompara = document.getElementById("btnCompara").addEventListener("click", comparacionEquipos);

//recorro los arrays de los equipos para sumar cada habilidad total por equipo 

function comparacionEquipos(){
  // //me aseguro que los equipos tengan la misma cantidad de jugadores
  if(equipo1.length != equipo2.length){
   
Swal.fire({
  icon: 'error',
  text: 'Los equipos no tienen la misma cantidad de jugadores!',

})
}
 else if (equipo1.length == equipo2.length){
  // declaro variables que almacenaran la suma de habilidades totales de los jugadores
//primero para equipo 1
let sumaGambetaE1 = 0;
let sumaDisparoE1 = 0;
let sumaTecnicaE1= 0;
let sumaPosicionamientoE1 = 0;
let sumaQuiteE1 = 0;
let sumaArqueroE1 = 0;
let sumaTemperaturaE1 = 0;
let sumaEstadoFE1 = 0;
let sumaPromedioE1 = 0;
//ahora para el equipo2
let sumaGambetaE2 = 0;
let sumaDisparoE2 = 0;
let sumaTecnicaE2= 0;
let sumaPosicionamientoE2 = 0;
let sumaQuiteE2 = 0;
let sumaArqueroE2 = 0;
let sumaTemperaturaE2 = 0;
let sumaEstadoFE2 = 0;
let sumaPromedioE2 = 0;
    

  for (let i=0; i < equipo1.length; i++){
    sumaGambetaE1 += equipo1[i].gambeta;
  }
  for (let i=0; i < equipo2.length; i++){
    sumaGambetaE2 += equipo2[i].gambeta;
  }
  for (let i=0; i < equipo1.length; i++){
    sumaDisparoE1 += equipo1[i].disparo;
  }
  for (let i=0; i < equipo2.length; i++){
    sumaDisparoE2 += equipo2[i].disparo;
  }
  for (let i=0; i < equipo1.length; i++){
    sumaTecnicaE1 += equipo1[i].tecnica;
  }
  for (let i=0; i < equipo2.length; i++){
    sumaTecnicaE2 += equipo2[i].tecnica;
  }
  for (let i=0; i < equipo1.length; i++){
    sumaEstadoFE1 += equipo1[i].estadoFisico;
  }
  for (let i=0; i < equipo2.length; i++){
    sumaEstadoFE2 += equipo2[i].estadoFisico;
  }
  for (let i=0; i < equipo1.length; i++){
    sumaPosicionamientoE1 += equipo1[i].posicionamiento;
  }
  for (let i=0; i < equipo2.length; i++){
    sumaPosicionamientoE2 += equipo2[i].posicionamiento;
  }
  for (let i=0; i < equipo1.length; i++){
    sumaTemperaturaE1 += equipo1[i].temperaturaPectoral;
  }
  for (let i=0; i < equipo2.length; i++){
    sumaTemperaturaE2 += equipo2[i].temperaturaPectoral;
  }
  for (let i=0; i < equipo1.length; i++){
    sumaQuiteE1 += equipo1[i].quite;
  }
  for (let i=0; i < equipo2.length; i++){
    sumaQuiteE2 += equipo2[i].quite;
  }
  for (let i=0; i < equipo1.length; i++){
    sumaArqueroE1 += equipo1[i].arquero;
  }
  for (let i=0; i < equipo2.length; i++){
    sumaArqueroE2 += equipo2[i].arquero;
  }
  for (let i=0; i < equipo1.length; i++){
    sumaPromedioE1 += equipo1[i].promedio;
    console.log("promedioe1", sumaPromedioE1);
  }
  for (let i=0; i < equipo2.length; i++){
    sumaPromedioE2 += equipo2[i].promedio;
    console.log("promedio e2", sumaPromedioE2)
  }


//creo variables para englobar tipos de atributos y establecer comparaciones

let atrOfensivosE1 = promediarSumas(sumaDisparoE1 , sumaGambetaE1);
let atrTecnicosE1 = promediarSumas(sumaTecnicaE1, sumaPosicionamientoE1);
let atrDefensivosE1 = promediarSumas (sumaQuiteE1 , sumaArqueroE1);
let atrFisicosyMentalesE1 = promediarSumas (sumaTemperaturaE1 , sumaEstadoFE1); 
let atrOfensivosE2 = promediarSumas (sumaDisparoE2 , sumaGambetaE2);
let atrTecnicosE2 = promediarSumas (sumaTecnicaE2 , sumaGambetaE2);
let atrDefensivosE2 = promediarSumas (sumaQuiteE2 , sumaArqueroE2);
let atrFisicosyMentalesE2 = promediarSumas (sumaTemperaturaE2 , sumaEstadoFE2); 

function mediaEquipos(sumaTotal) {
  let mediaEquipo = ( (sumaTotal) / 8 ) / (equipo1.length)  ;
  return mediaEquipo.toFixed(1);
}
// Calcula la suma total de habilidades para cada equipo
let sumaTotalEquipo1 = sumaDisparoE1 + sumaGambetaE1 + sumaTecnicaE1 + sumaPosicionamientoE1 + sumaQuiteE1 + sumaArqueroE1 + sumaTemperaturaE1 + sumaEstadoFE1;
let sumaTotalEquipo2 = sumaDisparoE2 + sumaGambetaE2 + sumaTecnicaE2 + sumaPosicionamientoE2 + sumaQuiteE2 + sumaArqueroE2 + sumaTemperaturaE2 + sumaEstadoFE2;

// Calcula la media para cada equipo
let mediaE1 = mediaEquipos(sumaTotalEquipo1);
let mediaE2 = mediaEquipos(sumaTotalEquipo2);

//comparo medias para pronosticar resultado, uso el metodo Math.abs para obtener el numero absoluo entre ambas medias
let diferenciaMedias = Math.abs(mediaE1 - mediaE2);

 // Creación de condicionales y textos para renderizar en mi informe

let resultadoOfensiva , resultadoTecnicos , resultadoDefensivo , resultadoFyM , comparaMedias; //creo variables para luego introducir mis textos

 //comparo resultados de atributos de equipos para mostrar 

if (atrOfensivosE1 > atrOfensivosE2){
  resultadoOfensiva = "El equipo 1 tiene más poder ofensivo. "
}else if( atrOfensivosE1 < atrOfensivosE2){
  resultadoOfensiva = " El equipo 2 tiene más poder ofensivo. "
}else{
  resultadoOfensiva = "Los equipos no se sacan ventajas en la faceta ofensiva. "
};

if (atrTecnicosE1 > atrTecnicosE2){
  resultadoTecnicos = "El equipo 1 tiene mejores capacidades técnicas. "
}else if( atrTecnicosE1 < atrTecnicosE2){
  resultadoTecnicos = " El equipo 2 tiene mejores capacidades técnicas. "
}else{
  resultadoTecnicos = "Los equipos no se sacan ventajas en la faceta técnica. "
};

if (atrDefensivosE1 > atrDefensivosE2){
  resultadoDefensivo = "El equipo 1 tiene mayores cualidades defensivas. "
}else if( atrDefensivosE1 < atrDefensivosE2){
  resultadoDefensivo = " El equipo 2 tiene mayores cualidades defensivas. "
}else{
  resultadoDefensivo = "Los equipos no se sacan ventajas en la faceta defensiva. "
};

if (atrFisicosyMentalesE1 > atrFisicosyMentalesE2){
  resultadoFyM = "En cuanto a la fortaleza física y mental, el equipo 1 es superior. "
}else if( atrFisicosyMentalesE1 < atrFisicosyMentalesE2){
  resultadoFyM = " En cuanto a la fortaleza física y mental, el equipo 2 es superior. "
}else{
  resultadoFyM = "En cuanto a la fortaleza física y mental, ambos equipos son similares. "
};

if (diferenciaMedias > 1) {
  comparaMedias = " En general el equipo 1 es mejor que el equipo 2 y deberia ganar.";
} else if (diferenciaMedias <= 1 && diferenciaMedias >= 0) {
  comparaMedias = "Los equipos son muy parejos, podria darse un empate o resultado estrecho. ";
} else {
  comparaMedias = "En general el equipo 2 es mejor que el equipo 1 y deberia ganar. ";
}

//creo gráficos con la libreria chart js, primero defino las funciones
  function crearGrafico() {
    let ctx = document.createElement("canvas").getContext("2d");
  
    let data = {
        labels: ["ATAQUE" , "DEFENSA" , " TECNICA" , "FISICO Y MENTALIDAD" , "MEDIA"],
        datasets: [{
            label: "EQUIPO 1",
            data: [atrOfensivosE1, atrDefensivosE1, atrTecnicosE1, atrFisicosyMentalesE1, mediaE1],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        },
        {
          label: "EQUIPO 2",
          data: [atrOfensivosE2, atrDefensivosE2, atrTecnicosE2, atrFisicosyMentalesE2, mediaE2],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
      }
      
      ]
    };
  
    let options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };
  
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
  
    return ctx.canvas;
  }
  
//Generar mi gráfico con la libreria Chart.js
  let chartCanvas = crearGrafico();
  chartCanvas.width = 150; 
  chartCanvas.height = 80; 
  
// Concateno textos de comparaciones para renderizar en mi Alert
let concatenacionResultados = resultadoOfensiva + "\n" + resultadoDefensivo + "\n" + resultadoTecnicos + "\n" + resultadoFyM + "\n" + comparaMedias;

// Creo el alert con la libreria sweet Alert 2
swal.fire({
  title: 'Informe comparativo de equipos',
  text: concatenacionResultados,
  didOpen: () => {
    Swal.getPopup().style.width = 'auto'; 
    Swal.getPopup().style.height = 'auto';
    Swal.getPopup().appendChild(chartCanvas);
}

})
}
}