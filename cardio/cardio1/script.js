// Exemple de questions pour ce quiz
const questions2 = [
    {
        question: "Quelle valvule est la plus fréquemment atteinte dans le RAA ?",
        answers: [
            { text: "Tricuspide", correct: false },
            { text: "Mitrale", correct: true },  
            { text: "Pulmonaire", correct: false },
            { text: "Aortique", correct: false }
        ]
    },
    {
        question: "Quel signe ECG est pathognomonique d'un infarctus STEMI ?",
        answers: [
            { text: "Sus-décalage du segment ST", correct: true },  
            { text: "Onde Q profonde", correct: false },
            { text: "Aplatissement de l'onde T", correct: false },
            { text: "Ondes U prominentes", correct: false }
        ]
    },
    {
        question: "Quelle est la cause la plus fréquente d'insuffisance cardiaque droite ?",
        answers: [
            { text: "Cardiomyopathie dilatée", correct: false },
            { text: "Fibrillation auriculaire", correct: false },
            { text: "Sténose aortique", correct: false },
            { text: "Hypertension pulmonaire", correct: true } 
        ]
    },
    {
        question: "Quel traitement de première intention dans l'angor stable ?",
        answers: [
            { text: "Diurétiques", correct: false },
            { text: "Bêta-bloquants", correct: true },  
            { text: "Inhibiteurs calciques", correct: false },
            { text: "Digitaliques", correct: false }
        ]
    },
    {
        question: "Quelle anomalie échocardiographique dans la maladie de Takotsubo ?",
        answers: [
            { text: "Dyskinésie apicale transitoire", correct: true },  
            { text: "Hypertrophie ventriculaire", correct: false },
            { text: "Régurgitation mitrale", correct: false },
            { text: "Épanchement péricardique", correct: false }
        ]
    },
    {
        question: "Quel facteur majeur prédispose à l'endocardite infectieuse ?",
        answers: [
            { text: "Tabagisme", correct: false },
            { text: "Diabète", correct: false },
            { text: "Valvulopathie", correct: true }, 
            { text: "Hyperlipidémie", correct: false }
        ]
    },
    {
        question: "Quel tracé ECG montre des ondes F en 'dents de scie' ?",
        answers: [
            { text: "Tachycardie jonctionnelle", correct: false },
            { text: "Flutter auriculaire", correct: true },  
            { text: "Fibrillation ventriculaire", correct: false },
            { text: "Bloc AV complet", correct: false }
        ]
    },
    {
        question: "Quel examen pour confirmer une péricardite ?",
        answers: [
            { text: "Scanner coronaire", correct: false },
            { text: "IRM myocardique", correct: false },
            { text: "Radiographie thoracique", correct: false },
            { text: "Échocardiographie", correct: true }  
        ]
    },
    {
        question: "Quelle complication menace un anévrisme de l'aorte abdominale ?",
        answers: [
            { text: "Ischémie rénale", correct: false },
            { text: "Rupture", correct: true },  
            { text: "Thrombose", correct: false },
            { text: "Compression œsophagienne", correct: false }
        ]
    },
    {
        question: "Quelle cardiopathie congénitale associe sténose pulmonaire et CIV ?",
        answers: [
            { text: "Communication interauriculaire", correct: false },
            { text: "Coarctation aortique", correct: false },
            { text: "Tétralogie de Fallot", correct: true },  
            { text: "Canal artériel persistant", correct: false }
        ]
    }
];

// Initialisation du quiz lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    const quiz2 = new QuizGame('quiz-container-2', questions2);
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
                window.location.href = "../cardio2/index.html";
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
        // if (confirm("Êtes-vous sûr de vouloir réinitialiser votre meilleur score ?")) {
        //     this.bestScore = 0;
        //     localStorage.setItem(`bestScore_${this.container.id}`, this.bestScore);
        //     this.updateBestScoreDisplay();
        //         alert("Meilleur score réinitialisé !");
        // }
    }
}
