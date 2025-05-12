const questions61 = [
    {
        question: "Peuvent être associés à un ulcère duodénal les éléments suivants sauf :",
        answers: [
            { text: "autre ulcère duodénal", correct: false },
            { text: "ulcère gastrique", correct: false },
            { text: "duodénite érosive", correct: false },
            { text: "atrophie du fundus", correct: true },
            { text: "antrite érosive", correct: false }
        ]
    },
    {
        question: "Mécanisme prédominant de survenue d'un ulcère gastrique :",
        answers: [
            { text: "hypersécrétion acide d'origine vagale", correct: false },
            { text: "hypersécrétion acide due à une sécrétion excessive de gastrine", correct: false },
            { text: "diminution de la résistance de la barrière muqueuse et/ou une fragilité de la paroi", correct: true },
            { text: "augmentation du nombre des cellules pariétales (bourdantes) dans la muqueuse fundique", correct: false },
            { text: "atrophie gastrique", correct: false }
        ]
    },
    {
        question: "La sténose pyloro-bulbaire, d'origine ulcéreuse se traduit par des vomissements:",
        answers: [
            { text: "bilieux fréquents et répétés", correct: false },
            { text: "bilieux puis fécaloïdes", correct: false },
            { text: "d'aliments ingérés plusieurs jours auparavant", correct: true },
            { text: "d'emblée fécaloïdes", correct: false },
            { text: "de sang non digéré", correct: false }
        ]
    },
    {
        question: "En présence d'une hématémèse grave par ulcère duodénal, l'importance de l'hémorragie sera au mieux appréciée par:",
        answers: [
            { text: "La quantité de sang rejetée", correct: false },
            { text: "L'importance de la quantité de sang nécessaire pour rétablir et maintenir une tension correcte", correct: true },
            { text: "L'agitation du sujet", correct: false },
            { text: "La fréquence respiratoire", correct: false },
            { text: "La soif", correct: false }
        ]
    },      
    {
        question: "Le traitement d'un ulcère duodénal consiste en :",
        answers: [
            { text: "Eradication de l'Helicobacter pylori comporte une trithérapie d'une durée d'un mois", correct: false },
            { text: "Éradication de l'Helicobacter pylori comporte une bithérapie de 04 semaines", correct: false },
            { text: "Éradication de l'Helicobacter pylori comporte une trithérapie de 07 jours suivie d'un traitement antisécrétoire de 21 jours", correct: true },
            { text: "Contrôle de l'éradication d'Helicobacter pylori doit toujours être effectué à la fin du traitement par endoscopie", correct: false },
            { text: "Après éradication d'Helicobacter pylori on maintient un traitement d'entretien pendant un an", correct: false }
        ]
    },      
    {
        question: "Concernant les hépatites virales:",
        answers: [
            { text: "Il existe une vaccination efficace contre l'hépatite A et l'hépatite E", correct: false },
            { text: "L'hépatite virale A n'est jamais fulminante", correct: false },
            { text: "Le risque de passage à la chronicité de l'infection due au virus B chez un adulte immunocompétent est de l'ordre de 50%", correct: false },
            { text: "Le risque de passage à la chronicité de l'infection due au virus C chez un adulte immunocompétent est de l'ordre 70-80%", correct: true },
            { text: "La co-infection par le virus de l'hépatite D d'une hépatite chronique C est un facteur aggravant", correct: false }
        ]
    },       
    {
        question: "Mode de transmission le plus fréquent du virus de l'hépatite C :",
        answers: [
            { text: "Oro-fécale", correct: false },
            { text: "Parentérale", correct: true },
            { text: "Sexuelle", correct: false },
            { text: "Néonatale", correct: false },
            { text: "Contacts interhumains", correct: false }
        ]
    },        
    {
        question: "Concernant l'hépatite virale aigue B, les propositions suivantes sont correctes, sauf :",
        answers: [
            { text: "Peut se transmettre par voie sanguine", correct: false },
            { text: "Peut être asymptomatique", correct: false },
            { text: "Ne passe jamais à la chronicité", correct: true },
            { text: "Peut donner un tableau d'hépatite aigue grave", correct: false },
            { text: "La transmission mère enfant est possible", correct: false }
        ]
    },       
    {
        question: "Une hépatite chronique peut être provoquée par :",
        answers: [
            { text: "Virus de l'hépatite A, B et C", correct: false },
            { text: "Virus de l'hépatite B et C", correct: true },
            { text: "Virus de l'hépatite B, C et E", correct: false },
            { text: "Virus de l'hépatite A, B et D(delta)", correct: false },
            { text: "Virus de l'hépatite A, B, C, D, E", correct: false }
        ]
    },        
    {
        question: "Une hépatite aiguë fulminante est évoquée devant :",
        answers: [
            { text: "Un taux de transaminases (ASAT et ALAT) qui dépasse 2000 UI/l", correct: false },
            { text: "Un taux de gammaglobulines qui dépasse 20 g/l", correct: false },
            { text: "Un taux de bilirubine totale qui dépasse 80 micromol/l", correct: false },
            { text: "Un taux de prothrombine inférieur à 20%", correct: true },
            { text: "Un taux de gamma glutamyl transférase supérieur au triple de la normale", correct: false }
        ]
    }
];


document.addEventListener('DOMContentLoaded', () => {
    const quiz61 = new QuizGame('quiz-container-61', questions61);
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
                window.location.href = "../gastro-enterologie_3/index.html";
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

