// Exemple de questions pour ce quiz
const questions1 = [
    {
        question: "Quelle lésion est caractéristique de la tuberculose ?",
        answers: [
            { text: "Nécrose caséeuse", correct: true },
            { text: "Nécrose fibrinoïde", correct: false },
            { text: "Nécrose coagulée", correct: false },
            { text: "Nécrose liquéfiée", correct: false }
        ]
    },
    {
        question: "Quelle tumeur est associée à la mutation du gène BRCA1 ?",
        answers: [
            { text: "Cancer du sein", correct: true },
            { text: "Cancer colorectal", correct: false },               
            { text: "Lymphome non hodgkinien", correct: false },
            { text: "Cancer du poumon", correct: false }
        ]
    },
    {
        question: "Quelle est la caractéristique histologique principale d'un adénocarcinome ?",
        answers: [
            { text: "Cellules fusiformes", correct: false },
            { text: "Présence de cellules géantes", correct: false },
            { text: "Formation de structures glandulaires", correct: true }, 
            { text: "Stroma myxoïde", correct: false }
        ]
    },
    {
        question: "Quelle maladie se caractérise par des dépôts de substance amyloïde ?",
        answers: [
            { text: "Sarcoïdose", correct: false },
            { text: "Amylose", correct: true },
            { text: "Cirrhose biliaire primitive", correct: false },
            { text: "Maladie de Crohn", correct: false }            
        ]
    },
    {
        question: "Quelle est la lésion pré-cancéreuse du col utérin ?",
        answers: [                
            { text: "Polype cervical", correct: false },
            { text: "Hyperplasie endométriale", correct: false },
            { text: "Dysplasie cervicale (CIN)", correct: true },
            { text: "Métaplasie squameuse", correct: false }
        ]
    },
    {
        question: "Quelle pathologie cérébrale est associée aux plaques séniles ?",
        answers: [
            { text: "Chorée de Huntington", correct: false },
            { text: "Maladie d'Alzheimer", correct: true },
            { text: "Sclérose en plaques", correct: false },
            { text: "Maladie de Parkinson", correct: false }
        ]
    },
    {
        question: "Quel marqueur est spécifique du mélanome malin ?",
        answers: [
            { text: "CD20", correct: false },
            { text: "AFP", correct: false },
            { text: "PSA", correct: false },
            { text: "HMB-45", correct: true }
        ]
    },
    {
        question: "Quelle est la cause principale de cirrhose dans les pays occidentaux ?",
        answers: [
            { text: "Hépatite auto-immune", correct: false },
            { text: "Stéatose hépatique non alcoolique", correct: false },
            { text: "Hépatite B", correct: false },
            { text: "Alcoolisme chronique", correct: true }
        ]
    },
    {
        question: "Quel type de cancer est associé à la mutation du gène p53 ?",
        answers: [
            { text: "Cancer colorectal", correct: true },
            { text: "Cancer de la thyroïde", correct: false },
            { text: "Mélanome", correct: false },
            { text: "Leucémie lymphoïde chronique", correct: false }
        ]
    },
    {
        question: "Quelle lésion pulmonaire est typique de la silicose ?",
        answers: [
            { text: "Infiltrats alvéolaires", correct: false },               
            { text: "Bronchectasies", correct: false },
            { text: "Nodules fibrohyalins", correct: true },
            { text: "Cavités tuberculoïdes", correct: false }
        ]
    }
];


document.addEventListener('DOMContentLoaded', () => {
    const quiz1 = new QuizGame('quiz-container-1', questions1);
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
                // window.location.href = "../anapath2/index.html";
                window.location.href = "../../fin.html";
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

    // resetBestScore() {
    //     if (confirm("Êtes-vous sûr de vouloir réinitialiser votre meilleur score ?")) {
    //         this.bestScore = 0;
    //         localStorage.setItem(`bestScore_${this.container.id}`, this.bestScore);
    //         this.updateBestScoreDisplay();
    //             alert("Meilleur score réinitialisé !");
    //     }
    // }
}

