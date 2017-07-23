import './css/style.css';
import Avatar from './images/avatar.png';

console.log('avatar------', Avatar)

const avatar = new Image();

avatar.src = Avatar;

document.body.append(avatar);

console.log('hello webpack');