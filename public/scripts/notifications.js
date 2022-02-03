/* eslint-disable no-undef */
function getParameterByName (name, url = window.location.href) {
	name = name.replace(/[\[\]]/g, '\\$&');
	let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
let tipo = getParameterByName('type');
if (tipo === 'botadded') {
	toastr.options = {
		'closeButton': true,
		'debug': false,
		'newestOnTop': false,
		'progressBar': true,
		'positionClass': 'toast-top-right',
		'preventDuplicates': false,
		'onclick': null,
		'showDuration': '300',
		'hideDuration': '1000',
		'timeOut': '5000',
		'extendedTimeOut': '1000',
		'showEasing': 'swing',
		'hideEasing': 'linear',
		'showMethod': 'fadeIn',
		'hideMethod': 'fadeOut'
	};
	toastr.success('O Bot foi adicionado a fila de espera!', 'Sucesso!');
}