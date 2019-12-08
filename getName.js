var nom = localStorage.getItem("name");
var bestScore = localStorage.getItem("score");
var nbQuestions = localStorage.getItem("nbQuestion");
document.getElementById("nameBestPlayer").innerHTML = nom;
document.getElementById("bestScore").innerHTML = bestScore;
document.getElementById("nbQuestions").innerHTML = nbQuestions;