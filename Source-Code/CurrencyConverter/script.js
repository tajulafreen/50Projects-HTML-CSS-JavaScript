document.getElementById('convert').addEventListener('click', () => {
  const amount = document.getElementById('amount').value;
  const fromCurrency = document.getElementById('from-currency').value;
  const toCurrency = document.getElementById('to-currency').value;

  if (amount === '' || Number.isNaN(Number(amount))) {
    alert('Please enter a valid amount');
    return;
  }

  const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const exchangeRate = data.rates[toCurrency];
      const convertedAmount = (amount * exchangeRate).toFixed(2);
      document.getElementById(
        'result',
      ).innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    })
    .catch((error) => {
      document.getElementById(
        'result',
      ).innerText = `Error fetching exchange rates. ${error}Try again later.`;
    });
});
