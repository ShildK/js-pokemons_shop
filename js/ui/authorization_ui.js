const registration = document.querySelector('.link');
const container = document.querySelector('.authorization__form');
const btnAuthorization = document.querySelector('.authorization__btn');
const userLogin = document.querySelector('.login');
const userPassword = document.querySelector('.password');
const containerBtn = document.querySelector('.authorization__question');
const questionRegistration = document.querySelector('.subtitle');
const invalidMessage = document.querySelector('.check__data__message');
const registrationSaccessfully = document.querySelector('.registration__successfully')
let userName;
let passwordChek;
let btnRegistration;


function displayMoreQuestionsForRegistration() {
    userName = document.createElement('input');
    userName.classList.add('login');
    userName.placeholder = 'Имя'

    passwordChek = document.createElement('input')
    passwordChek.classList.add('password');
    passwordChek.placeholder = 'Повторите пароль'
    passwordChek.type = 'password'

    btnRegistration = document.createElement('button')
    btnRegistration.classList.add('authorization__btn')
    btnRegistration.textContent = 'Зарегистрироваться'
    btnRegistration.style.marginTop = '60px'


    registration.addEventListener('click', (event) => {
        container.insertAdjacentElement("afterbegin", userName)
        container.insertAdjacentElement("beforeend", passwordChek)
        containerBtn.insertAdjacentElement('afterbegin', btnRegistration)
        event.preventDefault()
        btnAuthorization.classList.add('authorization__btn__hide')
        questionRegistration.classList.add('subtitle__hide')
    })
}
displayMoreQuestionsForRegistration()

window.onload = function () {
    let users = getUsers();
    let user = getAuthorizedUser();
}

function loginButton() {
    let user = loginUser(userLogin.value, userPassword.value)
    let authorizedUser = setAuthorizedUser(user.name, user.login)
    debugger
    if(authorizedUser.login == '' || authorizedUser.password == ''){
        return undefined
    }
    if (user != undefined) {
        invalidMessage.textContent = ''
        window.location.href = 'index.html'
    }
    else if(user==undefined){
        invalidMessage.textContent = 'Вы не зарегестрированы'
    }
    else {
        invalidMessage.textContent = 'Неправильный логин или пароль'
    }
    return user
}

btnRegistration.addEventListener('click', () => {
    let name = userName.value;
    let login = userLogin.value;
    
    if (userPassword.value == passwordChek.value) {
        let registrationResult = registrationUser(name, login, userPassword.value);
        invalidMessage.textContent = ''
        if (typeof registrationResult == 'string') {
            invalidMessage.textContent = registrationResult
        }
        else {
            location.reload()
        }
    }
    else {
        invalidMessage.textContent = 'Пароли не совпадают'
    }
})

btnAuthorization.addEventListener('click', () => {
    let user = loginButton()
    if(user!=undefined){
        let authorizedUser = setAuthorizedUser(user.name, user.login)
    }
    else{
        invalidMessage.textContent = 'Поля ввода не должны быть пустыми'
    }   
})