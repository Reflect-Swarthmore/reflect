var req = require('quill');

var title = new Quill('#title', {
  placeholder: 'Titulo...',
  theme: 'bubble'
});
var quill = new Quill('#inputText', {
  modules: {
    toolbar: [
      [{ 'font': [] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'align': [] }],
      ['bold', 'italic', 'underline'],
      ['image']
    ]
  },
  placeholder: 'Tell us your life story...',
  theme: 'snow'  // or 'bubble'
});
