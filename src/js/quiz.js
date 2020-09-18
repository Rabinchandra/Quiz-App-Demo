const quesAns = [
    {
        question: 'What is the capital of India?',
        options: [
            "Kolkata",
            "Gujarat",
            "Delhi",
            "Sikkim"
        ],
        answer: "Delhi"
    },
    {
        question: 'Who was the first Prime Minister of India?',
        options: [
            "Indira Gandhi",
            "Jawaharlal Nehru",
            "APJ Abdul Kalam",
            "Sonia Gandhi"
        ],
        answer: "Jawaharlal Nehru"
    },
    {
        question: 'Who won the Fifa World Cup 2010?',
        options: [
            "Spain",
            "Italy",
            "Argentina",
            "France"
        ],
        answer: "Spain"
    },
];

const slider = document.querySelector('.slider');

quesAns.forEach((qa, index) => {
    let controlHTML = ''

    // if first question
    if(index === 0) {
        controlHTML = '<div class="control nextQsn">Next <i class="fas fa-chevron-right"></i></div></div>';
    }
    // if last question
    else if(index === quesAns.length-1) {
        controlHTML = `
        <div class="control prevQsn"><i class="fas fa-chevron-left"></i> Prev</div>
        <div class="control" id="quizNext" onClick="onSubmitAns()">Submit <i class="fas fa-chevron-right"></i></div>
        `;
    }
    // if neither first nor last
    else {
        controlHTML = `
        <div class="control prevQsn"><i class="fas fa-chevron-left"></i> Prev</div>
        <div class="control nextQsn">Next <i class="fas fa-chevron-right"></i></div>
        `;
    }

    slider.innerHTML += `
        <div class="slide">
            <div class="question">Q.${index+1} ${qa.question}</div>
            <ul class="options">
                <li>A. ${qa.options[0]}</li>
                <li>B. ${qa.options[1]}</li>
                <li>C. ${qa.options[2]}</li>
                <li>D. ${qa.options[3]}</li>
            </ul>
            ${controlHTML}
        </div>
        `;

    
});


const nextQsn = document.querySelectorAll('.nextQsn');
const prevQsn = document.querySelectorAll('.prevQsn');
const translatePercent = 100/quesAns.length;
let slideIndex = 0;
let ans = [];

// Style slider
slider.style.width = quesAns.length * 100 + '%';

// Add event to each next qsn btn
nextQsn.forEach(nq => {
    nq.addEventListener('click', () => {
        slideIndex = slideIndex < quesAns.length-1? slideIndex + 1 : quesAns.length-1;
        slider.style.transform = 'translate(-' + slideIndex * translatePercent + '%)';
    });
})

// Add event to each prev qsn btn
prevQsn.forEach(nq => {
    nq.addEventListener('click', () => {
        slideIndex = slideIndex > 0? slideIndex - 1 : 0;
        slider.style.transform = 'translate(-' + slideIndex * translatePercent + '%)';
    });
});

// Add event to li options
document.querySelectorAll('.slide ul').forEach(ul => {
    ul.addEventListener('click', (e) => {
        // if it is li
        if(e.target.parentElement.className === 'options') {
            const li = e.target;

            ans[slideIndex] = li.innerText;

            // Removing class of selected ans from the previous selected option
            if(ul.querySelector('.selected-ans')) {
                ul.querySelector('.selected-ans').classList.remove('selected-ans');
            }
            // Adding class of selected ans to the newly selected option
            li.classList.add('selected-ans');
        }
    });
})

// onSubmit ans
const onSubmitAns = () => {
    const result = document.querySelector('#result');
    let points = 0, wrongAns = [];

    // Checking each answers
    for(let i = 0; i < quesAns.length; i++) {
        // if correct
        if (ans[i].indexOf(quesAns[i].answer) !== -1) {
            points = points + 1;
        } else {
            wrongAns.push({ 
                question: quesAns[i].question,
                correctAns: quesAns[i].answer,
                userAns: ans[i]
            });
        }
    }

    result.innerHTML = `
        <div id="progress-bar-container">
        </div>
        <div>
            Correct Answers: ${quesAns.length - wrongAns.length}
            Wrong Answer: ${wrongAns.length}
        </div>
    `;

    showProgressBar('#progress-bar-container', 0.7);
}