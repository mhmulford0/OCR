const form = document.getElementById('extractForm');
const regex = /^(https?):\/\/[^\s$.?#].[^\s]*$/gm;
let counter = 0;
const limit = 1;

$(document).ready(function () {
  bsCustomFileInput.init();
});

form.addEventListener('submit', (event) => {
  if (!regex.test(document.getElementById('subject').value)) {
    event.preventDefault();

    if (counter < limit) {
      const div = document.createElement('div');
      div.id = 'container';
      div.innerHTML = 'Please enter a valid URL!';
      div.className = 'alert alert-danger';
      document.getElementById('urlInfo').append(div);
      counter += 1;
    }
  }
});
