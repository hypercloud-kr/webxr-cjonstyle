import UggBox from '../../assets/models/box_ugg.glb';
import img1 from '../../assets/imgs/background.jpg';
import backImg1 from '../../assets/imgs/environment.jpg';

export const objectArr = [
  {
    name: 'item1',
    url: UggBox,
    animateDelay: 0,
  },
  {
    name: 'item2',
    url: UggBox,
    animateDelay: 0.1,
  },
  {
    name: 'item3',
    url: UggBox,
    animateDelay: 0.2,
  },
  {
    name: 'item4',
    url: UggBox,
    animateDelay: 0.3,
  },
  {
    name: 'item5',
    url: UggBox,
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
      img: img1,
      backImg: backImg1,
      position: [],
    },
    {
      name: 'item2',
      isCollected: false,
      isFinished: false,
      img: img1,
      backImg: backImg1,
      position: [],
    },
    {
      name: 'item3',
      isCollected: false,
      isFinished: false,
      img: img1,
      backImg: backImg1,
      position: [],
    },
    {
      name: 'item4',
      isCollected: false,
      isFinished: false,
      img: img1,
      backImg: backImg1,
      position: [],
    },
    {
      name: 'item5',
      isCollected: false,
      isFinished: false,
      img: img1,
      backImg: backImg1,
      position: [],
    },
  ],
  position: [
    [-1.5, 0, -2],
    [1.5, 0, -2],
    [-3, 0, 2],
    [0, 0, 2],
    [3, 0, 2],
  ],
};
