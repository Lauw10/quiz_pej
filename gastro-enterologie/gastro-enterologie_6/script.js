const questions65 = [
    {
        question: "Complication(s) possible(s) de l'amibiase intestinale :",
        answers: [
            { text: "Dégénérescence au niveau du colon", correct: false },
            { text: "Occlusion intestinale haute", correct: false },
            { text: "Abcès hépatique", correct: true },
            { text: "Atrophie villositaire", correct: false },
            { text: "Fistule anale", correct: false }
        ]
    },    
    {
        question: "Concernant le traitement de l'amibiase intestinale aiguë :",
        answers: [
        { text: "Comporte uniquement un antiamibien de contact", correct: false },
        { text: "Est efficace à dose unique en une seule journée", correct: false },
        { text: "Nécessite un antiamibien tissulaire puis d'un antiamibien de contact", correct: true },
        { text: "Le contrôle de la parasitologie des selles après le traitement n'est pas indiqué", correct: false },
        { text: "Nécessite l'association systématique d'une antibiothérapie à large spectre", correct: false }
        ]
    },    
    {
        question: "L'amibiase intestinale peut être contractée par voie :",
        answers: [
            { text: "Orale", correct: true },
            { text: "Transplacentaire", correct: false },
            { text: "Cutanée", correct: false },
            { text: "Parentérale", correct: false },
            { text: "Sexuelle", correct: false }
        ]
    },    
    {
        question: "Une ascite est définie par :",
        answers: [
        { text: "Un épanchement liquidien intra péritonéal", correct: true },
        { text: "Un épanchement hémorragique intra-péritonéal", correct: false },
        { text: "Un épanchement bilieux intra péritonéal", correct: false },
        { text: "Un épanchement purulent intra péritonéal", correct: false },
        { text: "Toutes ces propositions sont justes", correct: false }
        ]
    },    
    {
        question: "Une ascite est dite exsudative si :",
        answers: [
            { text: "Le taux d'albumine dans le liquide d'ascite est supérieur à 25g/l", correct: true },
            { text: "Le taux d'albumine dans le liquide d'ascite est inférieur à 25g/l", correct: false },
            { text: "Présence de germes à l'examen bactériologique du liquide d'ascite", correct: false },
            { text: "Le taux d'amylase dans le liquide d'ascite est élevé", correct: false },
            { text: "Présence d'un taux de leucocytes supérieurs à 1000/mm3 dans le liquide d'ascite", correct: false }
        ]
    },    
    {
        question: "La cause la plus fréquente des ascites est :",
        answers: [
        { text: "La cirrhose hépatique", correct: true },
        { text: "La tuberculose péritonéale", correct: false },
        { text: "Le syndrome néphrotique", correct: false },
        { text: "L'insuffisance cardiaque droite", correct: false },
        { text: "Carcinose péritonéale par cancer gastrique", correct: false }
        ]
    },    
    {
        question: "Devant une ascite quel est le signe qui oriente vers une cirrhose du foie :",
        answers: [
            { text: "Douleur de l'hypochondre droit", correct: false },
            { text: "Souffle hépatique", correct: false },
            { text: "Un liquide d'ascite riche en protide", correct: false },
            { text: "Un Astérixis", correct: true },
            { text: "Une hépatomégalie douloureuse", correct: false }
        ]
    },    
    {
        question: "Une ascite riche en protéine( Rivalta positif) évoque :",
        answers: [
            { text: "Un cavernome portal congénital", correct: false },
            { text: "Un syndrome néphrotique aigu", correct: false },
            { text: "Une carcinose péritonéale", correct: true },
            { text: "Une entéropathie exsudative", correct: false },
            { text: "Une insuffisance cardiaque droite", correct: false }
        ]
    },  
    {
        question: "La première poussée d'ascite chez un cirrhotique doit être traitée par :",
        answers: [
            { text: "Le régime désodé et les diurétiques", correct: true },
            { text: "Les corticoïdes", correct: false },
            { text: "La ponction concentration réinjection d'ascite", correct: false },
            { text: "Le shunt péritonéo-jugulaire", correct: false },
            { text: "La dérivation porto-cave", correct: false }
        ]
    },   
    {
        question: "Concernant l'ascite cloisonnée, les propositions suivantes sont correctes, sauf",
        answers: [
            { text: "C'est une ascite exsudative", correct: false },
            { text: "Donne une matité en damier", correct: false },
            { text: "Le signe du Flot est positif", correct: true },
            { text: "L'échographie abdominale permet le diagnostic positif", correct: false },
            { text: "Peut être secondaire à une tuberculose péritonéale", correct: false }
        ]
    }
];


document.addEventListener('DOMContentLoaded', () => {
    const quiz65 = new QuizGame('quiz-container-65', questions65);
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
                window.location.href = "../gastro-enterologie_7/index.html";
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

