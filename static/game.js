for (var i = 1; i <= 100; i++) {
    document.getElementById(i).innerHTML = i;
}


var p1, p2, p3, p4;

//functionality of ludo
var game_type;
function choose_player() {
    game_type = prompt('CHOOSE NO.OF PLAYERS');
    if (game_type == 2) {
        document.getElementById('image_slide').style.visibility = 'hidden';
        document.getElementById("player1").style.visibility = 'visible';
        document.getElementById("player2").style.visibility = 'visible';
        document.getElementById("dice").style.visibility = 'visible';
        document.getElementById('choose_player').removeAttribute('onclick');
    }
    else if (game_type == 3) {
        document.getElementById('image_slide').style.visibility = 'hidden';
        document.getElementById("player1").style.visibility = 'visible';
        document.getElementById("player2").style.visibility = 'visible';
        document.getElementById("player3").style.visibility = 'visible';
        document.getElementById("play").style.top = '85%';
        document.getElementById("dice").style.top = '62%';
        document.getElementById("dice").style.visibility = 'visible';
        document.getElementById('choose_player').removeAttribute('onclick');
    }
    else if (game_type == 4) {
        document.getElementById('image_slide').style.visibility = 'hidden';
        document.getElementById("player1").style.visibility = 'visible';
        document.getElementById("player2").style.visibility = 'visible';
        document.getElementById("player3").style.visibility = 'visible';
        document.getElementById("player4").style.visibility = 'visible';
        document.getElementById("dice").style.visibility = 'visible';
        document.getElementById("play").style.left = '0%';
        document.getElementById("dice").style.top = '76%';
        document.getElementById("dice").style.left = '17%';
        document.getElementById('choose_player').removeAttribute('onclick');
    }

    else {
        alert('please choose valid no. of player. choose the no. 2,3 or 4 !!');
        game_type = undefined;
    }

}

//start function

function start() {
    const playBtn = document.getElementById("play");

    playBtn.addEventListener("click", () => {
        playBtn.classList.add("clicked");
        setTimeout(() => {
            playBtn.classList.remove("clicked");
        }, 300);
    });


    if (game_type == undefined) {
        alert('FIRST CHOOSE NO. OF PLAYERS !!');
    } else {
        if (game_type == 2) {
            const color1 = document.getElementById('select1').value;
            const color2 = document.getElementById('select2').value;

            if (color1 === color2) {
                alert("Please select two different colors!");
                return; // ⛔ Stop here if colors are same
            }

            document.getElementById("play").innerHTML = 'PLAY';
            document.getElementById("select1").setAttribute("disabled", "disabled");
            document.getElementById("select2").setAttribute("disabled", "disabled");

        }
        else if (game_type == 3) {
            const color1 = document.getElementById('select1').value;
            const color2 = document.getElementById('select2').value;
            const color3 = document.getElementById('select3').value;

            if (color1 === color2 || color1 === color3 || color2 === color3) {
                alert("Please select three different colors!");
                return;
            } else {
                document.getElementById("play").innerHTML = 'PLAY';

                // ✅ No need to hide any "red/green/blue/yellow" circles anymore

                document.getElementById("select1").setAttribute("disabled", "disabled");
                document.getElementById("select2").setAttribute("disabled", "disabled");
                document.getElementById("select3").setAttribute("disabled", "disabled");

            }

        }
        else {
            document.getElementById("play").innerHTML = 'PLAY';
            document.getElementById("select1").setAttribute("disabled", "disabled");
            document.getElementById("select2").setAttribute("disabled", "disabled");
            document.getElementById("select3").setAttribute("disabled", "disabled");
            document.getElementById("select4").setAttribute("disabled", "disabled");
        }
        document.getElementById("play").setAttribute("onclick", "play()");
        p1 = document.getElementById("select1").value;
        p2 = document.getElementById("select2").value;
        p3 = document.getElementById("select3").value;
        p4 = document.getElementById("select4").value;
    }
    updateTurnDisplay();
    document.getElementById("turnDisplay").style.display = "block"; // 👈 show turn display

}


