const questions = [
    {
        questionText: "Commonly used data types DO NOT include:",
        options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts",
    },
    {
        questionText: "Arrays in JavaScript can be used to store ______.",
        options: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above",
        ],
        answer: "4. all of the above",
    },
    {
        questionText:
            "String values must be enclosed within _____ when being assigned to variables.",
        options: [
            "1. commas",
            "2. curly brackets",
            "3. quotes",
            "4. parentheses",
        ],
        answer: "3. quotes",
    },
    {
        questionText:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: [
            "1. JavaScript",
            "2. terminal/bash",
            "3. for loops",
            "4. console.log",
        ],
        answer: "4. console.log",
    },
    {
        questionText:
            "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
        options: ["1. break", "2. stop", "3. halt", "4. exit"],
        answer: "1. break",
    },
];

let leaderBoard = [];

const startPage = document.querySelector(".startPage");
const startQuiz = document.getElementById("start-quiz");
const timer = document.querySelector(".timer");

const quiz = document.querySelector(".quiz");
const next = document.querySelector(".next");

let questionCount = 0;
let finalScore = 0;

startQuiz.addEventListener("click", () => {
    createQuiz();
    displayQuiz(questionCount);
});

const createQuiz = () => {
    startPage.classList.add("hidden");
    quiz.classList.remove("hidden");

    let totalQuestions = questions.length;

    for (let i = 0; i < totalQuestions; i++) {
        let queWrapper = document.createElement("div");
        queWrapper.classList.add("question", "hidden");
        quiz.append(queWrapper);

        let div = document.createElement("div");
        div.innerHTML = `<span class="queNum">
                            ${i + 1} of ${totalQuestions}`;
        queWrapper.append(div);

        let p = document.createElement("p");
        p.classList.add("questionText");
        p.innerText = questions[i].questionText;
        queWrapper.append(p);

        let ul = document.createElement("ul");
        ul.classList.add("options");
        let totalOptinos = questions[i].options.length;
        for (let j = 0; j < totalOptinos; j++) {
            let li = document.createElement("li");
            li.classList.add(`option${j + 1}`);
            li.innerText = questions[i].options[j];

            ul.append(li);
        }
        queWrapper.append(ul);
    }
};

const displayQuiz = (questionCount) => {
    next.classList.remove("hidden");
    const ques = document.querySelectorAll(".question");
    ques.forEach((que) => {
        if (!que.classList.contains("hidden")) que.classList.add("hidden");
    });

    if (questionCount < ques.length) {
        ques[questionCount].classList.remove("hidden");

        startTimer();

        checkAnswer(ques[questionCount]);
    } else {
        quiz.classList.add("hidden");
        next.classList.add("hidden");
        timer.innerText = "--";

        displayScore();
    }
};

let choosed, choosedAns;
const checkAnswer = (question) => {
    const options = question.querySelector(".options");
    choosed = false;

    options.addEventListener("click", selectOption);

    function selectOption(e) {
        choosed = true;
        choosedOption = e.target.innerText;

        if (choosedOption === questions[questionCount].answer) {
            choosedAns = true;
            finalScore += 5 * timeLeft;
            e.target.classList.add("right-answer");
        } else {
            choosedAns = false;
            finalScore -= timeLeft;
            e.target.classList.add("wrong-answer");
        }
        options.removeEventListener("click", selectOption);
    }

    choosedAns = "";
};

let timeLeft = 30;
let countdown;
function startTimer() {
    countdown = setInterval(() => {
        timer.innerText = timeLeft;
        timeLeft--;
        if (timeLeft == 0 || choosed) {
            clearInterval(countdown);
            timeLeft = 30;
        }
    }, 1000);
}

next.addEventListener("click", () => {
    displayQuiz(++questionCount);
});

const displayScore = () => {
    const scoreSheet = document.querySelector(".score");
    scoreSheet.classList.remove("hidden");

    const spanScore = document.getElementById("finalScore");
    spanScore.innerText = finalScore;

    const submitButton = document.querySelector("#submit");
    const form = document.querySelector("#details");

    submitButton.addEventListener("click", (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        let initial = formData.get("initial");
        leaderBoard.push(`{${initial}:${finalScore}}`);

        console.log(leaderBoard);
        scoreSheet.classList.add("hidden");
        startPage.classList.remove("hidden");

        const ul = document.querySelectorAll(".options");
        ul.forEach((que) => {
            const options = que.querySelectorAll("li");
            for (let option of options) {
                option.classList.remove("right-answer");
                option.classList.remove("wrong-answer");
            }
        });
        questionCount = 0;
    });
};

const leaderboard = document.querySelector(".leaderboard");
const highscores = document.querySelector(".highscores");
highscores.addEventListener("click", () => {
    if (quiz.classList.contains("hidden")) {
        startPage.classList.add("hidden");
        leaderboard.classList.remove("hidden");
        displayLeaderBoard();
    }

    let backButton = document.querySelector(".back");
    let resetButton = document.querySelector(".reset");

    backButton.addEventListener("click", () => {
        leaderboard.classList.add("hidden");
        startPage.classList.remove("hidden");
    });

    resetButton.addEventListener("click", () => {
        leaderBoard = [];
        displayLeaderBoard();
    });
});

function displayLeaderBoard() {
    let ul = document.createElement("ul");
    leaderBoard = leaderBoard.sort((p1, p2) =>
        p1.finalScore < p2.finalScore
            ? 1
            : p1.finalScore > p2.finalScore
            ? -1
            : 0
    );

    for (let rank of leaderBoard) {
        let li = document.createElement("li");
        li.innerText = rank;
        ul.append(li);
    }
    leaderboard.prepend(ul);
}
// let finalScore = 0;
// startQuiz.addEventListener("click", () => {
//     quiz.classList.remove("hidden");

//     let i = 0;
//     function next(i) {
//         question.innerText = questions[i].questionText;
//         for (let j = 0; j < questions[i].options.length; j++) {
//             const option = document.createElement("li");
//             option.innerText = questions[i].options[j];
//             options.append(option);

//     let start = setInterval(startTimer, 1000);

//     let timeLeft = 10;
//     let score = 0;
//     let interval;
//     function startTimer() {
//         if (timeLeft <= 0) {
//             stopTimer();
//         }
//         timer.innerText = timeLeft;
//         timeLeft--;
//         score = 10 - timeLeft;
//     }
//     function stopTimer() {
//         clearInterval(start);
//         next();
//     }
// }
//     }
// });
