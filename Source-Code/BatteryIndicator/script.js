document.addEventListener('DOMContentLoaded', () => {
  const percentage = document.querySelector('.percentage');
  const percent = document.querySelector('.percent');

  navigator.getBattery().then((battery) => {
    percentage.style.width = `${battery.level * 100}%`;
    percent.innerHTML = `${Math.floor(battery.level * 100)}%`;
  });

  const sec = document.querySelector('.sec');
  const toggle = document.querySelector('.toggle');
  toggle.addEventListener('click', () => {
    sec.classList.toggle('dark');
  });
});
