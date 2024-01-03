const contents = document.querySelectorAll('.content');

const checkBoxes = () => {
  const triggerBottom = (window.innerHeight / 5) * 4;
  contents.forEach((content) => {
    const boxTop = content.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      content.classList.add('show');
    } else {
      content.classList.remove('show');
    }
  });
};

window.addEventListener('scroll', checkBoxes);
checkBoxes();
