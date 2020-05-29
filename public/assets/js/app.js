const urlForm = document.getElementById('extractForm');
const fileForm = document.getElementById('uploadForm');
const regex = /^(https?):\/\/[^\s$.?#].[^\s]*$/gm;
let counter = 0;
const limit = 1;

$(document).ready(function () {
  bsCustomFileInput.init();
});

urlForm.addEventListener('submit', (event) => {
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
  } else {
    document.getElementById('urlButton').innerHTML =
      'Loading <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    document.getElementById('urlButton').disabled = true;
  }
});

fileForm.addEventListener('submit', (event) => {
  document.getElementById('inputGroupFileAddon04').innerHTML =
    'Processing <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
  document.getElementById('inputGroupFileAddon04').disabled = true;
});
