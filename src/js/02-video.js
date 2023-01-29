import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const sevedTime = localStorage.getItem('videoplayer-current-time') || 0;

function setingTime({ seconds }) {
  try {
    localStorage.setItem('videoplayer-current-time', JSON.stringify(seconds));
  } catch (error) {
    console.error('Seting error: ', error.message);
  }
}

player.on('timeupdate', throttle(setingTime, 1000));

player
  .setCurrentTime(sevedTime)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
