import UggBox from '../../assets/models/box_ugg.glb';

export const objectArr = [
  {
    name: 'item1',
    url: UggBox,
    position: [-2, 0, -2],
    animateDelay: 0,
  },
  {
    name: 'item2',
    url: UggBox,
    position: [2, 0, -2],
    animateDelay: 0.1,
  },
  {
    name: 'item3',
    url: UggBox,
    position: [-4, 0, 2],
    animateDelay: 0.2,
  },
  {
    name: 'item4',
    url: UggBox,
    position: [0, 0, 2],
    animateDelay: 0.3,
  },
  {
    name: 'item5',
    url: UggBox,
    position: [4, 0, 2],
    animateDelay: 0.4,
  },
];

export const globalState = {
  isModelLoaded: false,
  firstStart: true,
  ready: false,
  gameState: 'start',
  score: 0,
  count: 0,
  items: [
    {
      name: 'item1',
      isCollected: false,
      isFinished: false,
      img: '',
    },
    {
      name: 'item2',
      isCollected: false,
      isFinished: false,
    },
    {
      name: 'item3',
      isCollected: false,
      isFinished: false,
    },
    {
      name: 'item4',
      isCollected: false,
      isFinished: false,
    },
    {
      name: 'item5',
      isCollected: false,
      isFinished: false,
    },
  ],
};
