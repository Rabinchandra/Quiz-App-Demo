// Progress bar
function showProgressBar(container, percent) {
    const ProgressBar = require('progressbar.js');
    const bar = new ProgressBar.Circle(container, {
        strokeWidth: 6,
        trailColor: '#4caf50',
        trailWidth: 4,
        easing: 'easeInOut',
        duration: 1400
    });

    bar.animate(percent);

    console.log('Progress bar...');
}