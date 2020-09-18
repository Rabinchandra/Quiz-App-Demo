const homeNext = document.querySelector('#homeNext');
const quizNext = document.querySelector('#quizNext');

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
quizNext.addEventListener('click', () => nextElement('result', 'quiz'));
