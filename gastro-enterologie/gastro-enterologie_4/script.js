const questions63 = [
    {
        question: "Une cholestase est évoquée devant les éléments biologiques suivants, sauf :",
        answers: [
            { text: "Elévation des aminotransférases", correct: false },
            { text: "Elévation des phosphatases alcalines", correct: false },
            { text: "Baisse du taux de prothrombine", correct: true },
            { text: "Elévation de la gamma-glutamyl-transpeptidase", correct: false },
            { text: "Elévation de la bilirubine conjuguée", correct: false }
        ]
    },
    {
        question: "Peut(ven)t être associé(s) particulièrement à la maladie de Crohn :",
        answers: [
            { text: "Spondylarthrite ankylosante", correct: true },
            { text: "Erythème noueux", correct: true },
            { text: "Diarrhée sanglante", correct: true },
            { text: "Lithiase rénale oxalique", correct: true },
            { text: "Pyoderma gangrenosum", correct: true }
        ]
    },
    {
        question: "On évoque une maladie de Crohn chez un malade ayant une diarrhée chronique avec :",
        answers: [
            { text: "Présence de granulomes épithélioïdes sur les biopsies des lésions", correct: true },
            { text: "Présence d'un trouble de la sécrétion glandulaire sur les biopsies rectales", correct: false },
            { text: "Présence d'abcès intra cryptiques sur les biopsies coliques", correct: false },
            { text: "Ulcérations coliques sans intervalles de muqueuse saine", correct: false },
            { text: "Iléite congestive de reflux", correct: false }
        ]
    },
    {
        question: "Elément(s) clinique(s) allant à l'encontre d'une maladie de Crohn :",
        answers: [
        { text: "Granulome tuberculoïde", correct: false },
        { text: "Atteinte iléale", correct: false },
        { text: "Fistule périnéale", correct: false },
        { text: "Atteintes muqueuses coliques continue sans intervalle de muqueuse saine", correct: true },
        { text: "Présence d'un syndrome de Koenig", correct: false }
        ]
    },
    {
        question: "Complication(s) rarement observée(s) dans la maladie de Crohn :",
        answers: [
            { text: "Sténose iléale", correct: false },
            { text: "Fistules et abcès", correct: false },
            { text: "Rectorragie profuse", correct: true },
            { text: "Cancérisation", correct: false },
            { text: "Délabrement sphinctérien anal", correct: false }
        ]
    },
    {
        question: "La rectocolite ulcéro-hémorragique n'est pas traitée par :",
        answers: [
        { text: "Corticoïdes", correct: false },
        { text: "Immunosuppresseurs", correct: false },
        { text: "Dérivés de la 5 amino-salycilate", correct: false },
        { text: "Anticorps anti TNF", correct: false },
        { text: "5 Fluoro-uracile", correct: true }
        ]
    },
    {
        question: "Au cours d'une cirrhose, l'insuffisance hépatocellulaire se manifeste par :",
        answers: [
            { text: "Baisse du facteur V", correct: true },
            { text: "Augmentation de l'activité rénine plasmatique", correct: false },
            { text: "Elévation du taux de cholestérol total", correct: false },
            { text: "Elévation de l'albuminémie", correct: false },
            { text: "Baisse du fer sérique", correct: false }
        ]
    },
    {
        question: "Au cours d'un coma hépatique - stade 3, compliquant une cirrhose, on peut retrouver les manifestations suivantes, sauf :",
        answers: [
            { text: "Astérixis", correct: false },
            { text: "Ictère cutanéo-muqueux", correct: false },
            { text: "Angiomes stellaires", correct: false },
            { text: "Crises convulsives", correct: true },
            { text: "Hyperventilation", correct: false }
        ]
    },
    {
        question: "Le syndrome d'hypertension portale ne comporte pas de :",
        answers: [
            { text: "Circulation veineuse collatérale abdominale", correct: false },
            { text: "Splénomégalie", correct: false },
            { text: "Dilatation de la veine splénique a l'échographie abdominale", correct: false },
            { text: "Ictère", correct: true },
            { text: "Varices œsophagiennes à l'endoscopie", correct: false }
        ]
    },
    {
        question: "La découverte d'une anémie microcytaire chez un patient atteint de cirrhose hépatique doit faire rechercher en priorité :",
        answers: [
            { text: "Carence en folates", correct: false },
            { text: "Hypersplénisme", correct: false },
            { text: "Saignement gastrique ou œsophagien chronique", correct: true },
            { text: "Carence martiale par déséquilibre alimentaire", correct: false },
            { text: "Carence en vitamine B12", correct: false }
        ]
    }
];


document.addEventListener('DOMContentLoaded', () => {
    const quiz63 = new QuizGame('quiz-container-63', questions63);
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
                window.location.href = "../gastro-enterologie_5/index.html";
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

