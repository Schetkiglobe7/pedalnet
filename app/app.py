from flask import Flask, render_template, request, redirect, url_for, Response, send_file
from werkzeug.utils import secure_filename
import datetime
import os
from os.path import join, dirname, realpath
import glob
import json
from utility import getSoundWave, getSpectrum

UPLOAD_FOLDER = 'static/audio/'
ALLOWED_EXTENSIONS =  set(['wav'])
basedir = os.path.abspath(os.path.dirname(__file__))

def version(folder):
	return str(datetime.datetime.now())

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


app = Flask(__name__, static_url_path = '/assets', static_folder = 'static', template_folder ='templates')

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route("/")
def homepage():
	return render_template("index.html", version= version('assets'))

@app.route("/train")
def trainpage():
	return render_template("parts/bodyParts/pages/train.html", version= version('assets'))

@app.route("/upload_train_files", methods=['POST'])
def upload_files():
	print("UPLOAD TRAIN FILES")
	uploaded_file = request.files['file']
	if uploaded_file.filename != '' and allowed_file(uploaded_file.filename):
		filename = secure_filename(uploaded_file.filename)
		uploaded_file.save(os.path.join(app.config['UPLOAD_FOLDER'] + filename))
	return redirect(url_for('homepage'))

@app.route("/get_file_list", methods=['POST'])
def getFileList():
	data = []
	for val in glob.glob(app.config['UPLOAD_FOLDER'] + "*.wav"):
		data.append(val.split("/")[2])
		print(data)
	return Response(json.dumps(data), mimetype='application/json')

@app.route("/test", methods = ['POST'])
def makeGrafici():
	data = request.get_json()
	input_file_path = data['input_file_path']
	output_file_path = data['output_file_path']
	print(input_file_path, " - ", output_file_path)
	soundWaves = getSoundWave([input_file_path, output_file_path])
	spectrums = getSpectrum([input_file_path, output_file_path])
	#envelopes = getHLEnvelope([input_file_path, output_file_path])
	out = {}
	out['soundWaves'] = f"<img src='data:image/png;base64,{soundWaves}'/>"
	out['spectrums']  = f"<img src='data:image/png;base64,{spectrums}'/>"
	return out
	



	return "ok"

# color1: #8e7cc3
# color2: #6a329f

if __name__ == '__main__':
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    app.run(debug=True)