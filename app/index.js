import './main.scss';
import generateText from './sub';
import moment from 'moment';
// function library
import _ from 'lodash';
import './plugin.js';

const div = document.createElement('div');
div.innerHTML = '<h1>Hello (index) World!!</h1>';
div.appendChild(generateText());
document.body.appendChild(div);

const myPromise = Promise.resolve(true);
myPromise.then((x) => {
	const testArrStr = _.map([1,2,3], function(n) { return n*3; }).toString();
	const currentTime = moment().format();
	$('body').append(`<p>promise result is ${x}, now is ${currentTime}, lodash result is ${testArrStr}`);
	$('p').greenify();
});