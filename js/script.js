const containerHeader = document.querySelector('.header')
const containerPokemonShow = document.querySelector('.all__pokemons__show');
const btnPokemonShow = document.querySelector('.pokemon__show__btn');
const btnGoToBasket = document.querySelector('.basket');
const btnGoToAuthorizationPage = document.querySelector('.registration');
const welcomeToShop = document.querySelector('.welcome');
const logOutOfAccount = document.querySelector('.authorization__done');
const btnGoToShop = document.querySelector('.shop');
let pokemonsInBasket = []
let authorizedUser = getAuthorizedUser()

if (authorizedUser != undefined) {
    let usersBaskets = getUsersBaskets()
    let userBasket = getBasketForUser(authorizedUser.login)
    let users = getUsers()
}

function displayNameUser() {
    let authorizedUser = getAuthorizedUser()
    btnGoToAuthorizationPage.style.display = 'none'

    if (authorizedUser != undefined) {
        logOutOfAccount.style.display = 'block'
        welcomeToShop.textContent = `Привет ${authorizedUser.name}`
    }
    else {
        btnGoToAuthorizationPage.style.display = 'block'
        logOutOfAccount.style.display = 'none'
    }
}
displayNameUser()

function updateUsersInLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

const getPokemonDetail = async function (url) {
    let response = await fetch(url);
    let pokemonDetail = await response.json();
    return pokemonDetail;
}

const getPokemons = async function (limit) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=" + limit);
    let pokemonListResponse = await response.json()
    let pokemonList = pokemonListResponse.results;

    let result = []
    for (let i = 0; i < pokemonList.length; i++) {
        let pokemonDetail = await getPokemonDetail(pokemonList[i].url);
        result.push({
            id: pokemonDetail.id,
            pokemonName: pokemonDetail.name,
            weight: pokemonDetail.weight,
            order: pokemonDetail.order,
            image: pokemonDetail.sprites.other.dream_world.front_default,
            price: pokemonDetail.base_experience,
            type: pokemonDetail.types[0].type
        });
    }
    return result
}

async function displayPokemonCard() {
    let pokemons = await getPokemons(8);
    pokemons.forEach(pokemon => {
        let pokemonCard = document.createElement('div')
        pokemonCard.classList.add('pokemon__card')

        let pokemonImage = document.createElement('img')
        pokemonImage.src = pokemon.image
        pokemonImage.classList.add('pokemon__image')

        let pokemonName = document.createElement('h3')
        pokemonName.textContent = `${pokemon.pokemonName.toUpperCase()}`
        pokemonName.classList.add('pokemon__name')

        let pokemonLine = document.createElement('div')
        pokemonLine.classList.add('pokemon__line')

        let pokemonLineDescription = document.createElement('div')
        pokemonLineDescription.classList.add('pokemon__line__description')

        let pokemonPrice = document.createElement('p')
        pokemonPrice.textContent = `${+(pokemon.price) * 10} $`
        pokemonPrice.classList.add('pokemon__price')

        let pokemonStat = document.createElement('p')
        pokemonStat.textContent = `Вес: ${pokemon.weight} кг.`
        pokemonStat.classList.add('pokemon__stat')

        let pokemonBuy = document.createElement('div')
        pokemonBuy.classList.add('pokemon__buy')

        let imageBasket = document.createElement('img')
        imageBasket.src = "img/basket.png"
        imageBasket.classList.add('image__basket')

        containerPokemonShow.appendChild(pokemonCard)

        pokemonCard.appendChild(pokemonImage)
        pokemonCard.appendChild(pokemonName)
        pokemonCard.appendChild(pokemonLine)

        pokemonLine.appendChild(pokemonLineDescription)
        pokemonLine.appendChild(pokemonBuy)

        pokemonLineDescription.appendChild(pokemonPrice)
        pokemonLineDescription.appendChild(pokemonStat)

        pokemonBuy.appendChild(imageBasket)

        imageBasket.addEventListener('click', () => {
            let authorizedUser = getAuthorizedUser()
            if (authorizedUser == undefined) {
                alert('Необходимо зарегестрироваться или войти в аккаунт')
                window.location.href = 'authorization.html';
            }
            else {
                let userBasket = addToBasket(authorizedUser.login, pokemon, pokemon.pokemonName)

                updateUserBasket(authorizedUser.login, userBasket)
                pokemonsInBasket.push(pokemon)
            }
        })
    });
}
displayPokemonCard()

function novigation() {
    btnPokemonShow.onclick = function () {
        window.location.href = 'page_with_pokemons.html';
    }
    btnGoToBasket.onclick = function () {
        window.location.href = 'basket.html';
    }
    btnGoToAuthorizationPage.onclick = function () {
        window.location.href = 'authorization.html';
    }
    btnGoToShop.onclick = function () {
        window.location.href = 'page_with_pokemons.html';
    }
}
novigation()

function automateCarusel() {
    let count = 2
    let static = 1

    setInterval(function () {
        document.getElementById('radio' + count).checked = true
        count += static

        if (count >= 5) {
            static = -1
            count = 5
        }

        else if (count < 1) {
            static = 1
            count = 2
        }
    }, 2000)
}
automateCarusel()

function animationQuestions() {
    $(document).ready(function () {
        $('.questions__block__title').click(function (event) {
            if ($('.questions').hasClass('check')) {
                $('.questions__block__title').not($(this)).removeClass('active')
                $('.questions__block__title').not($(this)).next().slideUp(400)
            }
            $(this).toggleClass('active').next().slideToggle(400)
        })
    })
}
animationQuestions()

function displayModalWindow() {
    const html = `
    <div class="modal__window">
        <h4 class="question__about__logout">Выйти из аккаунта?</h4>
        <div class="button__wrap">
            <button class="btn__logout">Да</button>
            <button class="btn__cansel">Нет</button>
        </div>
    </div>
    `
    containerHeader.insertAdjacentHTML('beforeend', html);
}

function changeStatysAuthorization() {
    clearAuthorizedUser()
}

logOutOfAccount.addEventListener('click', (event) => {
    displayModalWindow()
    $('.btn__cansel').click(function (event) {
        if ($('.modal__window').hasClass('modal__window__none')) {
            $('.modal__window').css('display', 'none')
        }
        else {

            $('.modal__window').addClass('modal__window__none')
        }
    })
    $('.btn__logout').on('click', function (event) {
        if ($('.modal__window').hasClass('modal__window__none')) {
            $('.modal__window').css('display', 'none')
            $('.modal__window').removeClass('modal__window__none')
        }
        else {
            $('.modal__window').addClass('modal__window__none')
        }
        changeStatysAuthorization()

        btnGoToAuthorizationPage.style.display = 'block'
        logOutOfAccount.style.display = 'none'

        event.preventDefault()
    })

})


