document.addEventListener('DOMContentLoaded', () => {
  const convertButton = document.getElementById('convertButton');
  const resetButton = document.getElementById('resetButton');

  function convert() {
    const kilograms = parseFloat(document.getElementById('kgs').value);

    if (Number.isNaN(kilograms) || kilograms <= 0) {
      window.alert('Weight must be greater than zero!!');
    } else {
      const gramsResult = kilograms * 1000;
      const poundsResult = kilograms * 2.20462;
      const ouncesResult = kilograms * 35.274;

      document.getElementById('grams').value = gramsResult.toFixed(2);
      document.getElementById('pounds').value = poundsResult.toFixed(3);
      document.getElementById('ounces').value = ouncesResult.toFixed(2);
    }
  }

  function clearResults() {
    document.getElementById('grams').value = '';
    document.getElementById('pounds').value = '';
    document.getElementById('ounces').value = '';
  }

  convertButton.addEventListener('click', () => {
    convert();
  });

  resetButton.addEventListener('click', () => {
    document.getElementById('converter').reset();
    clearResults();
  });
});
