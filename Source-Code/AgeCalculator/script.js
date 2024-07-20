document.addEventListener('DOMContentLoaded', () => {
  const currDate = document.getElementById('currDate');
  const dateOfBirth = document.querySelector('#DOB');
  const calcAgeButton = document.getElementById('CalcAge');
  const displayAge = document.getElementById('displayAge');
  const ageText = document.getElementById('age');
  const today = new Date();

  currDate.innerText = `Today's Date is: ${today.toLocaleDateString('en-US')}`;

  calcAgeButton.addEventListener('click', () => {
    const birthDate = new Date(dateOfBirth.value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0
      || (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age -= 1;
    }

    displayAge.style.visibility = 'visible';
    ageText.innerText = `You are ${age} years old.`;
  });
});
