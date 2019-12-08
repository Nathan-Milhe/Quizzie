// Javascript File

// ================ Questions / Reponses

// définition de 3 questions de "base"
var myQuestions = [{
    question: "Parmis ces langages, lequel est le plus utilisé en 2019 ?",
    answers: {
        a: "Python",
        b: "Java",
        c: "C",
        d: "Javascript"
    },
    correctAnswer: "a"
    },
    {
    question:
    "Parmis ces propositions, laquelle n'est pas un type de nuage ?",
    answers: {
        a: "Altocumulus",
        b: "Nimbostratus",
        c: "Cirrus",
        d: "Cuboïstratus"
    },
    correctAnswer: "d"
    },
    {
    question: "Quel est le jeu le plus vendu au monde ?",
    answers: {
        a: "Super Mario Bros",
        b: "Minecraft",
        c: "Tetris",
        d: "Grand Theft Auto V"
    },
    correctAnswer: "b"
}];

// on injecte les questions dans le local storage
localStorage.setItem('questions', JSON.stringify(myQuestions));

function questionAdd(){
    // Récupération de l'objet question
    var obj = JSON.parse(localStorage.getItem("questions"));
    if(obj == null) obj = [];

    // récupération des valeurs du formulaire
    var questionForm = document.getElementById('inputQuestion').value;
    var answerA = document.getElementById('inputReponseA').value;
    var answerB = document.getElementById('inputReponseB').value;
    var answerC = document.getElementById('inputReponseC').value;
    var answerD = document.getElementById('inputReponseD').value;
    var correct = document.getElementById('correctAnswer').value;

    // définition de l'objet
    var myQuestion = [
        {
            question: questionForm,
            answers: {
              a: answerA,
              b: answerB,
              c: answerC,
              d: answerD
            },
            correctAnswer: correct,
        }
    ];

    // ajout de la question dans le local storage sous la forme d'un JSON
    localStorage.setItem("questions", JSON.stringify(myQuestion));
    myQuestions.push(myQuestion);
    localStorage.setItem('allQuestions', JSON.stringify(myQuestions));
}

// ================ Nom / Meilleur joueur

let bestscore = 0;

function playerAdd(){
    var player = document.getElementById("player");
    if(player === true){
        
    } else {
        var player = "Joueur";
    }

    localStorage.setItem("name", JSON.stringify(player));
}

var allQuestions = localStorage.getItem("allQuestions");

function nbQuestion() {
    var length = 0;
    for( var nb in allQuestions ) {
        if( Object.values(nb) ) {
            length++;
        }
    }
    return length;
};

localStorage.setItem("nbQuestion", JSON.stringify(nbQuestion()));

// ================ Quiz

// Construction du quiz
(function() {

    function buildQuiz() {
    const output = [];

    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answers = [];

      for (let letter in currentQuestion.answers) {
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".answers");
    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        answerContainers[questionNumber].style.color = "red";
      }
      localStorage.setItem("score", JSON.stringify(numCorrect));
    });

    if(numCorrect > bestscore){
      bestscore = numCorrect;
      resultsContainer.innerHTML = `Félicitation vous avez battu le record !<br>Voici votre note : ${numCorrect} / ${myQuestions.length} <br>
                                    <form name="formName" onsubmit="playerAdd()">
                                      Votre nom ? <input type="text" id="player" placeholder="Votre nom"><br>
                                      <button type="submit">Valider</button>
                                    </form>`;
    } else {
      resultsContainer.innerHTML = `Dommage ! Vous n'avez pas battu le record</br>Voici votre note : ${numCorrect} / ${myQuestions.length}`;
    }
  }

    function showSlide(n) {
        slides[currentSlide].classList.remove("active-slide");
        slides[n].classList.add("active-slide");
        currentSlide = n;

        if (currentSlide === 0) {
            previousButton.style.display = "none";
        } else {
            previousButton.style.display = "inline-block";
        }

        if (currentSlide === slides.length - 1) {
            nextButton.style.display = "none";
            submitButton.style.display = "inline-block";
        } else {
            nextButton.style.display = "inline-block";
            submitButton.style.display = "none";
        }
    }

    function showNextSlide() {
    showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
    showSlide(currentSlide - 1);
    }

    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");

    buildQuiz();

    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    showSlide(0);
    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
})();

// ================ 

var listQuestions = document.getElementsByTagName("li");
var close = document.getElementsByClassName("close");
var i;

for(i = 0; i < listQuestions.length; i++){
    var span = document.createElement("span");
    var text = document.createTextNode("\u00D7");

    span.className = "close";
    span.appendChild(text);
    listQuestions[i].appendChild(span);
}

for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

