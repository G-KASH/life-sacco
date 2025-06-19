
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  
    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });
    
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    // Dark Mode Toggle
    const toggleButton = document.getElementById('toggle-button');
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
      toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    toggleButton.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        localStorage.setItem('darkMode', 'disabled');
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
      }
    });
  
    // Quote Form Handling
    document.getElementById('quoteForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const age = parseInt(document.getElementById('age').value);
      const coverage = parseInt(document.getElementById('coverage').value);
      const type = document.getElementById('type').value;
      
      // Input validation
      if (isNaN(age)){
        alert('Please enter a valid age.');
        return;
      }
      
      if (isNaN(coverage)) {
        alert('Please enter a valid coverage amount.');
        return;
      }
      
      if (!type) {
        alert('Please select an insurance type.');
        return;
      }
      
      // Calculate quote based on type
      let baseRate;
      switch(type) {
        case 'health':
          baseRate = 0.015;
          break;
        case 'life':
          baseRate = 0.02;
          break;
        case 'auto':
          baseRate = 0.03;
          break;
        case 'home':
          baseRate = 0.025;
          break;
        default:
          baseRate = 0.02;
      }
      
      // Apply age factor
      const ageFactor = age > 50 ? 1.5 : 1.0;
      
      // Calculate final quote
      const quote = (coverage * baseRate * ageFactor).toFixed(2);
      
      // Display result
      document.getElementById('result').textContent = `Your estimated monthly premium: $${quote}`;
      
      // Reset form
      this.reset();
    });
  
    // Health Quote Form Handling
    const healthQuoteForm = document.getElementById('healthQuoteForm');
    if (healthQuoteForm) {
      healthQuoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const age = parseInt(document.getElementById('h-age').value);
        const familyMembers = parseInt(document.getElementById('family-members').value) || 1;
        const planType = document.getElementById('health-plan').value;
        const conditions = document.getElementById('health-conditions').value;
        
        // Input validation
        if (isNaN(age)) {
          alert('Please enter a valid age.');
          return;
        }
        
        if (!planType) {
          alert('Please select a plan type.');
          return;
        }
        
        // Base rates by plan type
        const baseRates = {
          'individual': 199,
          'family': 399,
          'senior': 299
        };
        
        // Calculate base price
        let price = baseRates[planType];
        
        // Apply age factor
        if (age > 60 && planType !== 'senior') {
          price *= 1.5;
        }
        
        // Apply family members factor for family plan
        if (planType === 'family' && familyMembers > 2) {
          price += (familyMembers - 2) * 75;
        }
        
        // Apply conditions factor
        if (conditions === 'minor') {
          price *= 1.2;
        } else if (conditions === 'major') {
          price *= 1.5;
        }
        
        // Display result
        document.getElementById('healthResult').innerHTML = `
          <h3>Your Estimated Health Plan</h3>
          <p>Plan: ${planType.charAt(0).toUpperCase() + planType.slice(1).replace('-', ' ')}</p>
          <p>Monthly Premium: $${price.toFixed(2)}</p>
          <p>Coverage: $${(price * 100).toFixed(0)} per year</p>
        `;
        
        // Reset form
        this.reset();
      });
    }
  
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current item
        item.classList.toggle('active');
      });
    });
  
    // Newsletter Form
    document.getElementById('newsletterForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('newsletterEmail').value;
      
      if (!email) {
        alert('Please enter your email address.');
        return;
      }
      
      // Simulate successful subscription
      document.getElementById('newsletterResult').textContent = `Thank you for subscribing with ${email}!`;
      this.reset();
    });
  
    // Contact Form
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulate form submission
      alert('Thank you for your message! We will contact you soon.');
      this.reset();
    });
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
      });
    });
  });
  // Add this to your existing script.js file

// Tab functionality for policies page
function initPolicyTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0) {
      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Remove active class from all buttons and contents
          tabBtns.forEach(btn => btn.classList.remove('active'));
          tabContents.forEach(content => content.classList.remove('active'));
          
          // Add active class to clicked button
          btn.classList.add('active');
          
          // Show corresponding content
          const tabId = btn.getAttribute('data-tab');
          document.getElementById(tabId).classList.add('active');
        });
      });
    }
  }
  
  // Terms acceptance functionality
  function initTermsAcceptance() {
    const acceptCheckbox = document.getElementById('acceptTerms');
    const continueBtn = document.getElementById('continueBtn');
    
    if (acceptCheckbox && continueBtn) {
      acceptCheckbox.addEventListener('change', () => {
        continueBtn.disabled = !acceptCheckbox.checked;
      });
      
      continueBtn.addEventListener('click', () => {
        alert('Thank you for accepting our terms and conditions.');
        // In a real app, you would redirect or enable features here
      });
    }
  }
  
  // PDF download simulation
  function initPolicyDownload() {
    const downloadBtn = document.getElementById('downloadPdf');
    
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        alert('Downloading full policy document...');
        // In a real app, this would link to a PDF file
      });
    }
  }
  
  // Print functionality
  function initPolicyPrint() {
    const printBtn = document.getElementById('printPolicy');
    
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }
  
  // Call these functions in your DOMContentLoaded event listener
  document.addEventListener('DOMContentLoaded', function() {
    // ... your existing code ...
    
    initPolicyTabs();
    initTermsAcceptance();
    initPolicyDownload();
    initPolicyPrint();
    
    // ... rest of your existing code ...
  });
  