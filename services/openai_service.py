import os
import json
import logging
from openai import OpenAI

# Get API key from environment variable
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

# Check if API key is available
has_api_key = OPENAI_API_KEY is not None and OPENAI_API_KEY.strip() != ""

# Only create the client if we have an API key
client = OpenAI(api_key=OPENAI_API_KEY) if has_api_key else None

def generate_interview_questions(resume_text, job_description, question_count=3, focus_area='balanced', difficulty_level='intermediate'):
    """
    Generate tailored interview questions based on resume and job description
    
    Args:
        resume_text (str): The candidate's resume/CV text
        job_description (str): The job description text
        question_count (int): Number of questions per category
        focus_area (str): Area to focus on ('balanced', 'technical', 'experience', 'behavioral', 'skill_gaps')
        difficulty_level (str): Difficulty level of questions ('entry', 'intermediate', 'advanced', 'expert')
        
    Returns:
        dict: A dictionary of question categories with lists of questions
    """
    # Check if API key is available
    if not has_api_key:
        logging.error("OpenAI API key not found. Please set the OPENAI_API_KEY environment variable.")
        raise Exception("OpenAI API key is required. Please add your API key to use this feature.")
    
    try:
        logging.debug("Generating interview questions with OpenAI")
        
        # Adjust number of questions based on focus area
        focus_multiplier = {
            'balanced': {'technical': 1, 'experience': 1, 'behavioral': 1, 'skill_gaps': 1},
            'technical': {'technical': 2, 'experience': 0.7, 'behavioral': 0.5, 'skill_gaps': 0.7},
            'experience': {'technical': 0.7, 'experience': 2, 'behavioral': 0.7, 'skill_gaps': 0.5},
            'behavioral': {'technical': 0.5, 'experience': 0.7, 'behavioral': 2, 'skill_gaps': 0.7},
            'skill_gaps': {'technical': 0.7, 'experience': 0.5, 'behavioral': 0.7, 'skill_gaps': 2}
        }
        
        # Get multipliers for the selected focus area
        multipliers = focus_multiplier.get(focus_area, focus_multiplier['balanced'])
        
        # Calculate number of questions for each category
        tech_count = max(1, int(question_count * multipliers['technical']))
        exp_count = max(1, int(question_count * multipliers['experience']))
        behav_count = max(1, int(question_count * multipliers['behavioral']))
        skill_count = max(1, int(question_count * multipliers['skill_gaps']))
        
        # Prepare difficulty level instruction
        difficulty_instruction = {
            'entry': 'suitable for entry-level candidates with minimal experience',
            'intermediate': 'appropriate for candidates with 2-3 years of experience',
            'advanced': 'challenging questions for candidates with 4+ years of experience',
            'expert': 'very challenging questions for senior candidates with deep expertise'
        }
        
        diff_text = difficulty_instruction.get(difficulty_level, difficulty_instruction['intermediate'])
        
        # Prepare the prompt
        prompt = f"""
        Analyze the following resume and job description to generate tailored interview questions.
        
        RESUME:
        {resume_text}
        
        JOB DESCRIPTION:
        {job_description}
        
        Create questions with the following distribution:
        1. {tech_count} technical questions that probe technical skills mentioned in both documents
        2. {exp_count} experience questions that assess the candidate's experience relevant to this specific job
        3. {behav_count} behavioral questions that evaluate competencies implied by the job description
        4. {skill_count} skill gap questions that explore gaps between the resume and job requirements
        
        The questions should be {diff_text}.
        Include at least 1-2 questions about specific projects or achievements mentioned in the resume.
        
        Return a JSON object with the following structure:
        {{
            "technical_questions": [list of {tech_count} technical questions],
            "experience_questions": [list of {exp_count} questions about experience],
            "behavioral_questions": [list of {behav_count} behavioral questions],
            "skill_gap_questions": [list of {skill_count} questions addressing potential skill gaps]
        }}
        """
        
        # the newest OpenAI model is "gpt-4o" which was released May 13, 2024.
        # do not change this unless explicitly requested by the user
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are an expert recruiter and interviewer who creates thoughtful, probing interview questions based on resume and job description analysis."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"},
            temperature=0.7
        )
        
        # Parse the response
        result = json.loads(response.choices[0].message.content)
        logging.debug(f"Generated questions: {result}")
        
        return result
        
    except Exception as e:
        logging.error(f"OpenAI API error: {str(e)}")
        raise Exception(f"Failed to generate interview questions: {str(e)}")
