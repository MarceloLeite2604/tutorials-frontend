import React, { FC, useEffect, useState } from 'react';
import { Child } from '../Child/';
import './App.css';

export const App : FC = () => {
  console.log('%cApp: render start', 'color: MediumSpringGreen');

  const [showChild, setShowChild] = useState(() => {
    console.log('%cApp: useState callback', 'color: tomato');
    return true;
  });

  useEffect(() => {
    console.log('%cApp: useEffect no deps', 'color: LightCoral');
    return () => {
      console.log('%cApp: useEffect no deps cleanUp', 'color: LightCoral');
    }
  });

  useEffect(() => {
    console.log('%cApp: useEffect empty deps', 'color: MediumTurquoise');
    return () => {
      console.log('%cApp: useEffect empty deps cleanUp', 'color: MediumTurquoise');
    }
  }, []);

  useEffect(() => {
    console.log('%cApp: useEffect with dep', 'color: HotPink');
    return () => {
      console.log('%cApp: useEffect with dep cleanUp', 'color: HotPink');
    }
  }, [showChild]);

  const element = (
    <>
      <label>
        <input
          type="checkbox"
          checked={showChild}
          onChange={ e => setShowChild(e.target.checked)} />
          {' '}
          show child
      </label>
      <div
        style={{
          padding: 0,
          margin: 0,
          height: 90,
          width: 90,
          border: 'solid',
        }} >
          {showChild ? <Child /> : null}
        </div>
    </>
  );


  console.log('%cApp: render end', 'color: MediumSpringGreen');

  return element;
}
