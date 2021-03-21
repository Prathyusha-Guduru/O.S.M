from flask import render_template,url_for,flash,Blueprint,request
import csv

health = Blueprint('health',__name__)

@health.route('/health_page')
def health_page():
	return render_template('health.html')

@health.route('/mental_health',methods = ['GET','POST'])
def mental_health():
	mental_health_status = request.form.get("mentalHealthStaus", False)
	print(f"Mental health status is {mental_health_status}")
	return render_template('mental_health.html')

@health.route('/menstrual_health',methods = ['GET','POST'])
def menstrual_health():
	return render_template('menstrual_health.html')

@health.route('/period_tracker',methods = ['GET','POST'])
def period_tracker():
	print('tracking periods')
	return render_template('/period-tracker/period_tracker.html')



