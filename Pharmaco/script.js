// Exemple de questions pour ce quiz
const questions3 = [
    {
        question: "Quelle classe de médicaments inhibe la cyclooxygénase (COX) ?",
        answers: [
            { text: "Bêta-bloquants", correct: false },
            { text: "Anti-inflammatoires non stéroïdiens (AINS)", correct: true },
            { text: "Antibiotiques", correct: false },
            { text: "Inhibiteurs de la pompe à protons", correct: false }
        ]
    },
    {
        question: "Quel est le mécanisme d'action des bêta-bloquants ?",
        answers: [
            { text: "Blocage des récepteurs bêta-adrénergiques", correct: true },
            { text: "Inhibition des canaux calciques", correct: false },
            { text: "Activation des récepteurs muscariniques", correct: false },
            { text: "Inhibition de l'enzyme de conversion", correct: false }
        ]
    },
    {
        question: "Quel médicament est utilisé comme antidote en cas de surdosage en héparine ?",
        answers: [
            { text: "Vitamine K", correct: false },
            { text: "Sulfate de protamine", correct: true },
            { text: "Naloxone", correct: false },
            { text: "Flumazénil", correct: false }
        ]
    },
    {
        question: "Quelle classe thérapeutique est indiquée dans le traitement de fond de l'asthme ?",
        answers: [
            { text: "Diurétiques", correct: false },
            { text: "Antihistaminiques", correct: false },
            { text: "Corticoïdes inhalés", correct: true },
            { text: "Antibiotiques", correct: false }
        ]
    },
    {
        question: "Quel est l'effet indésirable principal des inhibiteurs de l'enzyme de conversion (IEC) ?",
        answers: [
            { text: "Insomnie", correct: false },
            { text: "Toux sèche", correct: true },
            { text: "Hypoglycémie", correct: false },
            { text: "Constipation", correct: false }
        ]
    },
    {
        question: "Quel antibiotique est actif sur les bactéries à Gram positif et négatif ?",
        answers: [
            { text: "Pénicilline G", correct: false },
            { text: "Métronidazole", correct: false },
            { text: "Amoxicilline + acide clavulanique", correct: true },
            { text: "Vancomycine", correct: false }
        ]
    },
    {
        question: "Quel médicament est utilisé dans le traitement de la crise d'angor ?",
        answers: [
            { text: "Paracétamol", correct: false },
            { text: "Trinitrine (dérivés nitrés)", correct: true },
            { text: "Ibuprofène", correct: false },
            { text: "Morphine", correct: false }
        ]
    },
    {
        question: "Quelle molécule est un antagoniste compétitif des récepteurs H2 de l'histamine ?",
        answers: [
            { text: "Oméprazole", correct: false },
            { text: "Ranitidine", correct: true },
            { text: "Métoclopramide", correct: false },
            { text: "Dompéridone", correct: false }
        ]
    },
    {
        question: "Quel antiarythmique de classe Ia est utilisé dans les tachycardies ventriculaires ?",
        answers: [
            { text: "Vérapamil", correct: false },
            { text: "Quinidine", correct: true },
            { text: "Amiodarone", correct: false },
            { text: "Atropine", correct: false }
        ]
    },
    {
        question: "Quel est le mécanisme d'action des statines ?",
        answers: [
            { text: "Activation des récepteurs aux LDL", correct: false },
            { text: "Inhibition de l'HMG-CoA réductase", correct: true },
            { text: "Inhibition de l'absorption intestinale du cholestérol", correct: false },
            { text: "Augmentation de l'excrétion biliaire", correct: false }
        ]
    }
];

// Initialisation du quiz lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    const quiz3 = new QuizGame('quiz-container-3', questions3);
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

