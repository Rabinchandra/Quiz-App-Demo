const onElement = (id) => {
    // Get the element with id of id
    const element = document.querySelector(`#${id}`);

    // Changing the style of 'element'
    element.style.display = 'block';
    element.style.opacity = '0';

    setTimeout(() => {
        element.style.transitionDuration = '1s';
        element.style.opacity = '1';
    })
}

const offElement = (id) => {
    // Get the element with id of 'id'
    const element = document.querySelector(`#${id}`);

    // Changing the style of element
    element.style.transitionDuration = '1s';
    element.style.opacity = '0';
    setTimeout(() => {
        element.style.display = 'none';
    }, 1000);
}


// App
const homeNext = document.querySelector('#homeNext');

// Function to go to next element
// Next id = next element id
// old id = former element id
const nextElement = (nextId, oldId) => {
    const loading = document.querySelector('#loading');

    // Displaying of the old elment with id of oldId
    offElement(oldId)

    // Loading animation
    setTimeout(() => {
        // Displaying on loading
        if (nextId === 'result') {
            loading.innerHTML = 'Loading Your Result...'
        } else {
            loading.innerHTML = "Loading...";
        }
        
        // 
        setTimeout(() => {
            onElement('loading');
        })
    }, 1200);

    // Displaying off loading element
    setTimeout(() => {
        offElement('loading');
    }, 5000)

    // Display on the element with id of nextId
    setTimeout(() => {
        onElement(nextId);
    }, 6500);
}

// Event Listeners
homeNext.addEventListener('click', () => nextElement('quiz', 'home'));

// Progress
// Progress bar
function showProgressBar(container, percent) {
    const ProgressBar = require('progressbar.js');
    const bar = new ProgressBar.Circle(container, {
        strokeWidth: 8,
        color: '#4caf50',
        trailColor: '#ccc',
        trailWidth: 8,
        easing: 'easeInOut',
        duration: 1600
    });

    bar.animate(percent);

    console.log('Progress bar...');
}

// Quiz
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
let ans = [];

// onSubmit ans
const onSubmitAns = () => {
    const result = document.querySelector('#result');
    let points = 0, wrongAns = [];
    
    // Checking each answers
    for(let i = 0; i < quesAns.length; i++) {
        // if left without choosing an option of a question
        try {
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
        } catch(err) {
            return;
        }
    }


    // Go to Next Element
    nextElement('result', 'quiz')

    const correctAns = quesAns.length - wrongAns.length
    const accuratePC = (correctAns/quesAns.length).toFixed(2);

    result.innerHTML = `
        Accuracy Level
        <div class="progress-wrapper">
            <div class="accurate-percent">
                ${accuratePC*100}%
            </div>
            <div id="progress-bar-container"></div>
        </div>

        <div class="correct-ans">Correct Ans: ${correctAns}</div>
        <div class="wrong-ans">Wrong Ans: ${wrongAns.length}</div>
    `;

    setTimeout(() => {
        showProgressBar('#progress-bar-container', accuratePC);
    }, 6000);
}

quesAns.forEach((qa, index) => {
    let controlHTML = '';

    // if first question
    if(index === 0) {
        controlHTML = '<div class="control nextQsn">Next <i class="fas fa-chevron-right"></i></div></div>';
    }
    // if last question
    else if(index === quesAns.length-1) {
        controlHTML = `
        <div class="control prevQsn"><i class="fas fa-chevron-left"></i> Prev</div>
        <div class="control" id="quizNext">Submit <i class="fas fa-chevron-right"></i></div>
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

    // Add onSubmitAns event listener to Submit Btn
    if(index === quesAns.length-1) {
        document.querySelector('#quizNext').addEventListener('click', () => {
            onSubmitAns();
        })
    }
});


const nextQsn = document.querySelectorAll('.nextQsn');
const prevQsn = document.querySelectorAll('.prevQsn');
const translatePercent = 100/quesAns.length;
let slideIndex = 0;

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


