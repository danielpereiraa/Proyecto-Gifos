
//Trendings

var  trendings = async (i) => {
  let fetch1= await fetch('https://api.giphy.com/v1/gifs/trending?api_key=VJJnUyLRY3b1yOqZrg6mgbGrvIjNOYhT&limit=3&rating=g')
    .then(response => response.json())
    .then(json => {
      console.log(json)

      let imgContainer = document.getElementById('imgContainer');
 
      let img = document.createElement('img');
        img.setAttribute('src', json.data[i].images.downsized.url);
        img.classList.toggle('trendingImg');
        imgContainer.appendChild(img);
    }).catch(e => {
      console.log(e.message);
    })

    
  }
//buscar la forma de no usar la segunda funcion
function iterateTrendings(){
  for(var i = 0; i < 3; i++){
      trendings(i)
  }}

iterateTrendings();

  
//Search

var caja = true

var caja_suggestion = () =>{
  var input = document.getElementById("search").value;
  var border = document.getElementById("search");
  console.log(input.length) 
  console.log(suggestion.length == 1);
 
  if (input.length !== 0 && caja){
    caja = false
    let caja_s = document.getElementById("suggestion");

    border.style.borderBottom = '1px solid #9CAFC3';
    
    caja_s.classList.toggle("show_caja");
  }else if (input.length == 0) {
    caja = true
    let caja_s = document.getElementById("suggestion")
    caja_s.classList.toggle("show_caja");
    border.style.borderBottom = 'none';
  }
}

var t = true

var xButton = () =>{
  let x_Button = document.getElementById("button");
  var suggestion = document.getElementById("search").value;
  console.log("xButton")

  if (suggestion.length !== 0 && t){
    console.log(t);
    t = false
    console.log(t);
    x_Button.classList.toggle("showButton");
  }else if (suggestion.length == 0) {
    t = true
    x_Button.classList.toggle("showButton");
  }
  
  console.log(x_Button)
}

var clean_input = () =>{
  document.getElementById("search").value = "";
  caja_suggestion();
  lupa();
  div_lupa();
  xButton();
}

var x = true

var lupa = () =>{
  var suggestion = document.getElementById("search").value;
  console.log(suggestion.length) 
  console.log(suggestion.length == 1);
 
  if (suggestion.length !== 0 && x){
    x = false
    let lupa = document.getElementById("lupa");
    lupa.classList.toggle("lupa");
  }else if (suggestion.length == 0) {
    x = true
    let lupa = document.getElementById("lupa");
    lupa.classList.toggle("lupa");
  }
}

  var validador= true;

  var div_lupa = () =>{
  let div_lupa = document.getElementById("lupa_div");
  var suggestion = document.getElementById("search").value;

  if (suggestion.length !== 0 && validador){
    console.log(t);
    validador = false
    console.log(t);
    div_lupa.classList.toggle("show_lupa");
  }else if (suggestion.length == 0) {
    validador = true
    div_lupa.classList.toggle("show_lupa");
    }  
  }

