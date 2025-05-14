document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // Setup Form Elements
    const voiceInterviewSetupForm = document.getElementById('voiceInterviewSetupForm');
    const startInterviewBtn = document.getElementById('startInterviewBtn');
    
    // Interview Panel Elements
    const interviewPanel = document.getElementById('interviewPanel');
    const emptyInterviewState = document.getElementById('emptyInterviewState');
    const activeInterviewState = document.getElementById('activeInterviewState');
    const interviewCompleteState = document.getElementById('interviewCompleteState');
    const interviewControls = document.getElementById('interviewControls');
    const interviewStatus = document.getElementById('interviewStatus');
    const interviewTime = document.getElementById('interviewTime');
    const conversationHistory = document.getElementById('conversationHistory');
    const microphoneBtn = document.getElementById('microphoneBtn');
    
    // Interview Control Buttons
    const pauseInterviewBtn = document.getElementById('pauseInterviewBtn');
    const endInterviewBtn = document.getElementById('endInterviewBtn');
    const newInterviewBtn = document.getElementById('newInterviewBtn');
    const downloadTranscriptBtn = document.getElementById('downloadTranscriptBtn');
    
    // Summary Elements
    const summaryPosition = document.getElementById('summaryPosition');
    const summaryDuration = document.getElementById('summaryDuration');
    const summaryQuestions = document.getElementById('summaryQuestions');
    const summaryCompletion = document.getElementById('summaryCompletion');
    const interviewFeedback = document.getElementById('interviewFeedback');
    
    // Settings Elements
    const settingsBtn = document.getElementById('settingsBtn');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const toggleApiKey = document.getElementById('toggleApiKey');
    const voiceSelect = document.getElementById('voiceSelect');
    const speechSpeedSelect = document.getElementById('speechSpeedSelect');
    
    // Help Elements
    const helpLink = document.getElementById('helpLink');
    
    // Interview state
    let interviewInProgress = false;
    let interviewPaused = false;
    let interviewDuration = 0;
    let interviewTimer = null;
    let questionCount = 0;
    let interviewPosition = '';
    
    // Check if OpenAI API key is missing
    const apiKeyWarning = document.querySelector('.alert-warning');
    const hasApiKey = !apiKeyWarning;
    
    // Event Listeners
    if (voiceInterviewSetupForm) {
        voiceInterviewSetupForm.addEventListener('submit', handleInterviewStart);
    }
    
    if (microphoneBtn) {
        microphoneBtn.addEventListener('click', toggleMicrophone);
    }
    
    if (pauseInterviewBtn) {
        pauseInterviewBtn.addEventListener('click', togglePauseInterview);
    }
    
    if (endInterviewBtn) {
        endInterviewBtn.addEventListener('click', endInterview);
    }
    
    if (newInterviewBtn) {
        newInterviewBtn.addEventListener('click', resetInterview);
    }
    
    if (downloadTranscriptBtn) {
        downloadTranscriptBtn.addEventListener('click', downloadTranscript);
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
     * Handle interview start
     */
    function handleInterviewStart(e) {
        e.preventDefault();
        
        // Check if API key is available
        if (!hasApiKey) {
            showError('OpenAI API key is required. Please add your API key to use this feature.');
            return;
        }
        
        // Get form data
        const position = document.getElementById('interview_position').value.trim();
        const level = document.getElementById('interview_level').value;
        const duration = document.getElementById('interview_duration').value;
        const resume = document.getElementById('candidate_resume').value.trim();
        
        // Validate required fields
        if (!position || !level) {
            showError('Please fill in all required fields.');
            return;
        }
        
        // Save interview position for summary
        interviewPosition = position;
        
        // In a real app, we would send this data to the backend to prepare the interview
        // For this demo, we'll simulate the interview start
        
        // Show the interview panel
        emptyInterviewState.classList.add('d-none');
        activeInterviewState.classList.remove('d-none');
        interviewControls.style.display = 'flex';
        
        // Start the interview timer
        startInterviewTimer();
        
        // Set interview in progress
        interviewInProgress = true;
        
        // Simulate the first AI message after a delay
        setTimeout(() => {
            // Add introduction message
            addMessage('AI Interviewer', `Hello! Thank you for joining us today for this ${position} interview. I'll be asking you a series of questions to learn more about your experience and skills. Let's get started.`, 'ai');
            
            // After a delay, show the first question
            setTimeout(() => {
                askNextQuestion();
            }, 3000);
        }, 1500);
    }
    
    /**
     * Start the interview timer
     */
    function startInterviewTimer() {
        interviewDuration = 0;
        updateInterviewTime();
        
        interviewTimer = setInterval(() => {
            interviewDuration++;
            updateInterviewTime();
        }, 1000);
    }
    
    /**
     * Update the interview time display
     */
    function updateInterviewTime() {
        const minutes = Math.floor(interviewDuration / 60).toString().padStart(2, '0');
        const seconds = (interviewDuration % 60).toString().padStart(2, '0');
        interviewTime.textContent = `${minutes}:${seconds}`;
    }
    
    /**
     * Ask the next interview question
     */
    function askNextQuestion() {
        // Update status
        interviewStatus.textContent = 'AI is speaking...';
        
        // Get a mock question
        const question = getMockQuestion(questionCount);
        questionCount++;
        
        // Add the question to the conversation
        addMessage('AI Interviewer', question, 'ai');
        
        // Update status after a delay
        setTimeout(() => {
            interviewStatus.textContent = 'Your turn to speak...';
        }, 2000);
    }
    
    /**
     * Add a message to the conversation history
     */
    function addMessage(sender, content, type) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        
        const senderEl = document.createElement('div');
        senderEl.className = 'sender';
        senderEl.textContent = sender;
        
        const contentEl = document.createElement('div');
        contentEl.className = 'content';
        contentEl.textContent = content;
        
        messageEl.appendChild(senderEl);
        messageEl.appendChild(contentEl);
        
        conversationHistory.appendChild(messageEl);
        
        // Scroll to the bottom
        conversationHistory.scrollTop = conversationHistory.scrollHeight;
    }
    
    /**
     * Toggle microphone state
     */
    function toggleMicrophone() {
        // In a real app, this would activate/deactivate speech recognition
        if (microphoneBtn.classList.contains('active')) {
            // Deactivate microphone
            microphoneBtn.classList.remove('active');
            
            // Simulate user response end
            simulateUserResponse();
        } else {
            // Activate microphone
            microphoneBtn.classList.add('active');
            
            // Update status
            interviewStatus.textContent = 'Listening...';
            
            // In a real app, this is where we would start speech recognition
            // For the demo, we'll simulate a response after a few seconds
            setTimeout(() => {
                // Automatically deactivate after a delay
                microphoneBtn.classList.remove('active');
                
                // Simulate user response end
                simulateUserResponse();
            }, 5000);
        }
    }
    
    /**
     * Simulate user response
     */
    function simulateUserResponse() {
        // Update status
        interviewStatus.textContent = 'Processing response...';
        
        // For the demo, add a mock user response
        const response = getMockUserResponse(questionCount - 1);
        addMessage('You', response, 'user');
        
        // After a delay, ask the next question or end the interview
        setTimeout(() => {
            if (questionCount < 5) {
                askNextQuestion();
            } else {
                completeInterview();
            }
        }, 2000);
    }
    
    /**
     * Toggle pause/resume interview
     */
    function togglePauseInterview() {
        if (interviewPaused) {
            // Resume interview
            interviewPaused = false;
            pauseInterviewBtn.innerHTML = '<i data-feather="pause" class="feather-small"></i>';
            feather.replace();
            
            // Update status
            interviewStatus.textContent = 'Interview resumed...';
            
            // Resume timer
            startInterviewTimer();
            
            // After a delay, continue the interview
            setTimeout(() => {
                askNextQuestion();
            }, 1500);
        } else {
            // Pause interview
            interviewPaused = true;
            pauseInterviewBtn.innerHTML = '<i data-feather="play" class="feather-small"></i>';
            feather.replace();
            
            // Update status
            interviewStatus.textContent = 'Interview paused';
            
            // Stop timer
            clearInterval(interviewTimer);
        }
    }
    
    /**
     * End the interview
     */
    function endInterview() {
        // Stop the timer
        clearInterval(interviewTimer);
        
        // Update interview state
        interviewInProgress = false;
        
        // Add a final message
        addMessage('AI Interviewer', 'Thank you for your responses. The interview is now complete.', 'ai');
        
        // After a short delay, show the complete state
        setTimeout(() => {
            completeInterview();
        }, 1500);
    }
    
    /**
     * Complete the interview and show summary
     */
    function completeInterview() {
        // Hide active interview view
        activeInterviewState.classList.add('d-none');
        interviewControls.style.display = 'none';
        
        // Show complete state
        interviewCompleteState.classList.remove('d-none');
        
        // Stop the timer
        clearInterval(interviewTimer);
        
        // Update summary
        summaryPosition.textContent = interviewPosition;
        summaryDuration.textContent = interviewTime.textContent;
        summaryQuestions.textContent = questionCount;
        summaryCompletion.textContent = '100%';
        
        // Add mock feedback
        addMockFeedback();
    }
    
    /**
     * Reset interview to start a new one
     */
    function resetInterview() {
        // Clear interview state
        interviewInProgress = false;
        interviewPaused = false;
        questionCount = 0;
        
        // Stop timer if running
        clearInterval(interviewTimer);
        
        // Clear conversation history
        conversationHistory.innerHTML = '';
        
        // Reset feedback
        interviewFeedback.innerHTML = '';
        
        // Hide complete state
        interviewCompleteState.classList.add('d-none');
        
        // Show empty state
        emptyInterviewState.classList.remove('d-none');
        
        // Reset form
        voiceInterviewSetupForm.reset();
    }
    
    /**
     * Download interview transcript
     */
    function downloadTranscript() {
        // In a real app, this would generate a proper transcript
        // For the demo, we'll just show a success message
        showSuccessToast('Transcript downloaded successfully');
    }
    
    /**
     * Add mock feedback to the interview summary
     */
    function addMockFeedback() {
        const feedbackHTML = `
            <div class="feedback-item">
                <div class="feedback-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    Communication Skills
                </div>
                <div class="feedback-rating">
                    <div class="star filled">★</div>
                    <div class="star filled">★</div>
                    <div class="star filled">★</div>
                    <div class="star filled">★</div>
                    <div class="star">★</div>
                </div>
                <p>Your responses were clear and well-structured. You articulated your thoughts effectively and provided concrete examples to support your points.</p>
            </div>
            <div class="feedback-item">
                <div class="feedback-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-code"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                    Technical Proficiency
                </div>
                <div class="feedback-rating">
                    <div class="star filled">★</div>
                    <div class="star filled">★</div>
                    <div class="star filled">★</div>
                    <div class="star">★</div>
                    <div class="star">★</div>
                </div>
                <p>You demonstrated solid technical knowledge, particularly in relation to front-end technologies. Consider providing more specifics about your problem-solving approach in technical scenarios.</p>
            </div>
            <div class="feedback-item">
                <div class="feedback-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-briefcase"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                    Experience Relevance
                </div>
                <div class="feedback-rating">
                    <div class="star filled">★</div>
                    <div class="star filled">★</div>
                    <div class="star filled">★</div>
                    <div class="star filled">★</div>
                    <div class="star filled">★</div>
                </div>
                <p>You effectively connected your past experience to the requirements of this position. Your examples were relevant and showcased your capabilities well.</p>
            </div>
            <div class="feedback-item">
                <div class="feedback-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                    Overall Impression
                </div>
                <div class="feedback-rating">
                    <div class="star filled">★</div>
                    <div class="star filled">★</div>
                    <div class="star filled">★</div>
                    <div class="star filled">★</div>
                    <div class="star">★</div>
                </div>
                <p>You presented yourself professionally and demonstrated a good understanding of the role. For improvement, consider preparing more specific examples of how you've overcome challenges in past projects.</p>
            </div>
        `;
        
        interviewFeedback.innerHTML = feedbackHTML;
    }
    
    /**
     * Get a mock interview question based on the question number
     */
    function getMockQuestion(questionNumber) {
        const questions = [
            "Please introduce yourself and tell me about your experience as a frontend developer.",
            "Can you describe a challenging project you've worked on and how you approached it?",
            "How do you stay updated with the latest frontend technologies and best practices?",
            "Tell me about a time when you had to optimize a website's performance. What steps did you take?",
            "What questions do you have for me about the role or the company?"
        ];
        
        return questions[questionNumber % questions.length];
    }
    
    /**
     * Get a mock user response based on the question number
     */
    function getMockUserResponse(questionNumber) {
        const responses = [
            "I'm a frontend developer with 4 years of experience specializing in React and modern JavaScript. I've worked on various web applications focusing on responsive design and user experience.",
            "One challenging project involved rebuilding a legacy application with modern tools. I approached it by first analyzing the existing codebase, then creating a migration plan, and finally implementing the new system in phases.",
            "I regularly follow industry blogs, attend webinars, and participate in online communities. I also dedicate time each week to experiment with new technologies and contribute to open-source projects.",
            "I identified performance bottlenecks using tools like Lighthouse and WebPageTest. Then I implemented solutions including code splitting, lazy loading images, and optimizing CSS delivery, which resulted in a 40% improvement in load times.",
            "I'd like to know more about the team structure and the types of projects I would be working on. Also, what does the onboarding process look like?"
        ];
        
        return responses[questionNumber % responses.length];
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