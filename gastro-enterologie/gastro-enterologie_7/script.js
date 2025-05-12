const questions66 = [
    {
        question: "Au cours d'une maladie inflammatoire chronique de l'intestin, quel élément est plus en faveur d'une rectocolite hémorragique que d'une maladie de Crohn?",
        answers: [
            {"text": "Présence d'un granulome tuberculoïde à la biopsie colique", "correct": false},
            {"text": "Atteinte iléale", "correct": false},
            {"text": "Fistule périnéale", "correct": false},
            {"text": "Ulcérations coliques sans intervalles de muqueuse saine", "correct": true},
            {"text": "Présence d'un syndrome de Koenig", "correct": false}
        ]
      },
      {
        question: "Au cours de la rectocolite ulcéro-hémorragique, on ne retrouve pas :",
        answers: [
            {"text": "Spondylarthrite ankylosante", "correct": false},
            {"text": "Erythème noueux", "correct": false},
            {"text": "Diarrhée sanglante", "correct": false},
            {"text": "Lithiase rénale oxalique", "correct": true},
            {"text": "Pyoderma gangrenosum", "correct": false}
        ]
      },
      {
        question: "Chez un malade ayant une diarrhée chronique, on évoque une rectocolite ulcéro-hémorragique devant :",
        answers: [
            {"text": "Présence de granulomes épithélioïdes sur les biopsies rectales", "correct": false},
            {"text": "Présence de lésion histologique oeso-gastroduodénale", "correct": false},
            {"text": "Présence d'abcès intra cryptiques sur les biopsies coliques", "correct": true},
            {"text": "Atteinte muqueuse colique segmentaire avec des intervalles de muqueuse saine", "correct": false},
            {"text": "Iléite sténosante", "correct": false}
        ]
      },
      {
        question: "Le diagnostic positif d'une la rectocolite ulcéro-hémorragique repose sur :",
        answers: [
          {"text": "Clinique : diarrhée glairo-sanglante", "correct": false},
          {"text": "Endoscopie : aspect évocateur des lésions", "correct": false},
          {"text": "Biopsie colique", "correct": false},
          {"text": "Clinique, endoscopie et histologie", "correct": true},
          {"text": "Transit du grêle", "correct": false}
        ]
      },
      {
        question: "Au cours de la rectocolite ulcéro-hémorragique, on observe les complications suivantes, sauf :",
        answers: [
            {"text": "Colectasie (dilatation colique importante)", "correct": false},
            {"text": "Perforation", "correct": false},
            {"text": "Hémorragie profuse", "correct": false},
            {"text": "Cancérisation", "correct": false},
            {"text": "Délabrement sphinctérien anal", "correct": true}
        ]
      },
      {
        question: "La rectocolite ulcéro-hémorragique n'est pas traitée par :",
        answers: [
            {"text": "Corticoïdes", "correct": false},
            {"text": "Immunosuppresseurs", "correct": false},
            {"text": "Dérivés de la 5 amino-salycilates", "correct": false},
            {"text": "Anticorps anti TNF", "correct": false},
            {"text": "5 Fluoro-uracile", "correct": true}
        ]
      },
      {
        question: "La diarrhée chronique est définie comme une augmentation du nombre de selles dont le poids journalier et la durée d'évolution sont supérieurs ou égaux à :",
        answers: [
            {"text": "150 g /jour pendant plus d'1 mois", "correct": false},
            {"text": "300 g/jour pendant plus de 3 semaines", "correct": true},
            {"text": "500g /jour pendant plus 2 mois", "correct": false},
            {"text": "1000 g/jour pendant plus 15 jours", "correct": false},
            {"text": "300 g/jour pendant plus 6 mois", "correct": false}
        ]
      },
      {
        question: "La maladie cœliaque présente les manifestations cliniques suivantes sauf :",
        answers: [
            {"text": "Diarrhée chronique est un mode de révélation fréquent", "correct": false},
            {"text": "Maladie coeliaque peut se révéler par une anémie", "correct": false},
            {"text": "Test au D-xylose est le plus souvent pathologique", "correct": false},
            {"text": "A la biopsie du grêle, l'atrophie villositaire peut être à un stade II (modérée)", "correct": true},
            {"text": "Survenue d'un lymphome dans l'évolution a long terme", "correct": false}
        ]
      },
      {
        question: "Concernant la maladie cœliaque de l'adulte :",
        answers: [
            {"text": "Evolue spontanément vers la guérison", "correct": false},
            {"text": "S'accompagne d'un rétrécissement des plis et d'une diminution de diamètre des anses jéjunales au transit baryté du grêle", "correct": true},
            {"text": "Se traite par régime sans gluten a vie et rechute si le gluten est ré-introduit dans l'alimentation", "correct": false},
            {"text": "S'accompagne d'un test de schilling avec facteur intrinsèque constamment diminué", "correct": false},
            {"text": "Peut être induite par la consommation au long cours de néomycine orale", "correct": false}
        ]
      },
      {
        question: "Une entéropathie exsudative peut être retrouvée au cours des affections suivantes, sauf :",
        answers: [
            {"text": "La maladie de Crohn iléo-colique", "correct": false},
            {"text": "La maladie de Ménétrier", "correct": false},
            {"text": "Les lymphangiectasies diffuses ou maladie de Waldman", "correct": false},
            {"text": "La maladie coeliaque", "correct": false},
            {"text": "La diverticulose colique diffuse", "correct": true}
        ]
      }
];



document.addEventListener('DOMContentLoaded', () => {
    const quiz66 = new QuizGame('quiz-container-66', questions66);
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
                window.location.href = "../gastro-enterologie_8/index.html";
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

