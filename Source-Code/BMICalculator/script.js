document.getElementById('btn').addEventListener('click', () => {
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);

  if (
    Number.isNaN(height)
    || Number.isNaN(weight)
    || height <= 0
    || weight <= 0
  ) {
    document.getElementById('result').innerHTML = 'Please enter valid positive numbers for height and weight.';
    return;
  }

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  const bmio = bmi.toFixed(2);

  document.getElementById('result').innerHTML = `Your BMI is ${bmio}`;
});
