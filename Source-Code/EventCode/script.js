const insert = document.getElementById('insert');

window.addEventListener('keydown', (e) => {
  insert.innerHTML = `<ul>
    <li class="key">
    ${e.key === ' ' ? 'Space' : e.key}
        <small>event.key</small>
    </li>
    <li class="key">
    ${e.keyCode}
        <small>event.keyCode</small>
    </li>
    <li class="key">
    ${e.code}
        <small>event.code</small>
    </li>
</ul>`;
  console.log(e);
});
