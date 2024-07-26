document.addEventListener('DOMContentLoaded', () => {
  // Grab day of the week from local computer
  const date = new Date();
  const dayOfWeekNumber = date.getDay();
  let nameOfDay;
  let quote;

  switch (dayOfWeekNumber) {
    case 0:
      nameOfDay = 'Sunday';
      quote = 'Time to chillax!';
      break;
    case 1:
      nameOfDay = 'Monday';
      quote = 'Monday morning blues!';
      break;
    case 2:
      nameOfDay = 'Tuesday';
      quote = 'Taco Time!';
      break;
    case 3:
      nameOfDay = 'Wednesday';
      quote = 'Two more days to the weekend.';
      break;
    case 4:
      nameOfDay = 'Thursday';
      quote = 'The weekend is almost here...';
      break;
    case 5:
      nameOfDay = 'Friday';
      quote = 'Weekend is here!';
      break;
    case 6:
      nameOfDay = 'Saturday';
      quote = 'Time to party!';
      break;
    default:
      nameOfDay = 'Unknown';
      quote = '';
  }

  // Display the day of the week
  const weekdayDiv = document.getElementById('weekday');
  weekdayDiv.innerHTML = `${nameOfDay}`;

  // Display quote
  const quoteDiv = document.getElementById('phrase');
  quoteDiv.innerHTML = `${quote}`;
});
