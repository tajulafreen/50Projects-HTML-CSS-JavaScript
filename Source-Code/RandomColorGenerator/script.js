const getColor = () => {
  const randomNumber = Math.floor(Math.random() * 1677215);
  const randomCode = `#${randomNumber.toString(16)}`;
  console.log(randomNumber, randomCode);
  document.body.style.backgroundColor = randomCode;
  document.getElementById('color-code').innerText = randomCode;
  navigator.clipboard.writeText(randomCode);// Copy the color code to clipboard also
};
// function call
document.getElementById('btn').addEventListener(
  'click',
  getColor,
);
// init call
getColor();
