document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // Modal Elements
    const settingsBtn = document.getElementById('settingsBtn');
    const helpLink = document.getElementById('helpLink');
    const viewBtns = document.querySelectorAll('.view-btn');
    const printBtns = document.querySelectorAll('.print-btn');
    const deleteBtns = document.querySelectorAll('.delete-btn');
    const printModalQuestionsBtn = document.getElementById('printModalQuestionsBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const toggleApiKey = document.getElementById('toggleApiKey');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');

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

    // View Question Set
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            // In a real app, you would fetch the question set data from the server
            // For now, we'll simulate with mock data
            displayQuestionSet(id);
            const viewModal = new bootstrap.Modal(document.getElementById('viewQuestionSetModal'));
            viewModal.show();
        });
    });

    // Print Question Set
    printBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            // In a real app, you would fetch and print the question set
            window.print();
        });
    });

    // Print Modal Questions
    if (printModalQuestionsBtn) {
        printModalQuestionsBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // Delete Question Set (open confirmation)
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            confirmDeleteBtn.dataset.id = id;
            const confirmModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
            confirmModal.show();
        });
    });

    // Confirm Delete
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', () => {
            const id = confirmDeleteBtn.dataset.id;
            
            // In a real app, you would send a delete request to the server
            // For demo purposes, let's just simulate success
            const confirmModal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
            confirmModal.hide();
            
            // Simulate successful deletion (would normally remove from DOM after server confirms)
            showSuccessToast('Question set deleted successfully');
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        });
    }

    /**
     * Display question set in the modal
     */
    function displayQuestionSet(id) {
        // In a real app, this data would come from your server via AJAX
        // This is just a simulation for the demo
        const mockData = {
            id: id,
            name: "Frontend Developer Interview",
            notes: "Questions for the senior frontend developer position at TechCorp",
            date_created: "2025-05-13",
            questions: {
                technical_questions: [
                    "Can you explain the difference between 'let', 'const', and 'var' in JavaScript?",
                    "How would you optimize a React application's performance?",
                    "Describe your experience with CSS Grid and Flexbox."
                ],
                experience_questions: [
                    "What was the most challenging frontend project you've worked on and how did you overcome the difficulties?",
                    "How do you stay updated with the latest frontend technologies and trends?",
                    "Describe a situation where you had to refactor a large codebase. What was your approach?"
                ],
                behavioral_questions: [
                    "Tell me about a time when you had to meet a tight deadline. How did you manage your time?",
                    "How do you handle conflicting priorities or disagreements with team members?",
                    "Describe a situation where you had to learn a new technology quickly. What was your approach?"
                ],
                skill_gap_questions: [
                    "How comfortable are you with server-side rendering techniques?",
                    "What experience do you have with TypeScript?",
                    "Have you worked with GraphQL before? If so, how does it compare to RESTful APIs in your experience?"
                ]
            }
        };

        // Update modal with question set data
        document.getElementById('questionSetName').textContent = mockData.name;
        document.getElementById('questionSetNotes').textContent = mockData.notes;

        // Clear previous questions
        document.getElementById('modalTechnicalQuestions').innerHTML = '';
        document.getElementById('modalExperienceQuestions').innerHTML = '';
        document.getElementById('modalBehavioralQuestions').innerHTML = '';
        document.getElementById('modalSkillGapQuestions').innerHTML = '';

        // Add technical questions
        mockData.questions.technical_questions.forEach(question => {
            const li = document.createElement('li');
            li.textContent = question;
            document.getElementById('modalTechnicalQuestions').appendChild(li);
        });

        // Add experience questions
        mockData.questions.experience_questions.forEach(question => {
            const li = document.createElement('li');
            li.textContent = question;
            document.getElementById('modalExperienceQuestions').appendChild(li);
        });

        // Add behavioral questions
        mockData.questions.behavioral_questions.forEach(question => {
            const li = document.createElement('li');
            li.textContent = question;
            document.getElementById('modalBehavioralQuestions').appendChild(li);
        });

        // Add skill gap questions
        mockData.questions.skill_gap_questions.forEach(question => {
            const li = document.createElement('li');
            li.textContent = question;
            document.getElementById('modalSkillGapQuestions').appendChild(li);
        });
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