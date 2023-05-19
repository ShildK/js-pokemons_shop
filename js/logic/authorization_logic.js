const authorizedUserKey = 'authorizedUser'

function getUsers() {
    let users = JSON.parse(localStorage.getItem('users'));
    if (users == null) {
        users = [];
    }
    return users;
}

function registrationUser(name, login, password) {
    let users = getUsers();
    for (let i = 0; i < users.length; i++) {
        if (users[i].login == login) {
            return 'Пользователь с таким логином существует'
        }
    }
    if (password.length < 6) {
        return 'Пароль не может быть меньше 6 знаков'
    }

    let id = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
    users.push({
        id: id,
        name: name,
        login: login,
        password: password,
    })

    updateUsersInLocalStorage(users);
    return true
}

function updateUsersInLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function loginUser(login, password) {
    let users = getUsers()
    let user = users.find(user => user.login == login && user.password == password);
    if (user != undefined) {
        setAuthorizedUser(user.name, user.login)
    }
    return user;
}

function setAuthorizedUser(name, login) {
    let authorizedUser = {
        name: name,
        login: login,
    };
    localStorage.setItem(authorizedUserKey, JSON.stringify(authorizedUser));
    return authorizedUser;
}

function getAuthorizedUser() {
    let authorizedUser = JSON.parse(localStorage.getItem(authorizedUserKey));
    if (authorizedUser == null) {
        clearAuthorizedUser()
    }
    return authorizedUser
}

function clearAuthorizedUser() {
    localStorage.removeItem(authorizedUserKey)
}