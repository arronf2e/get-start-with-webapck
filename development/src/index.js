import printMe from './print';

function component() {
	const ele = document.createElement('div');

	const btn = document.createElement('button');

	btn.innerHTML = 'Click me and check the console!';

	btn.onclick = printMe;

	ele.appendChild(btn);

	return ele;

}

document.body.appendChild(component());