from flask import Flask, request, render_template, redirect, url_for
import pandas as pd
import os
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contact', methods=['POST'])
def contact():
    name = request.form['name']
    message = request.form['message']
    
    # Lưu dữ liệu vào tệp Excel
    file_path = 'contacts.xlsx'
    
    if os.path.isfile(file_path):
        df = pd.read_excel(file_path)
    else:
        df = pd.DataFrame(columns=['Name', 'Message', 'Timestamp'])
    
    new_entry = pd.DataFrame([[name, message, datetime.now().strftime('%Y-%m-%d %H:%M:%S')]], 
                             columns=['Name', 'Message', 'Timestamp'])
    
    df = pd.concat([df, new_entry], ignore_index=True)
    df.to_excel(file_path, index=False)
    
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug)
