const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
/***
* qs reference: https://github.com/ljharb/qs
 **/
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const socket = io();

/****************
 * Join chatroom
 *******************/
socket.emit('joinRoom', { username, room });
/*****************
 * 
 ****************/
// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

/*****************
 * Message from server
 ****************/
socket.on('message', message => {
  console.log(message);
  outputMessage(message);

  /*****************
 * Scroll down
 ****************/
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// 
/*****************
 * Message submit
 ****************/
chatForm.addEventListener('submit', e => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  if (!msg) {
    return false;
  }

  /*****************
 * Emit message to server
 ****************/

  socket.emit('chatMessage', msg);

  /*****************
 * Clear input box aftersend
 ****************/
  // 
  e.target.elements.msg.value = '';
});

/*****************
 * Add message to chat form
 ****************/

function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');

  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span style="float:right">${message.time}</span>`;
  div.appendChild(p);

  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div)
}
/*****************
 *Add room name to DOM
 ****************/

function outputRoomName(room) {
  roomName.innerText = room;
}
/*****************
 * Add users to DOM
 ****************/
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}
