
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
  console.log(input.length) 
  console.log(suggestion.length == 1);
 
  if (input.length !== 0 && caja){
    caja = false
    let caja_s = document.getElementById("suggestion");
    caja_s.classList.toggle("show_caja");
  }else if (input.length == 0) {
    caja = true
    let caja_s = document.getElementById("suggestion")
    caja_s.classList.toggle("show_caja");
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
  var suggestion = document.getElementById("search").value;
  console.log(suggestion)
  if(suggestion !== ''){
  suggestion = "Busca GIFOS y mas";
  console.log(suggestion)
  }
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


var searchSuggestion = async() => {
  
  
  let inputVar = document.getElementById("search").value;
  console.log(inputVar)
  let fetch1= await fetch(`https://api.giphy.com/v1/gifs/search?api_key=VJJnUyLRY3b1yOqZrg6mgbGrvIjNOYhT&q=${inputVar}&limit=50&offset=0&rating=g&lang=en`)
  .then(response => response.json())
  .then(json => {
    
    console.log(json)

    

    var border = document.getElementById("search");
    border.style.borderBottom = '1px solid #9CAFC3';

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
  
  console.log(suggestion)


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
console.log(createSuggestionDiv)
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


 

  if(parent.childNodes.length < 2 ){

    var buttons_container = document.createElement("div")
  buttons_container.className = 'tres_botones';
  buttons_container.id = "tres_botones" + parent.id;

  var corazon = document.createElement('BUTTON');
  corazon.className = 'mini_button';
  corazon.addEventListener("click", corazon_button);

  var descargar = document.createElement('BUTTON');
  descargar.className = 'mini_button';
  //descargar.addEventListener("click", descargar_button);
  var a = document.createElement('a');
  a.href =  img.src;
  a.setAttribute('download',"download");  
   
  var ampliar = document.createElement('BUTTON');
  ampliar.className = 'mini_button';
  ampliar.id = "order"
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
  //var parent = img.parentElement;
 // console.log(img);
  console.log(parent);
  console.log(parent.childNodes.length);
  if(parent.childNodes.length > 1){
  var buttons_container = document.getElementById('tres_botones' + parent.id)
  buttons_container.style.display = "none";
  console.log(buttons_container)
  }
}


//Boton de corazon

var corazon_button = (e) => {
  var key = e.target;
  var parent = key.parentElement;
  var gif = parent.parentElement;
  var img = gif.firstChild
  console.log(img.src);
  console.log(gif);

  localStorage.setItem(parent.id, img.src);
}


// Boton de descarga

/*var descargar_button = (e) => {
  var boton = e.target;
  var div = boton.parentElement;
  var padre = div.parentElement;
  var gif = padre.firstChild;
  var source = gif.src

  var a = document.createElement('a');
  a.href = source;
  a.download = 'e';

  a.appendChild(boton)
  padre.lastChild.appendChild(a)
  console.log(source)
  console.log(padre)
  console.log(gif)
}*/

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


 //Favoritos


var section_favoritos = document.getElementById("favoritos");

var show_favoritos = () =>{
  var section_title = document.getElementById("top");
  var section_search = document.getElementById("searchResults");
  var section_favoritos = document.getElementById("favoritos");
  var respuesta = document.getElementById("favoritos_container");

  console.log(respuesta)
  console.log(respuesta.childNodes.length)

  section_title.style.display = 'none';
  section_search.style.display = 'none';
  section_favoritos.style.display = 'flex';

  var ver_mas = document.getElementById('ver_mas');
  console.log(ver_mas)
  ver_mas.style.display = "flex";

 if(respuesta.childNodes.length == 0){
  get_favoritos();
  }
  console.log(respuesta.childNodes.length)
   
}

var primerosfavoritos = (i, value) =>{
  var respuesta = document.getElementById("favoritos_container");
  var img_div = document.createElement('div');
  img_div.id = 'Fav' + i; 
  img_div.className = 'img_shade';
  img_div.addEventListener("mouseenter", clickeables);
  img_div.addEventListener("mouseleave", desclickeables);

  let img = document.createElement('img');
        img.setAttribute('src', value);
        img.classList.toggle('searchImg');
        img_div.appendChild(img);
        respuesta.appendChild(img_div);
}

var get_favoritos = () => {
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    primerosfavoritos(i, value);
    console.log(key);
    console.log(value);
    console.log('Key: ' + key + ', Value: ' + value); 
  }
}
