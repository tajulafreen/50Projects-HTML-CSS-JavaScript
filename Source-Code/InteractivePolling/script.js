document.addEventListener('DOMContentLoaded', () => {
  const pollOptions = document.querySelectorAll('.poll-option');
  const resultsList = document.getElementById('results-list');

  const votes = JSON.parse(localStorage.getItem('votes')) || {
    Ruby: 0,
    Python: 0,
    Java: 0,
    Javascript: 0,
  };

  // Update the results on the page
  function updateResults() {
    resultsList.innerHTML = ''; // Clear previous results

    const totalVotes = Object.values(votes).reduce(
      (total, count) => total + count,
      0,
    );

    // Display the updated results
    Object.entries(votes).forEach(([option, count]) => {
      const percentage = totalVotes
        ? ((count / totalVotes) * 100).toFixed(1)
        : 0;

      const resultItem = document.createElement('li');
      resultItem.innerHTML = `
          <strong>${option}</strong>: ${count} votes (${percentage}%)
          <div class="bar" style="width: ${percentage}%;"></div>
        `;
      resultsList.appendChild(resultItem);
    });
  }

  // Display initial poll results
  updateResults();

  // Event listener for voting
  pollOptions.forEach((option) => {
    option.addEventListener('click', () => {
      const selectedVote = option.getAttribute('data-vote');
      votes[selectedVote] += 1;
      localStorage.setItem('votes', JSON.stringify(votes));
      updateResults();
    });
  });
});