//sugerencias
var searchSuggestion = async() => {
  
  
  let inputVar = document.getElementById("search").value;
  console.log(inputVar)
  let fetch1= await fetch(`https://api.giphy.com/v1/gifs/search?api_key=VJJnUyLRY3b1yOqZrg6mgbGrvIjNOYhT&q=${inputVar}&limit=50&offset=0&rating=g&lang=en`)
  .then(response => response.json())
  .then(json => {
    
    console.log(json)

    

    

    if (suggestion.childNodes.length != 0){
      console.log(suggestion.textContent)
      suggestion.textContent = '';

    }
    iterateSuggestions(json);
    
      /*createSuggestionDiv = (i) =>{
        var respuesta = document.getElementById("searchResults");
        let img = document.createElement('img');
              img.setAttribute('src', json.data[i].images.downsized.url);
              img.classList.toggle('searchImg');
              console.log(img)
              respuesta.appendChild(img);
              console.log(img)
              console.log(respuesta)
      }
      iterateDivSuggestions = () =>{
        for(var i = 0; i < 12; i++){
          createSuggestionDiv(i)
        }
      }
      iterateDivSuggestions();
      createSuggestionDiv();*/
  }).catch(e => {
    console.log(e.message);
  })
}
var suggestion = document.getElementById("suggestion");
    
    
  createSuggestion = (i, json) =>{

    console.log(json.data[i].title)
    var newSuggestion = document.createElement("li");
    newSuggestion.id = 'suggestion' + i;

    var text = document.createTextNode(json.data[i].title);
    newSuggestion.appendChild(text);
    //  suggestion.style.display = "flex";
    suggestion.appendChild(newSuggestion);
    newSuggestion.setAttribute('onclick','click_sugerencia(event);');

  }
  iterateSuggestions = (json) =>{
    var miJson = json
    console.log(suggestion)
    console.log('iterate suggestion')
    
    for(var i = 0; i < 4; i++){
      //if(json.data[i].title.substr(0, inputVar.length).toUpperCase()== inputVar.toUpperCase()){
      createSuggestion(i, miJson)//}
    }
  }
  
  var click_sugerencia = (event) => {
    var sugerencias = event.target;
    console.log(sugerencias.textContent);
    document.getElementById("search").value = sugerencias.textContent;
    createSuggestionDiv();
    scroll();
  }

  var scroll = () =>{
    var divs = document.getElementById("searchResults");
    divs.scrollIntoView();
    console.log("scroll")
  }


  var search = document.getElementById("search");
  search.addEventListener("input", searchSuggestion);
  search.addEventListener("input", xButton);
  search.addEventListener("input", lupa);
  search.addEventListener("input", div_lupa);
  search.addEventListener("input", caja_suggestion);
  

// creating the search divs

var createSuggestionDiv = async() =>{


  let inputVar = document.getElementById("search").value;
  console.log(inputVar)
  let fetch1= await fetch(`https://api.giphy.com/v1/gifs/search?api_key=VJJnUyLRY3b1yOqZrg6mgbGrvIjNOYhT&q=${inputVar}&limit=50&offset=0&rating=g&lang=en`)
  .then(response => response.json())
  .then(json => {
    console.log(json)

    var searchTitle = document.getElementById("search_title");
    searchTitle.style.display = "flex";
    searchTitle.textContent = ""
    console.log(searchTitle.textContent);
    var text = document.createTextNode(document.getElementById("search").value)
    searchTitle.appendChild(text);

    var search_div = document.getElementById("gifs_container");
    search_div.style.display = "flex";

    var ver_mas = document.getElementById('ver_mas');
    console.log(ver_mas)
    ver_mas.style.display = "flex";
    //ver_mas.onclick=iterateDivSuggestions(json);
    //ver_mas.addEventListener("click", ver_mas_button)

    iterateDivSuggestions(json);

  }).catch(e => {
    console.log(e.message);
  })
}

var primerosGifs = (i, json) =>{
  var respuesta = document.getElementById("gifs_container");
  var img_div = document.createElement('div');
  img_div.id = 'img_div' + i; 
  img_div.className = 'img_shade';
  
  img_div.addEventListener("mouseenter", clickeables);
  img_div.addEventListener("mouseleave", desclickeables);

  let img = document.createElement('img');
  img.setAttribute('src', json.data[i].images.downsized.url);
  img.classList.toggle('searchImg');
  img_div.appendChild(img);
  respuesta.appendChild(img_div);

   var title = document.createElement("h3")
   var text = document.createTextNode(json.data[i].title);
   if(text.textContent == ""){
    text.textContent = "Unknown"
   }
   var strig =JSON.stringify(json.data[i].title)

   title.id = strig.substring(0,8);
   title.appendChild(text);
   img_div.appendChild(title); 

   var user = document.createElement("h4");
   var text_user = document.createTextNode(json.data[i].username);

   if(text_user.textContent == ""){
    text_user.textContent = "Unknown"
   }
   var strig_user =JSON.stringify(json.data[i].username)
   user.id = strig_user.substring(0,5);
   user.appendChild(text_user);
   img_div.appendChild(user); 
   
}

