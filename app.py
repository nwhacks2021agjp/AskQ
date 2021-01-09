from flask import Flask, request, jsonify, render_template
from flask_socketio import SocketIO, emit, join_room, leave_room

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

@socketio.on('joined')
def joined(e):
    """
    User joined somewhere idk rn
    """
    room = "helpMe"
    join_room(room)
    socketio.emit('TBD', {'data': "someData"}, room=room)

@socketio.on('text')
def text(message):
    """
    Message from user possibly?
    """
    room = "helpMe"
    socketio.emit('message', {'data': message['msg']}, room=room)

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
    app.run(host="0.0.0.0", port ="8888", debug=True)