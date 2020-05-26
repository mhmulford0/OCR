const form = document.getElementById('extractForm');
const regex = /^(https?):\/\/[^\s$.?#].[^\s]*$/gm;
let counter = 0;
const limit = 1;

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

$('input[type="file"]').change(function (e) {
  var fileName = e.target.files[0].name;
  $('.custom-file-label').text(fileName);
});
