from flask import Flask, request, jsonify, render_template
from flask_socketio import SocketIO, emit

#cred = credentials.Certificate("path/to/key")
#firebase_admin.initialize_app(cred)
#db = firestore.client()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

def getMessage(): #temp func
    return {"name": "tempName",
            "message": "tempMessage"}

@app.route("/")
def index():
    return "Welcome to the index page!"

@app.route("/chat")
def admin():
    return render_template("index.html")

@app.route("/send_message")
def message():
    response = getMessage() #temp value
    name = response[u'name']
    message = response[u'message']

    #Unused firestore code
    # doc = db.collection(u'collectionName').document(u'documentName')
    # doc.set({
    #     u'name': name,
    #     u'message': message,
    # })

    #socketio emit thing here
    print(name + " " + message)

    return "Response: OK"

if __name__ == "__main__":
    app.run(debug=True)