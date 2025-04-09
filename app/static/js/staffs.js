document.addEventListener('DOMContentLoaded', function() {
  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to the clicked button and corresponding content
      button.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Navigation buttons functionality
  const navButtons = document.querySelectorAll('.staff-nav .view-btn');
  const staffSections = document.querySelectorAll('.staff-section');

  navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = button.getAttribute('href').substring(1);
      
      // Remove active class from all buttons and sections
      navButtons.forEach(btn => btn.classList.remove('active'));
      staffSections.forEach(section => section.classList.remove('active'));
      
      // Add active class to the clicked button and corresponding section
      button.classList.add('active');
      document.getElementById(sectionId).classList.add('active');

      // Scroll to the section
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Search functionality
  const searchInputs = document.querySelectorAll('.search-input');
  
  searchInputs.forEach(input => {
    input.addEventListener('keyup', function() {
      const searchString = this.value.toLowerCase();
      const tableId = this.getAttribute('data-table');
      const table = document.getElementById(tableId);
      const rows = table.querySelectorAll('tbody tr');

      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if(text.includes(searchString)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // Set the first tab as active by default
  if(tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons[0].classList.add('active');
    tabContents[0].classList.add('active');
  }

  // Set the first section as active by default
  if(navButtons.length > 0 && staffSections.length > 0) {
    navButtons[0].classList.add('active');
    staffSections[0].classList.add('active');
  }
});