var inicio = 0;
var final = 12

var iterateDivSuggestions = (json) =>{
  var miJson = json;

  for(var i = inicio; i < final; i++){
    primerosGifs(i, miJson)
  }
  console.log(inicio);
  console.log(final);
  inicio += 12;
  final +=12;
  console.log(inicio);
  console.log(final);
}


search.addEventListener("keydown", (event) => { 
  const keyName = event.key;
  if (keyName == "Enter") {
  createSuggestionDiv();
  scroll();  
  }
});


 

//Ver mas

var ver_mas_button = () =>{
  console.log(inicio);
    console.log(final);
    if(final > 50){
      ver_mas.style.display = "none";
    }else{
    createSuggestionDiv()
    }
}

var ver_mas = document.getElementById('ver_mas');
ver_mas.addEventListener("click", ver_mas_button);



//Mouseover

var clickeables = (event) =>{

  var parent = event.target;
  //var parent = img.parentElement;
  //console.log(img);
  console.log(parent);
  var img = parent.firstChild;

  var title = parent.getElementsByTagName("h3")[0];
  console.log(title);
  title.style.display= "flex";

  var username = parent.getElementsByTagName("h4")[0];
  console.log(username);
  username.style.display= "flex";
 

  if(parent.childNodes.length < 4){



    var buttons_container = document.createElement("div")
  buttons_container.className = 'tres_botones';
  buttons_container.id = "tres_botones" + parent.id;
  buttons_container.addEventListener("mouseover", boton_hover);
  buttons_container.addEventListener("mouseout", boton_unhover);

  var corazon = document.createElement('img');
  corazon.src = "images/icon-fav.svg";
  corazon.className = 'mini_button';
  corazon.addEventListener("click", corazon_button);
  corazon.addEventListener("mouseover", corazon_hover);
  corazon.addEventListener("mouseout", corazon_unhover);

  var descargar = document.createElement('img');
  descargar.src = "images/icon-download.svg";
  descargar.className = 'mini_button';
  descargar.addEventListener("mouseover", descargar_hover);
  descargar.addEventListener("mouseout", descargar_unhover);
  var a = document.createElement('a');
  a.href =  img.src;
  a.setAttribute('download',"download");  
   
  var ampliar = document.createElement('img');
  ampliar.src = "images/icon-max-normal.svg";
  ampliar.className = 'mini_button';
  ampliar.id = "order"
  ampliar.addEventListener("mouseover", ampliar_hover);
  ampliar.addEventListener("mouseout", ampliar_unhover);
  ampliar.addEventListener("click", ampliar_button);
  var text = document.createTextNode("x");

  corazon.appendChild(text);
  
  buttons_container.appendChild(corazon);
  buttons_container.appendChild(ampliar);
  a.appendChild(descargar);
  buttons_container.appendChild(a);
    
  parent.appendChild(buttons_container)
  console.log(parent.childNodes.length)

 
  }else{
    var buttons_container = document.getElementById('tres_botones' + parent.id);
    if(buttons_container == null){
      console.log("daniel hc")
      console.log(img.id)
      return
      }
    console.log(img);
    console.log(parent);
    buttons_container.style.display = "flex";
  }


  //var tresbotones = document.getElementById(tres_botones);
  //tresbotones.classList.toggle('show_tresBotones');
}

var desclickeables = (event) =>{
  console.log('hola eli')
  var parent = event.target;
  
  var title = parent.getElementsByTagName("h3")[0];
  console.log(title);
  title.style.display= "none";

  var username = parent.getElementsByTagName("h4")[0];
  console.log(username);
  username.style.display= "none";

  console.log(parent);
  console.log(parent.childNodes.length);
  if(parent.childNodes.length > 1){
  var buttons_container = document.getElementById('tres_botones' + parent.id)
  buttons_container.style.display = "none";
  console.log(buttons_container)
  }
}

