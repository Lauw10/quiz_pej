const questions7 = [
{
    "question": "Qui a découvert les rayons X et en quelle année ?",
    "answers": [
        {"text": "W. Konrad Röntgen en 1895", "correct": true},
        {"text": "Marie Curie en 1903", "correct": false},
        {"text": "Thomas Edison en 1885", "correct": false},
        {"text": "Nikola Tesla en 1890", "correct": false}
    ]
},
    {
    "question": "Quelle est la nature des rayons X selon la théorie ondulatoire ?",
    "answers": [
        {"text": "Des vibrations électromagnétiques", "correct": true},
        {"text": "Des particules alpha", "correct": false},
        {"text": "Des ondes sonores", "correct": false},
        {"text": "Des courants électriques", "correct": false}
    ]
},
{
    "question": "Quel phénomène a permis à Röntgen de confirmer l'existence des rayons X ?",
    "answers": [
        {"text": "L'illumination d'un carton de platinocyanure de baryum", "correct": true},
        {"text": "La combustion spontanée du papier", "correct": false},
        {"text": "La fusion d'un métal", "correct": false},
        {"text": "Un champ magnétique anormal", "correct": false}
    ]
},
{
    "question": "Quelle est la plage de longueur d'onde des rayons X ?",
    "answers": [
        {"text": "5 Å à 0.01 Å", "correct": true},
        {"text": "1000 Å à 500 Å", "correct": false},
        {"text": "1 mm à 0.1 mm", "correct": false},
        {"text": "Identique à celle de la lumière visible", "correct": false}
    ]
},
{
    "question": "Quelle fut la première partie du corps humain imagée par Röntgen ?",
    "answers": [
        {"text": "Les os de la main", "correct": true},
        {"text": "Le crâne", "correct": false},
        {"text": "Le thorax", "correct": false},
        {"text": "Le pied", "correct": false}
    ]
},
{
    "question": "Quel facteur influence le pouvoir de pénétration des rayons X ?",
    "answers": [
        {"text": "La longueur d'onde des rayons", "correct": true},
        {"text": "La couleur de l'objet", "correct": false},
        {"text": "La température ambiante", "correct": false},
        {"text": "Le champ magnétique terrestre", "correct": false}
    ]
},
{
    "question": "Quels tissus sont les plus sensibles aux rayons X ?",
    "answers": [
        {"text": "La moelle osseuse et les gonades", "correct": true},
        {"text": "Les muscles et la peau", "correct": false},
        {"text": "Les os et les dents", "correct": false},
        {"text": "Le cerveau et les nerfs", "correct": false}
    ]
},
{
    "question": "Comment les rayons X agissent-ils sur un film photographique ?",
    "answers": [
        {"text": "En réduisant les sels d'argent", "correct": true},
        {"text": "En le faisant fondre", "correct": false},
        {"text": "En le colorant en bleu", "correct": false},
        {"text": "En le rendant conducteur", "correct": false}
    ]
},
{
    "question": "Pourquoi les os apparaissent-ils plus clairs que les tissus mous en radiographie ?",
    "answers": [
        {"text": "Ils absorbent plus de rayons X", "correct": true},
        {"text": "Ils réfléchissent la lumière", "correct": false},
        {"text": "Ils émettent des rayons secondaires", "correct": false},
        {"text": "Ils contiennent des métaux fluorescents", "correct": false}
    ]
},
{
    "question": "Quel est le rôle de la cathode dans un tube de Coolidge ?",
    "answers": [
        {"text": "Émettre des électrons par effet thermoionique", "correct": true},
        {"text": "Absorber les rayons X", "correct": false},
        {"text": "Produire des rayons gamma", "correct": false},
        {"text": "Stocker l'énergie électrique", "correct": false}
    ]
},
{
    "question": "Quelle est la dose maximale admissible pour le personnel radiologique par semaine ?",
    "answers": [
        {"text": "0.1 röntgen (r)", "correct": true},
        {"text": "1 röntgen (r)", "correct": false},
        {"text": "10 röntgens (r)", "correct": false},
        {"text": "Aucune limite n'est nécessaire", "correct": false}
    ]
},
{
    "question": "Pourquoi les gonades sont-elles particulièrement sensibles aux rayons X ?",
    "answers": [
        {"text": "Les doses s'accumulent sans réparation", "correct": true},
        {"text": "Elles contiennent des métaux lourds", "correct": false},
        {"text": "Elles produisent naturellement des rayons X", "correct": false},
        {"text": "Leur température est plus élevée", "correct": false}
    ]
},
{
    "question": "Quel est l'avantage de la radioscopie par rapport à la radiographie ?",
    "answers": [
        {"text": "Permet d'observer les mouvements en temps réel", "correct": true},
        {"text": "Offre une meilleure résolution d'image", "correct": false},
        {"text": "Nécessite moins de protection", "correct": false},
        {"text": "Utilise des rayons gamma", "correct": false}
    ]
}
];


document.addEventListener('DOMContentLoaded', () => {
    const quiz7 = new QuizGame('quiz-container-7', questions7);
});


