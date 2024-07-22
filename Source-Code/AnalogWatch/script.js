document.addEventListener('DOMContentLoaded', () => {
  const hr = document.querySelector('#hr');
  const mn = document.querySelector('#mn');
  const sc = document.querySelector('#sc');

  const deg = 6;

  setInterval(() => {
    const day = new Date();
    const h = day.getHours() * 30;
    const m = day.getMinutes() * deg;
    const s = day.getSeconds() * deg;

    hr.style.transform = `rotate(${h + m / 12}deg)`;
    mn.style.transform = `rotate(${m}deg)`;
    sc.style.transform = `rotate(${s}deg)`;
  });
});
