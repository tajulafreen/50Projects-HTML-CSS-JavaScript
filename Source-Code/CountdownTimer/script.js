document.addEventListener('DOMContentLoaded', () => {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minsEl = document.getElementById('mins');
  const secondsEl = document.getElementById('seconds');

  const eid = '30 Mar 2025';
  const formatTime = (time) => (time < 10 ? `0${time}` : time);
  const countdown = () => {
    const EidDate = new Date(eid);
    const currentDate = new Date();

    const totalSeconds = (EidDate - currentDate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const mins = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(mins);
    secondsEl.innerHTML = formatTime(seconds);
  };

  // initial call
  countdown();

  setInterval(countdown, 1000);
});
