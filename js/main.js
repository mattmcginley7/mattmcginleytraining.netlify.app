function validateForm() {
    var name = document.forms["contactForm"]["name"].value;
    var email = document.forms["contactForm"]["email"].value;
    var message = document.forms["contactForm"]["message"].value;
    if (name === "" || email === "" || message === "") {
        alert("All fields are required");
        return false;
    }
    return true;
}

function smolovNumbers() {
    var smolovJr = document.querySelector('#smolovInput').value;
    var smolovJr70 = smolovJr * (7 / 10);
    var smolovJr75 = smolovJr * (75 / 100);
    var smolovJr80 = smolovJr * (80 / 100);
    var smolovJr85 = smolovJr * (85 / 100);
    document.querySelector('#week1Day1').innerHTML = Math.floor(smolovJr70) + ' 6 sets of 6 reps';
    document.querySelector('#week1Day2').innerHTML = Math.floor(smolovJr75) + ' 7 sets of 5 reps';
    document.querySelector('#week2Day1').innerHTML = Math.floor(smolovJr80) + ' 8 sets of 4 reps';
    document.querySelector('#week2Day2').innerHTML = Math.floor(smolovJr85) + ' 10 sets of 3 reps';
    document.querySelector('#week3Day1').innerHTML = Math.floor(smolovJr70 + 10) + ' 6 sets of 6 reps';
    document.querySelector('#week3Day2').innerHTML = Math.floor(smolovJr75 + 10) + ' 7 sets of 5 reps';
    document.querySelector('#week4Day1').innerHTML = Math.floor(smolovJr80 + 10) + ' 8 sets of 4 reps';
    document.querySelector('#week4Day2').innerHTML = Math.floor(smolovJr85 + 10) + ' 10 sets of 3 reps';
    document.querySelector('#week5Day1').innerHTML = Math.floor(smolovJr70 + 20) + ' 6 sets of 6 reps';
    document.querySelector('#week5Day2').innerHTML = Math.floor(smolovJr75 + 20) + ' 7 sets of 5 reps';
    document.querySelector('#week6Day1').innerHTML = Math.floor(smolovJr80 + 20) + ' 8 sets of 4 reps';
    document.querySelector('#week6Day2').innerHTML = Math.floor(smolovJr85 + 20) + ' 10 sets of 3 reps';
}

function mattBenchPress() {
    var maxBenchPress = document.querySelector('#maxBenchInput').value;
    var maxBenchPress90 = maxBenchPress * (90 / 100);
    var maxBenchPress80 = maxBenchPress * (80 / 100);
    var maxBenchPress75 = maxBenchPress * (75 / 100);
    var maxBenchPress70 = maxBenchPress * (70 / 100);
    document.querySelector('#mattWeek1Day1').innerHTML = Math.floor(maxBenchPress75) + ' 5x5';
    document.querySelector('#mattWeek1Day2').innerHTML = Math.floor(maxBenchPress90) + ' 5x1 ' + Math.floor(maxBenchPress80) + ' 3x3 ' + Math.floor(maxBenchPress70) + ' 3x7';
    document.querySelector('#mattWeek2Day1').innerHTML = Math.floor(maxBenchPress75 + 5) + ' 5x5';
    document.querySelector('#mattWeek2Day2').innerHTML = Math.floor(maxBenchPress90 + 5) + ' 5x1 ' + Math.floor(maxBenchPress80 + 5) + ' 3x3 ' + Math.floor(maxBenchPress70 + 5) + ' 3x7';
    document.querySelector('#mattWeek3Day1').innerHTML = Math.floor(maxBenchPress75 + 10) + ' 5x5';
    document.querySelector('#mattWeek3Day2').innerHTML = Math.floor(maxBenchPress90 + 10) + ' 5x1 ' + Math.floor(maxBenchPress80 + 10) + ' 3x3 ' + Math.floor(maxBenchPress70 + 10) + ' 3x7';
    document.querySelector('#mattWeek4Day1').innerHTML = Math.floor(maxBenchPress75 + 15) + ' 5x5';
    document.querySelector('#mattWeek4Day2').innerHTML = Math.floor(maxBenchPress90 + 15) + ' 5x1 ' + Math.floor(maxBenchPress80 + 15) + ' 3x3 ' + Math.floor(maxBenchPress70 + 15) + ' 3x7';
    document.querySelector('#mattWeek5Day1').innerHTML = Math.floor(maxBenchPress75 + 20) + ' 5x5 ';
    document.querySelector('#mattWeek5Day2').innerHTML = Math.floor(maxBenchPress90 + 20) + ' 5x1 ' + Math.floor(maxBenchPress80 + 20) + ' 3x3 ' + Math.floor(maxBenchPress70 + 20) + ' 3x7';
    document.querySelector('#mattWeek6Day1').innerHTML = Math.floor(maxBenchPress75 + 25) + ' 5x5';
    document.querySelector('#mattWeek6Day2').innerHTML = Math.floor(maxBenchPress90 + 25) + ' 5x1 ' + Math.floor(maxBenchPress80 + 25) + ' 3x3 ' + Math.floor(maxBenchPress70 + 25) + ' 3x7';
}

