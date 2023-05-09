import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo(iframe);
const localStorageTime = 'video-player-current-time';

function updateCornetTime() {
  const persistedData = localStorage.getItem(localStorageTime);

  if (persistedData) {
    player.setCurrentTime(localStorage.getItem(localStorageTime));
  }
}
updateCornetTime();

player.on('timeupdate', throttle(saveCornetTime, 1000));

function saveCornetTime(data) {
  localStorage.setItem(localStorageTime, data.seconds);
}

