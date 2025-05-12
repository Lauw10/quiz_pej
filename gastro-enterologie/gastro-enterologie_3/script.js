const questions62 = [
    {
        question: "Quel bilan biologique évoque une cytolyse hépatique ?",
        answers: [
            { text: "Gamma globuline a 2 fois la normale", correct: false },
            { text: "Transaminases à 10 fois la normale", correct: true },
            { text: "Bilirubine élevée supérieur à 4 fois la normale", correct: false },
            { text: "Taux de prothrombine abaissé a 70%", correct: false },
            { text: "Phosphatase alcaline a 2 fois la normale", correct: false }
        ]
    },    
    {
        question: "Concernant l'hépatite chronique d'origine virale C, quelle est la proposition juste ?",
        answers: [
            { text: "Est toujours symptomatique", correct: false },
            { text: "Se complique dans plus 80% d'une cirrhose hépatique", correct: false },
            { text: "Prédispose à la survenue d'un carcinome hépatocellulaire", correct: true },
            { text: "Est toujours mortelle en moins de 5 ans en absence de traitement", correct: false },
            { text: "Guérit chez tous les patients après un traitement par interféron standard prescrit pendant une année", correct: false }
        ]
    },  
    {
        question: "Le traitement actuel de l'hépatite chronique active C fait appel a :",
        answers: [
            { text: "Interféron pegylé + Ribavirine", correct: false },
            { text: "Interféron standard", correct: false },
            { text: "Entécavir", correct: false },
            { text: "Corticoides", correct: false },
            { text: "Greffe hépatique", correct: true }
        ]
    },  
    {
        question: "Le prurit au cours d'une cholestase est en rapport avec :",
        answers: [
            { text: "élévation des phosphatases alcalines", correct: false },
            { text: "malabsorption des vitamines liposolubles", correct: false },
            { text: "élévation des transaminases", correct: false },
            { text: "dépôt sous cutané des sels biliaires", correct: true },
            { text: "hyper bilirubinémie", correct: false }
        ]
    },    
    {
        question: "Dans la maladie de Gilbert, les propositions suivantes sont correctes sauf :",
        answers: [
            { text: "L'ictère est à bilirubine non conjuguée", correct: false },
            { text: "Il n'y a pas d'hépatomégalie", correct: false },
            { text: "La phosphatase alcaline est normale", correct: false },
            { text: "L'épreuve du jeûne augmente la bilirubine non conjuguée", correct: false },
            { text: "Le test au phénobarbital augmente la bilirubine non conjuguée", correct: true }
        ]
    },
    {
        question: "Chez un malade présentant un ictère, quel est la triade symptomatique clinique évoquant une lithiase cholédocienne :",
        answers: [
            { text: "Douleur de l'hypochondre droit, fièvre, ictère dans l'ordre et en moins de 72 h environ", correct: true },
            { text: "Prurit précédant l'ictère et la douleur", correct: false },
            { text: "Douleur de l'hypochondre, ictère, grosse vésicule a la palpation", correct: false },
            { text: "Ictère, fièvre, douleur dans cet ordre", correct: false },
            { text: "Ictère progressif, apyrétique, indolore", correct: false }
        ]
    },
    {
        question: "Examen(s) biologique(s) différenciant la cholestase de l'insuffisance hépato-cellulaire isolée :",
        answers: [
            { text: "Taux de prothrombine", correct: false },
            { text: "Transaminases", correct: false },
            { text: "Facteur V", correct: false },
            { text: "Bilirubine", correct: false },
            { text: "Gamma globuline", correct: true }
        ]
    },
    {
        question: "Devant un ictère douloureux et fébrile, il faut pratiquer en première intention :",
        answers: [
        { text: "Cholangiographie intraveineuse", correct: false },
        { text: "Echographie abdominale", correct: true },
        { text: "Cholangiographie rétrograde par cathétérisme de la papille", correct: false },
        { text: "Duodénoscopie", correct: false },
        { text: "Cholangiographie transhépatique", correct: false }
        ]
    },
    {
        question: "La bilirubine conjuguée peut être prédominante au cours des ictères provoqués par les affections suivantes, sauf :",
        answers: [
            { text: "Cancer pancréatique", correct: false },
            { text: "Cirrhose biliaire primitive", correct: false },
            { text: "Hépatite virale A", correct: false },
            { text: "Maladie de Minkowski-Chauffard", correct: true },
            { text: "Lithiase cholédocienne", correct: false }
        ]
    },
    {
        question: "Chez un malade ictérique, la palpation d'une grosse vésicule évoque :",
        answers: [
        { text: "Cirrhose avec ictère", correct: false },
            { text: "Cancer du hile du foie", correct: false },
            { text: "Lithiase du cholédoque", correct: false },
            { text: "Pancréatite chronique calcifiante", correct: false },
            { text: "Cancer de la tête du pancréas", correct: true }
        ]
    }
];


document.addEventListener('DOMContentLoaded', () => {
    const quiz62 = new QuizGame('quiz-container-61', questions62);
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
                window.location.href = "../gastro-enterologie_4/index.html";
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

