from flask import Flask, render_template, redirect, session, request, url_for, jsonify
from flask_cors import CORS, cross_origin
from functools import wraps
app = Flask(__name__)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy dog'
app.config['CORS_HEADERS'] = 'Content-Type'

CORS(app, resources={r"/*": {"origins": "*"}})

def login_required(f):
  @wraps(f)
  def wrap(*args, **kwargs):
    if 'logged_in' in session:
        return f(*args, **kwargs)
    else:
        return redirect('/login')
  return wrap


def not_login_required(f):
  @wraps(f)
  def wrap(*args, **kwargs):
    if 'logged_in' in session:
        return redirect('/perfil')
    else:
        return f(*args, **kwargs)
  return wrap


@app.route('/')
def inicio():
    return render_template("index.html")

@app.route('/registro')
@not_login_required
def registro():
    return render_template("registro.html")

@app.route('/login')
@not_login_required
def login():
    return render_template("login.html")

@app.route('/user/loggin', methods=["POST"])
def userlogin():
    session['logged_in'] = True

    user = {
            "name": request.json['name'],
            "id": request.json['_id'],
            "email": request.json['email'],
            "country": request.json['country'],
            "city": request.json['city'],
            "description": request.json['description'],
        }
    session['user'] = user

    return jsonify({ "status": "Everything Working" }), 401


@app.route('/user/signout')
def signout():
    session.clear()
    return redirect(url_for('inicio'))

@app.route('/addapto')
def addapto():
    return render_template("addApto.html")


@app.route('/apartamentos')
@login_required
def apartamentos():
    return render_template("apartamentos.html")


@app.route('/perfil')
@login_required
def perfil():
    return render_template("perfil.html")

@app.route('/detalle')
def detalle():
    return render_template("aptoDetalle.html")

@app.route('/editApto')
@login_required
def editApto():
    return render_template("editApto.html")

@app.route('/reserva')
def reserva():
    return render_template("reserva.html")  

@app.route('/reservaciones')
def reservaciones():
    return render_template("reservaciones.html") 

@app.route('/misreservas')
def misreservas():
    return render_template("misreservaciones.html")  
 
if __name__ == "__main__":
    app.run(debug=True)
        