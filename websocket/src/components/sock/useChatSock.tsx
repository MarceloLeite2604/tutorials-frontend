import { Subject } from 'rxjs';
import { } from './ChatSock';

import SockJS from 'sockjs-client';
import {
  over,
  // Message,
  Client
  // Subscription,
  // Frame
} from 'stompjs';
import { useState } from 'react';

const WEBSOCKET_ADDRESS = 'http://localhost:8081/chat';
// const OUT_TOPIC = '/app/chat';
// const IN_TOPIC = '/topic/messages';

interface ChatSockApi<T> {
  connectAndSubscribe: () => void,
  unsubscribeAndDisconnect: () => void,
  $inMessage: Subject<T>,
  $outMessage: Subject<T>,
  $connected: Subject<boolean>,
  $subscribed: Subject<boolean>
};

// function throwErrorIfNotConnectedOrSubscribed(client: Client, subscription?: Subscription) {
//   if (!client.connected) {
//     throw new Error(`Not connected on "${WEBSOCKET_ADDRESS}".`);
//   }

//   if (!subscription) {
//     throw new Error(`Not subscribed on "${IN_TOPIC}".`);
//   }
// }

function createClient(webSocket: WebSocket) {
  console.log('creating client.');
  const client = over(webSocket);
  client.debug = () => { };
  return client;
}

export function useChatSock<T>() {

  const [webSocket] = useState(new SockJS(WEBSOCKET_ADDRESS));
  const [client] = useState<Client>(() => createClient(webSocket));
  // const [subscription, setSubscription] = useState<Subscription>();
  // const [$inMessage] = useState(new Subject<T>());
  // const [$outMessage] = useState(new Subject<T>());
  // const [$connected] = useState(new Subject<boolean>());
  // const [$subscribed] = useState(new Subject<boolean>());

  const connectAndSubscribe = () => {

    // if (client.connected) {
    //   console.log('Already connected.');
    //   return;
    // }

    // function messageCallback(stompMessage: Message) {
    //   console.log('Received message.');
    //   const message = JSON.parse(stompMessage.body) as T;
    //   $inMessage.next(message);
    // };

    // function connectCallback(frame?: Frame) {
    //   console.log('Connect callback.');
    //   $connected?.next(true);
    //   console.log('Connected.');
    //   const subscription = client.subscribe(IN_TOPIC, messageCallback);
    //   setSubscription(subscription);
    //   $subscribed?.next(true);

    //   function sendMessage<T>(message: T) {
    //     throwErrorIfNotConnectedOrSubscribed(client, subscription);
    //     console.log(`Sending message: ${JSON.stringify(message)}`);
    //     client.send(OUT_TOPIC, {}, JSON.stringify(message));
    //   }

    //   $outMessage.subscribe(sendMessage);
    // }

    console.log('Trying to connect.');
    // console.log(connectCallback);
    // debugger;
    client.connect({}, () => console.log('connected.'));
  };

  // const unsubscribe = useCallback(() => {
  //   if (!subscription) {
  //     console.log('Not subscribed.');
  //     return;
  //   }

  //   client.unsubscribe(subscription.id);
  //   setSubscription(undefined);
  //   $subscribed?.next(false);
  // }, [subscription, client, $subscribed]);

  // const disconnect = useCallback(() => {
  //   if (!client.connected) {
  //     console.log('Not connected.');
  //     return;
  //   }
  //   client.disconnect(() => $connected?.next(false));
  // }, [client, $connected]);

  // const unsubscribeAndDisconnect = useCallback(() => {
  //   unsubscribe();
  //   disconnect();
  // }, [unsubscribe, disconnect]);

  return {
    connectAndSubscribe
    // unsubscribeAndDisconnect,
    // $inMessage,
    // $outMessage,
    // $connected,
    // $subscribed
  } as ChatSockApi<T>;
};
