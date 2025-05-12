const questions64 = [
    {
        question: "L'hypertension portale d'un cirrhotique connu est recherchée par le(s) examen(s) suivant, sauf :",
        answers: [
            { text: "Fibroscopie oeso-gastro-duodénale", correct: false },
            { text: "Ponction biopsie du foie", correct: true },
            { text: "Echographie abdominale", correct: false },
            { text: "Mesure de la pression sus-hépatique bloquée", correct: false },
            { text: "Echodoppler vasculaire", correct: false }
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
        question: "Devant une ascite rebelle au traitement médical diurétique chez un cirrhotique, on préconise :",
        answers: [
            { text: "Mise en place d'un shunt péritonéojugulaire", correct: true },
            { text: "Ligature des varices œsophagiennes", correct: false },
            { text: "Diurétique a forte dose en intraveineux", correct: false },
            { text: "Déconnection azygo-portale", correct: false },
            { text: "Anastomose spléno-rénale distale avec déconnection gastrique", correct: false }
        ]
    },    
    {
        question: "Une décompensation ictèro-ascitique d'une cirrhose peut relever des étiologies suivantes, sauf :",
        answers: [
        { text: "Hémorragie digestive", correct: false },
        { text: "Encéphalopathie hépatique", correct: false },
        { text: "Un carcinome hépatocellulaire", correct: false },
        { text: "Infection entéro-péritonéale", correct: false },
        { text: "Greffe d'une tuberculose péritonéale", correct: true }
        ]
    },    
    {
        question: "Une encéphalopathie chez un cirrhotique peut être déclenchée par les facteurs suivants, sauf:",
        answers: [
            { text: "hémorragie digestive", correct: false },
            { text: "infection", correct: false },
            { text: "traitement diurétique", correct: false },
            { text: "régime pauvre en protides", correct: true },
            { text: "traitement a base de sédatif", correct: false }
        ]
    },    
    {
        question: "Concernant la cirrhose hépatique d'origine virale B et C :",
        answers: [
        { text: "Est toujours symptomatique décompensée", correct: false },
        { text: "Se complique dans 20% des cas d'une angiocholite", correct: false },
        { text: "Prédispose à la survenue d'un carcinome hépatocellulaire", correct: true },
        { text: "Est toujours mortelle en moins de 5 ans", correct: false },
        { text: "Guérit après un traitement par les antiviraux prescrit pendant une année", correct: false }
        ]
    },    
    {
        question: "A la suite d'un premier épisode d'hémorragie digestive par rupture de varices œsophagiennes, la prévention de la récidive hémorragique consiste en :",
        answers: [
            { text: "Sclérose endoscopique des varices œsophagiennes", correct: false },
            { text: "Pose d'un clip sur la varice", correct: false },
            { text: "Médicaments vaso-actifs type sandostatine", correct: false },
            { text: "Ligature endoscopique des varices", correct: true },
            { text: "Traitement chirugical par anostomose mésentérico-cave", correct: false }
        ]
    },    
    {
        question: "L'agent pathogène de l'amibiase intestinale est :",
        answers: [
            { text: "Echonococus granulosis", correct: false },
            { text: "Entamoeba histolytica-histolytica forme végétative", correct: true },
            { text: "Entamoeba histolytica forme minuta", correct: false },
            { text: "Forme kystique", correct: false },
            { text: "Giardia intestinalis", correct: false }
        ]
    },    
    {
        question: "Concernant l'amibiase intestinale, les propositions suivantes sont correctes sauf :",
        answers: [
            { text: "La forme diarrhéique banale est le plus souvent observée", correct: false },
            { text: "En l'absence de traitement l'évolution peut se faire vers la chronicité", correct: false },
            { text: "La forme la plus fréquente est le syndrome dysentérique ou dysentérie amibienne.", correct: true },
            { text: "L'amibe peut gagner le poumon en absence de traitement", correct: false },
            { text: "Les lésions siègent le plus souvent au niveau du rectosigmoïde au cours de la dysenterie amibienne.", correct: false }
        ]
    },    
    {
        question: "Au cours de l'amibiase colique aiguë non compliquée, le syndrome dysentérique comporte les signes suivants, sauf :",
        answers: [
            { text: "Selles glaireuses", correct: false },
            { text: "Selles sanglantes", correct: false },
            { text: "Ténesme rectal", correct: false },
            { text: "Fièvre élevée", correct: true },
            { text: "Epreintes", correct: false }
        ]
    }
];



document.addEventListener('DOMContentLoaded', () => {
    const quiz64 = new QuizGame('quiz-container-64', questions64);
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
                window.location.href = "../gastro-enterologie_6/index.html";
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