function edCoanRoutine() {
    var edCoanMax = document.querySelector('#edCoanInput').value;
    var edCoan60 = edCoanMax * (60 / 100);
    var edCoan65 = edCoanMax * (65 / 100);
    var edCoan70 = edCoanMax * (70 / 100);
    var edCoan75 = edCoanMax * (75 / 100);
    var edCoan80 = edCoanMax * (80 / 100);
    var edCoan85 = edCoanMax * (85 / 100);
    var edCoan90 = edCoanMax * (90 / 100);
    var edCoan95 = edCoanMax * (95 / 100);
    var edCoan105 = edCoanMax * (105 / 100);

    document.querySelector('#deadOne').innerHTML = 'Deadlift: 1x2 ' + Math.floor(edCoan75);
    document.querySelector('#speedOne').innerHTML = 'Speed Deadlift: 8x3 ' + Math.floor(edCoan60) + ' (90 seconds rest between sets)';
    document.querySelector('#deadTwo').innerHTML = 'Deadlift: 1x2 ' + Math.floor(edCoan80);
    document.querySelector('#speedTwo').innerHTML = 'Speed Deadlift: 8x3 ' + Math.floor(edCoan65) + ' (90 seconds rest between sets)';
    document.querySelector('#deadThree').innerHTML = 'Deadlift: 1x2 ' + Math.floor(edCoan85);
    document.querySelector('#speedThree').innerHTML = 'Speed Deadlift: 6x3 ' + Math.floor(edCoan70) + ' (90-120 seconds rest between sets)';
    document.querySelector('#deadFour').innerHTML = 'Deadlift: 1x2 ' + Math.floor(edCoan90);
    document.querySelector('#speedFour').innerHTML = 'Speed Deadlift: 5x3 ' + Math.floor(edCoan75) + ' (90-120 seconds rest between sets)';
    document.querySelector('#deadFive').innerHTML = 'Deadlift: 3x3 ' + Math.floor(edCoan80);
    document.querySelector('#speedFive').innerHTML = 'Speed Deadlift: 3x3 ' + Math.floor(edCoan65) + ' (120 seconds rest between sets)';
    document.querySelector('#deadSix').innerHTML = 'Deadlift: 1x2 ' + Math.floor(edCoan85);
    document.querySelector('#speedSix').innerHTML = 'Speed Deadlift: 3x3 ' + Math.floor(edCoan70) + ' (120 seconds rest between sets)';
    document.querySelector('#deadSeven').innerHTML = 'Deadlift: 1x2 ' + Math.floor(edCoan90);
    document.querySelector('#speedSeven').innerHTML = 'Speed Deadlift: 3x3 ' + Math.floor(edCoan75) + ' (120 seconds rest between sets)';
    document.querySelector('#deadEight').innerHTML = 'Deadlift: 1x2 ' + Math.floor(edCoan95);
    document.querySelector('#speedEight').innerHTML = 'Speed Deadlift: 3x3 ' + Math.floor(edCoan70) + ' (120 seconds rest between sets)';
    document.querySelector('#deadNine').innerHTML = 'Deadlift: 1x1 ' + Math.floor(edCoanMax);
    document.querySelector('#speedNine').innerHTML = 'Speed Deadlift: 2x3 ' + Math.floor(edCoan70) + ' (3 minutes rest between sets)';
    document.querySelector('#deadTen').innerHTML = 'Deadlift: 1x1 ' + Math.floor(edCoan105);
    document.querySelector('#speedTen').innerHTML = 'Speed Deadlift: 2x3 ' + Math.floor(edCoan60) + ' (3 minutes rest between sets)';
}

