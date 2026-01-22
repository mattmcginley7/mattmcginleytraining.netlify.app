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

    var habitTracker = document.querySelector('.habit-card');
    if (habitTracker) {
        var habitCheckboxes = habitTracker.querySelectorAll('input[type="checkbox"][data-habit]');
        var habitBar = habitTracker.querySelector('.habit-progress__bar');
        var habitLabel = habitTracker.querySelector('.habit-progress__label');
        var habitProgress = habitTracker.querySelector('.habit-progress');
        var habitReset = habitTracker.querySelector('.habit-reset');
        var habitStorageKey = 'habitTrackerState';
        var habitState = {};

        try {
            habitState = JSON.parse(localStorage.getItem(habitStorageKey)) || {};
        } catch (error) {
            habitState = {};
        }

        var updateHabitProgress = function () {
            var total = habitCheckboxes.length;
            var completed = 0;

            habitCheckboxes.forEach(function (checkbox) {
                if (checkbox.checked) {
                    completed += 1;
                }
            });

            var percent = total ? Math.round((completed / total) * 100) : 0;
            if (habitBar) {
                habitBar.style.width = percent + '%';
            }
            if (habitLabel) {
                habitLabel.textContent = completed + ' of ' + total + ' complete';
            }
            if (habitProgress) {
                habitProgress.setAttribute('aria-valuenow', String(percent));
            }
        };

        habitCheckboxes.forEach(function (checkbox) {
            var habitKey = checkbox.getAttribute('data-habit');
            if (habitKey && habitState[habitKey]) {
                checkbox.checked = true;
            }

            checkbox.addEventListener('change', function () {
                var key = checkbox.getAttribute('data-habit');
                if (key) {
                    habitState[key] = checkbox.checked;
                    localStorage.setItem(habitStorageKey, JSON.stringify(habitState));
                }
                updateHabitProgress();
            });
        });

        if (habitReset) {
            habitReset.addEventListener('click', function () {
                habitState = {};
                habitCheckboxes.forEach(function (checkbox) {
                    checkbox.checked = false;
                });
                localStorage.setItem(habitStorageKey, JSON.stringify(habitState));
                updateHabitProgress();
            });
        }

        updateHabitProgress();
    }
});
