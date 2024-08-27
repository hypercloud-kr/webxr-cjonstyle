// This is an example of a third-party store
// that you might need to integrate with React.

import { globalState } from './constants/constants';

// If your app is fully built with React,
// we recommend using React state instead.

let listeners = [];
let state = globalState;
// ArManager.instance.mainScene;

export const stateStore = {
  setGameState(str) {
    state = { ...state, gameState: str };
    emitChange();
  },
  setModelLoaded() {
    state = { ...state, isModelLoaded: true };
    emitChange();
  },
  setReady() {
    state = { ...state, ready: true };
    emitChange();
  },
  setItems(name) {
    const items = state.items.slice();
    items.find(item => item.name === name).isCollected = true;
    state = { ...state, items };
    emitChange();
  },
  setIsFinished(name) {
    const items = state.items.slice();
    items.find(item => item.name === name).isFinished = true;
    state = { ...state, items };
    emitChange();
  },
  setScore(init?) {
    if (init) {
      state = { ...state, score: 0 };
    } else {
      state = { ...state, score: state.score + 10 };
    }
    emitChange();
  },
  setCount(init?) {
    if (init) {
      state = { ...state, count: 0 };
    } else {
      state = { ...state, count: state.count + 1 };
    }
    emitChange();
  },
  setRestart() {
    state = { ...state, firstStart: false };
    emitChange();
  },
  initItems() {
    const items = state.items.slice().sort(() => Math.random() - 0.5);
    items.forEach(item => {
      item.isCollected = false;
      item.isFinished = false;
    });
    state = { ...state, items };
    emitChange();
  },
  nextName() {
    for (let i = 0; i < state.items.length; i++) {
      if (!state.items[i].isCollected) {
        return state.items[i].name;
      }
    }
  },
  sufflePosition() {
    const position = state.position.sort(() => Math.random() - 0.5);
    state = { ...state, position };
    emitChange();
  },
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  getState() {
    return state;
  },
};

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}
