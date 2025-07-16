#api_gemini.py

import json
from flask import Flask, render_template
from flask import request

app = Flask(__name__)

@app.route('/', methods=['GET'])
def api():
	return json.dumps({
		'descricao': 'API RESTful de exemplo', 
		'versao':'0.1'
	})
 
@app.route('/oi/<nome>')
def oi(nome):
	return f"oi seja bem vimdo {nome} á API!"

@app.route('/index')
def index():
	return render_template('index.html')

@app.route('/curiosidade/<assunto>')
def piada(assunto):
	import google.generativeai as genai

	genai.configure(api_key='AIzaSyDvbpWV3ODhUvTkDsdoMEvtDqHhM3cDgmU')
	model = genai.GenerativeModel('gemini-2.0-flash-lite')
	prompt = f'''
	    gere uma curiosidade sobre o pais da sigla = {assunto}
	'''

	response = model.generate_content(prompt)
	return response.text
 
app.run(debug=True, host="0.0.0.0")




























                                                     
