# Pokedex
**Descripción**

A partir del api de [PokeApi](https://pokeapi.co/)

Crea un pokédex, es decir una página web donde puedas consultar pokemones, y leer información sobre cada pokemon que se muestre.
La página web debe:

- Mostrar una lista en tarjetas de todos los pokemones en el json.

- Las tarjetas deben mostrar el nombre y tipo de cada Pokémon (tipo agua, tipo fuego, tipo venenoso, etc.)

- Permitir que, al hacer click sobre la tarjeta de un pokemon, se despliegue más información, como el peso, sus movimientos (ataques), etc. De preferencia empleando un modal.

- El sitio web debe tener un buscador de pokemones, donde puedas filtrar pokemones por nombre.

Cosas a tener en cuenta:

- Diseño libre (Bootstrap, materialize, o tu propio css)

- Uso de clases e instancias.

- EcmaScript 6

- Repo en Github (Github pages es un plus)


```mermaid
---
title: Pokedex
---
classDiagram
    class Pokedex{
        -contenidoModal DOM Objet
        -consultarPokemones(pokemon, inicio) Promise
        +mostrarPokemonEnModal(pokemon) void
        +mostrarPokemonesEnViewPort(inicio) void
    }

    class InterfaceUsuario{
        -__listaCaracteres Array
        -limpiarDatosBuscar(dato) String
        +buscar(dato) void
    }