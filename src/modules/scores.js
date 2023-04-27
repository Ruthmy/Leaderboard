// Test scores

// Get HTML elements
const addButton = document.getElementById('add-button');
const errorElement = document.getElementById('error');

const scores = [
  { name: 'John Doe', score: 100 },
  { name: 'Jane Smith', score: 80 },
  { name: 'Bob Johnson', score: 60 },
];

// Add a new score to the table

function addScore(name, score) {
  if (name !== '' && score !== '') {
    // Logic for save the score
  } else {
    const messages = [];
    if (name === '' && score === '') {
      messages.push('Please enter the name and score of the participant.');
    } else if (score === '' && name !== '') {
      messages.push('Please enter the participant\'s name');
    } else if (name === '' && score !== '') {
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
  const name = document.querySelector('#name').value;
  const score = document.querySelector('#score').value;
  addScore(name, score);
  // To display the score
});

let scoreRow = '';

scores.forEach((element) => {
  scoreRow += `
    <tr class="row">
      <td><p>${element.name}: ${element.score}</p></td>
    </tr>
  `;
});

// call the father element
const section = document.getElementById('table');

section.innerHTML = scoreRow;
