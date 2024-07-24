let resetButton = document.getElementsByClassName('reset-button')[0];
resetButton.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

let days = localStorage.getItem('days');
if (!days || days === 'null') {
    days = prompt('Enter the number of days to track:');
    localStorage.setItem('days', days);
}
days = parseInt(days);

const container = document.getElementById('container');
const buttonsPerPage = 28; // 7 columns * 4 rows

function getButtonState(day) {
    return localStorage.getItem(`day_${day}`) || 'unset';
}

function setButtonState(day, state) {
    localStorage.setItem(`day_${day}`, state);
}

for (let i = 0; i < Math.ceil(days / buttonsPerPage); i++) {
    const page = document.createElement('div');
    page.className = 'page';
    container.appendChild(page);

    for (let j = 1; j <= buttonsPerPage && (i * buttonsPerPage + j) <= days; j++) {
        const dayNumber = i * buttonsPerPage + j;
        const button = document.createElement('button');
        button.className = 'day-toggle unset';
        button.classList.add('pushable');
        const shadow = document.createElement('span');
        shadow.classList.add('shadow');
        button.appendChild(shadow);
        const edge = document.createElement('span');
        edge.classList.add('edge');
        button.appendChild(edge);
        const front = document.createElement('span');
        front.classList.add('front');
        front.innerHTML = `Day ${dayNumber}`;
        button.appendChild(front);
        
        const savedState = getButtonState(dayNumber);
        button.classList.add(savedState);

        button.addEventListener('click', () => {
            if (button.classList.contains('unset')) {
                button.classList.remove('unset');
                button.classList.add('done');
                setButtonState(dayNumber, 'done');
            } else if (button.classList.contains('done')) {
                button.classList.remove('done');
                button.classList.add('failed');
                setButtonState(dayNumber, 'failed');
            } else {
                button.classList.remove('failed');
                button.classList.add('unset');
                setButtonState(dayNumber, 'unset');
            }
        });
        page.appendChild(button);
    }
}