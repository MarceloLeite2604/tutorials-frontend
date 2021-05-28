import SockJS from 'sockjs-client';
import {
  over,
  Message as StompJsMessage,
  Client,
  Subscription,
  Frame
} from 'stompjs';

const WEBSOCKET_ADDRESS = 'http://localhost:8081/chat';
const OUT_TOPIC = '/app/chat';
const IN_TOPIC = '/topic/message';

let sockjs: Client | undefined;
let subscription: Subscription | undefined;

type Sock<T> = {
  isConnected: () => boolean,
  isSubscribed: () => boolean,
  connectAndSubscribe: (
    connectCallback?: (connected: boolean) => void,
    messageCallback?: (message: T) => void) => void,
  unsubscribeAndDisconnect: () => void
  sendMessage: (message: T) => void
}

function isConnected() {
  return sockjs && sockjs.connected;
};

function isSubscribed() {
  return subscription !== undefined;
};

function throwErrorIfNotConnectedOrSubscribed() {
  if (!isConnected()) {
    throw new Error(`Not connected on "${WEBSOCKET_ADDRESS}".`);
  }

  if (!isSubscribed()) {
    throw new Error(`Not subscribed on "${IN_TOPIC}".`);
  }
};

function connectAndSubscribe<T>(
  connectCallback?: (connected: boolean) => void,
  messageCallback?: (message: T) => void) {
  const sockjs = new SockJS(WEBSOCKET_ADDRESS);

  const client = over(sockjs);
  client.debug = () => { };

  if (isConnected()) {
    throw new Error(`Already connected on "${WEBSOCKET_ADDRESS}".`);
  }

  function innerMessageCallback(stompMessage: StompJsMessage) {
    console.log('Received message.');
    const message = JSON.parse(stompMessage.body) as T;
    messageCallback && messageCallback(message);
  };

  function innerConnectCallback(frame?: Frame) {
    subscription = client.subscribe(IN_TOPIC, innerMessageCallback);
    connectCallback && connectCallback(true);
  }

  client.connect({}, innerConnectCallback);
};

function unsubscribeAndDisconnect() {
  throwErrorIfNotConnectedOrSubscribed();
  subscription && sockjs?.unsubscribe(subscription?.id);
  subscription = undefined;
};

function sendMessage<T>(message: T) {
  throwErrorIfNotConnectedOrSubscribed();
  sockjs?.send(OUT_TOPIC, {}, JSON.stringify(message));
}

export function create<T>() {
  return {
    isConnected,
    isSubscribed,
    connectAndSubscribe,
    unsubscribeAndDisconnect,
    sendMessage
  } as Sock<T>;
}