class QuizGame {
    constructor(containerId, questions) {
        this.container = document.getElementById(containerId);
        this.questions = questions;
        
        this.bestScoreDisplay = this.container.querySelector('.best-score-value');
        this.resetBestScoreBtn = this.container.querySelector('.reset-best-score-btn');
        this.startButton = this.container.querySelector('.start-btn');
        this.nextButton = this.container.querySelector('.next-btn');
        this.restartButton = this.container.querySelector('.restart-btn');
        this.startScreen = this.container.querySelector('.start-screen');
        this.quizContainer = this.container.querySelector('.quiz-container');
        this.resultsScreen = this.container.querySelector('.results-screen');
        this.questionElement = this.container.querySelector('.question');
        this.answerButtonsElement = this.container.querySelector('.answer-buttons');
        this.scoreTextElement = this.container.querySelector('.score-text');
        

        this.currentQuestionIndex = 0;
        this.score = 0;
        this.bestScore = localStorage.getItem(`bestScore_${containerId}`) ? 
                         parseInt(localStorage.getItem(`bestScore_${containerId}`)) : 0;
        
        this.init();
    }
    
    init() {

        this.updateBestScoreDisplay();
        

        this.startButton.addEventListener('click', () => this.startQuiz());
        this.nextButton.addEventListener('click', () => {
            this.currentQuestionIndex++;
            this.setNextQuestion();
        });
        this.restartButton.addEventListener('click', () => this.restartQuiz());
        this.resetBestScoreBtn.addEventListener('click', () => this.resetBestScore());
    }
    
    updateBestScoreDisplay() {
        this.bestScoreDisplay.textContent = ((this.bestScore / this.questions.length) * 100).toFixed(1);
    }
    
    startQuiz() {
        this.startScreen.classList.add('hide');
        this.quizContainer.classList.remove('hide');
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.setNextQuestion();
    }
    
    setNextQuestion() {
        this.resetState();
        if (this.currentQuestionIndex < this.questions.length) {
            this.showQuestion(this.questions[this.currentQuestionIndex]);
        } else {
            this.showResults();
        }
    }
    
        showQuestion(question) {
            this.resetState();
            this.questionElement.innerText = question.question;
            
            const shuffledAnswers = this.shuffleArray([...question.answers]);
            
            shuffledAnswers.forEach(answer => {
                const button = document.createElement('button');
                button.innerText = answer.text;
                button.classList.add('btn', 'answer-btn');
                if (answer.correct) {
                    button.dataset.correct = answer.correct;
                }
                button.addEventListener('click', (e) => this.selectAnswer(e));
                this.answerButtonsElement.appendChild(button);
            });
        }
    
        shuffleArray(array) {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
        }
    
    resetState() {
        this.nextButton.classList.add('hide');
        while (this.answerButtonsElement.firstChild) {
            this.answerButtonsElement.removeChild(this.answerButtonsElement.firstChild);
        }
    }
    
    selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true';
        
        selectedButton.classList.add('selected');
        
         Array.from(this.answerButtonsElement.children).forEach(button => {
           button.disabled = true;
            
        if (button === selectedButton) {
            if (correct) {
                button.classList.add('correct');
            } else {
                button.classList.add('incorrect');
                if (!correct) Array.from(this.answerButtonsElement.children).find(btn => btn.dataset.correct === 'true').classList.add('correct'); 
            }
        }
         });
        
        if (correct) {
            this.score++;
        }
        
        if (this.questions.length > this.currentQuestionIndex + 1) {
            this.nextButton.classList.remove('hide');
        } else {
            setTimeout(() => {
                this.showResults();
            }, 1500);
        }
    }
    
    showResults() {
        this.quizContainer.classList.add('hide');
        this.resultsScreen.classList.remove('hide');
        
        const percentage = (this.score / this.questions.length) * 100;
        let comment = "";
        
        if (percentage >= 80) {
            comment = "Très bien! Vous avez bien maitrisé cette leçon. Rédirection dans 5 secondes";   
            setTimeout(() => {
                window.location.href = "radiologie3/index.html";
            }, 5000);

        }else if (percentage >= 65 && percentage < 80) {
            comment = "Vous avez réussi, mais la note minimale requise est de 80 à plus."; 

        } else {
            comment = "Dommage! Peut-être devriez-vous réviser un peu.";
        }
        
        let newRecord = false;
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem(`bestScore_${this.container.id}`, this.bestScore);
            newRecord = true;
        }
        
        this.updateBestScoreDisplay();
        
        this.scoreTextElement.innerHTML = `
            <p>Votre score: <strong>${percentage.toFixed(1)}%</strong></p>
            <p>Meilleur score: <strong>${((this.bestScore / this.questions.length) * 100).toFixed(1)}%</strong></p>
            <p>${comment} ${newRecord ? "🏆 Nouveau record!" : ""}</p>
        `;
    }
    
    restartQuiz() {
        this.resultsScreen.classList.add('hide');
        this.startQuiz();
    }

    resetBestScore() {
        //  if (confirm("Êtes-vous sûr de vouloir réinitialiser votre meilleur score ?")) {
        //      this.bestScore = 0;
        //      localStorage.setItem(`bestScore_${this.container.id}`, this.bestScore);
        //      this.updateBestScoreDisplay();
        //          alert("Meilleur score réinitialisé !");
        //  }
    }
}
