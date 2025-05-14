document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // Form elements
    const resumeAnalysisForm = document.getElementById('resumeAnalysisForm');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const btnText = document.getElementById('btnText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const emptyAnalysisState = document.getElementById('emptyAnalysisState');
    const analysisResults = document.getElementById('analysisResults');
    const resultActions = document.getElementById('resultActions');
    
    // Elements for displaying results
    const overallMatchScore = document.getElementById('overallMatchScore');
    const keyStrengths = document.getElementById('keyStrengths');
    const skillGaps = document.getElementById('skillGaps');
    const experienceAnalysis = document.getElementById('experienceAnalysis');
    const educationAnalysis = document.getElementById('educationAnalysis');
    const recommendations = document.getElementById('recommendations');
    
    // Sample data buttons
    const loadSampleResumeBtn = document.getElementById('loadSampleResumeBtn');
    const loadSampleJobBtn = document.getElementById('loadSampleJobBtn');
    const clearResumeBtn = document.getElementById('clearResumeBtn');
    const clearJobBtn = document.getElementById('clearJobBtn');
    
    // Action buttons
    const downloadReportBtn = document.getElementById('downloadReportBtn');
    const printReportBtn = document.getElementById('printReportBtn');
    
    // Modal elements
    const settingsBtn = document.getElementById('settingsBtn');
    const helpLink = document.getElementById('helpLink');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const toggleApiKey = document.getElementById('toggleApiKey');
    
    // Check if OpenAI API key is missing
    const apiKeyWarning = document.querySelector('.alert-warning');
    const hasApiKey = !apiKeyWarning;
    
    // Sample data (same as in main.js)
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
    if (resumeAnalysisForm) {
        resumeAnalysisForm.addEventListener('submit', handleFormSubmit);
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
    
    // Action button event listeners
    if (printReportBtn) {
        printReportBtn.addEventListener('click', () => {
            window.print();
        });
    }
    
    if (downloadReportBtn) {
        downloadReportBtn.addEventListener('click', () => {
            // In a real app, this would generate a PDF
            showSuccessToast('Report downloaded successfully');
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
        
        // Show loading state
        setLoadingState(true);
        
        try {
            // In a real application, you would send this data to your backend API
            // For demo purposes, we'll simulate a response with mock data
            setTimeout(() => {
                displayResults(getMockAnalysisData());
                
                // Show result actions
                if (resultActions) {
                    resultActions.style.display = 'flex';
                }
                
                setLoadingState(false);
            }, 2000);
            
        } catch (error) {
            console.error('Error:', error);
            showError(error.message || 'An error occurred while analyzing the resume');
            setLoadingState(false);
        }
    }
    
    /**
     * Set the loading state of the button
     */
    function setLoadingState(isLoading) {
        if (isLoading) {
            analyzeBtn.disabled = true;
            btnText.textContent = 'Analyzing...';
            loadingSpinner.classList.remove('d-none');
        } else {
            analyzeBtn.disabled = false;
            btnText.textContent = 'Analyze Resume';
            loadingSpinner.classList.add('d-none');
        }
    }
    
    /**
     * Display analysis results
     */
    function displayResults(data) {
        // Set overall match score
        overallMatchScore.textContent = data.overallMatchScore + '%';
        
        // Clear existing content
        keyStrengths.innerHTML = '';
        skillGaps.innerHTML = '';
        experienceAnalysis.innerHTML = '';
        educationAnalysis.innerHTML = '';
        recommendations.innerHTML = '';
        
        // Add key strengths
        data.keyStrengths.forEach(strength => {
            const li = document.createElement('li');
            li.textContent = strength;
            keyStrengths.appendChild(li);
        });
        
        // Add skill gaps
        data.skillGaps.forEach(gap => {
            const li = document.createElement('li');
            li.textContent = gap;
            skillGaps.appendChild(li);
        });
        
        // Add experience analysis
        const expContent = document.createElement('div');
        expContent.innerHTML = data.experienceAnalysis;
        experienceAnalysis.appendChild(expContent);
        
        // Add education analysis
        const eduContent = document.createElement('div');
        eduContent.innerHTML = data.educationAnalysis;
        educationAnalysis.appendChild(eduContent);
        
        // Add recommendations
        const recContent = document.createElement('div');
        recContent.innerHTML = data.recommendations;
        recommendations.appendChild(recContent);
        
        // Create skills chart
        createSkillsChart(data.skillsData);
        
        // Show results, hide empty state
        emptyAnalysisState.classList.add('d-none');
        analysisResults.classList.remove('d-none');
    }
    
    /**
     * Create skills chart using Chart.js
     */
    function createSkillsChart(skillsData) {
        const ctx = document.getElementById('skillsChart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (window.skillsChart instanceof Chart) {
            window.skillsChart.destroy();
        }
        
        window.skillsChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: skillsData.labels,
                datasets: [
                    {
                        label: 'Job Requirements',
                        data: skillsData.required,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
                    },
                    {
                        label: 'Candidate Skills',
                        data: skillsData.candidate,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
                    }
                ]
            },
            options: {
                elements: {
                    line: {
                        borderWidth: 3
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 10
                    }
                }
            }
        });
    }
    
    /**
     * Get mock analysis data for demonstration purposes
     */
    function getMockAnalysisData() {
        return {
            overallMatchScore: 78,
            skillsData: {
                labels: ['React', 'JavaScript', 'HTML/CSS', 'Responsive Design', 'TypeScript', 'Testing', 'RESTful APIs', 'Redux'],
                required: [9, 10, 8, 8, 7, 6, 8, 9],
                candidate: [9, 9, 9, 9, 5, 4, 7, 8]
            },
            keyStrengths: [
                'Strong proficiency in React and core front-end technologies (HTML, CSS, JavaScript)',
                'Extensive experience with responsive design and cross-browser compatibility',
                'Demonstrated ability to improve UI performance and user engagement',
                'Experience with modern build tools and version control systems'
            ],
            skillGaps: [
                'Limited experience with automated testing frameworks (Jest, Mocha)',
                'TypeScript knowledge appears to be introductory rather than advanced',
                'No explicit mention of server-side rendering experience',
                'Limited experience with Vue.js or Angular (nice-to-have skills)'
            ],
            experienceAnalysis: `
                <p>The candidate has <strong>4 years of experience</strong> in front-end development, which meets the job requirement of 3+ years. Their current role as a Senior Front-End Developer demonstrates progression in their career and ability to handle responsibilities similar to those listed in the job description.</p>
                
                <p>Key experience highlights:</p>
                <ul>
                    <li>Led UI redesign projects with measurable improvements in user engagement</li>
                    <li>Developed reusable React components, which aligns with the job requirement</li>
                    <li>Experience working with back-end developers to integrate APIs</li>
                    <li>Experience with code reviews and mentoring, matching job responsibilities</li>
                </ul>
                
                <p>The candidate's experience with React and Redux is particularly relevant for this position.</p>
            `,
            educationAnalysis: `
                <p>The candidate holds a <strong>Bachelor of Science in Computer Science</strong> from New York University, which meets the educational requirement specified in the job description.</p>
                
                <p>Their coursework in Web Development and User Interface Design is directly relevant to the position, providing a solid theoretical foundation for the practical skills demonstrated in their work experience.</p>
                
                <p>They have also supplemented their formal education with relevant professional certifications in React Development, Front-End Web Development, and JavaScript Algorithms, demonstrating a commitment to continuous learning and staying current with industry technologies.</p>
            `,
            recommendations: `
                <p>Based on this analysis, the following interview areas are recommended:</p>
                <ol>
                    <li><strong>Technical Assessment:</strong> Focus on advanced React patterns, Redux state management, and TypeScript proficiency</li>
                    <li><strong>Testing Methodologies:</strong> Explore their approach to testing front-end applications and familiarity with Jest/Enzyme</li>
                    <li><strong>Problem Solving:</strong> Present scenarios related to optimizing component performance and browser compatibility</li>
                    <li><strong>Team Collaboration:</strong> Discuss their experience with Agile methodologies and cross-functional collaboration</li>
                </ol>
                
                <p>The candidate shows strong potential for this role, with their experience closely aligning with key requirements. The identified skill gaps are not critical and could be addressed through on-the-job training.</p>
            `
        };
    }
    
    /**
     * Show an error message
     */
    function showError(message) {
        showSuccessToast(message, 'danger');
    }
    
    /**
     * Show a success toast message
     */
    function showSuccessToast(message, type = 'success') {
        // Check if toast container exists, create if not
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toastEl = document.createElement('div');
        toastEl.className = `toast align-items-center text-white bg-${type}`;
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