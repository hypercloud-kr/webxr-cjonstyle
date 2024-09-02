import UggBox from '../../assets/models/CJbox.glb';
import img5 from '../../assets/svg/img_card 1.svg';
import img4 from '../../assets/svg/img_card 2.svg';
import img3 from '../../assets/svg/img_card 3.svg';
import img1 from '../../assets/svg/img_card 4.svg';
import img2 from '../../assets/svg/img_card 5.svg';
import backImg5 from '../../assets/svg/img_card check 1.svg';
import backImg4 from '../../assets/svg/img_card check 2.svg';
import backImg3 from '../../assets/svg/img_card check 3.svg';
import backImg1 from '../../assets/svg/img_card check 4.svg';
import backImg2 from '../../assets/svg/img_card check 5.svg';

export const objectArr = [
  {
    name: 'item1',
    aniName: 'ani_1',
    url: UggBox,
    animateDelay: 0,
  },
  {
    name: 'item2',
    aniName: 'ani_2',
    url: UggBox,
    animateDelay: 0.1,
  },
  {
    name: 'item3',
    aniName: 'ani_3',
    url: UggBox,
    animateDelay: 0.2,
  },
  {
    name: 'item4',
    aniName: 'ani_4',
    url: UggBox,
    animateDelay: 0.3,
  },
  {
    name: 'item5',
    aniName: 'ani_5',
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
      img: img2,
      backImg: backImg2,
      position: [],
    },
    {
      name: 'item3',
      isCollected: false,
      isFinished: false,
      img: img3,
      backImg: backImg3,
      position: [],
    },
    {
      name: 'item4',
      isCollected: false,
      isFinished: false,
      img: img4,
      backImg: backImg4,
      position: [],
    },
    {
      name: 'item5',
      isCollected: false,
      isFinished: false,
      img: img5,
      backImg: backImg5,
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
