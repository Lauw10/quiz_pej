// Exemple de questions pour ce quiz
const questions5 = [
    {
        question: "Un homme de 58 ans se présente aux urgences pour une douleur thoracique rétrosternale intense irradiant au bras gauche, évoluant depuis 45 minutes. L'ECG montre un sus-décalage du segment ST en V2-V4. Quel est le diagnostic le plus probable ?",
        answers: [
            { text: "Péricardite aiguë", correct: false },
            { text: "Infarctus du myocarde STEMI antérieur", correct: true },
            { text: "Embolie pulmonaire", correct: false },
            { text: "Dissection aortique", correct: false }
        ]
    },
    {
        question: "Une femme de 72 ans, fumeuse, consulte pour dyspnée progressive et toux productive chronique. La spirométrie montre un VEMS/CV à 65%. Quel diagnostic évoquez-vous en premier ?",
        answers: [
            { text: "Asthme", correct: false },
            { text: "Bronchopneumopathie chronique obstructive", correct: true },
            { text: "Fibrose pulmonaire", correct: false },
            { text: "Insuffisance cardiaque gauche", correct: false }
        ]
    },
    {
        question: "Un patient sous warfarine présente un INR à 6.5 sans saignement. Quel antidote administrez-vous en priorité ?",
        answers: [
            { text: "Sulfate de protamine", correct: false },
            { text: "Vitamine K par voie orale", correct: true },
            { text: "Naloxone", correct: false },
            { text: "Calcium", correct: false }
        ]
    },
    {
        question: "L'examen histologique d'une lésion pulmonaire montre une nécrose caséeuse avec cellules géantes multinucléées. Quel diagnostic évoquez-vous ?",
        answers: [
            { text: "Carcinome bronchique", correct: false },
            { text: "Tuberculose pulmonaire", correct: true },
            { text: "Pneumonie bactérienne", correct: false },
            { text: "Sarcoïdose", correct: false }
        ]
    },
    {
        question: "Un patient de 65 ans présente des œdèmes des membres inférieurs, une turgescence jugulaire et une hépatomégalie douloureuse. Quel mécanisme physiopathologique est en cause ?",
        answers: [
            { text: "Insuffisance cardiaque droite", correct: true },
            { text: "Cirrhose hépatique", correct: false },
            { text: "Syndrome néphrotique", correct: false },
            { text: "Thrombose veineuse profonde", correct: false }
        ]
    },
    {
        question: "Un homme de 40 ans arrive aux urgences avec une dyspnée brutale, une douleur thoracique latéralisée et une asymétrie du murmure vésiculaire. Quel examen demandez-vous en priorité ?",
        answers: [
            { text: "Radiographie thoracique", correct: true },
            { text: "ECG", correct: false },
            { text: "Échocardiographie", correct: false },
            { text: "Scanner cérébral", correct: false }
        ]
    },
    {
        question: "Une patiente sous amoxicilline développe un rash cutané généralisé avec œdème facial. Quel mécanisme est le plus probable ?",
        answers: [
            { text: "Effet indésirable dose-dépendant", correct: false },
            { text: "Réaction allergique de type I", correct: true },
            { text: "Toxicité hépatique", correct: false },
            { text: "Interaction médicamenteuse", correct: false }
        ]
    },
    {
        question: "L'analyse histologique d'une masse mammaire montre des cellules tumorales organisées en structures glandulaires. Quel type de tumeur s'agit-il ?",
        answers: [
            { text: "Carcinome canalaire infiltrant", correct: false },
            { text: "Adénocarcinome", correct: true },
            { text: "Carcinome médullaire", correct: false },
            { text: "Tumeur phyllode", correct: false }
        ]
    },
    {
        question: "Une femme de 75 ans présente des syncopes à l'effort. L'échocardiographie montre un gradient de pression à 80 mmHg à travers la valve aortique. Quel diagnostic ?",
        answers: [
            { text: "Insuffisance mitrale", correct: false },
            { text: "Sténose aortique serrée", correct: true },
            { text: "Cardiomyopathie hypertrophique", correct: false },
            { text: "Tamponnade péricardique", correct: false }
        ]
    },
    {
        question: "Un patient VIH+ présente une fièvre et des opacités pulmonaires diffuses au scanner. Le lavage broncho-alvéolaire révèle des kystes à Pneumocystis jirovecii. Quel traitement instaurer ?",
        answers: [
            { text: "Amoxicilline-clavulanate", correct: false },
            { text: "Triméthoprime-sulfaméthoxazole", correct: true },
            { text: "Ciprofloxacine", correct: false },
            { text: "Azithromycine", correct: false }
        ]
    }
];

// Initialisation du quiz lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    const quiz5 = new QuizGame('quiz-container-5', questions5);
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
                // window.location.href = "../clinic2/index.html";
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

    resetBestScore() {
        // if (confirm("Êtes-vous sûr de vouloir réinitialiser votre meilleur score ?")) {
        //     this.bestScore = 0;
        //     localStorage.setItem(`bestScore_${this.container.id}`, this.bestScore);
        //     this.updateBestScoreDisplay();
        //         alert("Meilleur score réinitialisé !");
        // }
    }
}
