// import { text } from 'express';

var socket = io.connect('http://localhost:8080', { forceNew: true });

socket.on('messages', function (data) {
  console.log(data);
  render(data);
});

function render(data) {
  console.log(data, 'data que llega');
  var html = data
    .map(function (element, index) {
      return `<div> 
      <strong>${element.author}</strong>
      <em>${element.text}</em></div>`;
    })
    .join(' ');
  document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
  var payload = {
    author: document.getElementById('username').value,
    text: document.getElementById('description').value
  };
  console.log(payload, 'envianda');
  socket.emit('client-message', payload);
  return false;
}