//Tres Botones Hover


var boton_hover = (e) =>{
  var div = e.target;
  if(div.childNodes.length > 2){
    var container = div.parentElement;
    var img = container.firstChild;
    img.classList.toggle("img_opacity")
    console.log(div);
    console.log(container);

    console.log(img);
  }
}
var boton_unhover = (e) =>{
  var div = e.target;
  if(div.childNodes.length > 2){
    var container = div.parentElement;
    var img = container.firstChild;
    img.classList.toggle("img_opacity")
    console.log(div)
  }
}

//Boton de corazon

var corazon_button = (e) => {
  var boton = e.target;
  boton.src = "images/icon-fav-active.svg"
  var parent = boton.parentElement;
  var gif = parent.parentElement;
  var img = gif.firstChild
  console.log(img.src);
  console.log(gif);

  var title = gif.getElementsByTagName("h3")[0].textContent;
  console.log(title);
  var user = gif.getElementsByTagName("h4")[0].textContent;
  var favorite_info = [img.src, title, user];
  var string_way = JSON.stringify(favorite_info)
  var test = JSON.parse(string_way);

  console.log(favorite_info);
  console.log(string_way);
  console.log(test);


  localStorage.setItem(parent.id + title, string_way);
}

var corazon_hover = (e) =>{
  var boton = e.target;
  boton.src = "images/icon-fav-hover.svg"
  var parent = boton.parentElement;
  var img_div= parent.parentElement;
  var img = img_div.firstChild;
  img.classList.toggle("img_opacity")
  console.log(parent);
  console.log(boton);
  console.log(img_div);
}

var corazon_unhover = (e) =>{
  var boton = e.target;
  boton.src = "images/icon-fav.svg"
  var parent = boton.parentElement;
  var img_div= parent.parentElement;
  var img = img_div.firstChild;
  img.classList.toggle("img_opacity")
}

// Boton de descarga

var descargar_hover = (e) => {
  var boton = e.target;
  boton.src = "images/icon-download-hover.svg";
  var a = boton.parentElement;
  var parent = a.parentElement;
  var img_div= parent.parentElement;
  var img = img_div.firstChild;
  img.classList.toggle("img_opacity")
  console.log(boton)
  console.log(parent)
  console.log(img_div)
  console.log(img)

}
var descargar_unhover = (e) => {
  var boton = e.target;
  boton.src = "images/icon-download.svg";
  var a = boton.parentElement;
  var parent = a.parentElement;
  var img_div= parent.parentElement;
  var img = img_div.firstChild;
  img.classList.toggle("img_opacity")
  console.log(boton)

}

// Boton dse ampliar

 var ampliar_button = (e) =>{
  var boton = e.target;
  var div = boton.parentElement;
  var padre = div.parentElement;
  //var contenedor = document.getElementById('searchResults')
  var gif = padre.firstChild;
  console.log(div);

  padre.classList.toggle("container_original");
  gif.classList.toggle("img_original");

  boton.style.display = 'none';
  div.classList.toggle("botones_original");
  console.log(div)
  //contenedor.style.display = 'none';  

  var cerrar = document.createElement('button');
  cerrar.id =  'cerrar_button'
  var text = document.createTextNode("X");
  cerrar.appendChild(text);
  padre.appendChild(cerrar)

  cerrar.addEventListener('click', cerrar_img)
 }

 var cerrar_img = (e) =>{
  var boton = e.target;
  var padre = boton.parentElement;
  var gif = padre.firstChild;
  console.log(gif);
  console.log(padre);

  padre.classList.toggle("container_original");
  gif.classList.toggle("img_original");
  boton.style.display = 'none';
  console.log(gif);
  console.log(padre);

  var boton_agrandar = padre.children[1].children[1];
  console.log(boton_agrandar);
  boton_agrandar.style.display = 'block';
  console.log(boton_agrandar);

  var botons_div = boton_agrandar.parentElement;
  botons_div.classList.toggle("botones_original");
  console.log(botons_div);
 }

 
 var ampliar_hover = (e) =>{
  var boton = e.target;
  boton.src = "images/icon-max-hover.svg";
  var parent = boton.parentElement;
  var img_div= parent.parentElement;
  var img = img_div.firstChild;
  img.classList.toggle("img_opacity")
  console.log(boton)

 }
 var ampliar_unhover = (e) =>{
  var boton = e.target;
  boton.src = "images/icon-max-normal.svg";
  var parent = boton.parentElement;
  var img_div= parent.parentElement;
  var img = img_div.firstChild;
  img.classList.toggle("img_opacity")
  console.log(boton)
}

 //Favoritos


