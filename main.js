//Trendings

var  trendings = async (i) => {
  let fetch1= await fetch('https://api.giphy.com/v1/gifs/trending?api_key=VJJnUyLRY3b1yOqZrg6mgbGrvIjNOYhT&limit=3&rating=g')
    .then(response => response.json())
    .then(json => {
      console.log(json)

      let trending_container = document.getElementById('imgContainer');

      var img_div = document.createElement('div');

      img_div.id = 'trending_div' + i; 
      img_div.className = 'trending_shade';
  
      img_div.addEventListener("mouseenter", clickeables);
      img_div.addEventListener("mouseleave", desclickeables);
 
      let img = document.createElement('img');
      img.setAttribute('src', json.data[i].images.downsized.url);
      img.classList.toggle('trendingImg');
      img_div.appendChild(img);
      

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
      user.appendChild(text_user);
      img_div.appendChild(user); 


      trending_container.appendChild(img_div);



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

var busqueda_sin_contenido = () =>{

  clean_input();

 

  var respuesta = document.getElementById("sin_resultado");
  respuesta.classList.toggle("direction")

  var title= document.createElement('h5');
  title.id = "ipsum"
  var text_title = document.createTextNode("Lorem Ipsum");
  title.appendChild(text_title);

  var img= document.createElement('img');
  img.src = "images/icon-busqueda-sin-resultado.svg";
  img.className = "no_favs"
  var mensaje = document.createElement('div');
  mensaje.className = "no_favs_msj"
  var text = document.createTextNode('Intenta con otra búsqueda.');
  
  respuesta.appendChild(title);

  respuesta.appendChild(img);
  mensaje.appendChild(text);
  respuesta.appendChild(mensaje);
}

var searchSuggestion = async() => {
  
  
  let inputVar = document.getElementById("search").value;
  console.log(inputVar)
  let fetch1= await fetch(`https://api.giphy.com/v1/gifs/search?api_key=VJJnUyLRY3b1yOqZrg6mgbGrvIjNOYhT&q=${inputVar}&limit=50&offset=0&rating=g&lang=en`)
  .then(response => response.json())
  .then(json => {

    console.log(json);

    console.log(json.data.length == 0);
    console.log(json.data);


    if (suggestion.childNodes.length != 0){
      suggestion.textContent = '';

    }

  
      iterateSuggestions(json);
    

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
    if(json.data.length == 0){
      busqueda_sin_contenido();
      console.log("didit");
    }else{  

    document.getElementById("div_parrafo").style.display = "none";
  
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
    scroll()
    iterateDivSuggestions(json);
    }
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

var ver_mas_hover = document.getElementById('ver_mas_hover');



ver_mas_hover.addEventListener('mouseover', function(){
  ver_mas_hover.src = "images/CTA-ver-mas-hover.svg"
})
ver_mas_hover.addEventListener('mouseout', function(){
  ver_mas_hover.src = "images/CTA-ver-mas.svg"
})





//Mouseover

var clickeables = (event) =>{

  var parent = event.target;

  console.log(parent);
  var img = parent.firstChild;

  var title = parent.getElementsByTagName("h3")[0];
 // title.id = "title_gif";
  console.log(title);
  title.style.display= "flex";

  var username = parent.getElementsByTagName("h4")[0];
  //username.id = "user_gif";

  console.log(username);
  username.style.display= "flex";
 

  if(parent.childNodes.length < 4){



  var buttons_container = document.createElement("div")
  buttons_container.className = 'tres_botones';
  buttons_container.id = "tres_botones" + parent.id;
  buttons_container.addEventListener("mouseover", boton_hover);
  buttons_container.addEventListener("mouseout", boton_unhover);

  if(parent.classList.contains("trending_shade")){
    buttons_container.classList.toggle("tres_botones");
    buttons_container.classList.toggle("tres_botones_trending");

  }


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


  (async () => {
    let response = await fetch(img.src);
    let file = await response.blob();
    a.setAttribute('download',"");  
    a.className = "mini_boton"

    a.href = window.URL.createObjectURL(file);
  })();

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
  var parent = event.target;
  console.log(parent)
  if(parent.classList.contains('container_original')){
    console.log("sheeeeesh")
  }else{
 
  
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

var scroll_top = () =>{                                                                                                                           
  var divs = document.getElementById("logo_img");
  divs.scrollIntoView();
  console.log("scroll")
}

 var ampliar_button = (e) =>{

  document.getElementById("gif").style.display = "none";
  document.getElementsByTagName("footer")[0].style.display = "none";
  document.getElementById("searchResults").style.display = "none";
  document.getElementById("favoritos").style.display = "none";
  document.getElementById("mis_gifos").style.display = "none";


  scroll_top();
  var boton = e.target;
  var div = boton.parentElement;
  var padre = div.parentElement;
  var gif = padre.firstChild;
  console.log(padre);
  var fondo = document.getElementById("fondo")
  fondo.style.display= "block";

  var imagen = document.createElement('img');
  imagen.classList.toggle("img_original");
  imagen.src = gif.src
  console.log(imagen.src)

  fondo.appendChild(imagen);
  
  var gif_name = padre.getElementsByTagName('h3')[0].textContent;
  var user_name = padre.getElementsByTagName('h4')[0].textContent;

  var name = document.createElement("h3");
  name.className= "name_ampliado";
  name.innerHTML = gif_name;
  fondo.appendChild(name);

  var user = document.createElement("h4");
  user.className= "user_ampliado";
  user.innerHTML = user_name;
  fondo.appendChild(user);

//
 // boton.style.display = 'none';
  //div.classList.toggle("botones_original");
  //console.log(div)
//
  var cerrar = document.createElement('img');
  cerrar.id =  'cerrar_button'
  cerrar.src = "images/close.svg";
  fondo.appendChild(cerrar)
  
  cerrar.addEventListener('click', cerrar_img)

  var buttons_container = document.createElement("div")
  buttons_container.className = "tres_botones";
  buttons_container.id = "tres_botones_ampliado";
  buttons_container.addEventListener("mouseover", boton_hover);
  buttons_container.addEventListener("mouseout", boton_unhover);

  var corazon = document.createElement('img');
  corazon.src = "images/icon-fav.svg";
  corazon.className = 'mini_button_ampliado';
  corazon.addEventListener("click", corazon_button);
  corazon.addEventListener("mouseover", corazon_hover);
  corazon.addEventListener("mouseout", corazon_unhover);

  var text = document.createTextNode("x");

  corazon.appendChild(text);

  var descargar = document.createElement('img');
  descargar.src = "images/icon-download.svg";
  descargar.className = 'mini_button';
  descargar.addEventListener("mouseover", descargar_hover);
  descargar.addEventListener("mouseout", descargar_unhover);
  let a = document.createElement('a');

  (async () => {
    let response = await fetch(imagen.src);
    let file = await response.blob();
    a.setAttribute('download',"");  
    a.href = window.URL.createObjectURL(file);
  })();

  
  buttons_container.appendChild(corazon);
  a.appendChild(descargar);
  buttons_container.appendChild(a);
    
  fondo.appendChild(buttons_container);


 }

 var cerrar_img = (e) =>{
  
  window.location.reload();


  var boton = e.target;
  var padre = boton.parentElement;
  var gif = padre.firstChild;
  console.log(gif);
  console.log(padre);
  padre.innerHTML = "";
  padre.style.display = "none";


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
  var section_crear_gif = document.getElementById("crear_gif");
  var section_trending = document.getElementById("gif");



  var contenedor_favoritos = document.getElementById("favoritos_container");
  var contenedor_mis_gifos = document.getElementById("mis_gifos_container");

  section_title.style.display = 'none';
  section_search.style.display = 'none';
  section_crear_gif.style.display = 'none';
  section_trending.style.display = 'flex';


  var evento = e.target;
  console.log(contenedor_favoritos.childNodes.length);



  if(evento.textContent == "FAVORITOS"){
    if(favs_array.length == 0){
      favoritos_localstorage();
    }
    section_favoritos.style.display = 'flex';
    section_misgifos.style.display = 'none';
    if(contenedor_favoritos.childNodes.length == 0){
    console.log("why");
    get_favoritos(evento);

    if(favs_array.length > 12){    
      var ver_mas_fav = document.getElementById('ver_mas_fav');
      console.log(ver_mas_fav)
      ver_mas_fav.style.display = "flex";
      }
    }  

   

  }else{
    if(mis_gifos_array.length == 0){
      mis_gifos_localstorage();
    }
    section_favoritos.style.display = 'none';
    section_misgifos.style.display = 'flex';
    if(contenedor_mis_gifos.childNodes.length == 0){
      get_mis_gifos(evento);
      if(mis_gifos_array.length > 12){    
        var ver_mas_gifos = document.getElementById('ver_mas_mis_gifos');
        console.log(mis_gifos_array.length)
        ver_mas_gifos.style.display = "flex";
        }
      }  
  }

  console.log(favs_array.length)


  console.log(mis_gifos_array.length)


}

var primeros_guardados = (i, info, respuesta ) =>{

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
    let a = document.createElement('a');
  
  
    (async () => {
      let response = await fetch(img.src);
      let file = await response.blob();
      a.setAttribute('download',"");  
      a.href = window.URL.createObjectURL(file);
    })();


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
var final_fav = 12;

var inicio_mis_gifos = 0;
var final_mis_gifos = 12;

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

var favoritos_sin_contenido = () =>{

  var respuesta = document.getElementById("favoritos_container");
  respuesta.classList.toggle("direction")
  var img= document.createElement('img');
  img.src = "images/icon-fav-sin-contenido.svg";
  img.className = "no_favs"
  var mensaje = document.createElement('div');
  mensaje.className = "no_favs_msj"
  var text = document.createTextNode('"¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"')

  respuesta.appendChild(img);
  mensaje.appendChild(text);
  respuesta.appendChild(mensaje);
}

var mis_gifos_sin_contenido = () =>{
  var respuesta = document.getElementById("mis_gifos_container");
  respuesta.classList.toggle("direction")
  var img= document.createElement('img');
  img.src = "images/icon-mis-gifos-sin-contenido.svg";
  img.className = "no_favs"
  var mensaje = document.createElement('div');
  mensaje.className = "no_favs_msj"
  var text = document.createTextNode('¡Anímate a crear tu primer GIFO!')

  respuesta.appendChild(img);
  mensaje.appendChild(text);
  respuesta.appendChild(mensaje);

}


var get_favoritos = (evento) => {

  console.log(evento);
  console.log(evento.textContent);

  var respuesta = document.getElementById("favoritos_container");
  respuesta.className = "row-direction";

  if (favs_array.length == 0){

    favoritos_sin_contenido();

  }else{
    if(final_fav < favs_array.length){
      for (var i = inicio_fav; i < final_fav; i++) {
        var key = favs_array[i];
        var info = JSON.parse(localStorage.getItem(key));
        primeros_guardados(i, info, respuesta);
        }  
        console.log(inicio_fav);
        console.log(final_fav);
        inicio_fav += 12;
        final_fav += 12;

        console.log(inicio_fav);
        console.log(final_fav);

    }else{
      for (var i = inicio_fav; i < favs_array.length; i++) {

        var key = favs_array[i];
        var info = JSON.parse(localStorage.getItem(key));

        console.log(info);
        console.log(favs_array.length);

        primeros_guardados(i, info, respuesta);
        }  
        console.log(inicio_fav);
      console.log(final_fav);
      inicio_fav += 12;
      final_fav += 12;
      console.log(inicio_fav);
      console.log(final_fav);
     
      document.getElementById('ver_mas_fav').style.display = "none";
    }   
  }
}
var boton_fav = document.getElementById("favorito");
boton_fav.addEventListener('click', show_guardados);

  //Ver mas
var ver_mas_fav = () =>{
  var padre = document.getElementById("favorito");
  console.log(padre)
  get_favoritos(padre);
}
var ver_mas_bfav = document.getElementById('ver_mas_fav');
ver_mas_bfav.addEventListener("click", ver_mas_fav);


//Get mis gifos
var get_mis_gifos = (evento) => {
  console.log(evento);
  console.log(evento.textContent);
 

  var respuesta = document.getElementById("mis_gifos_container");
  respuesta.className = "row-direction";

  if (mis_gifos_array.length == 0){

    mis_gifos_sin_contenido();

  }else{
    if(final_mis_gifos < mis_gifos_array.length){
      for (var i = inicio_mis_gifos; i < final_mis_gifos; i++) {
        var key = mis_gifos_array[i];
        var info = JSON.parse(localStorage.getItem(key));
        primeros_guardados(i, info, respuesta);
        }  

        inicio_mis_gifos += 12;
        final_mis_gifos += 12;

      console.log(inicio_mis_gifos);
      console.log(final_mis_gifos);
    }else{
      for (var i = inicio_mis_gifos; i < mis_gifos_array.length; i++) {
        var key = mis_gifos_array[i];
        var info = JSON.parse(localStorage.getItem(key));

        console.log(info);


        primeros_guardados(i, info, respuesta);
        }  

      inicio_mis_gifos += 12;
      final_mis_gifos += 12;

      document.getElementById("ver_mas_mis_gifos").style.display = "none";
    }   
  }
}

var boton_mis_gifos = document.getElementById("boton_mis_gifos");
boton_mis_gifos.addEventListener('click', show_guardados);

  //Ver mas mis gifos

var ver_mas_mis_gifos = () =>{
  var padre = document.getElementById("boton_mis_gifos");
  get_mis_gifos(padre);
}
var ver_mas_gifo = document.getElementById('ver_mas_mis_gifos');
ver_mas_gifo.addEventListener("click", ver_mas_mis_gifos);

//CREAR GIFO

var boton_mas = document.getElementById("boton_mas");

  boton_mas.addEventListener('mouseover', function(){
    boton_mas.src = "images/CTA-crear-gifo-hover.svg"
  })
  boton_mas.addEventListener('mouseout', function(){
    boton_mas.src = "images/button-crear-gifo.svg"
  })


var crear_gif = () =>{
  boton_mas.src = "images/CTA-crear-gifo-active.svg"


  var section_title = document.getElementById("top");
  var section_search = document.getElementById("searchResults");
  var section_favoritos = document.getElementById("favoritos");
  var section_trending = document.getElementById("gif");
  var section_crear_gif = document.getElementById("crear_gif");
  var section_misgifos = document.getElementById("mis_gifos");


  section_title.style.display = 'none';
  section_search.style.display = 'none';
  section_favoritos.style.display = 'none';
  section_trending.style.display = 'none';
  section_crear_gif.style.display = 'flex';
  section_misgifos.style.display = 'none';
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

      var img = json.data.images.downsized.url;
      console.log(img);
      var title = "Unknown";
      var user = "Unknown";
      var mis_gifos_info = [img, title, user];
      var string_way = JSON.stringify(mis_gifos_info)
      localStorage.setItem(json.data.id, string_way);      


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


//footer

var fb = document.getElementById("fb");
fb.addEventListener('mouseover', function(){
  fb.src = "images/icon_facebook_hover.svg"
})
fb.addEventListener('mouseout', function(){
  fb.src = "images/icon_facebook.svg"
})

var tw = document.getElementById("tw");
tw.addEventListener('mouseover', function(){
  tw.src = "images/icon-twitter-hover.svg"
})
tw.addEventListener('mouseout', function(){
  tw.src = "images/icon-tw-normal.svg"
})

var ig = document.getElementById("ig");
ig.addEventListener('mouseover', function(){
  ig.src = "images/icon_instagram-hover.svg"
})
ig.addEventListener('mouseout', function(){
  ig.src = "images/icon_instagram.svg"
})



//modo_nocturno

var header_nocturno = () =>{
var a =document.getElementsByTagName("a")

  for (i = 0; i < a.length; i++) {
    a[i].classList.toggle("noche");
    a[0].textContent = "MODO DIURNO"

   
  document.getElementById("modo_nocturno").style.backgroundColor = '#37383C';
  document.getElementById("boton_mis_gifos").style.backgroundColor = '#37383C';
  document.getElementById("favorito").style.backgroundColor = '#37383C';
  }
}
var footer_nocturno = () =>{
  document.getElementsByTagName("footer")[0].style.backgroundColor = '#37383C';
  document.getElementById("footer_left").style.color = '#FFFFFF';
  document.getElementById("footer_right").style.color = '#FFFFFF';

  var fb = document.getElementById("fb");
  fb.addEventListener('mouseover', function(){
    fb.src = "images/icon_facebook_noc.svg"
  })
  fb.addEventListener('mouseout', function(){
    fb.src = "images/icon_facebook.svg"
  })

  var tw = document.getElementById("tw");
  tw.addEventListener('mouseover', function(){
    tw.src = "images/icon_twitter_noc.svg"
  })
  tw.addEventListener('mouseout', function(){
    tw.src = "images/icon-tw-normal.svg"
  })

  var ig = document.getElementById("ig");
  ig.addEventListener('mouseover', function(){
    ig.src = "images/icon_instagram_noc.svg"
  })
  ig.addEventListener('mouseout', function(){
    ig.src = "images/icon_instagram.svg"
  })

  
}
var mobile_nocturno = () =>{
  document.getElementById("logo_img_mobile").src = "images/logo-mobile-modo-noct.svg";
  document.getElementById("burguer").src = "images/burger-modo-noct.svg";
  document.getElementById("close_burguer").src = "images/close-modo-noct.svg";
  document.getElementsByTagName("header")[0].classList.toggle("border_nocturno");
}
var cambio_noche = () =>{
  modo_dia();
  document.body.style.background = "#37383C";

  var logo = document.getElementById("logo_img");
  console.log(logo);
  logo.src = "images/Logo-modo-noc.svg";

  
  header_nocturno();

  var boton_mas = document.getElementById("boton_mas");
  boton_mas.src = "images/CTA-crear-gifo-modo-noc.svg";

  boton_mas.addEventListener('mouseover', function(){
    boton_mas.src = "images/CTA-crear-gifo-hover-modo-noc.svg"
  })
  boton_mas.addEventListener('mouseout', function(){
    boton_mas.src = "images/CTA-crear-gifo-modo-noc.svg"
  })



  document.getElementById("cambiante").style.color = '#FFFFFF';
  document.getElementById("search").style.backgroundColor = '#37383C';
  document.getElementById("suggestionContainer").style.border = '1px solid #FFFFFF';
  document.getElementById("lupa").src = "images/icon-search-mod-noc.svg";
  document.getElementById("trending_h").style.color = '#FFFFFF';
  document.getElementById("trending_p").style.color = '#FFFFFF';
  document.getElementById("gif").style.backgroundColor = '#222326';
  document.getElementById("trending").style.color = '#FFFFFF';
  document.getElementById("gifosP").style.color = '#FFFFFF';

  footer_nocturno();
  mobile_nocturno();

  document.getElementById("camara_noche").src = 'images/camara-modo-noc.svg';
  document.getElementById("pelicula_img").src = 'images/pelicula-modo-noc.svg';

 
  document.getElementById("search").style.color = '#FFFFFF';
  document.getElementsByClassName("div_icon")[0].src = 'images/icon-search-modo-noct.svg';
  document.getElementsByClassName("div_icon")[1].src = 'images/icon-search-modo-noct.svg';
  document.getElementsByClassName("div_icon")[2].src = 'images/icon-search-modo-noct.svg';
  document.getElementsByClassName("div_icon")[3].src = 'images/icon-search-modo-noct.svg';
  document.getElementById("close_sugerencia").src = "images/close-modo-noct.svg";
  
  document.getElementById('ver_mas').style.backgroundColor = "#37383C",
  document.getElementById("ver_mas_hover").src = 'images/CTA-ver+-modo-noc.svg';
  var ver_mas_hover = document.getElementById('ver_mas_hover');

  ver_mas_hover.addEventListener('mouseover', function(){
    ver_mas_hover.src = "images/CTA-ver+hover-modo-noc.svg"
  })
  ver_mas_hover.addEventListener('mouseout', function(){
    ver_mas_hover.src = "images/CTA-ver+-modo-noc.svg"
  })
}
var modo_nocturno = document.getElementById("modo_nocturno");
modo_nocturno.addEventListener('click', cambio_noche);

//modo dia

var modo_dia = () =>{
  var a =document.getElementsByTagName("a")

  if(a[0].textContent == "MODO DIURNO"){
    window.location.reload()

  }
}
modo_dia();



//menu hamburguesa

var menu_burguer = document.getElementById("burguer");
var menu_list = document.getElementById("list");

var display_menu = () =>{
  menu_list.className = "show_menu";
  menu_burguer.classList.toggle("no_burguer");
  menu_burguer.classList.toggle("burguer");

  document.getElementById("close_burguer").style.display= "block";
    console.log(menu_burguer)
}
var hide_menu =()=>{
  document.getElementById("close_burguer").style.display= "none";
  menu_burguer.classList.toggle("no_burguer");
  menu_burguer.classList.toggle("burguer");
  menu_list.classList.toggle("hide_menu");
}
menu_list.addEventListener('click', hide_menu);

