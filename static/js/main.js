document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // Form and Result Elements
    const interviewForm = document.getElementById('interviewForm');
    const generateBtn = document.getElementById('generateBtn');
    const btnText = document.getElementById('btnText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const emptyState = document.getElementById('emptyState');
    const resultsContent = document.getElementById('resultsContent');
    const errorState = document.getElementById('errorState');
    const errorMessage = document.getElementById('errorMessage');
    const resultActions = document.getElementById('resultActions');
    
    // Question list elements
    const technicalQuestions = document.getElementById('technicalQuestions');
    const experienceQuestions = document.getElementById('experienceQuestions');
    const behavioralQuestions = document.getElementById('behavioralQuestions');
    const skillGapQuestions = document.getElementById('skillGapQuestions');
    
    // Match score element
    const matchScore = document.getElementById('matchScore');
    
    // Sample data buttons
    const loadSampleResumeBtn = document.getElementById('loadSampleResumeBtn');
    const loadSampleJobBtn = document.getElementById('loadSampleJobBtn');
    const clearResumeBtn = document.getElementById('clearResumeBtn');
    const clearJobBtn = document.getElementById('clearJobBtn');
    
    // Advanced options elements
    const questionCount = document.getElementById('questionCount');
    const focusArea = document.getElementById('focusArea');
    const difficultyLevel = document.getElementById('difficultyLevel');
    
    // Modal Related Elements
    const settingsBtn = document.getElementById('settingsBtn');
    const saveQuestionsBtn = document.getElementById('saveQuestionsBtn');
    const printQuestionsBtn = document.getElementById('printQuestionsBtn');
    const downloadQuestionsBtn = document.getElementById('downloadQuestionsBtn');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    const confirmSaveQuestionsBtn = document.getElementById('confirmSaveQuestionsBtn');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const toggleApiKey = document.getElementById('toggleApiKey');
    
    // Help link
    const helpLink = document.getElementById('helpLink');
    
    // Check if OpenAI API key is missing from the environment
    const apiKeyWarning = document.querySelector('.alert-warning');
    const hasApiKey = !apiKeyWarning;
    
    // Sample data for demonstration
    const sampleResume = `JANE SMITH
Front-End Developer
janesmith@email.com | (555) 123-4567 | New York, NY | github.com/janesmith

PROFESSIONAL SUMMARY
Dedicated and creative Front-End Developer with 4 years of experience designing and implementing responsive websites and web applications. Passionate about creating intuitive user interfaces and optimizing user experience. Proficient in HTML, CSS, JavaScript, React, and various front-end frameworks.

SKILLS
• Programming Languages: JavaScript (ES6+), HTML5, CSS3, TypeScript
• Frameworks/Libraries: React, Redux, Vue.js, Bootstrap, Tailwind CSS
• Tools: Git, Webpack, npm, Sass, Jest, Figma
• Other: Responsive Design, Web Accessibility, Cross-Browser Compatibility, SEO Principles

PROFESSIONAL EXPERIENCE
Senior Front-End Developer
TechNova Solutions, New York, NY
January 2021 - Present
• Led the redesign of the company's main product interface, resulting in a 35% increase in user engagement
• Developed reusable UI components using React, improving development efficiency by 40%
• Collaborated with UX/UI designers to implement responsive designs for web and mobile platforms
• Optimized website performance, achieving a 28% decrease in load time
• Mentored junior developers and conducted code reviews to ensure high code quality

Front-End Developer
WebSphere Digital, New York, NY
June 2019 - December 2020
• Built interactive web applications using React and Redux for state management
• Implemented responsive designs ensuring cross-browser compatibility
• Worked closely with back-end developers to integrate RESTful APIs
• Participated in Agile development processes including daily stand-ups and sprint planning

EDUCATION
Bachelor of Science in Computer Science
New York University, New York, NY
Graduated: May 2019
• GPA: 3.8/4.0
• Relevant coursework: Web Development, User Interface Design, Data Structures, Algorithms

PROJECTS
E-commerce Platform (2021)
• Developed a full-featured e-commerce site using React, Redux, and Node.js
• Implemented user authentication, product search, filtering, and shopping cart functionality
• Integrated payment processing using Stripe API

Weather Dashboard Application (2020)
• Created a weather dashboard that displays current and forecasted weather data
• Utilized OpenWeatherMap API for real-time weather information
• Built with HTML, CSS, and JavaScript with a focus on responsive design

CERTIFICATIONS
• React Developer Certification, React Training (2021)
• Front-End Web Developer Nanodegree, Udacity (2020)
• JavaScript Algorithms and Data Structures, freeCodeCamp (2019)

LANGUAGES
• English (Native)
• Spanish (Intermediate)`;

    const sampleJobDescription = `Front-End Developer

Company Overview:
InnovateTech is a leading digital product agency specializing in creating cutting-edge web and mobile applications for clients across various industries. We're seeking a talented Front-End Developer to join our growing team.

Job Description:
We are looking for a skilled Front-End Developer to join our dynamic team. In this role, you will be responsible for building the 'client-side' of our web applications. You should be able to translate our company and customer needs into functional and appealing interactive applications.

Responsibilities:
• Develop new user-facing features using React.js and related technologies
• Build reusable components and front-end libraries for future use
• Translate designs and wireframes into high-quality code
• Optimize components for maximum performance across a vast array of web-capable devices and browsers
• Collaborate with back-end developers and designers to improve usability
• Participate in code reviews and provide constructive feedback to other developers
• Stay up-to-date with emerging technologies and industry trends

Requirements:
• 3+ years of experience as a Front-End Developer
• Proficient in HTML5, CSS3, and JavaScript (ES6+)
• Strong experience with React.js and its core principles
• Familiarity with RESTful APIs and modern front-end build pipelines and tools
• Experience with responsive and adaptive design
• Understanding of CSS pre-processors (Sass, Less)
• Knowledge of version control systems (Git)
• Excellent problem-solving skills and attention to detail
• Bachelor's degree in Computer Science, Web Development, or related field (or equivalent practical experience)

Nice to Have:
• Experience with Vue.js or Angular
• Understanding of server-side rendering and its benefits
• Knowledge of TypeScript
• Familiarity with testing frameworks (Jest, Mocha, Enzyme)
• Understanding of UI/UX design principles
• Experience with Agile development methodologies

Benefits:
• Competitive salary based on experience
• Health, dental, and vision insurance
• Flexible working hours and remote work options
• Professional development opportunities
• Collaborative and innovative work environment
• Stock options

Location: New York, NY (Hybrid - 3 days in office, 2 days remote)

If you're passionate about creating elegant, efficient front-end solutions and want to work with a team of talented developers, we'd love to hear from you!`;

    // Event listeners
    if (interviewForm) {
        interviewForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Load sample data event listeners
    if (loadSampleResumeBtn) {
        loadSampleResumeBtn.addEventListener('click', () => {
            document.getElementById('resume_text').value = sampleResume;
        });
    }
    
    if (loadSampleJobBtn) {
        loadSampleJobBtn.addEventListener('click', () => {
            document.getElementById('job_description').value = sampleJobDescription;
        });
    }
    
    if (clearResumeBtn) {
        clearResumeBtn.addEventListener('click', () => {
            document.getElementById('resume_text').value = '';
        });
    }
    
    if (clearJobBtn) {
        clearJobBtn.addEventListener('click', () => {
            document.getElementById('job_description').value = '';
        });
    }
    
    // Settings button
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            const settingsModal = new bootstrap.Modal(document.getElementById('settingsModal'));
            settingsModal.show();
        });
    }
    
    // Help link
    if (helpLink) {
        helpLink.addEventListener('click', (e) => {
            e.preventDefault();
            const helpModal = new bootstrap.Modal(document.getElementById('helpModal'));
            helpModal.show();
        });
    }
    
    // Toggle API key visibility
    if (toggleApiKey) {
        toggleApiKey.addEventListener('click', () => {
            const type = apiKeyInput.getAttribute('type') === 'password' ? 'text' : 'password';
            apiKeyInput.setAttribute('type', type);
            toggleApiKey.innerHTML = type === 'password' ? 
                '<i data-feather="eye" class="feather-small"></i>' : 
                '<i data-feather="eye-off" class="feather-small"></i>';
            feather.replace();
        });
    }
    
    // Save settings
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', () => {
            const apiKey = apiKeyInput.value.trim();
            if (apiKey) {
                // In a real application, you would securely save this API key
                // For now, we'll just simulate success
                const settingsModal = bootstrap.Modal.getInstance(document.getElementById('settingsModal'));
                settingsModal.hide();
                showSuccessToast('Settings saved successfully');
            }
        });
    }
    
    // Print Questions
    if (printQuestionsBtn) {
        printQuestionsBtn.addEventListener('click', () => {
            window.print();
        });
    }
    
    // Save Questions
    if (saveQuestionsBtn) {
        saveQuestionsBtn.addEventListener('click', () => {
            const saveQuestionsModal = new bootstrap.Modal(document.getElementById('saveQuestionsModal'));
            saveQuestionsModal.show();
        });
    }
    
    // Confirm Save Questions
    if (confirmSaveQuestionsBtn) {
        confirmSaveQuestionsBtn.addEventListener('click', () => {
            const name = document.getElementById('questionSetName').value.trim();
            if (name) {
                // In a real application, you would save these questions to storage
                // For this demo, we'll just show a success message
                const saveQuestionsModal = bootstrap.Modal.getInstance(document.getElementById('saveQuestionsModal'));
                saveQuestionsModal.hide();
                showSuccessToast('Questions saved successfully');
            }
        });
    }
    
    /**
     * Handle form submission
     */
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        // Check if API key is available
        if (!hasApiKey) {
            showError('OpenAI API key is required. Please add your API key to use this feature.');
            return;
        }
        
        // Get form data
        const resumeText = document.getElementById('resume_text').value.trim();
        const jobDescription = document.getElementById('job_description').value.trim();
        
        // Validate inputs
        if (!resumeText || !jobDescription) {
            showError('Both resume and job description are required.');
            return;
        }
        
        // Get advanced options
        const questionsPerCategory = questionCount ? questionCount.value : 3;
        const focus = focusArea ? focusArea.value : 'balanced';
        const difficulty = difficultyLevel ? difficultyLevel.value : 'intermediate';
        
        // Show loading state
        setLoadingState(true);
        hideError();
        
        try {
            // Send request to backend
            const response = await fetch('/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    resume_text: resumeText,
                    job_description: jobDescription,
                    options: {
                        question_count: questionsPerCategory,
                        focus_area: focus,
                        difficulty_level: difficulty
                    }
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate questions');
            }
            
            // Display results
            displayResults(data.questions);
            
            // Show result actions
            if (resultActions) {
                resultActions.style.display = 'flex';
            }
            
        } catch (error) {
            console.error('Error:', error);
            showError(error.message || 'An error occurred while generating questions');
        } finally {
            setLoadingState(false);
        }
    }
    
    /**
     * Display the generated questions in the results section
     */
    function displayResults(questions) {
        // Clear existing questions
        technicalQuestions.innerHTML = '';
        experienceQuestions.innerHTML = '';
        behavioralQuestions.innerHTML = '';
        skillGapQuestions.innerHTML = '';
        
        // Set match score (this would be calculated by the backend in a real application)
        // For demo purposes, we'll use a random score between 70 and 95
        if (matchScore) {
            matchScore.textContent = Math.floor(Math.random() * 26 + 70) + '%';
        }
        
        // Add technical questions
        if (questions.technical_questions && questions.technical_questions.length > 0) {
            questions.technical_questions.forEach(question => {
                const li = document.createElement('li');
                li.textContent = question;
                technicalQuestions.appendChild(li);
            });
        }
        
        // Add experience questions
        if (questions.experience_questions && questions.experience_questions.length > 0) {
            questions.experience_questions.forEach(question => {
                const li = document.createElement('li');
                li.textContent = question;
                experienceQuestions.appendChild(li);
            });
        }
        
        // Add behavioral questions
        if (questions.behavioral_questions && questions.behavioral_questions.length > 0) {
            questions.behavioral_questions.forEach(question => {
                const li = document.createElement('li');
                li.textContent = question;
                behavioralQuestions.appendChild(li);
            });
        }
        
        // Add skill gap questions
        if (questions.skill_gap_questions && questions.skill_gap_questions.length > 0) {
            questions.skill_gap_questions.forEach(question => {
                const li = document.createElement('li');
                li.textContent = question;
                skillGapQuestions.appendChild(li);
            });
        }
        
        // Hide empty state, show results
        emptyState.classList.add('d-none');
        resultsContent.classList.remove('d-none');
        
        // Scroll to results on mobile
        if (window.innerWidth < 992) {
            document.querySelector('.results-container').scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
    }
    
    /**
     * Set the loading state of the button
     */
    function setLoadingState(isLoading) {
        if (isLoading) {
            generateBtn.disabled = true;
            btnText.textContent = 'Generating...';
            loadingSpinner.classList.remove('d-none');
        } else {
            generateBtn.disabled = false;
            btnText.textContent = 'Generate Interview Questions';
            loadingSpinner.classList.add('d-none');
        }
    }
    
    /**
     * Show an error message
     */
    function showError(message) {
        errorMessage.textContent = message;
        errorState.classList.remove('d-none');
    }
    
    /**
     * Hide the error message
     */
    function hideError() {
        errorState.classList.add('d-none');
    }
    
    /**
     * Show a success toast message
     */
    function showSuccessToast(message) {
        // Check if toast container exists, create if not
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toastEl = document.createElement('div');
        toastEl.className = 'toast align-items-center text-white bg-success';
        toastEl.setAttribute('role', 'alert');
        toastEl.setAttribute('aria-live', 'assertive');
        toastEl.setAttribute('aria-atomic', 'true');
        
        toastEl.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;
        
        toastContainer.appendChild(toastEl);
        
        // Initialize and show the toast
        const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
        toast.show();
        
        // Remove the toast element after it's hidden
        toastEl.addEventListener('hidden.bs.toast', () => {
            toastEl.remove();
        });
    }
});