function calculateFFMI() {
    var weight = parseFloat(document.querySelector('#ffmiWeight').value);
    var bodyFat = parseFloat(document.querySelector('#ffmiBodyfat').value);
    var height = parseFloat(document.querySelector('#ffmiHeight').value);

    if (isNaN(weight) || isNaN(bodyFat) || isNaN(height)) {
        document.querySelector('#ffmiResult').innerHTML = 'Please enter valid numbers';
        return;
    }

    var weightKg = weight / 2.20462;
    var heightM = height * 0.0254;
    var ffm = weightKg * (1 - bodyFat / 100);
    var ffmi = ffm / (heightM * heightM);
    ffmi = ffmi.toFixed(1);

    var category = '';
    if (ffmi < 17) {
        category = 'below average';
    } else if (ffmi < 19) {
        category = 'average';
    } else if (ffmi < 21) {
        category = 'above average';
    } else if (ffmi < 23) {
        category = 'excellent';
    } else {
        category = 'elite';
    }

    document.querySelector('#ffmiResult').innerHTML = 'Your FFMI is ' + ffmi + '. This is considered ' + category + ' relative to the general population.';
}


function calculateLeanBulk() {
    var bodyweight = parseFloat(document.querySelector('#leanBulkBodyweight').value);
    var maintenance = parseFloat(document.querySelector('#leanBulkMaintenance').value);
    var result = document.querySelector('#leanBulkResult');

    if (!result) {
        return;
    }

    if (isNaN(bodyweight) || isNaN(maintenance) || bodyweight <= 0 || maintenance <= 0) {
        result.innerHTML = 'Please enter valid body weight and maintenance calories.';
        return;
    }

    var lowCalories = Math.round(maintenance * 1.05);
    var highCalories = Math.round(maintenance * 1.10);
    var lowMonthlyGain = (bodyweight * 0.005).toFixed(2);
    var highMonthlyGain = (bodyweight * 0.01).toFixed(2);

    result.innerHTML = 'Lean bulk calories: <strong>' + lowCalories + '-' + highCalories + '</strong> per day. '
        + 'Target monthly gain: <strong>' + lowMonthlyGain + '-' + highMonthlyGain + ' lbs</strong>. '
        + 'If your 2-3 week trend is flat, add 100-150 calories per day.';
}

function calculateBMI() {
    var weight = parseFloat(document.querySelector('#bmiWeight').value);
    var height = parseFloat(document.querySelector('#bmiHeight').value);

    if (isNaN(weight) || isNaN(height)) {
        document.querySelector('#bmiResult').innerHTML = 'Please enter valid numbers';
        return;
    }

    var bmi = (weight / (height * height)) * 703;
    bmi = bmi.toFixed(1);

    var category = '';
    if (bmi < 18.5) {
        category = 'underweight';
    } else if (bmi < 25) {
        category = 'normal weight';
    } else if (bmi < 30) {
        category = 'overweight';
    } else {
        category = 'obesity';
    }

    document.querySelector('#bmiResult').innerHTML = 'Your BMI is ' + bmi + '. This is considered ' + category + '.';
}

