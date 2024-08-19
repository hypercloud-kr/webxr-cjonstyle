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
