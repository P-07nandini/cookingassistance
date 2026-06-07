from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt

app = Flask(__name__)
CORS(app)

# ------------------ MongoDB Connection ------------------
client = MongoClient("mongodb://localhost:27017/")  # Change if using cloud MongoDB
db = client["cookingApp"]
users_collection = db["users"]

# ------------------ SIGNUP ------------------
@app.post("/signup")
def signup():
    # Get data from request(recieved data from frontend as json format)
    #read data send from frontend
    data = request.json
    fullName = data.get("fullName")
    email = data.get("email")
    password = data.get("password")

    # Check if user exists
    if users_collection.find_one({"email": email}):
        return jsonify({"success": False, "message": "User already exists!"})

    # Hash password
    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    users_collection.insert_one({
        "fullName": fullName,
        "email": email,
        "password": hashed_pw
    })

    return jsonify({"success": True, "message": "Signup successful!"})

# ------------------ LOGIN ------------------
@app.post("/login")
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email": email})

    if not user:
        return jsonify({"success": False, "message": "Invalid email or password!"})

    # Compare hashed password
    if bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return jsonify({
            "success": True,
            "message": "Login successful!",
            "user": {
                "fullName": user["fullName"],
                "email": user["email"]
            }
        })
    else:
        return jsonify({"success": False, "message": "Invalid email or password!"})


contacts_collection = db["contacts"]

@app.post("/contact")
def contact():
    data = request.json
    contacts_collection.insert_one({
        "name": data.get("name"),
        "email": data.get("email"),
        "message": data.get("message")
    })
    return jsonify({"message": "Message sent successfully!"})



# ---------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
