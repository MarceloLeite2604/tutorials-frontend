// import { useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://localhost:8080/myHandler');

client.onopen = () => {
  console.log('WebSocket Client Connected');
};
client.onmessage = (message) => {
  if (message.data instanceof Buffer || message.data instanceof ArrayBuffer) {
    throw new Error('Unsuported message data type.');
  }

  const data = JSON.parse(message.data);
  console.log('Received message.');
  console.log(JSON.stringify(data));

};

export const App = () => {

  // useEffect(() => {
  //   connect();
  // });

  return (
    <div>
      <button onClick={() => client.send(JSON.stringify({
        username: 'me',
        content: 'Hello, world!'
      }))}>Click</button>
    </div >
  );
};
