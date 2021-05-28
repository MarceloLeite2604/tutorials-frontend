import { useState } from 'react';
import { useChatSock } from '../sock';

export interface Message {
  from: string,
  content: string
};

export const App = () => {
  console.log('rendering');
  const [connected, setConnected] = useState(false);
  const [subscribed] = useState(false);

  const { connectAndSubscribe } = useChatSock<Message>();

  // const sendMessage = useCallback(() => {
  //   const message = {
  //     from: 'Me',
  //     content: 'Hello, world!'
  //   } as Message;

  //   $outMessage.next(message);
  // }, [$outMessage]);

  // const receiveMessage = useCallback((message) => {
  //   console.log(`Received a message: ${JSON.stringify(message)} `);
  // }, []);

  // useEffect(() => {
  //   $connected.subscribe(setConnected);
  //   $subscribed.subscribe(setSubscribed);
  //   $inMessage.subscribe(receiveMessage);
  // }, []);

  // const onClick = useCallback(, []);

  return (
    <div>
      <p>Connected? {String(connected)}</p>
      <p>Subscribed? {String(subscribed)}</p>
      {/* <button
        disabled={!connected}
      onClick={sendMessage}>Send message</button> */}
      <button
        onClick={() => {
          console.log('click');
          if (connected) {
            // unsubscribeAndDisconnect();
          } else {
            connectAndSubscribe();
            setConnected(true);
          }
        }}>
        {connected ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  );
};
