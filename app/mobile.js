import './main.scss';
import './plugin.js';

$(document).ready(function() {
	let div = document.createElement('div');
	div.innerHTML = '<h1>Hello (mobile) World!!</h1>';
	document.body.appendChild(div);
	$('h1').greenify();
});