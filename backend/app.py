# -*- coding: utf-8 -*-

from flask import Flask, jsonify, send_from_directory, render_template, request, redirect, url_for  # type: ignore
from flask_cors import CORS
import os
import random

# Configuración de Flask
app = Flask(__name__, static_folder='../dist', template_folder='../dist')
CORS(app)

# Listas globales para mantener el estado de las juntas
juntas_proceso = []
juntas_completadas = []

# Ruta para obtener las juntas en formato JSON


@app.route('/api/juntas', methods=['GET'])
def get_juntas():
    return jsonify(juntas_proceso)

# Ruta para la creación de una nueva junta


@app.route('/crear_junta', methods=['GET', 'POST'])
def crear_junta():
    global juntas_proceso, juntas_completadas
    if request.method == 'POST':
        participantes = int(request.form['participantes'])
        monto = int(request.form['monto'])
        direcciones = [request.form[f'direccion-{i}']
                       for i in range(1, participantes + 1)]

        # Crear una nueva junta y agregarla a la lista de juntas en proceso
        nueva_junta = {
            'id': len(juntas_proceso) + 1,
            'participantes': participantes,
            'monto': monto,
            'direcciones': direcciones
        }
        juntas_proceso.append(nueva_junta)

        # Selección aleatoria de ganadores (uno por mes)
        ganadores = random.sample(direcciones, len(direcciones))

        # Mover la junta a completadas
        juntas_completadas.append(nueva_junta)
        juntas_proceso = [
            junta for junta in juntas_proceso if junta['id'] != nueva_junta['id']]

        return redirect(url_for('resultados', ganadores=','.join(ganadores)))

    return render_template('crear_junta.html')

# Ruta para mostrar los resultados


@app.route('/resultados')
def resultados():
    ganadores = request.args.get('ganadores').split(',')
    return render_template('resultados.html', ganadores=ganadores)

# Ruta para unirse a una junta existente


@app.route('/unirse_junta', methods=['GET', 'POST'])
def unirse_junta():
    if request.method == 'POST':
        junta_id = int(request.form['junta_id'])
        junta = next((j for j in juntas_proceso if j['id'] == junta_id), None)
        if junta:
            for i in range(1, junta['participantes'] + 1):
                junta['direcciones'][i - 1] = request.form[f'direccion-{i}']

        return redirect(url_for('index'))

    return render_template('unirse_junta.html', juntas=juntas_proceso)

# Servir archivos estáticos desde la carpeta de build de Vite


@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

# Punto de entrada principal que sirve el archivo index.html de Vite


@app.route('/', methods=['GET'])
def root():
    return send_from_directory(app.static_folder, 'index.html')


# Iniciar la aplicación en modo debug
if __name__ == '__main__':
    app.run(port=5000, debug=True)
