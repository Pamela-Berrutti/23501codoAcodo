from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 

#CREO LA CLASE
class Backend:
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password
        )
        self.cursor = self.conn.cursor()

        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err

        self.cursor.execute('''CREATE TABLE IF NOT EXISTS leads (
            id int(11) NOT NULL AUTO_INCREMENT,
            nombre varchar(30) NOT NULL,
            apellido varchar(30) NOT NULL,
            telefono varchar(15) NOT NULL,
            email varchar(60) NOT NULL,
            fecha_nacimiento varchar(500) NOT NULL,
            fecha_asiste datetime NOT NULL,
            sexo varchar(10) DEFAULT NULL,
            marca varchar(60) NOT NULL,
            fecha_envio datetime NOT NULL,
            leido tinyint(1) NOT NULL,
            gestion varchar(500) DEFAULT NULL,
            fecha_gestion datetime DEFAULT NULL,
            PRIMARY KEY(`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
            ''')
        
        self.conn.commit()

        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)

    def inserta_lead(self, nombre, apellido, telefono, email, fecha_nacimiento, fecha_asiste, sexo, marca):
        sql = "INSERT INTO leads(nombre, apellido, telefono, email, fecha_nacimiento, fecha_asiste, sexo, marca, fecha_envio) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        fecha_envio = datetime.datetime.now()
        valores = (nombre, apellido, telefono, email, fecha_nacimiento, fecha_asiste, sexo, marca, fecha_envio)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return True
    
    #----------------------------------------------------------------

    def listar_lead(self):
        self.cursor.execute("SELECT * FROM leads")
        mensajes = self.cursor.fetchall()
        return mensajes

    #----------------------------------------------------------------

    def responder_lead(self, id, gestion):
        fecha_gestion = datetime.datetime.now()
        sql = "UPDATE leads SET leido = 1, gestion = %s, fecha_gestion = %s WHERE id = %s"
        valores = (gestion, fecha_gestion, id)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0

    #----------------------------------------------------------------

    def eliminar_lead(self, id):
        self.cursor.execute(f"DELETE FROM leads WHERE id = {id}")
        self.conn.commit()
        return self.cursor.rowcount > 0

    #----------------------------------------------------------------

    def mostrar_lead(self, id):
         sql = f"SELECT id, nombre, apellido, telefono, email, fecha_nacimiento, fecha_asiste, sexo, marca, fecha_envio, leido, gestion, fecha_gestion FROM mensajes WHERE id = {id}"
         self.cursor.execute(sql)
         return self.cursor.fetchone()


backend = Backend(host='localhost', user='root', password='', database='asistentes')

#--------------------------------------------------------------------
@app.route("/leads", methods=["GET"])
def listar_lead():
    respuesta = backend.listar_lead()
    return jsonify(respuesta)

#--------------------------------------------------------------------
@app.route("/leads", methods=["POST"])
def agregar_asistente():
    nombre = request.form['nombre']
    apellido = request.form['apellido']
    telefono = request.form['telefono']
    email = request.form['email']
    fecha_nacimiento = request.form['fecha_nacimiento']
    fecha_asiste = request.form['fecha_asiste']
    sexo = request.form['sexo']
    marca = request.form['marca']

    if backend.inserta_lead(nombre, apellido, telefono, email, fecha_nacimiento, fecha_asiste, sexo, marca):
        return jsonify({"mensaje": "Datos insertados correctamente"}), 201
    else:
        return jsonify({"error": "Error al insertar los datos"}), 500

#--------------------------------------------------------------------
@app.route("/leads/<int:id>", methods=["PUT"])
def confirmar_inscripcion(id):
    #Recojo los datos del form
    gestion = request.form.get("gestion")
    
    if backend.responder_lead(id, gestion):
        return jsonify({"mensaje": "Mensaje modificado"}), 200
    else:
        return jsonify({"mensaje": "Mensaje no encontrado"}), 403

#--------------------------------------------------------------------
@app.route("/leads/<int:id>", methods=["DELETE"])
def eliminar_inscripcion(id):
    if backend.eliminar_lead(id):
        return jsonify ({"mensaje": "Inscripcion eliminada"}), 200
    else:
        return jsonify ({"mensaje": "Inscripcion no encontrada"}), 402
    

if __name__ == "__main__":
    app.run(debug=True)