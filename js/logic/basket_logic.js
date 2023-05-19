const basketsKey = 'baskets';

function addToBasket(user, pokemon, pokemonName){
    let userBasket = getBasketForUser(user);
    let pokemonInBasket = userBasket.find((p) => p.pokemonName == pokemonName)
    if(pokemonInBasket != undefined){
        pokemonInBasket.count += 1
    }
    else{
        userBasket.push({
            pokemonName: pokemonName,
            pokemon: pokemon,
            count: 1,
        })
    }
    updateUserBasket(user, userBasket);
    return userBasket
}

function addNextPokemon(user, pokemonName){
    let userBasket = getBasketForUser(user);
    let pokemonInBasket = userBasket.find((p) => p.pokemonName == pokemonName)
    if(pokemonInBasket != undefined){
        pokemonInBasket.count += 1
    }
    updateUserBasket(user, userBasket);
}

function minusOrDeleteFromBasket(user, pokemonName){
    let userBasket = getBasketForUser(user)
    let pokemonInBasket = userBasket.find(p => p.pokemonName == pokemonName)
    if(pokemonInBasket != undefined && pokemonInBasket.count > 0){
        pokemonInBasket.count -= 1
    }
    if(pokemonInBasket.count == 0){
        userBasket = userBasket.filter(p => p.pokemonName != pokemonName)
    }
    updateUserBasket(user, userBasket);
}

function deleteFromBasket(user, pokemonName){
    let userBasket = getBasketForUser(user)
    userBasket = userBasket.filter(p => p.pokemonName != pokemonName)

    updateUserBasket(user, userBasket);
}

function deleteUserBasket(user){
    let usersBaskets = getUsersBaskets()
    let usersBasketsUpdate = usersBaskets.filter(basket => basket.user != user)
    localStorage.setItem(basketsKey, JSON.stringify(usersBasketsUpdate))
}

function getBasketForUser(user){
    let usersBaskets = getUsersBaskets()
    let userBasket = usersBaskets.find(basket => basket.user == user)
    if(userBasket == undefined){
        return [];
    }
    else{
        return userBasket.basket
    }
}

function getUsersBaskets(){
    let baskets = JSON.parse(localStorage.getItem(basketsKey))
    return baskets == undefined? [] : baskets;
}

function updateUserBasket(user, basket){
    let usersBaskets = getUsersBaskets();
    let userBasket = usersBaskets.find(basket => basket.user == user);
    if(userBasket == undefined){
        usersBaskets.push({
            user: user,
            basket: basket,
        });
    }
    else{
        userBasket.basket = basket;
    }
    localStorage.setItem(basketsKey, JSON.stringify(usersBaskets));
    return usersBaskets
}

