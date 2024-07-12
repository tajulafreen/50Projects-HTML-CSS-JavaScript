/* eslint-disable */

document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.querySelector(".loading-text");
  const bg = document.querySelector(".bg");
  let load = 0;

  // Function to update the loading state and apply styles
  const blurring = () => {
    load++;
    if (load > 99) {
      clearInterval(intervalId);
    }
    loadingText.innerText = `${load}%`;
    loadingText.style.opacity = scale(load, 0, 100, 1, 0);
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
  };

  // Start the interval to run the blurring function every 20ms
  const intervalId = setInterval(blurring, 20);

  // Utility function to scale a number from one range to another
  const scale = (num, inMin, inMax, outMin, outMax) =>
    ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
});
