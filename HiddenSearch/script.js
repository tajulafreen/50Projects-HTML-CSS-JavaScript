const search = document.getElementById('search');
const btn = document.getElementById('btn');
const input = document.querySelector('input');
btn.addEventListener('click', () => {
  search.classList.toggle('active');
  input.focus();
});