var my_turn = 0;
var previousFirst = 0;
var previousSec = 0;
var previousThird = 0;
var previousFourth = 0;


//player 1 turn text displays
function updateTurnDisplay() {
    const turnDiv = document.getElementById("turnDisplay");

    if (!turnDiv) return;

    if (game_type == 2) {
        if (my_turn == 0) {
            turnDiv.textContent = "🎯 Player 1's Turn";
        } else {
            turnDiv.textContent = "🎯 Player 2's Turn";
        }
    } else if (game_type == 3) {
        if (my_turn == 0) {
            turnDiv.textContent = "🎯 Player 1's Turn";
        } else if (my_turn == 1) {
            turnDiv.textContent = "🎯 Player 2's Turn";
        } else {
            turnDiv.textContent = "🎯 Player 3's Turn";
        }
    } else if (game_type == 4) {
        if (my_turn == 0) {
            turnDiv.textContent = "🎯 Player 1's Turn";
        } else if (my_turn == 1) {
            turnDiv.textContent = "🎯 Player 2's Turn";
        } else if (my_turn == 2) {
            turnDiv.textContent = "🎯 Player 3's Turn";
        } else {
            turnDiv.textContent = "🎯 Player 4's Turn";
        }
    }
}

//PLAY FUNCTION
let isMoving = false; //global variable
let resultSent = false;

