const urlForm = document.getElementById('extractForm');
const fileForm = document.getElementById('uploadForm');
const regex = /^(https?):\/\/[^\s$.?#].[^\s]*$/gm;
let fileCounter = 0;
const fileLimit = 1;
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
  let file = document.getElementById('inputGroupFile02').files;
  if (
    file[0].type == 'image/jpeg' ||
    file[0].type == 'image/jpg' ||
    file[0].type == 'image/png'
  ) {
    document.getElementById('inputGroupFileAddon04').innerHTML =
      'Processing <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    document.getElementById('inputGroupFileAddon04').disabled = true;
  } else {
    event.preventDefault();
    if (fileCounter < fileLimit) {
      const div = document.createElement('div');
      div.id = 'container';
      div.innerHTML = 'Please Choose a different file!';
      div.className = 'alert alert-danger';
      document.getElementById('uploadForm').append(div);
      fileCounter += 1;
    }
  }
});
