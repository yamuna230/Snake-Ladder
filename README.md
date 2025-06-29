# 🎲 Snake & Ladder Game (Web-Based)

This is a full-stack **Snake and Ladder game** implemented using:
- 🐍 Python (Flask)
- 🗃️ MySQL (for user login and game history)
- 🎨 HTML, CSS, Bootstrap (for UI)
- ⚙️ JavaScript (game logic and animations)

## 📌 Features

- 🔐 **Login & Registration** system with password validation
- 🎮 Fully working **multiplayer Snake & Ladder game**
- 🎲 **Animated dice** and **bishop-style player tokens**
- 🐍 Snakes move you down, 🪜 ladders move you up — just like the classic game
- 💾 **Game history tracking** (win/loss) per user
- 🌐 Mobile-responsive UI using CSS & Bootstrap
- 📊 Win/Loss history displayed in user dashboard
- 🔊 Sound effects on dice roll and win event

## 📂 Folder Structure
Snake-Ladder-Game/
│
├── app.py # Flask backend
├── requirements.txt # Python dependencies
├── static/
│ ├── images/ # Game board, dice images
│ ├── style.css # General styles
│ ├── game.css # Game page-specific styles
│ ├── game.js # Game logic
│ └── static.js # For index.html
│
├── templates/
│ ├── index.html # Login & Home page
│ ├── game.html # Game board
│ └── history.html # Win/loss dashboard
│
└── README.md # Project overview