async function play() {
    if (isMoving) return;
    isMoving = true;

    document.getElementById("diceAudio").play();
    var random_no = Math.floor(Math.random() * 6);
    document.getElementById("dice").innerHTML = `<img src="${diceImages[random_no]}" alt="dice" width="50">`;
    function getPawnHTML(color) {
        return `<i class='fas fa-chess-pawn' style="font-size: 2.9rem; color: ${color}; text-shadow: 0 0 5px black;"></i>`;
    }

    //2 player game
    if (game_type == 2) {
        if (my_turn == 0) {
            if (previousFirst > 0) {
                if (100 - previousFirst < random_no + 1) {
                    my_turn = (my_turn + 1) % 2;

                    updateTurnDisplay();
                    isMoving = false; // ✅ Unlock for next play
                    return;
                }
                else {
                    document.getElementById((previousFirst).toString()).innerHTML = previousFirst;
                    document.getElementById((previousFirst).toString()).style.color = 'black';
                }
            }

            await animatePawnMove(previousFirst, previousFirst + random_no + 1, p1);

            // 👉 Play move sound
            let moveSound = document.getElementById("moveAudio");
            moveSound.currentTime = 0;
            moveSound.play();
            //win check
            if ((previousFirst + random_no + 1) == 100 && !resultSent) {
                resultSent = true;

                let winSound = document.getElementById("winAudio");
                winSound.currentTime = 0;
                winSound.play();

                if (my_turn === 0) {
                    sendResultToServer("win");  // You are Player 1
                } else {
                    sendLossesToServer();       // You are not Player 1
                }

                setTimeout(() => {
                    alert("Player 1 is winner!!");
                    window.location.reload();
                }, 800);
            }


            previousFirst = previousFirst + random_no + 1;

            previousFirst = snake(previousFirst, p1, previousFirst);
            previousFirst = ladder(previousFirst, p1, previousFirst);
            my_turn = (my_turn + 1) % 2;

            updateTurnDisplay();
            isMoving = false;

        }
        else {
            if (previousSec > 0) {
                if (100 - previousSec < random_no + 1) {
                    my_turn = (my_turn + 1) % 2;

                    updateTurnDisplay();
                    isMoving = false; // ✅ Unlock for next play
                    return;
                }
                else {
                    document.getElementById((previousSec).toString()).innerHTML = previousSec;
                    document.getElementById((previousSec).toString()).style.color = 'black';
                }
            }
            await animatePawnMove(previousSec, previousSec + random_no + 1, p2);
            // 👉 Play move sound
            let moveSound = document.getElementById("moveAudio");
            moveSound.currentTime = 0;
            moveSound.play();
            //win check
            if ((previousSec + random_no + 1) == 100 && !resultSent) {
                resultSent = true;

                let winSound = document.getElementById("winAudio");
                winSound.currentTime = 0;
                winSound.play();

                if (my_turn === 1) {
                    sendResultToServer("win");  // You are Player 2
                } else {
                    sendLossesToServer();       // You are not Player 2
                }

                setTimeout(() => {
                    alert("Player 2 is winner!!");
                    window.location.reload();
                }, 800);
            }


            previousSec = previousSec + random_no + 1;
            previousSec = snake(previousSec, p2, previousSec);
            previousSec = ladder(previousSec, p2, previousSec);
            my_turn = (my_turn + 1) % 2;
            updateTurnDisplay();
            isMoving = false;

        }
    }

    //3 player game

    else if (game_type == 3) {
        if (my_turn == 0) {
            if (previousFirst > 0) {
                if (100 - previousFirst < random_no + 1) {
                    my_turn = (my_turn + 1) % 3;
                    updateTurnDisplay();
                    isMoving = false;
                    return;
                }
                else {
                    document.getElementById((previousFirst).toString()).innerHTML = previousFirst;
                    document.getElementById((previousFirst).toString()).style.color = 'black';
                }
            }
            await animatePawnMove(previousFirst, previousFirst + random_no + 1, p1);
            // 👉 Play move sound
            let moveSound = document.getElementById("moveAudio");
            moveSound.currentTime = 0;
            moveSound.play();
            //win check
            if ((previousFirst + random_no + 1) == 100 && !resultSent) {
                resultSent = true;

                let winSound = document.getElementById("winAudio");
                winSound.currentTime = 0;
                winSound.play();

                if (my_turn === 0) {
                    sendResultToServer("win");  // You are Player 1
                } else {
                    sendLossesToServer();       // You are not Player 1
                }

                setTimeout(() => {
                    alert("Player 1 is winner!!");
                    window.location.reload();
                }, 800);
            }



            previousFirst = previousFirst + random_no + 1;

            previousFirst = snake(previousFirst, p1, previousFirst);
            previousFirst = ladder(previousFirst, p1, previousFirst);
            my_turn = (my_turn + 1) % 3;
            updateTurnDisplay();
            isMoving = false;
        }
        else if (my_turn == 1) {
            if (previousSec > 0) {
                if (100 - previousSec < random_no + 1) {
                    my_turn = (my_turn + 1) % 3;
                    updateTurnDisplay();
                    isMoving = false;
                    return;
                }
                else {
                    document.getElementById((previousSec).toString()).innerHTML = previousSec;
                    document.getElementById((previousSec).toString()).style.color = 'black';
                }
            }

            await animatePawnMove(previousSec, previousSec + random_no + 1, p2);
            // 👉 Play move sound
            let moveSound = document.getElementById("moveAudio");
            moveSound.currentTime = 0;
            moveSound.play();
            //win check
            if ((previousSec + random_no + 1) == 100 && !resultSent) {
                resultSent = true;

                let winSound = document.getElementById("winAudio");
                winSound.currentTime = 0;
                winSound.play();

                if (my_turn === 1) {
                    sendResultToServer("win");  // You are Player 2
                } else {
                    sendLossesToServer();       // You are not Player 2
                }

                setTimeout(() => {
                    alert("Player 2 is winner!!");
                    window.location.reload();
                }, 800);
            }


            previousSec = previousSec + random_no + 1;
            previousSec = snake(previousSec, p2, previousSec);
            previousSec = ladder(previousSec, p2, previousSec);
            my_turn = (my_turn + 1) % 3;
            updateTurnDisplay();
            isMoving = false;
        }
        else {
            if (previousThird > 0) {
                if (100 - previousThird < random_no + 1) {
                    my_turn = 0;
                    updateTurnDisplay();
                    isMoving = false;
                    return;

                }
                else {
                    document.getElementById((previousThird).toString()).innerHTML = previousThird;
                    document.getElementById((previousThird).toString()).style.color = 'black';
                }
            }
            await animatePawnMove(previousThird, previousThird + random_no + 1, p3);
            // 👉 Play move sound
            let moveSound = document.getElementById("moveAudio");
            moveSound.currentTime = 0;
            moveSound.play();
            //win check
            if ((previousThird + random_no + 1) == 100 && !resultSent) {
                resultSent = true;

                let winSound = document.getElementById("winAudio");
                winSound.currentTime = 0;
                winSound.play();

                if (my_turn === 2) {
                    sendResultToServer("win");  // You are Player 3
                } else {
                    sendLossesToServer();       // You are not Player 3
                }

                setTimeout(() => {
                    alert("Player 3 is winner!!");
                    window.location.reload();
                }, 800);
            }

            previousThird = previousThird + random_no + 1;
            previousThird = snake(previousThird, p3, previousThird);
            previousThird = ladder(previousThird, p3, previousThird);
            my_turn = 0;
            updateTurnDisplay();
            isMoving = false;
        }
    }

    // 4 player game

    else if (game_type == 4) {

        if (my_turn == 0) {
            if (previousFirst > 0) {
                if (100 - previousFirst < random_no + 1) {
                    my_turn = (my_turn + 1) % 4;
                    updateTurnDisplay();
                    isMoving = false;
                    return;

                }
                else {
                    document.getElementById((previousFirst).toString()).innerHTML = previousFirst;
                    document.getElementById((previousFirst).toString()).style.color = 'black';
                }
            }
            await animatePawnMove(previousFirst, previousFirst + random_no + 1, p1);
            // 👉 Play move sound
            let moveSound = document.getElementById("moveAudio");
            moveSound.currentTime = 0;
            moveSound.play();
            //win check
            if ((previousFirst + random_no + 1) == 100 && !resultSent) {
                resultSent = true;

                let winSound = document.getElementById("winAudio");
                winSound.currentTime = 0;
                winSound.play();

                if (my_turn === 0) {
                    sendResultToServer("win");  // You are Player 1
                } else {
                    sendLossesToServer();       // You are not Player 1
                }

                setTimeout(() => {
                    alert("Player 1 is winner!!");
                    window.location.reload();
                }, 800);
            }



            previousFirst = previousFirst + random_no + 1;

            previousFirst = snake(previousFirst, p1, previousFirst);
            previousFirst = ladder(previousFirst, p1, previousFirst);
            my_turn = (my_turn + 1) % 4;
            updateTurnDisplay();
            isMoving = false;
        }
        else if (my_turn == 1) {
            if (previousSec > 0) {
                if (100 - previousSec < random_no + 1) {
                    my_turn = (my_turn + 1) % 4;
                    updateTurnDisplay();
                    isMoving = false;
                    return;

                }
                else {
                    document.getElementById((previousSec).toString()).innerHTML = previousSec;
                    document.getElementById((previousSec).toString()).style.color = 'black';
                }
            }
            await animatePawnMove(previousSec, previousSec + random_no + 1, p2);
            // 👉 Play move sound
            let moveSound = document.getElementById("moveAudio");
            moveSound.currentTime = 0;
            moveSound.play();
            //win check
            if ((previousSec + random_no + 1) == 100 && !resultSent) {
                resultSent = true;

                let winSound = document.getElementById("winAudio");
                winSound.currentTime = 0;
                winSound.play();

                if (my_turn === 1) {
                    sendResultToServer("win");  // You are Player 2
                } else {
                    sendLossesToServer();       // You are not Player 2
                }

                setTimeout(() => {
                    alert("Player 2 is winner!!");
                    window.location.reload();
                }, 800);
            }



            previousSec = previousSec + random_no + 1;
            previousSec = snake(previousSec, p2, previousSec);
            previousSec = ladder(previousSec, p2, previousSec);
            my_turn = (my_turn + 1) % 4;
            updateTurnDisplay();
            isMoving = false;
        }
        else if (my_turn == 2) {
            if (previousThird > 0) {
                if (100 - previousThird < random_no + 1) {
                    my_turn = (my_turn + 1) % 4;
                    updateTurnDisplay();
                    isMoving = false;
                    return;

                }
                else {
                    document.getElementById((previousThird).toString()).innerHTML = previousThird;
                    document.getElementById((previousThird).toString()).style.color = 'black';
                }
            }
            await animatePawnMove(previousThird, previousThird + random_no + 1, p3);
            // 👉 Play move sound
            let moveSound = document.getElementById("moveAudio");
            moveSound.currentTime = 0;
            moveSound.play();
            //win check
            if ((previousThird + random_no + 1) == 100 && !resultSent) {
                resultSent = true;

                let winSound = document.getElementById("winAudio");
                winSound.currentTime = 0;
                winSound.play();

                if (my_turn === 2) {
                    sendResultToServer("win");  // You are Player 3
                } else {
                    sendLossesToServer();       // You are not Player 3
                }

                setTimeout(() => {
                    alert("Player 3 is winner!!");
                    window.location.reload();
                }, 800);
            }



            previousThird = previousThird + random_no + 1;
            previousThird = snake(previousThird, p3, previousThird);
            previousThird = ladder(previousThird, p3, previousThird);
            my_turn = (my_turn + 1) % 4;
            updateTurnDisplay();
            isMoving = false;
        }

        else {
            if (previousFourth > 0) {
                if (100 - previousFourth < random_no + 1) {
                    my_turn = (my_turn + 1) % 4;
                    updateTurnDisplay();
                    isMoving = false;
                    return;

                }
                else {
                    document.getElementById((previousFourth).toString()).innerHTML = previousFourth;
                    document.getElementById((previousFourth).toString()).style.color = 'black';
                }
            }
            await animatePawnMove(previousFourth, previousFourth + random_no + 1, p4);
            // 👉 Play move sound
            let moveSound = document.getElementById("moveAudio");
            moveSound.currentTime = 0;
            moveSound.play();
            //win check
            if ((previousFourth + random_no + 1) == 100 && !resultSent) {
                resultSent = true;

                let winSound = document.getElementById("winAudio");
                winSound.currentTime = 0;
                winSound.play();

                if (my_turn === 3) {
                    sendResultToServer("win");  // You are Player 4
                } else {
                    sendLossesToServer();       // You are not Player 4
                }

                setTimeout(() => {
                    alert("Player 4 is winner!!");
                    window.location.reload();
                }, 800);
            }


            previousFourth = previousFourth + random_no + 1;
            previousFourth = snake(previousFourth, p4, previousFourth);
            previousFourth = ladder(previousFourth, p4, previousFourth);
            my_turn = (my_turn + 1) % 4;
            updateTurnDisplay();
            isMoving = false;
        }

    }
}

