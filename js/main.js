const userName = document.querySelector('#username') // this variable contains input for user name
const pass = document.querySelector('#password') //this variable contains input for password
const pass2 = document.querySelector('#password2') //this variable contains input for pasword confirmation
const email = document.querySelector('#email') //this variable contains input for user email adress
const clearBtn = document.querySelector('.clear') //this variable contains clear button
const sendBtn = document.querySelector('.send') //this variable contains send button
const closeBtn = document.querySelector('.close') //this variable contains closing button for popup
const popup = document.querySelector('.popup') //this variable contains popup with confirmation of form sending
const form = [userName, pass, pass2, email] //this array contains all the imputs

//This function is responsible for showing errors
const showErr = (input, msg) => {
	const formBox = input.parentElement
	const errorMsg = formBox.querySelector('.error-text')
	formBox.classList.add('error')
	errorMsg.textContent = msg
}
//this function is responsible for clearing errors
const clearError = input => {
	const formBox = input.parentElement

	formBox.classList.remove('error')
}
//this function is responsible for checking if user wrote any chars in inputs
const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showErr(el, el.placeholder)
		} else {
			clearError(el)
		}
	})
}
//this function is responsible for checking length of inputs value and for showing needed length
const checkLenght = (input, min) => {
	if (input.value.length < min) {
		showErr(input, `${input.previousElementSibling.innerText.slice(0, -1)} needs atleast ${min} chars!`)
	}
}
//this function is responsible for checking if password matching each other
const comparePass = (pass1, pass2) => {
	if (pass1.value !== pass2.value) {
		showErr(pass2, 'Passwords are not the same!')
	}
}

//this function is responsible for checking if email adres is correct
const checkMail = email => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([[0-9]{1,3}\‌​.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,5}))$/

	if (re.test(email.value)) {
		clearError(email)
	} else {
		showErr(email, 'Your email adress is incorrect')
		console.log(email.value)
	}
}
//this function is responsible for clearing error messages after click in 'clear button'
const checkErr = () => {
	const allFormBox = document.querySelectorAll('.form-box')
	let errorCount = 0
	allFormBox.forEach(el => {
		if (el.classList.contains('error')) {
			errorCount++
		} else if (errorCount === 0) {
			popup.classList.add('show-popup')
		}
	})
}

//Here we have event listener on 'send' button

sendBtn.addEventListener('click', e => {
	e.preventDefault()

	checkForm(form)

	checkLenght(userName, 3)
	checkLenght(pass, 8)

	comparePass(pass, pass2)

	checkMail(email)
	checkErr()
})
//Here we have event listener on 'clear' button
clearBtn.addEventListener('click', e => {
	e.preventDefault()

	form.forEach(el => {
		el.value = ''

		clearError(el)
	})
})
//this listener with function closes popup with 'close' button
closeBtn.addEventListener('click', () => {
	popup.classList.remove('show-popup')
})
