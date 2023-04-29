/* eslint object-shorthand: [2, "consistent"] */
/* eslint-env es6 */

// Get HTML elements
const addButton = document.getElementById('add-button');
const refreshButton = document.getElementById('refresh');
const errorElement = document.getElementById('error');

// Set the url for the API
const urlAPI = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/70QsvE9IJA28aqxujmzJ/scores/';

// Functions to reload the page ----------------------------------------------------------------

const reloadPage = () => {
  document.getElementById('add-form').reset();
  window.location.reload();
};

// Render results ------------------------------------------------------------------------------

const renderScores = (data) => {
  let scoreRow = '';
  data.result.forEach((element) => {
    scoreRow += `
    <tr class="row">
      <td><p>${element.user}: ${element.score}</p></td>
    </tr>
  `;
  });

  // call the father element and insert the data
  const section = document.getElementById('table');
  section.innerHTML = scoreRow;
};

const getData = async (callback) => {
  try {
    const response = await fetch(
      urlAPI,
      {
        method: 'GET',
      },
    );
    const data = await response.json();
    return callback(data);
  } catch (error) {
    return error;
  }
};

getData(renderScores);

// Saving data --------------------------------------------------------------------------------

// Add a new score to the table
function addScore(user, score) {
  if (user !== '' && score !== '') {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      user: user,
      score: score,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(urlAPI, requestOptions)
      .then((response) => response.text())
      .catch((error) => error);

    setTimeout(() => {
      reloadPage();
    }, 2000);
  } else {
    const messages = [];
    if (user === '' && score === '') {
      messages.push('Please enter the name and score of the participant.');
    } else if (score === '' && user !== '') {
      messages.push('Please enter the participant\'s name');
    } else if (user === '' && score !== '') {
      messages.push('Please enter the participant\'s score');
    }

    if (messages.length > 0) {
      errorElement.innerText = messages.join(', ');
      setTimeout(() => {
        errorElement.remove();
      }, 3000);
    }
  }
}

// Buttons functionality ----------------------------------------------------------------------

// Add score when form is submitted
addButton.addEventListener('click', (event) => {
  event.preventDefault();
  const user = document.querySelector('#user').value;
  const score = document.querySelector('#score').value;
  addScore(user, score);
  setTimeout(() => {
    reloadPage();
  }, 2000);
});

refreshButton.addEventListener('click', () => {
  reloadPage();
});
