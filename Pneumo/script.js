// Exemple de questions pour ce quiz
const questions4 = [
    {
        question: "Quel germe cause le plus souvent les pneumonies communautaires ?",
        answers: [
            { text: "Legionella pneumophila", correct: false },
            { text: "Streptococcus pneumoniae", correct: true },
            { text: "Mycoplasma pneumoniae", correct: false },
            { text: "Klebsiella pneumoniae", correct: false }
        ]
    },
    {
        question: "Quel critère spirométrique définit la BPCO ?",
        answers: [
            { text: "DLCO < 60%", correct: false },
            { text: "CV < 80%", correct: false },
            { text: "CPT > 120%", correct: false },
            { text: "VEMS/CV < 70%", correct: true }
        ]
    },
    {
        question: "Quelle caractéristique radiologique est typique d'une pneumonie à pneumocoque ?",
        answers: [
            { text: "Opacité lobaire ou segmentaire bien limitée", correct: true },
            { text: "Opacités en verre dépoli diffuses", correct: false },
            { text: "Épanchement pleural bilatéral", correct: false },
            { text: "Images kystiques multiples", correct: false }
        ]
    },
    {
        question: "Quelle complication est la plus redoutée dans l'asthme aigu grave ?",
        answers: [
            { text: "Pneumothorax", correct: false },
            { text: "Arrêt respiratoire", correct: true },
            { text: "Emphysème sous-cutané", correct: false },
            { text: "Bronchectasies", correct: false }
        ]
    },
    {
        question: "Quel examen permet de diagnostiquer une embolie pulmonaire ?",
        answers: [
            { text: "Angio-scanner thoracique", correct: true },
            { text: "Radiographie thoracique", correct: false },
            { text: "Échographie pleurale", correct: false },
            { text: "Lavage broncho-alvéolaire", correct: false }
        ]
    },
    {
        question: "Quel mécanisme explique l'hypoxémie dans le SDRA ?",
        answers: [
            { text: "Augmentation de la diffusion alvéolo-capillaire", correct: false },
            { text: "Shunt droit-gauche", correct: true },
            { text: "Hyperventilation alvéolaire", correct: false },
            { text: "Diminution du gradient alvéolo-artériel", correct: false }
        ]
    },
    {
        question: "Quel traitement de première intention dans l'embolie pulmonaire non massive ?",
        answers: [
            { text: "Thrombolyse", correct: false },
            { text: "Anticoagulation (HBPM)", correct: true },
            { text: "Embolectomie chirurgicale", correct: false },
            { text: "Vasodilatateurs pulmonaires", correct: false }
        ]
    },
    {
        question: "Quelle bactérie est responsable de la tuberculose pulmonaire ?",
        answers: [
            { text: "Haemophilus influenzae", correct: false },
            { text: "Pseudomonas aeruginosa", correct: false },
            { text: "Streptococcus pyogenes", correct: false },
            { text: "Mycobacterium tuberculosis", correct: true }
        ]
    },
    {
        question: "Quel signe clinique est caractéristique d'un pneumothorax ?",
        answers: [
            { text: "Matité à la percussion", correct: false },
            { text: "Diminution du murmure vésiculaire", correct: true },
            { text: "Crépitants inspiratoires", correct: false },
            { text: "Wheezing expiratoire", correct: false }
        ]
    },
    {
        question: "Quelle pathologie est associée à des images en rayons de miel au scanner thoracique ?",
        answers: [
            { text: "Sarcoïdose", correct: false },
            { text: "Fibrose pulmonaire idiopathique", correct: true },
            { text: "Pneumonie lobaire", correct: false },
            { text: "Bronchopneumopathie chronique obstructive", correct: false }
        ]
    }
];

// Initialisation du quiz lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    const quiz4 = new QuizGame('quiz-container-4', questions4);
});


class QuizGame {
    constructor(containerId, questions) {
        this.container = document.getElementById(containerId);
        this.questions = questions;
        
        // Elements
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
        
        // State
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.bestScore = localStorage.getItem(`bestScore_${containerId}`) ? 
                         parseInt(localStorage.getItem(`bestScore_${containerId}`)) : 0;
        
        // Initialize
        this.init();
    }
    
    init() {
        // Set initial best score display
        this.updateBestScoreDisplay();
        
        // Event listeners
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
        this.questionElement.innerText = question.question;
        question.answers.forEach(answer => {
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
                button.classList.add('correct'); // Vert si bonne réponse sélectionnée
            } else {
                button.classList.add('incorrect'); // Rouge si mauvaise réponse sélectionnée
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
        
        if (percentage === 100) {
            comment = "Excellent! Vous êtes un génie!";
        } else if (percentage >= 80) {
            comment = "Très bien! Vous avez bien maitrisé cette leçon.";
        } else if (percentage >= 65) {
            comment = "Bien! Vous êtes sur la bonne voie.";
        } else if (percentage >= 60) {
            comment = "Pas mal! Vous pouvez encore vous améliorer.";
        } else {
            comment = "Dommage! Peut-être devriez-vous réviser un peu.";
        }
        
        // Check and update best score
        let newRecord = false;
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem(`bestScore_${this.container.id}`, this.bestScore);
            newRecord = true;
        }
        
        this.updateBestScoreDisplay();
        
        // Display results
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
    //        localStorage.setItem(`bestScore_${this.container.id}`, this.bestScore);
    //         this.updateBestScoreDisplay();
    //         alert("Meilleur score réinitialisé !");
    //     }
    // }
}

