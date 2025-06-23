from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import mysql.connector
import re
from datetime import datetime

app = Flask(__name__)
app.secret_key = "Yamuna@123"

# MySQL Connection (global)
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="admin",
    database="snake_ladder_db"
)
cursor = db.cursor()

@app.route('/')
def home():
    return render_template('index.html')

@app.route("/game")
def game():
    return render_template('game.html')

@app.route("/login", methods=["POST"])
def login():
    try:
        username = request.form['username']
        password = request.form['password']
        print(f"Received: {username} - {password}")

        # 🔍 Check if user exists
        cursor.execute("SELECT id, password FROM users WHERE username = %s", (username,))
        result = cursor.fetchone()

        if result:
            db_password = result[1]
            if password == db_password:
                session['user_id'] = result[0]
                session['username'] = username  # ✅ FIX: Save username in session
                print("✅ Existing user logged in.")
                return "Login Successful"
            else:
                return "❌ Incorrect password for existing user", 401
        else:
            # 🆕 Validate password for new user
            if len(password) < 8 or \
               not re.search(r"[A-Z]", password) or \
               not re.search(r"[a-z]", password) or \
               not re.search(r"\d", password) or \
               not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
                return "Password must include uppercase, lowercase, digit, and special character.", 400

            # 📝 Register new user
            cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
            db.commit()
            session['user_id'] = cursor.lastrowid
            session['username'] = username  # ✅ FIX: Save username
            print("✅ New user registered and logged in.")
            return "Login Successful"

    except Exception as e:
        print("Error occurred:", e)
        return f"Error: {e}", 500

@app.route("/record_result", methods=["POST"])
def record_result():
    print("📥 /record_result called")

    if "user_id" not in session:
        print("❌ Not logged in")
        return jsonify({"error": "Not logged in"}), 401

    data = request.get_json()
    print("📦 Data received:", data)
    print("🧑‍💻 User ID from session:", session.get("user_id"))

    result = data.get("result")
    if result not in ["win", "loss"]:
        print("❌ Invalid result")
        return jsonify({"error": "Invalid result"}), 400

    try:
        user_id = session["user_id"]

        # ✅ Use global connection and cursor
        cursor.execute(
            "INSERT INTO game_history (user_id, result) VALUES (%s, %s)",
            (user_id, result)
        )
        db.commit()

        print(f"✅ Recorded result: {result} for user {user_id}")
        return jsonify({"status": "success"})

    except Exception as e:
        print("❌ Error saving result:", e)
        return jsonify({"error": str(e)}), 500






@app.route("/history")
def history():
    user_id = session.get("user_id")
    if not user_id:
        return "<script>alert('Please login first to view your game history.'); window.location='/';</script>"

    # ✅ Get the username safely
    cursor.execute("SELECT username FROM users WHERE id = %s", (user_id,))
    user_row = cursor.fetchone()
    if not user_row:
        return "<script>alert('Invalid session. Please login again.'); window.location='/';</script>"

    username = user_row[0]

    # ✅ Get win/loss counts
    cursor.execute("SELECT result, COUNT(*) FROM game_history WHERE user_id = %s GROUP BY result", (user_id,))
    results = cursor.fetchall()

    history_data = {"win": 0, "loss": 0}
    for result, count in results:
        history_data[result] = count

    return render_template("history.html", history=history_data, username=username)

if __name__ == "__main__":
    app.run(debug=True)
