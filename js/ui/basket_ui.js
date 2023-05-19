const btnReturnHome = document.querySelector('.novigation__home');
const btnGoToAuthorizationPage = document.querySelector('.novigation__registration');
const welcomeToShop = document.querySelector('.welcome');
const logOutOfAccount = document.querySelector('.authorization__done');
const basketContainer = document.querySelector('.all__purchases')
const basketIsEmpty = document.querySelector('.basket__main__information')
const mainContainer = document.querySelector('.basket__main')
const btnGoToShop = document.querySelector('.shop')
let pokemonsInBasket = [];
let authorizedUser = getAuthorizedUser()
// console.log(authorizedUser);

function displayNameUser() {
    let authorizedUser = getAuthorizedUser()
    btnGoToAuthorizationPage.style.display = 'none'
    logOutOfAccount.style.display = 'none'

    if (authorizedUser == undefined) {
        btnGoToAuthorizationPage.style.display = 'block'
        logOutOfAccount.style.display = 'none'
    }
    else {
        logOutOfAccount.style.display = 'block'
        welcomeToShop.textContent = `Привет ${authorizedUser.name}`
    }
}
displayNameUser()

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
    mainContainer.insertAdjacentHTML('beforeend', html);
}

function changeStatysAuthorization() {
    clearAuthorizedUser()
}

function novigation() {
    btnReturnHome.onclick = function () {
        window.location.href = 'index.html';
    }
    btnGoToAuthorizationPage.onclick = function () {
        window.location.href = 'authorization.html';
    }
    btnGoToShop.onclick = function () {
        window.location.href = 'page_with_pokemons.html';
    }

}
novigation()

function displayPokemonCard() {
    if (authorizedUser == undefined) {
        basketIsEmpty.style.display = 'block'
        arrangePurchase.style.display = 'none'
    }
    else {
        let userBasket = getBasketForUser(authorizedUser.login)
        console.log(userBasket);
        if (userBasket.length == 0) {
            basketIsEmpty.style.display = 'block'
            basketContainer.style.display = 'none'
        }
        else {
            let sum = 0

            let arrangePurchase = document.createElement('div')
            arrangePurchase.classList.add('arrange__purchase')
            mainContainer.appendChild(arrangePurchase)

            let sumInPage = document.createElement('p')
            sumInPage.classList.add('sum')

            arrangePurchase.appendChild(sumInPage)

            let pokemonsBuy = document.createElement('button')
            pokemonsBuy.textContent = 'Купить'
            pokemonsBuy.classList.add('pokemons__buy');
            arrangePurchase.appendChild(pokemonsBuy)

            arrangePurchase.style.display = 'block'
            basketIsEmpty.style.display = 'none'
            basketContainer.style.display = 'block'

            userBasket.forEach(pokemon => {
                let pokemonCard = document.createElement('div')
                pokemonCard.classList.add('pokemon__card')

                let pokemonImage = document.createElement('img')
                pokemonImage.src = pokemon.pokemon.image
                pokemonImage.classList.add('pokemon__image')

                let pokemonDescription = document.createElement('div')
                pokemonDescription.classList.add('pokemon__description')

                let pokemonName = document.createElement('h3')
                pokemonName.textContent = `${pokemon.pokemon.pokemonName.toUpperCase()}`
                pokemonName.classList.add('pokemon__name')

                let pokemonWeight = document.createElement('p')
                pokemonWeight.textContent = `Вес: ${pokemon.pokemon.weight} кг.`
                pokemonWeight.classList.add('pokemon__weight')

                let pokemonType = document.createElement('p')
                pokemonType.textContent = `Вид способности: ${pokemon.pokemon.type}`
                pokemonType.classList.add('pokemon__type')

                let pokemonPrice = document.createElement('p')
                pokemonPrice.textContent = `${+(pokemon.pokemon.price) * 10} $`
                pokemonPrice.classList.add('pokemon__price')

                let pokemonLine = document.createElement('div')
                pokemonLine.classList.add('pokemon__line')

                let pokemonCount = document.createElement('div')
                pokemonCount.classList.add('pokemon__count')

                let countMinus = document.createElement('button')
                countMinus.textContent = '-'
                countMinus.classList.add('count__minus')

                let count = document.createElement('span')
                count.textContent = `${pokemon.count}`
                count.classList.add('count')

                let countPlus = document.createElement('button')
                countPlus.textContent = '+'
                countPlus.classList.add('count__plus')

                let pokemonDelete = document.createElement('button')
                pokemonDelete.textContent = 'Удалить'
                pokemonDelete.classList.add('pokemon__delete');

                basketContainer.appendChild(pokemonCard)

                pokemonCard.appendChild(pokemonImage)
                pokemonCard.appendChild(pokemonDescription)

                pokemonDescription.appendChild(pokemonName)
                pokemonDescription.appendChild(pokemonWeight)
                pokemonDescription.appendChild(pokemonType)
                pokemonDescription.appendChild(pokemonPrice)
                pokemonDescription.appendChild(pokemonLine)

                pokemonLine.appendChild(pokemonCount)

                pokemonCount.appendChild(countMinus)
                pokemonCount.appendChild(count)
                pokemonCount.appendChild(countPlus)

                pokemonLine.appendChild(pokemonDelete)

                sum += +(pokemon.pokemon.price) * 10 * +(pokemon.count)

                countMinus.addEventListener('click', () => {
                    minusOrDeleteFromBasket(authorizedUser.login, pokemon.pokemon.pokemonName)
                    count.innerHTML= pokemon.count--
                    location.reload()
                })
                countPlus.addEventListener('click', () => {
                    addNextPokemon(authorizedUser.login, pokemon.pokemon.pokemonName)
                    count.innerHTML= pokemon.count++
                    location.reload()
                })
                pokemonDelete.addEventListener('click', () => {
                    deleteFromBasket(authorizedUser.login, pokemon.pokemon.pokemonName)
                    location.reload()
                })

                sumInPage.textContent = `Итоговая сумма: ${sum} $`
            });
            pokemonsBuy.style.display = 'block'
            pokemonsBuy.addEventListener('click', () => {
                deleteUserBasket(authorizedUser.login)
                basketContainer.style.display = 'none'
                arrangePurchase.style.display = 'none'
                displayModalWindowAboutPurchas()
                basketIsEmpty.style.display = 'block'
                sum = 0
            })
        }
    }

}

window.onload = function () {
    displayPokemonCard()
}


function displayModalWindowAboutPurchas() {
    const html = `
    <div class="modal__window__two">
        <h4 class="modal__window__message">Спасибо большое за покупку! Товар будет доставлен в ближайшее время!</h4>
        <button class="btn__cansel">Окей</button>
    </div>
    `
    mainContainer.insertAdjacentHTML('beforeend', html);
    $('.btn__cansel').click(function () {
        $('.modal__window__two').css('display', 'none')
    })
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
        basketContainer.style.display = 'none'
        arrangePurchase.style.display = 'none'


        event.preventDefault()
    })

})

