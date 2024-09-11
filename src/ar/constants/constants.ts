import UggBox from '../../assets/models/CJbox.glb';
import img5 from '../../assets/imgs/img_card1.png';
import img4 from '../../assets/imgs/img_card2.png';
import img3 from '../../assets/imgs/img_card3.png';
import img1 from '../../assets/imgs/img_card4.png';
import img2 from '../../assets/imgs/img_card5.png';
import backImg5 from '../../assets/imgs/img_card1_check.png';
import backImg4 from '../../assets/imgs/img_card2_check.png';
import backImg3 from '../../assets/imgs/img_card3_check.png';
import backImg1 from '../../assets/imgs/img_card4_check.png';
import backImg2 from '../../assets/imgs/img_card5_check.png';

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
    [-1.5, 0, -3],
    [1.5, 0, -3],
    [-3, 0, 3],
    [0, 0, 3],
    [3, 0, 3],
  ],
};
