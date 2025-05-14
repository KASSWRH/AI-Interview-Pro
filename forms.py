from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired

class InterviewForm(FlaskForm):
    resume_text = TextAreaField('Resume/CV Content', validators=[DataRequired()])
    job_description = TextAreaField('Job Description', validators=[DataRequired()])
