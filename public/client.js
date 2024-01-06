// code that runs after page is loaded
console.log('Client-side code running');

// get all the read-more buttons
const readmores = document.getElementsByClassName("read-more")

// add an event listener to all read-more buttons
for (let index = 0; index < readmores.length; index++) {
  const element = readmores[index];

  element.addEventListener('click',function(e) {
    // when clicked, it should change two things in CSS: 1) height of card from '42rem' to 'fit-content' and 2) card-text max-height from '4lh' to 'fit-content'
    console.log('button was clicked');
    // you can get the element that was clicked by just calling element, for example:
    console.log(element)

  })
  
}