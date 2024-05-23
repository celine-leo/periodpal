//fetch API call to load navbar
document.addEventListener('DOMContentLoaded', function() {
    fetch('/views/partials/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        })
        .catch(error => console.error('Error loading navbar:', error));
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('/views/partials/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading navbar:', error));
});

// Set the max attribute of the lastPeriodDate input to today's date
window.addEventListener('DOMContentLoaded', (event) => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('lastPeriodDate').setAttribute('max', today);
});


//Period calculator FROM HERE ------------------------------------//

// Event listener to the form and executes a function upon the submit event.
document.getElementById('periodForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents default form submission behaviour of reloading page.

    const lastPeriodDate = new Date(document.getElementById('lastPeriodDate').value); // Retrieve value from Input 1 - Last Period date
    const periodLength = parseInt(document.getElementById('periodLength').value); // Retrieve value from Input 2 - Period length
    const cycleLength = parseInt(document.getElementById('cycleLength').value); // Retrieve value from Input 3 - Cycle Length

    // Checks invalid inputs (i.e., empty or non-numeric) and displays error message if so.
    if (isNaN(lastPeriodDate) || isNaN(periodLength) || isNaN(cycleLength)) {
        document.getElementById('result').textContent = 'Please enter valid inputs.';
        return;
    }

    // Calculates the date of the next period based on the input values.
    const nextPeriodDate = new Date(lastPeriodDate);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);

    // Calculates the number of days since the last period.
    const today = new Date();
    const daysSinceLastPeriod = Math.floor((today - lastPeriodDate) / (1000 * 60 * 60 * 24));
    let phase = '';

    // Determines the current phase of the menstrual cycle based on the number of days since the last period.
    if (daysSinceLastPeriod < periodLength) {
        phase = 'Menstrual';
    } else if (daysSinceLastPeriod < periodLength + 7) {
        phase = 'Follicular';
    } else if (daysSinceLastPeriod < cycleLength - 7) {
        phase = 'Ovulation';
    } else {
        phase = 'Luteal';
    }

    //RESULTS FROM HERE ------------------------------------//

    // Formatting of results (i.e. next period date and current phase).
    if (nextPeriodDate && phase) {
        // Update main results container
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const resultHtml = `
        <div class="result">
            <p>Your next period is expected to start on <span id="nextPeriodDate">${nextPeriodDate.toLocaleDateString(undefined, options)}</span>.</p>
            <p>Current cycle phase: <span id="cyclePhase">${phase}</span></p>
        </div>
        `;
        document.getElementById('resultContainer').innerHTML = resultHtml;

        // Determine recommendation based on the phase
        let recommendation = '';
        switch (phase) {
            case 'Menstrual':
                recommendation = 'It is recommended to rest and stay hydrated during your menstrual phase.';
                break;
            case 'Follicular':
                recommendation = 'You may engage in moderate exercise and focus on a balanced diet during your follicular phase.';
                break;
            case 'Ovulation':
                recommendation = 'Your fertility is high during ovulation. If you are trying to conceive, this is an optimal time for intercourse.';
                break;
            case 'Luteal':
                recommendation = 'During the luteal phase, prioritize self-care and manage stress levels. Consider relaxation techniques such as meditation or yoga.';
                break;
            default:
                recommendation = 'No specific recommendation.';
        }

        // Update recommendation container
        const recommendationHtml = `
        <div class="recommendation">
            <p><span>Recommendation:</span><br/> ${recommendation}</p>
        </div>
        `;
        document.getElementById('recommendationContainer').innerHTML = recommendationHtml;

        // Show result and recommendation containers
        document.getElementById('resultContainer').classList.remove('hidden');document.getElementById('resultContainer').classList.add('container');
        document.getElementById('recommendationContainer').classList.remove('hidden');
        document.getElementById('recommendationContainer').classList.add('container');
    } else {
        // Hide result and recommendation containers if there is no result
        document.getElementById('resultContainer').classList.add('hidden');
        document.getElementById('recommendationContainer').classList.add('hidden');
    }
});

// Recommendation section buttons //
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}