document.addEventListener('DOMContentLoaded', function () {
    var smolovButton = document.querySelector('#smolovCalculator');
    if (smolovButton) {
        smolovButton.addEventListener('click', smolovNumbers);
    }

    var mattButton = document.querySelector('#mattButton');
    if (mattButton) {
        mattButton.addEventListener('click', mattBenchPress);
    }

    var edCoanButton = document.querySelector('#edCoanButton');
    if (edCoanButton) {
        edCoanButton.addEventListener('click', edCoanRoutine);
    }

    var ffmiButton = document.querySelector('#ffmiButton');
    if (ffmiButton) {
        ffmiButton.addEventListener('click', calculateFFMI);
    }

    var bmiButton = document.querySelector('#bmiButton');
    if (bmiButton) {
        bmiButton.addEventListener('click', calculateBMI);
    }

    var leanBulkButton = document.querySelector('#leanBulkButton');
    if (leanBulkButton) {
        leanBulkButton.addEventListener('click', calculateLeanBulk);
    }


    var goalConfig = {
        'fat-loss': {
            title: 'Start with consistent training + a manageable calorie deficit',
            summary: 'We’ll build 3-4 training sessions around your week, tighten up nutrition without crash dieting, and track the habits that make fat loss stick.',
            bullets: [
                'Strength train 3-4 days per week',
                'Use simple calorie and protein targets',
                'Check progress weekly and adjust fast'
            ],
            primaryHref: 'begin.html',
            primaryLabel: 'Book your consult',
            secondaryHref: 'nutrition-calculator.html',
            secondaryLabel: 'Estimate your nutrition targets'
        },
        muscle: {
            title: 'Prioritize progressive overload + enough food to recover',
            summary: 'Your plan should focus on key lifts, recovery, and a small calorie surplus so you can add muscle without spinning your wheels.',
            bullets: [
                'Train hard around big compound lifts',
                'Aim for a lean-bulk calorie range',
                'Track performance so weights keep climbing'
            ],
            primaryHref: 'services.html#pricing',
            primaryLabel: 'See coaching packages',
            secondaryHref: 'calculators.html',
            secondaryLabel: 'Use the training calculators'
        },
        'pain-free': {
            title: 'Rebuild confidence with smart exercise selection and recovery',
            summary: 'We’ll organize training around movements your body tolerates well, strengthen weak links, and progress in a way that protects your joints.',
            bullets: [
                'Identify pain-free movement patterns first',
                'Build strength with controlled progressions',
                'Use weekly feedback to prevent flare-ups'
            ],
            primaryHref: 'begin.html',
            primaryLabel: 'Share your goals with Matt',
            secondaryHref: 'about.html',
            secondaryLabel: 'Read Matt’s story'
        }
    };

    var goalButtons = document.querySelectorAll('.goal-pill');
    var goalPanel = document.querySelector('.goal-recommendation');
    var goalTitle = document.querySelector('.goal-recommendation__title');
    var goalSummary = document.querySelector('.goal-recommendation__summary');
    var goalList = document.querySelector('.goal-recommendation__list');
    var goalPrimaryLink = document.querySelector('#goalPrimaryLink');
    var goalSecondaryLink = document.querySelector('#goalSecondaryLink');

    var renderGoalRecommendation = function (goalKey) {
        var config = goalConfig[goalKey];
        if (!config || !goalPanel || !goalTitle || !goalSummary || !goalList || !goalPrimaryLink || !goalSecondaryLink) {
            return;
        }

        goalButtons.forEach(function (button) {
            var isActive = button.getAttribute('data-goal') === goalKey;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        goalTitle.textContent = config.title;
        goalSummary.textContent = config.summary;
        goalList.innerHTML = '';
        config.bullets.forEach(function (bullet) {
            var item = document.createElement('li');
            item.textContent = bullet;
            goalList.appendChild(item);
        });
        goalPrimaryLink.href = config.primaryHref;
        goalPrimaryLink.textContent = config.primaryLabel;
        goalSecondaryLink.href = config.secondaryHref;
        goalSecondaryLink.textContent = config.secondaryLabel;
        goalPanel.setAttribute('data-active-goal', goalKey);
    };

    if (goalButtons.length && goalPanel) {
        goalButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                renderGoalRecommendation(button.getAttribute('data-goal'));
            });
        });

        renderGoalRecommendation('fat-loss');
    }

    var articleNav = document.querySelector('.article-nav');
    var articleList = document.querySelector('.article-nav__list');
    var articleToggle = document.querySelector('.article-nav__toggle');
    var articlePanel = document.querySelector('.article-nav__panel');
    var articles = document.querySelectorAll('.article-section article');

    if (articleNav && articleList && articles.length) {
        articleList.innerHTML = '';

        articles.forEach(function (article, index) {
            var heading = article.querySelector('h2');
            var targetId = article.getAttribute('id');
            if (!heading || !targetId) {
                return;
            }

            var listItem = document.createElement('li');
            var link = document.createElement('a');
            link.href = '#' + targetId;
            link.textContent = (index + 1) + '. ' + heading.textContent.trim();
            link.addEventListener('click', function (event) {
                event.preventDefault();
                var target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    if (history.pushState) {
                        history.pushState(null, '', '#' + targetId);
                    } else {
                        window.location.hash = targetId;
                    }
                }
            });

            listItem.appendChild(link);
            articleList.appendChild(listItem);
        });

        if (!articleList.children.length) {
            articleList.innerHTML = '<li class="article-nav__empty">No articles found.</li>';
        }

        var setPanelState = function (isOpen) {
            articleNav.classList.toggle('article-nav--open', isOpen);
            articleNav.classList.toggle('article-nav--closed', !isOpen);
            if (articlePanel) {
                articlePanel.hidden = !isOpen;
            }
            if (articleToggle) {
                articleToggle.setAttribute('aria-expanded', isOpen);
            }
        };

        if (articleToggle && articlePanel) {
            articleToggle.addEventListener('click', function () {
                var isOpen = articlePanel.hidden;
                setPanelState(isOpen);
            });
        }

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && articleNav.classList.contains('article-nav--open')) {
                setPanelState(false);
            }
        });
    }
});
