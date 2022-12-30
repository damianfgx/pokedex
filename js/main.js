const form = document.querySelector('#search-form');
const pokemonCard = document.querySelector('#pokemon-card');
const viewNotFound = document.querySelector('#pokemon-not-found');
const inputPokemon = document.querySelector('#inputpokemon');
const btnRandom = document.querySelector('#btn-random');
const btnSearch = document.querySelector('#btn-submit');

const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/';


// TODO: Puedes buscar un pokemon especifico, al hacerlo, debes esperar 30 segundos para buscar otro pokemon especifico.
// TODO: Puedes buscar un pokemon aleratorio N veces sin limite de tiempo.
// TODO: Los pokemones aleratorios buscados no reinician el contador de 30 segundos.



document.addEventListener('DOMContentLoaded', () => {
    renderTextCopyrigh( );

    
    form.addEventListener('submit', e => {

        disabledBtnSubmit()
        console.log("buscando")

        e.preventDefault();
        const { pokemon } = Object.fromEntries(new FormData(e.target));

        if (!pokemon) return;

        getPokemon(pokemon);
    });
});

const disabledBtnSubmit = () => {
    btnSearch.disabled = true;

    let timeRest = 30;

    const interval = setInterval(() => {
        timeRest--;
        btnSearch.textContent = `El botton se habilitara en ${timeRest} segundos`;

        if (!timeRest) {
            btnSearch.textContent = `Buscar`;
            btnSearch.disabled = false;
            clearInterval(interval);
        }

    }, 1000);
}

btnRandom.addEventListener('click', () => pokemonRandom() );


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
    console.log("🚀 ~ file: main.js:70 ~ getPokemon ~ url", url)

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


    const h2 = document.createElement('h2');

    h2.textContent = `Pokemon ${nombre} no encontrado`;

    viewNotFound.append(h2);
};

const renderPokemon = data => {
    const { name, id, sprites } = data;

    const img = document.createElement('img');
    img.src = sprites.other.home.front_default;
    img.width = 200;
    img.height = 200;

    const h2 = document.createElement('h2');
    h2.textContent = `${id}. ${name}.`;

    pokemonCard.innerHTML = '';
    pokemonCard.append(img, h2);
    viewNotFound.innerHTML = '';
};


const pokemonRandom = () => {
    const id = Math.floor(Math.random() * 898) + 1;

    getPokemon(id);
};



const renderTextCopyrigh = () => {
   const year = new Date().getFullYear();
    const text = document.querySelector('#text-copyright');


    text.textContent = `© ${year} - Pokédex JD`;
}