/* Since this code is used on the page footer (which is a place not immedatelly visualized by the user), it is possible to delay its execution in order to prevent concurrency against most prioritary codes. To do so, we can wrap the code around a method and then use this method as a parameter for "setTimeout" method. */
// window.addEventListener('load', function() {
setTimeout(function () {
	var newsletterForm = document.querySelector('.footer-newsletter-form');
	newsletterForm.onsubmit = valida;

	function valida() {
		var isValid = true;
		var inputEmail = document.querySelector('.footer-newsletter-input');
		isValid = validaEmail(inputEmail.value);

		if(!isValid) {
			inputEmail.classList.add('form-erro');
			document.querySelector('.footer-newsletter-button').classList.add('form-erro');
		}

		return isValid;
	}

	function validaEmail(email) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
	}

}, 500);