// LOSS ADDING TO HISTORY PAGE 
function sendLossesToServer() {
    fetch("/record_result", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ result: "loss" })
    })
        .then(res => res.json())
        .then(data => {
            console.log("Loss recorded:", data);
        })
        .catch(err => console.error("Error saving loss:", err));
}

function sendResultToServer(result) {
    console.log("Sending result to server:", result); // ✅ Debug log
    fetch("/record_result", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ result: result })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Game result saved:", data);
    })
    .catch(err => console.error("Error saving result:", err));
}

//snake function

function snake(place_no, color_given, previous_player) {
    if (place_no == 26) {
        document.getElementById("26").innerHTML = 26;
        document.getElementById("26").style.color = 'black';
        document.getElementById("4").innerHTML = `<i class='fas fa-chess-pawn' style="font-size: 2.9rem; color: ${color_given}; text-shadow: 0 0 5px black;"></i>`;
        document.getElementById("4").style.color = color_given;
        return 4;

    }
    else if (place_no == 94) {
        document.getElementById("94").innerHTML = 94;
        document.getElementById("94").style.color = 'black';
        document.getElementById("18").innerHTML = `<i class='fas fa-chess-pawn' style="font-size: 2.9rem; color: ${color_given}; text-shadow: 0 0 5px black;"></i>`;
        document.getElementById("18").style.color = color_given;
        return 18;
    }
    else if (place_no == 63) {
        document.getElementById("63").innerHTML = 63;
        document.getElementById("63").style.color = 'black';
        document.getElementById("21").innerHTML = `<i class='fas fa-chess-pawn' style="font-size: 2.9rem; color: ${color_given}; text-shadow: 0 0 5px black;"></i>`;
        document.getElementById("21").style.color = color_given;
        return 21;
    }
    else if (place_no == 80) {
        document.getElementById("80").innerHTML = 80;
        document.getElementById("80").style.color = 'black';
        document.getElementById("58").innerHTML = `<i class='fas fa-chess-pawn' style="font-size: 2.9rem; color: ${color_given}; text-shadow: 0 0 5px black;"></i>`;
        document.getElementById("58").style.color = color_given;
        return 58;
    }
    else if (place_no == 73) {
        document.getElementById("73").innerHTML = 73;
        document.getElementById("73").style.color = 'black';
        document.getElementById("50").innerHTML = `<i class='fas fa-chess-pawn' style="font-size: 2.9rem; color: ${color_given}; text-shadow: 0 0 5px black;"></i>`;
        document.getElementById("50").style.color = color_given;
        return 50;
    }
    else if (place_no == 98) {
        document.getElementById("98").innerHTML = 98;
        document.getElementById("98").style.color = 'black';
        document.getElementById("29").innerHTML = `<i class='fas fa-chess-pawn' style="font-size: 2.9rem; color: ${color_given}; text-shadow: 0 0 5px black;"></i>`;
        document.getElementById("29").style.color = color_given;
        return 29;
    }
    else {
        return previous_player;
    }

}

