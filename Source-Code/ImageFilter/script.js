const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
const fileName = 'edited-image';
let brightness = 0;
let contrast = 0;
let saturation = 0;
let vibrance = 0;

// Handle file upload
document.getElementById('upload-file').addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    img.src = event.target.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

// Helper function to clamp values
const clamp = (value) => Math.min(Math.max(value, 0), 255);

// Draw image to canvas
img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
};

// Redraw image with current adjustments
const drawImage = () => {
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data } = imageData;

  // Apply brightness
  for (let i = 0; i < data.length; i += 4) {
    data[i] = clamp(data[i] + brightness); // Red
    data[i + 1] = clamp(data[i + 1] + brightness); // Green
    data[i + 2] = clamp(data[i + 2] + brightness); // Blue
  }

  // Apply contrast
  const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
  for (let i = 0; i < data.length; i += 4) {
    data[i] = clamp(factor * (data[i] - 128) + 128); // Red
    data[i + 1] = clamp(factor * (data[i + 1] - 128) + 128); // Green
    data[i + 2] = clamp(factor * (data[i + 2] - 128) + 128); // Blue
  }

  // Apply saturation
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = clamp(avg + (data[i] - avg) * (1 + saturation / 100)); // Red
    data[i + 1] = clamp(avg + (data[i + 1] - avg) * (1 + saturation / 100)); // Green
    data[i + 2] = clamp(avg + (data[i + 2] - avg) * (1 + saturation / 100)); // Blue
  }

  // Apply vibrance
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    const max = Math.max(data[i], data[i + 1], data[i + 2]);
    const amount = (((max - avg) * 2) / 255) * vibrance;
    data[i] = clamp(data[i] + amount); // Red
    data[i + 1] = clamp(data[i + 1] + amount); // Green
    data[i + 2] = clamp(data[i + 2] + amount); // Blue
  }
  ctx.putImageData(imageData, 0, 0);
};

// Apply brightness
const applyBrightness = (value) => {
  brightness += value;
  drawImage();
};

// Apply contrast
const applyContrast = (value) => {
  contrast += value;
  drawImage();
};

// Apply saturation
const applySaturation = (value) => {
  saturation += value;
  drawImage();
};

// Apply vibrance
const applyVibrance = (value) => {
  vibrance += value;
  drawImage();
};

// Apply effect
const applyEffect = (effect) => {
  drawImage();
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data } = imageData;

  if (effect === 'vintage') {
    // Vintage effect
    for (let i = 0; i < data.length; i += 4) {
      data[i] = clamp(data[i] * 0.9); // Red
      data[i + 1] = clamp(data[i + 1] * 0.7); // Green
      data[i + 2] = clamp(data[i + 2] * 0.5); // Blue
    }
  } else if (effect === 'lomo') {
    // Lomo effect
    for (let i = 0; i < data.length; i += 4) {
      data[i] = clamp(data[i] * 1.2); // Red
      data[i + 1] = clamp(data[i + 1] * 1.2); // Green
      data[i + 2] = clamp(data[i + 2] * 1.2); // Blue
    }
  } else if (effect === 'clarity') {
    // Clarity effect
    // (Increase contrast)
    applyContrast(20);
  } else if (effect === 'sincity') {
    // Sin City effect
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg; // Red
      data[i + 1] = avg; // Green
      data[i + 2] = avg; // Blue
    }
  } else if (effect === 'crossprocess') {
    // Cross Process effect
    for (let i = 0; i < data.length; i += 4) {
      data[i] = clamp(data[i] * 1.3); // Red
      data[i + 1] = clamp(data[i + 1] * 1.1); // Green
      data[i + 2] = clamp(data[i + 2] * 0.9); // Blue
    }
  } else if (effect === 'pinhole') {
    // Pinhole effect
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg * 0.9; // Red
      data[i + 1] = avg * 0.9; // Green
      data[i + 2] = avg * 0.9; // Blue
    }
  } else if (effect === 'nostalgia') {
    // Nostalgia effect
    for (let i = 0; i < data.length; i += 4) {
      data[i] = clamp(data[i] * 0.9 + 50); // Red
      data[i + 1] = clamp(data[i + 1] * 0.7 + 20); // Green
      data[i + 2] = clamp(data[i + 2] * 0.5 + 10); // Blue
    }
  } else if (effect === 'hermajesty') {
    // Her Majesty effect
    for (let i = 0; i < data.length; i += 4) {
      data[i] = clamp(data[i] * 1.1); // Red
      data[i + 1] = clamp(data[i + 1] * 0.95); // Green
      data[i + 2] = clamp(data[i + 2] * 1.3); // Blue
    }
  }

  ctx.putImageData(imageData, 0, 0);
};

// Download image
const downloadImage = () => {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = canvas.toDataURL('image/jpeg');
  link.click();
};

// Revert filters
const revertFilters = () => {
  brightness = 0;
  contrast = 0;
  saturation = 0;
  vibrance = 0;
  drawImage();
};

// Event listeners for filter buttons
document
  .querySelector('.brightness-add')
  .addEventListener('click', () => applyBrightness(10));
document
  .querySelector('.brightness-remove')
  .addEventListener('click', () => applyBrightness(-10));
document
  .querySelector('.contrast-add')
  .addEventListener('click', () => applyContrast(10));
document
  .querySelector('.contrast-remove')
  .addEventListener('click', () => applyContrast(-10));
document
  .querySelector('.saturation-add')
  .addEventListener('click', () => applySaturation(10));
document
  .querySelector('.saturation-remove')
  .addEventListener('click', () => applySaturation(-10));
document
  .querySelector('.vibrance-add')
  .addEventListener('click', () => applyVibrance(10));
document
  .querySelector('.vibrance-remove')
  .addEventListener('click', () => applyVibrance(-10));

// Event listeners for effect buttons
document
  .querySelector('.vintage-add')
  .addEventListener('click', () => applyEffect('vintage'));
document
  .querySelector('.lomo-add')
  .addEventListener('click', () => applyEffect('lomo'));
document
  .querySelector('.clarity-add')
  .addEventListener('click', () => applyEffect('clarity'));
document
  .querySelector('.sincity-add')
  .addEventListener('click', () => applyEffect('sincity'));

document
  .querySelector('.crossprocess-add')
  .addEventListener('click', () => applyEffect('crossprocess'));
document
  .querySelector('.pinhole-add')
  .addEventListener('click', () => applyEffect('pinhole'));
document
  .querySelector('.nostalgia-add')
  .addEventListener('click', () => applyEffect('nostalgia'));
document
  .querySelector('.hermajesty-add')
  .addEventListener('click', () => applyEffect('hermajesty'));

// Event listeners for download and revert buttons
document
  .getElementById('download-btn')
  .addEventListener('click', downloadImage);
document.getElementById('revert-btn').addEventListener('click', revertFilters);
