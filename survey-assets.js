 // Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyBzr03ek43UYiSO5qVc1RGKLySDccgtYFE",
            authDomain: "quantcom-68a1f.firebaseapp.com",
            projectId: "quantcom-68a1f",
            storageBucket: "quantcom-68a1f.firebasestorage.app",
            messagingSenderId: "36123023094",
            appId: "1:36123023094:web:bb62a3df2d70ca0538bed7",
            measurementId: "G-JZHXTDHV2G"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();

        // Check if user has already submitted the survey
        document.addEventListener('DOMContentLoaded', function() {
            if (localStorage.getItem('surveySubmitted') === 'true') {
                // If survey already submitted, redirect to resources section
                window.location.href = '#resources';
                
                // Show success message on survey page
                const successMessage = document.querySelector('.success-message');
                const surveyForm = document.getElementById('surveyForm');
                if (successMessage && surveyForm) {
                    surveyForm.style.display = 'none';
                    successMessage.style.display = 'block';
                    successMessage.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                <h3><a href="survey-statistic.html">Thank You for Your Participation! Click to View Statistic.</a></h3>
                        <p>Thank you for your previous participation. Explore our resources below.</p>
                    `;
                }
            }

            // Mobile menu functionality
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const mobileMenu = document.querySelector('.mobile-menu');
            const closeMenu = document.querySelector('.close-menu');
            const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

            mobileMenuBtn.addEventListener('click', function() {
                mobileMenu.classList.add('active');
            });

            closeMenu.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
            });

            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenu.classList.remove('active');
                });
            });
        });

        // Form submission handling
        document.getElementById('surveyForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const loading = document.querySelector('.loading');
            const successMessage = document.querySelector('.success-message');
            
            // Disable submit button and show loading
            submitBtn.disabled = true;
            loading.style.display = 'block';
            
            // Collect form data
            const formData = {
                age: document.getElementById('age').value,
                platform: document.getElementById('platform').value,
                time: document.getElementById('time').value,
                concern: document.getElementById('concern').value,
                experience: document.getElementById('experience').value,
                privacy: document.getElementById('privacy').value,
                platformAction: document.getElementById('platform-action').value,
                inclusiveDesign: document.getElementById('inclusive-design').value,
                education: document.getElementById('education').value,
                improvement: document.getElementById('improvement').value,
                suggestions: document.getElementById('suggestions').value,
                timestamp: new Date()
            };
            
            // Save to Firestore
            db.collection("surveyResponses").add(formData)
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    
                    // Hide form and show success message
                    document.getElementById('surveyForm').style.display = 'none';
                    successMessage.style.display = 'block';
                    
                    // Mark survey as submitted in local storage
                    localStorage.setItem('surveySubmitted', 'true');
                    
                    // Redirect to resources after 3 seconds
                    setTimeout(() => {
                        window.location.href = '#resources';
                    }, 3000);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                    alert('There was an error submitting your survey. Please try again.');
                    
                    // Re-enable submit button and hide loading
                    submitBtn.disabled = false;
                    loading.style.display = 'none';
                });
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Add some interactive elements to topic cards
        document.querySelectorAll('.topic-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(20, 22, 35, 0.9)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.background = 'var(--card-bg)';
            });
        });