//ladder function

function ladder(place_no, color_given, previous_player) {
    if (place_no == 3) {
        document.getElementById("3").innerHTML = 3;
        document.getElementById("3").style.color = 'black';
        document.getElementById("24").innerHTML = `<i class='fas fa-chess-pawn' style="font-size: 2.9rem; color: ${color_given}; text-shadow: 0 0 5px black;"></i>`;
        document.getElementById("24").style.color = color_given;
        return 24;
    }
    else if (place_no == 13) {
        document.getElementById("13").innerHTML = 13;
        document.getElementById("13").style.color = 'black';
        document.getElementById("95").innerHTML = `<i class='fas fa-chess-pawn' style="font-size: 2.9rem; color: ${color_given}; text-shadow: 0 0 5px black;"></i>`;
        document.getElementById("95").style.color = color_given;
        return 95;
    }
    else if (place_no == 12) {
        document.getElementById("12").innerHTML = 12;
        document.getElementById("12").style.color = 'black';
        document.getElementById("52").innerHTML = `<i class='fas fa-chess-pawn' style="font-size: 2.9rem; color: ${color_given}; text-shadow: 0 0 5px black;"></i>`;
        document.getElementById("52").style.color = color_given;
        return 52;
    }
    else if (place_no == 61) {
        document.getElementById("61").innerHTML = 61;
        document.getElementById("61").style.color = 'black';
        document.getElementById("99").innerHTML = `<i class='fas fa-chess-pawn' style="font-size: 2.9rem; color: ${color_given}; text-shadow: 0 0 5px black;"></i>`;
        document.getElementById("99").style.color = color_given;
        return 99;
    }
    else if (place_no == 72) {
        document.getElementById("72").innerHTML = 72;
        document.getElementById("72").style.color = 'black';
        document.getElementById("91").innerHTML = `<i class='fas fa-chess-pawn' style="font-size: 2.9rem; color: ${color_given}; text-shadow: 0 0 5px black;"></i>`;
        document.getElementById("91").style.color = color_given;
        return 91;
    }
    else {
        return previous_player;
    }
}

//pawn step by step movement
async function animatePawnMove(start, end, color) {
    function getPawnHTML(color) {
        return `<i class='fas fa-chess-pawn' style="font-size: 2.9rem; color: ${color}; text-shadow: 0 0 5px black;"></i>`;
    }

    for (let pos = start + 1; pos <= end; pos++) {
        // Remove from previous cell
        if (pos > start + 1) {
            document.getElementById((pos - 1).toString()).innerHTML = pos - 1;
            document.getElementById((pos - 1).toString()).style.color = 'black';
        }

        // Show pawn on new cell
        document.getElementById(pos.toString()).innerHTML = getPawnHTML(color);
        document.getElementById(pos.toString()).style.color = color;

        // Wait 200 milliseconds (slow effect)
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

