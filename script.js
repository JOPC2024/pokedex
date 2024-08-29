class Pokedex{
    constructor(){
        const contenidoModal = document.getElementById('contenidoModal');
    }

    #consultarPokemones(pokemon=1, inicio=0){
        if(typeof pokemon !== 'string'){
                return fetch(`https://pokeapi.co/api/v2/pokemon?limit=15&offset=${inicio}`);
        }
        else{
                return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        }
    }

    mostrarPokemonEnModal(pokemon){
        this.#consultarPokemones(pokemon)
        .then(res => {
            if(res.status != 200){
                throw new Error("Pokemon no encontrado");
            }
            return res.json();
        })
        .then((pokemon) => {
            contenidoModal.innerHTML = `
            <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <p>Weigth: ${pokemon.weight}</p>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            `;
        })
        .catch(error => {
            contenidoModal.innerHTML = `${error.message}<img src='assets/img/pokemonError.png' width='200' height='100'/>`;
        })
    }
      
    mostrarPokemonesEnViewPort(inicio=0){
        let urlPokemones = [];
        let datosPokemones = [];
        let datosHTML = '';
        const contenedorCards = document.getElementById('contenedorCards');
        this.#consultarPokemones(1, inicio)
        .then(res => res.json())
        .then(res => {
            for(let datoPokemon of res.results){
                urlPokemones.push(datoPokemon.url);
            }
            for(let url of urlPokemones){
                datosPokemones.push(fetch(url).then(res => res.json()).catch(error => console.log(error)))
            }
            Promise.all(datosPokemones)
            .then(result => {
                for(let data of result){
                    datosHTML += `
                    <div title="${data.name}" class="cards">
                        <h1>${data.name}</h1>
                        <p>${data.weight}</p>
                        <img src="${data.sprites.front_default}" alt="${data.name}" />
                    </div>
                    `;
                }
                contenedorCards.innerHTML=datosHTML;
            });
        });
    }
}
    

class InterfaceUsuario{
    constructor(){
        this.__listaCaracteres = ['%','!','?','¿','&','$','#','@','/','|','='];

    }

    #limpiarDatoBuscar(dato){
        let datoHTML = dato
        for(let signo of this.__listaCaracteres){
            datoHTML = datoHTML.replace(signo, '');
         }
         return datoHTML.trim().toLowerCase();
    }

    buscar(dato){
        if(dato.length > 0)
        {
            const pokemon = this.#limpiarDatoBuscar(dato);
            const pokedex = new Pokedex();
            pokedex.mostrarPokemonEnModal(pokemon);
            location.href='#modal';
        }
    }
}






// Inicializacion de variables y constantes
let cont = 0;
const audio = new Audio('assets/music/pokemon.mp3');
const botonBuscar = document.getElementById('icoBuscador');
const logo = document.getElementById('logo');
const buscador = document.getElementById('buscador');
const pokedex = new Pokedex();
const iu = new InterfaceUsuario();
const pikachu = document.getElementById('mascota1');
const squirtle = document.getElementById('mascota2');

// Reproduce Musica de fondo al dar click al logo
logo.addEventListener("click", () => {
    cont++;
    if(cont<2){audio.play(); audio.volume=0.1; audio.loop=true;}
    else{audio.pause(); audio.currentTime=0; cont=0;}
});

// Evento click del boton de buscar
botonBuscar.addEventListener("click", () => {
    iu.buscar(buscador.value);
    const contenidoModal = document.getElementById('contenidoModal');
    //contenidoModal.innerHTML=`<p>${buscador.value}</p>`
    buscador.value='';
});

// Evento click de la Imagen Squirtle
squirtle.addEventListener("click", () => {
    iu.buscar(squirtle.textContent);
});

// Evento click de la Imagen Pikachu
pikachu.addEventListener("click", () => {
    iu.buscar(pikachu.textContent);
});

window.addEventListener('click', function(event){
    if(event.target.parentElement.className === 'cards'){
        iu.buscar(event.target.parentElement.title);
    }
    if(event.target.id === 'flechaIzq'){
        if(parseInt(document.getElementById('numPag').textContent) > 1){
            let numPag = parseInt(document.getElementById('numPag').textContent)-1;
            pokedex.mostrarPokemonesEnViewPort((numPag-1)*15)
            document.getElementById('numPag').textContent=numPag;
        }
    }
    if(event.target.id === 'flechaDer'){
        if(parseInt(document.getElementById('numPag').textContent) < 86){
            let numPag = parseInt(document.getElementById('numPag').textContent);
            pokedex.mostrarPokemonesEnViewPort(numPag*15)
            document.getElementById('numPag').textContent=numPag+1;
        }
    }
});


window.onload = pokedex.mostrarPokemonesEnViewPort(0);
