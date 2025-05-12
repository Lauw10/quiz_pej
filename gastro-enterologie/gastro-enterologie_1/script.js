const questions6 = [
    {
        question: "En présence d'une hématémèse grave par ulcère duodénal, l'importance de l'hémorragie sera au  mieux appréciée par : ",
        answers: [
            { text: "L'importance de la quantité de sang nécessaire pour rétablir et maintenir une tension correcte", correct: true },
            { text: "La quantité de sang rejetée ", correct: false },
            { text: "L'agitation du sujet ", correct: false },
            { text: "La fréquence respiratoire ", correct: false }
        ]
    },
    {
        question: "La cause la plus fréquente des hémorragies digestives est :",
        answers: [
            { text: "Ulcères gastroduodénaux ", correct: true },
            { text: "Gastrites hémorragiques", correct: false },
            { text: "Ruptures de varices œsophagiennes", correct: false },
            { text: "Syndrome de Mallory Weiss", correct: false }
        ]
    },
    {
        question: "Le diagnostic étiologique d'une hémorragie digestive haute repose sur l'endoscopie oeso-gastroduodénale, cet examen doit être réalisé :",
        answers: [
            { text: "Après obtention d'un état hémodynamique stable", correct: true },
            { text: "Sous anesthésie générale avec intubation pour éviter une aspiration bronchique", correct: false },
            { text: "Dès l'admission du patient pour mettre en évidence la lésion hémorragique", correct: false },
            { text: "Après réalisation d'un abdomen sans préparation pour éliminer une perforation associée", correct: false },
            { text: "Avec injection d'un atropinique pour obtenir une inhibition des contractions gastroduodénales", correct: false }
        ]
    },
    {
        question: "Dans les ulcères hémorragiques de la face postérieure du premier duodénum, le vaisseau le plus souvent responsable du saignement est :",
        answers: [
            { text: "Artère hépatique moyenne", correct: false },
            { text: "Artère pylorique", correct: false },
            { text: "Artère gastroduodénale", correct: true },
            { text: "Artère gastro-épiploïque droite", correct: false },
            { text: "Artère pancréatico-duodénale inférieure", correct: false }
        ]
    },
    {
        question: "Devant un méléna isolé, sans retentissement hémodynamique particulier, il faut effectuer en première intention :",
        answers: [
            { text: "Artériographie cœlio-mésentérique", correct: false },
            { text: "Coloscopie totale", correct: false },
            { text: "Dosage de l'hémoglobine", correct: false },
            { text: "Fibroscopie œsogastroduodénale", correct: true },
            { text: "Transit du grêle avec étude particulière de l'iléon terminal", correct: false }
        ]
    },  
    {
        question: "A la suite d'un premier épisode d'hémorragie digestive par rupture de varices œsophagiennes, la prévention de la récidive hémorragique consiste en :",
        answers: [
            { text: "Sclérose endoscopique des varices œsophagiennes", correct: false },
            { text: "Pose d'un clip sur la varice", correct: false },
            { text: "Médicaments vaso-actifs type sandostatine", correct: false },
            { text: "Ligature endoscopique des varices", correct: true },
            { text: "Traitement chirurgical par anastomose mésentérico-cave", correct: false }
        ]
    },
    {
        question: "Elément(s) clinique(s) ne caractérisant pas un syndrome ulcéreux :",
        answers: [
            { text: "La douleur est une crampe", correct: false },
            { text: "Son siège est épigastrique", correct: false },
            { text: "Son irradiation est scapulaire droite", correct: true },
            { text: "L'alimentation calme la douleur", correct: false },
            { text: "Son horaire est post-prandial immédiat", correct: false }
        ]
    },
    {
        question: "Concernant l'examen clinique d'un malade présentant un ulcère gastroduodénal non compliqué :",
        answers: [
            { text: "Il est fréquent de constater un clapotage à la palpation du creux épigastrique", correct: false },
            { text: "On déclenche volontiers une plexalgie", correct: false },
            { text: "On retrouve une défense épigastrique à la palpation", correct: false },
            { text: "On retrouve un point douloureux de Mayo Robson", correct: false },
            { text: "On ne détecte généralement aucune anomalie", correct: true }
        ]
    },
    {
        question: "Le bilan d'un ulcère gastroduodénal comporte en première intention :",
        answers: [
            { text: "Tubage gastrique basal", correct: false },
            { text: "Gastrinémie basale", correct: false },
            { text: "Recherche d'Helicobacter Pylori dans la région antrale", correct: true },
            { text: "Transit oeso-gastroduodénal", correct: false },
            { text: "Recherche d'une hyperthyroïdie", correct: false }
        ]
    },
    {
        question: "Le diagnostic d'infection à Helicobacter pylori peut être fait par les examens suivants, sauf :",
        answers: [
            { text: "sérologie", correct: false },
            { text: "coproculture", correct: true },
            { text: "test rapide à l'uréase", correct: false },
            { text: "test respiratoire à l'urée", correct: false },
            { text: "histologie des biopsies antrales", correct: false }
        ]
    }
];


document.addEventListener('DOMContentLoaded', () => {
    const quiz6 = new QuizGame('quiz-container-6', questions6);
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
                window.location.href = "../gastro-enterologie_2/index.html";
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