var favs = "favoritos_container";
var gif = "mis_gifos_container";

var show_guardados = (e) =>{


  var section_title = document.getElementById("top");
  var section_search = document.getElementById("searchResults");
  var section_favoritos = document.getElementById("favoritos");
  var section_misgifos = document.getElementById("mis_gifos");
  var contenedor_favoritos = document.getElementById("favoritos_container");
  var contenedor_mis_gifos = document.getElementById("mis_gifos_container");

  section_title.style.display = 'none';
  section_search.style.display = 'none';


  var evento = e.target;
  console.log(contenedor_favoritos.childNodes.length == 0);



  if(evento.textContent == "FAVORITOS"){
    section_favoritos.style.display = 'flex';
    section_misgifos.style.display = 'none';
      if(contenedor_favoritos.childNodes.length == 0){
      console.log("why");
      get_guardados();
      console.log("why");
      }  
  }else{
    section_favoritos.style.display = 'none';
    section_misgifos.style.display = 'flex';
    if(contenedor_mis_gifos.childNodes.length == 0){
     // get_guardados();
      console.log("why");

      }  
  }




  if(localStorage.length > 12){    

  var ver_mas = document.getElementById('ver_mas_fav');
  console.log(ver_mas)
  ver_mas.style.display = "flex";
  }

}

var primerosfavoritos = (i, info) =>{

  var respuesta = document.getElementById("favoritos_container");
  var img_div = document.createElement('div');
  img_div.id = 'Fav' + i; 
  img_div.className = 'img_shade';
  img_div.addEventListener("mouseenter", clickeables_fav);
  img_div.addEventListener("mouseleave", desclickeables_fav);

var url = info[0];

  let img = document.createElement('img');
        img.setAttribute('src', url);
        img.classList.toggle('searchImg');
        img_div.appendChild(img);
        respuesta.appendChild(img_div);

var text = document.createTextNode(info[1]);
console.log(text);
var title = document.createElement("h3")
title.appendChild(text);
img_div.appendChild(title);

var user_text = document.createTextNode(info[2]);
console.log(user_text);
var user = document.createElement("h4")
user.appendChild(user_text);
img_div.appendChild(user);

console.log(user);
}

