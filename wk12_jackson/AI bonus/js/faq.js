// Select all FAQ items
const faqItems = document.querySelectorAll('.faq-item');

// Loop through each FAQ item
faqItems.forEach(item => {
  const question = item.querySelector('.question');
  
  // Add a click event listener to each question
  question.addEventListener('click', () => {
    // Toggle the 'active' class on the clicked FAQ item
    item.classList.toggle('active');
  });
});
