const socket = io('http://localhost:3000')

const status = document.getElementById('status');
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
const btn = document.getElementById('btn')

function setStatus(value) {
    status.innerHTML = value;
}

function printMessage(value) {
    const li = document.createElement('li');

    li.innerHTML = value;
    messages.appendChild(li);
}

form.addEventListener('submit', event => {
    event.preventDefault();

    socket.emit('chat', input.value);
    input.value = '';
});

btn.addEventListener('click', () => {
    socket.emit('getNetworkStatus')
})

socket.on('connect', () => setStatus('ONLINE'))
socket.on('disconnect', () => setStatus('DISCONNECTED'))
socket.on('chat', message => printMessage(message))
socket.on('ready', message => printMessage(message))
socket.on('getNetworkStatus', status => { console.log(status) })