var clickeables_fav = (e) => {
  var parent = e.target;
  var img = parent.firstChild;
  
  var title = parent.getElementsByTagName("h3")[0];
  console.log(title);
  title.style.display= "flex";

  var username = parent.getElementsByTagName("h4")[0];
  console.log(username);
  username.style.display= "flex";


  if(parent.childNodes.length < 4){
    var buttons_container = document.createElement("div")
    buttons_container.className = 'tres_botones';
    buttons_container.id = "tres_botones" + parent.id;
    buttons_container.addEventListener("mouseover", boton_hover);
    buttons_container.addEventListener("mouseout", boton_unhover);

    var corazon = document.createElement('img');
    corazon.src = "images/icon-fav.svg";
    corazon.className = 'mini_button';
    corazon.addEventListener("click", corazon_button);
    corazon.addEventListener("mouseover", corazon_hover);
    corazon.addEventListener("mouseout", corazon_unhover);

    var descargar = document.createElement('img');
    descargar.src = "images/icon-download.svg";
    descargar.className = 'mini_button';
    descargar.addEventListener("mouseover", descargar_hover);
    descargar.addEventListener("mouseout", descargar_unhover);
    var a = document.createElement('a');
    a.href =  img.src;
    a.setAttribute('download',"download");  
    
    var ampliar = document.createElement('img');
    ampliar.src = "images/icon-max-normal.svg";
    ampliar.className = 'mini_button';
    ampliar.id = "order"
    ampliar.addEventListener("mouseover", ampliar_hover);
    ampliar.addEventListener("mouseout", ampliar_unhover);
    ampliar.addEventListener("click", ampliar_button);
    var text = document.createTextNode("x");

    corazon.appendChild(text);

    buttons_container.appendChild(corazon);
    buttons_container.appendChild(ampliar);
    a.appendChild(descargar);
    buttons_container.appendChild(a);
      
    parent.appendChild(buttons_container)
    console.log(parent.childNodes.length)

    }else{
      var buttons_container = document.getElementById('tres_botones' + parent.id);
      if(buttons_container == null){
        console.log("daniel hc")
        console.log(img.id)
        return
      }
      console.log(img);
      console.log(parent);
      buttons_container.style.display = "flex";
    }
}

var desclickeables_fav = (e) => {
  var parent = e.target;
  var img = parent.firstChild;
  console.log(parent);

  var botones = parent.getElementsByTagName("div")[0];
  botones.style.display= "none";
  
  var title = parent.getElementsByTagName("h3")[0];
  console.log(title);
  title.style.display= "none";

  var username = parent.getElementsByTagName("h4")[0];
  console.log(username);
  username.style.display= "none";

}

var inicio_fav = 0;
var final_fav = 12

var favs_array = [];
var mis_gifos_array = [];

var favoritos_localstorage = () =>{
  for (var i=0; i < localStorage.length; i++){  
    key = localStorage.key(i);
    console.log(key)
    if(key.includes("tres_botones")){
      favs_array.push(key);
    }
    console.log(favs_array)
 } 
}

favoritos_localstorage();

var mis_gifos_localstorage = () =>{
  for (var i=0; i < localStorage.length; i++){  
    key = localStorage.key(i);
    console.log(key)
    if(!key.includes("tres_botones")){
      mis_gifos_array.push(key);
    }
    console.log(mis_gifos_array)
 } 
}

mis_gifos_localstorage();


var get_guardados = () => {


  var respuesta = document.getElementById("favoritos_container");
  respuesta.className = "row-direction";

  if (localStorage.length == 0){
    respuesta.classList.toggle("direction")
    var img= document.createElement('img');
    img.src = "images/icon-fav-sin-contenido.svg";
    img.id = "no_favs"
    var mensaje = document.createElement('div');
    mensaje.id = "no_favs_msj"
    var text = document.createTextNode('"¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"')

    respuesta.appendChild(img);
    mensaje.appendChild(text);
    respuesta.appendChild(mensaje);

  }else{
    if(final_fav < localStorage.length){
      for (var i = inicio_fav; i < final_fav; i++) {
        var key = localStorage.key(i);
        var info = JSON.parse(localStorage.getItem(key));

        primerosfavoritos(i, info);
        }  
      inicio_fav += 12;
      final_fav += 12;

    }else{
      for (var i = inicio_fav; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var info = JSON.parse(localStorage.getItem(key));
        console.log(info);
        console.log('"'+ localStorage.getItem(key) + '"');
        console.log(info);

        primerosfavoritos(i, info);
        }  
      inicio_fav += 12;
      final_fav += 12;
      ver_mas_bfav.style.display = "none";
    }   
  }
}

var boton_fav = document.getElementById("favorito");
boton_fav.addEventListener('click', show_guardados);

