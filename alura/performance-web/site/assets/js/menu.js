/* Since "script" tags have been moved to the end on HTML file, when this Javascript file is loaded all DOM objects have already been loaded, so there is no need to add a "load" event listener to execute it. */
// window.addEventListener('load', function() {
/* Also, to prevent variable exposure, it is possible to wrap the content into an immediate invoked function. */
(function () {
	var titulo = document.querySelector('.header-menu-titulo');
	var menu = document.querySelector('.header-menu');

	if (titulo) {
		titulo.onclick = function() {
			if (menu.hasAttribute('data-ativo')) {
				menu.removeAttribute('data-ativo');
			} else {
				menu.setAttribute('data-ativo', '');
			}
		};
	}
})();
// });
