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