var boton_mis_gifos = document.getElementById("boton_mis_gifos");
boton_mis_gifos.addEventListener('click', show_guardados);



  //Ver mas
var ver_mas_fav = () =>{
  get_guardados();
}

var ver_mas_bfav = document.getElementById('ver_mas_fav');
ver_mas_bfav.addEventListener("click", ver_mas_fav);



//CREAR GIFO

var crear_gif = () =>{
  var section_title = document.getElementById("top");
  var section_search = document.getElementById("searchResults");
  var section_favoritos = document.getElementById("favoritos");
  var section_trending = document.getElementById("gif");
  var section_crear_gif = document.getElementById("crear_gif");

  section_title.style.display = 'none';
  section_search.style.display = 'none';
  section_favoritos.style.display = 'none';
  section_trending.style.display = 'none';
  section_crear_gif.style.display = 'flex';

}

var acceso_camara = () =>{
  var title = document.getElementById('crear_gifos_h2');
  if(title.textContent == "Aquí podrás crear tus propios GIFOS"){
    
    title.textContent = "¿Nos das acceso a tu cámara?"

    var p = document.getElementById('crear_gifos_p');
    p.textContent = "El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO."

    var paso1 = document.getElementById('paso1');
    paso1.classList.toggle('pasos_hover');

    var comenzar = document.getElementById('comenzar');
    comenzar.style.display = "none"
  }
}

var global = 0;
let recorder;
var blob;
  
//funciones

var comenzar_grabacion = () =>{

    var title = document.getElementById('crear_gifos_h2');
    title.style.display = "none";
    var p = document.getElementById('crear_gifos_p');
    p.style.display = "none";

    var paso1 = document.getElementById('paso1');
    if(paso1.classList.contains("pasos_hover")){
      paso1.classList.toggle('pasos_hover');
    }
    
    console.log("WUP")

    var paso2 = document.getElementById('paso2');
    if(!paso2.classList.contains("pasos_hover")){
    paso2.classList.toggle('pasos_hover')
    }

    comenzar.textContent = "GRABAR"
    comenzar.style.display = "block"
};

var create_file = () =>{

      blob = recorder.getBlob();

      let form = new FormData();
      form.append('file', blob, 'myGif.gif');

};

var stop_and_post = () => {

    recorder.stopRecording(create_file)
};

var grabar_video = () =>{
      console.log("hi");
      recorder.startRecording();
      startStop();

      comenzar.textContent = "FINALIZAR";
      comenzar.style.display = "block";

      
      if(global == 0){
        comenzar.addEventListener("click",stop_and_post);
      }

      global_fun = stop_and_post;
    }

var finalizar_grabacion = () =>{
  var repetir = document.getElementById('rep');
  
  repetir.classList.toggle("show_repetir");
  repetir.className = 'repetir';


  var contador = document.getElementById('segundos');
  var contador_min = document.getElementById('minutos');
  contador.style.display = "none"
  contador_min.style.display = "none"



  repetir.addEventListener("click", repetir_captura)

  startStop();
  console.log("hello");
  comenzar.textContent = "SUBIR GIFO";
  comenzar.style.display = "block";
  recorder.stopRecording(function(){
  console.log("damn")
  })


}

var repetir_captura = () => {
  console.log("repetir Cap");

  var contador = document.getElementById('segundos');
  var contador_min = document.getElementById('minutos');
  var repetir = document.getElementById('rep');
  
  repetir.classList.toggle("show_repetir");
  contador.style.display = "inline"
  contador_min.style.display = "inline"

  contador.innerHTML = '00';
  comenzar_grabacion();

}

