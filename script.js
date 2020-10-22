// grab

const player = document.querySelector('.player');
const video = player.querySelector('.video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const buton = player.querySelector('.button');
const skipButtons = player.querySelectorAll('[data-skip]');
const slider = player.querySelectorAll('.slider');
const full = player.querySelector('.full');


// functions

function toggle() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  let icon = this.paused ? '►' : '❚ ❚';
  buton.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate() {
  video[this.name] = this.value;
}

function progressFun() {
  let percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function progressUpdate(e) {
  let videoTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = videoTime;
}

function fullScreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) { /* Firefox */
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) { /* IE/Edge */
    video.msRequestFullscreen();
  }
}

// eventListeners

video.addEventListener('click', toggle);
buton.addEventListener('click', toggle);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', progressFun);

skipButtons.forEach(item => item.addEventListener('click', skip));

slider.forEach(slidar => slidar.addEventListener('change', rangeUpdate));

let down = false;
progress.addEventListener('click', progressUpdate)
progress.addEventListener('mousedown', () => down = true);
progress.addEventListener('mouseup', () => down = false);

progress.addEventListener('mousemove', (e) => down && progressUpdate(e));

full.addEventListener('click', fullScreen);