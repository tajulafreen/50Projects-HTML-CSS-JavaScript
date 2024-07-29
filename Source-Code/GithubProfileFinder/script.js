const inputUser = document.querySelector('#input');

const userImg = document.querySelector('.main-info');
const search = document.getElementById('search');
const bio = document.querySelector('#bio');
const repos = document.querySelector('#repo');
const followers = document.querySelector('#followers');
const following = document.querySelector('#following');

const fetchUser = (username) => {
  fetch(`https://api.github.com/users/${username}`)
    .then((data) => data.json())
    .then((jsonData) => {
      if (jsonData.message === 'Not Found') {
        alert('User Not Found');
      } else {
        userImg.innerHTML = `
            <img src="${jsonData.avatar_url}" alt="avatar" id="prof-img">
            <span class="name" id="name">${jsonData.name}</span>
            <a href="${jsonData.html_url}" id="username">@${jsonData.login}</a>
            `;
        bio.innerHTML = jsonData.bio ? jsonData.bio : 'No bio available.';
        repos.innerHTML = jsonData.public_repos;
        followers.innerHTML = jsonData.followers;
        following.innerHTML = jsonData.following;
      }
    })
    .catch((err) => {
      console.log(`Catch: ${err.message}`);
    });
};

const getUser = () => {
  const username = inputUser.value.trim();

  if (username.length === 0) {
    alert('Please enter a valid GitHub username');
  } else {
    fetchUser(username);
  }

  inputUser.value = '';
};

// Attach event listener to the search button
search.addEventListener('click', getUser);
