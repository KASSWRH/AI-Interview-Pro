import os
import logging
import json
import datetime
from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from forms import InterviewForm
from services.openai_service import generate_interview_questions

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

# Check if OpenAI API key is available
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
has_api_key = OPENAI_API_KEY is not None and OPENAI_API_KEY.strip() != ""

# In-memory storage for saved questions (in a real app, this would be a database)
saved_questions = []

@app.route('/', methods=['GET', 'POST'])
def index():
    form = InterviewForm()
    return render_template('index.html', form=form, has_api_key=has_api_key)

@app.route('/generate', methods=['POST'])
def generate():
    try:
        # Check if API key is available
        if not has_api_key:
            return jsonify({
                'error': 'OpenAI API key is required. Please add your API key to use this feature.'
            }), 400
        
        # Get request data    
        data = request.json if request.json else {}
        resume_text = data.get('resume_text', '')
        job_description = data.get('job_description', '')
        
        # Get options (if any)
        options = data.get('options', {})
        question_count = options.get('question_count', 3)
        focus_area = options.get('focus_area', 'balanced')
        difficulty_level = options.get('difficulty_level', 'intermediate')
        
        # Validate input
        if not resume_text or not job_description:
            return jsonify({
                'error': 'Both resume and job description are required'
            }), 400
            
        # Generate interview questions
        questions = generate_interview_questions(
            resume_text, 
            job_description,
            question_count=int(question_count),
            focus_area=focus_area,
            difficulty_level=difficulty_level
        )
        
        # Generate a match score (this would be calculated based on resume and job matching)
        # For demo purposes, just returning a simulated score
        match_score = 85  # This would be calculated by your matching algorithm
        
        return jsonify({
            'success': True,
            'questions': questions,
            'match_score': match_score
        })
        
    except Exception as e:
        logging.error(f"Error generating questions: {str(e)}")
        return jsonify({
            'error': f'Failed to generate questions: {str(e)}'
        }), 500

@app.route('/save-questions', methods=['POST'])
def save_questions():
    try:
        data = request.json if request.json else {}
        name = data.get('name', '')
        notes = data.get('notes', '')
        questions = data.get('questions', {})
        
        if not name or not questions:
            return jsonify({'error': 'Name and questions are required'}), 400
            
        # In a real app, you would save this to a database
        saved_questions.append({
            'id': len(saved_questions) + 1,
            'name': name,
            'notes': notes,
            'questions': questions,
            'date_created': datetime.datetime.now().isoformat()
        })
        
        return jsonify({'success': True})
        
    except Exception as e:
        logging.error(f"Error saving questions: {str(e)}")
        return jsonify({'error': f'Failed to save questions: {str(e)}'}), 500

@app.route('/saved-questions', methods=['GET'])
def view_saved_questions():
    return render_template('saved_questions.html', questions=saved_questions, has_api_key=has_api_key)

@app.route('/resume-analysis', methods=['GET'])
def resume_analysis():
    return render_template('resume_analysis.html', has_api_key=has_api_key)

@app.route('/analyze-resume', methods=['POST'])
def analyze_resume():
    try:
        # Check if API key is available
        if not has_api_key:
            return jsonify({
                'error': 'OpenAI API key is required. Please add your API key to use this feature.'
            }), 400
        
        data = request.json if request.json else {}
        resume_text = data.get('resume_text', '')
        job_description = data.get('job_description', '')
        
        # Validate input
        if not resume_text or not job_description:
            return jsonify({
                'error': 'Both resume and job description are required'
            }), 400
            
        # In a real app, this would call a function to analyze the resume using OpenAI
        # For demo purposes, we'll return a simulated analysis
        
        # Generate a random score between 70 and 95
        import random
        match_score = random.randint(70, 95)
        
        # Mock analysis data
        analysis = {
            'overallMatchScore': match_score,
            'skillMatch': {
                'matched': ['JavaScript', 'React', 'HTML', 'CSS', 'Responsive Design'],
                'missing': ['TypeScript', 'Vue.js', 'Jest']
            },
            'experienceMatch': {
                'years': '4 years (meets requirements)',
                'relevance': 'High',
                'highlights': [
                    'Led UI redesign projects with measurable results',
                    'Experience with React and Redux',
                    'Code review and mentoring experience'
                ]
            },
            'educationMatch': {
                'degree': 'Computer Science (meets requirements)',
                'relevantCourses': ['Web Development', 'UI Design']
            },
            'recommendations': [
                'Focus technical interview on React advanced patterns',
                'Assess TypeScript proficiency',
                'Discuss testing methodologies'
            ]
        }
        
        return jsonify({
            'success': True,
            'analysis': analysis
        })
        
    except Exception as e:
        logging.error(f"Error analyzing resume: {str(e)}")
        return jsonify({
            'error': f'Failed to analyze resume: {str(e)}'
        }), 500

@app.route('/voice-interview', methods=['GET'])
def voice_interview():
    return render_template('voice_interview.html', has_api_key=has_api_key)

@app.route('/api/start-voice-interview', methods=['POST'])
def start_voice_interview():
    try:
        # Check if API key is available
        if not has_api_key:
            return jsonify({
                'error': 'OpenAI API key is required. Please add your API key to use this feature.'
            }), 400
        
        data = request.json if request.json else {}
        position = data.get('position', '')
        level = data.get('level', '')
        
        # Validate input
        if not position or not level:
            return jsonify({
                'error': 'Position and experience level are required'
            }), 400
            
        # In a real app, this would prepare the interview questions
        # For demo purposes, we'll just acknowledge receipt
        return jsonify({
            'success': True,
            'message': 'Voice interview prepared successfully'
        })
        
    except Exception as e:
        logging.error(f"Error preparing voice interview: {str(e)}")
        return jsonify({
            'error': f'Failed to prepare voice interview: {str(e)}'
        }), 500

@app.route('/api/set-api-key', methods=['POST'])
def set_api_key():
    try:
        data = request.json if request.json else {}
        api_key = data.get('api_key', '')
        
        if not api_key:
            return jsonify({'error': 'API key is required'}), 400
            
        # In a real app, you would securely store this key
        # For demo purposes, we'll just acknowledge receipt
        return jsonify({'success': True, 'message': 'API key received'})
        
    except Exception as e:
        logging.error(f"Error setting API key: {str(e)}")
        return jsonify({'error': f'Failed to set API key: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