var subir_gifo = () =>{
  var video = document.getElementById('video_gif');
  video.classList.toggle('img_opacity');
  video.style.opacity = "0.6";
  
  var paso2 = document.getElementById('paso2');
  paso2.classList.toggle('pasos_hover');
  
  var paso3 = document.getElementById('paso3');
  paso3.classList.toggle('pasos_hover');

  var repetir = document.getElementById('counter')
  repetir.style.display = 'none';
  comenzar.style.display = "none";

  var subiendo_div = document.createElement("div");
  subiendo_div.id = "subiendo_div";

  var loader = document.createElement("img");
  loader.src= "images/loader.svg";
  loader.id = "loader";
  
  var subiendo = document.createElement("p");
  subiendo.id = "subiendo_title"

  var text = document.createTextNode("Estamos subiendo tu GIFO");

  subiendo.appendChild(text)
  subiendo_div.appendChild(loader);
  subiendo_div.appendChild(subiendo);

  var div = document.getElementById("base");
  div.appendChild(subiendo_div);


  post_gif();
  }

var gifo_subido = () =>{
  setTimeout(function(){
    img = document.getElementById('loader');
    img.src = "images/check.svg"
    document.getElementById('subiendo_title').innerHTML = "GIFO subido con éxito";
    }, 3000);
  }

var get_info = (id) =>{
  let fetch1= fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=VJJnUyLRY3b1yOqZrg6mgbGrvIjNOYhT`)
    .then(response => response.json())
    .then(json => {
      console.log(json);

      localStorage.setItem(json.data.id, json.data.url);      


    }).catch(e => {
      console.log(e.message);
    })
  
}

function getStreamAndRecord () { 
  
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {width: 480, height: 320}
    })
  .then(async function(stream) {

    var video = document.getElementById('video_gif');
    video.srcObject  = stream;
    video.play()
    video.style.display = "block";
    
    var base = document.getElementById('base');
    base.style.display = "block";

      recorder = RecordRTC(stream, {
      type: 'gif',
      frameRate: 1,
      quality: 10,
      width: 320,
      hidden: 240,
      onGifRecordingStarted: function() {
      console.log('started')
      },
    });

    
    if(comenzar.textContent == "COMENZAR"){

      comenzar_grabacion();

    }else if(comenzar.textContent == "GRABAR"){

      grabar_video();
    
    }else if(comenzar.textContent == "FINALIZAR"){
      
      finalizar_grabacion();
      
    }else if(comenzar.textContent == "SUBIR GIFO"){

      subir_gifo();
    }
  })
}

var post_gif = async () =>{

  let form = new FormData();
  form.append('file', blob, 'myGif.gif');

  
  console.log(form.get('file'));
  var endpoint = 'https://upload.giphy.com/v1/gifs?api_key=VJJnUyLRY3b1yOqZrg6mgbGrvIjNOYhT';
  await fetch(endpoint, {
    method: "post",
    body: form,
  }).then(resp => resp.json())
    .then(json => {
      console.log(json);
      console.log('floa');
      console.log(json.data[0]);
      gifo_subido();
      get_info(json.data.id);
      
    })
    .catch(console.error);
};

var comenzar = document.getElementById('comenzar');
comenzar.addEventListener("click", acceso_camara);
comenzar.addEventListener("click", getStreamAndRecord);



// Counter

var startstop = 0;

var startStop= () => {
  console.log(startstop);
  console.log("STARt stop func")
  startstop = startstop + 1;

  if (startstop === 1) {
    counter();
  } else if (startstop === 2) {
    startstop = 0;
    console.log(startstop);

    stop();
  }
}

  var timer;
var counter = () =>{
  console.log('fas');
  timer = setInterval(my_timer, 1000);
}

var stop = () =>{
  clearInterval(timer);
}

var segundos = 0;
var secOut = 0;

var my_timer = () =>{

  if(segundos < 5){
    secOut = checkTime(segundos); 
    segundos= ++segundos;

    document.getElementById("segundos").innerHTML = secOut;
  }else{
    stop();
    console.log(global_fun)
    global_fun();
    console.log(global_fun)

    segundos = 0;
    secOut = 0;
  }
}

var checkTime = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};



//Mis GIFOS



