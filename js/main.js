const form = document.querySelector('#search-form');
const pokemonCard = document.querySelector('#pokemon-card');
const viewNotFound = document.querySelector('#pokemon-not-found');

const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/';

let miTimeout;

// Buscar un pokemon de manera aleatoria despues de haber buscado un pokemon con un retraso de 30 segundos

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const { pokemon } = Object.fromEntries(new FormData(e.target));

        if (!pokemon) return;

        getPokemon(pokemon);
    });
});

const renderLoading = () => {
    const img = document.createElement('img');
    img.src = 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif';
    img.width = 200;
    img.height = 200;

    pokemonCard.innerHTML = '';
    pokemonCard.append(img);
};

const getPokemon = async nombre => {
    renderLoading();

    const url = URL_BASE + String(nombre).toLowerCase();

    try {
        const resp = await fetch(url);
        const data = await resp.json();

        renderPokemon(data);
    } catch (error) {
        renderNotFound(nombre);
    }
};

const renderNotFound = nombre => {
    pokemonCard.innerHTML = '';
    viewNotFound.innerHTML = '';

    clearTimeout(miTimeout);

    const h2 = document.createElement('h2');

    h2.textContent = `Pokemon ${nombre} no encontrado`;

    viewNotFound.append(h2);
};

const renderPokemon = data => {
    if (!!miTimeout) clearTimeout(miTimeout);

    pokemonTimer();

    const { name, id, sprites } = data;

    const img = document.createElement('img');
    img.src = sprites.other['official-artwork'].front_default;
    img.width = 200;
    img.height = 200;

    const h2 = document.createElement('h2');
    h2.textContent = `${id}. ${name}.`;

    pokemonCard.innerHTML = '';
    pokemonCard.append(img, h2);
    viewNotFound.innerHTML = '';
};

const pokemonTimer = () => {
    miTimeout = setTimeout(() => {
        pokemonRandom();
    }, 30000);
};

const pokemonRandom = () => {
    const id = Math.floor(Math.random() * 898) + 1;

    getPokemon(id);
};
