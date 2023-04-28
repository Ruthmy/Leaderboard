// Test scores

// API work

// Render results

const renderScores = (data) => {
  console.log(data.result);
  console.log(typeof (data));

  let scoreRow = '';

  data.result.forEach((element) => {
    scoreRow += `
    <tr class="row">
      <td><p>${element.user}: ${element.score}</p></td>
    </tr>
  `;
  });

  // call the father element
  const section = document.getElementById('table');

  section.innerHTML = scoreRow;
};

const getData = async (callback) => {
  try {
    const response = await fetch(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/70QsvE9IJA28aqxujmzJ/scores/',
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

// --------------------------------------------------------------------------------------------

// Get HTML elements
const addButton = document.getElementById('add-button');
const errorElement = document.getElementById('error');

const scores = [
  { user: 'John Doe', score: 100 },
  { user: 'Jane Smith', score: 80 },
  { user: 'Bob Johnson', score: 60 },
];

// Add a new score to the table

function addScore(user, score) {
  if (user !== '' && score !== '') {
    // Logic for save the score
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
      // Remove the message after 3 seconds
      setTimeout(() => {
        errorElement.remove();
      }, 3000);
    }
  }
}

// Add score when form is submitted
addButton.addEventListener('click', (event) => {
  event.preventDefault();
  const user = document.querySelector('#user').value;
  const score = document.querySelector('#score').value;
  addScore(user, score);
  // To display the score
});

/*
let scoreRow = '';

scores.forEach((element) => {
  scoreRow += `
    <tr class="row">
      <td><p>${element.user}: ${element.score}</p></td>
    </tr>
  `;
});

// call the father element
const section = document.getElementById('table');

section.innerHTML = scoreRow;
*/