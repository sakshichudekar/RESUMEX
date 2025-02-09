function showSection(sectionId) {
  
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
      section.classList.remove('active');
    });
  
    // Hide default image
    const defaultImage = document.getElementById('default-image');
    if (defaultImage) {
      defaultImage.classList.remove('active');
    }
  
    // Show the selected section if it exists
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
      activeSection.classList.add('active');
    } else if (defaultImage) {
      // If no sectionId is passed or invalid, show the default image
      defaultImage.classList.add('active');
    }
  }