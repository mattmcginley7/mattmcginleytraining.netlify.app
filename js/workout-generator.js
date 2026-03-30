(function () {
    var form = document.getElementById('workoutGeneratorForm');
    if (!form) {
        return;
    }

    var resultsSection = document.getElementById('workoutResults');
    var heroTarget = document.getElementById('programHero');
    var summaryTarget = document.getElementById('programSummary');
    var progressionTarget = document.getElementById('progressionTableWrap');
    var weeksTarget = document.getElementById('programWeeks');
    var substitutionsTarget = document.getElementById('substitutionNotes');
    var errorTarget = document.getElementById('workoutFormError');

    var weekPresets = {
        strength: [
            { pct: 0.7, sets: 4, reps: 6, note: 'Linear progression start' },
            { pct: 0.72, sets: 4, reps: 6, note: 'Add load with clean reps' },
            { pct: 0.74, sets: 4, reps: 5, note: 'Steady progression' },
            { pct: 0.76, sets: 5, reps: 4, note: 'Progressive overload' },
            { pct: 0.78, sets: 5, reps: 4, note: 'Heavy, controlled reps' },
            { pct: 0.8, sets: 5, reps: 3, note: 'Top week' }
        ],
        hypertrophy: [
            { pct: 0.7, sets: 4, reps: 8, note: 'Linear progression start' },
            { pct: 0.72, sets: 4, reps: 8, note: 'Add load with control' },
            { pct: 0.74, sets: 4, reps: 7, note: 'Steady progression' },
            { pct: 0.76, sets: 4, reps: 7, note: 'Progressive overload' },
            { pct: 0.78, sets: 4, reps: 6, note: 'Heavier hypertrophy work' },
            { pct: 0.8, sets: 4, reps: 6, note: 'Strongest week' }
        ],
        recomposition: [
            { pct: 0.7, sets: 3, reps: 6, note: 'Linear progression start' },
            { pct: 0.72, sets: 3, reps: 6, note: 'Small progression' },
            { pct: 0.74, sets: 4, reps: 5, note: 'Steady progression' },
            { pct: 0.76, sets: 4, reps: 5, note: 'Progressive overload' },
            { pct: 0.78, sets: 4, reps: 4, note: 'Heavy and efficient' },
            { pct: 0.8, sets: 4, reps: 4, note: 'Peak week with clean reps' }
        ]
    };

    var splitByFrequency = {
        '2': ['Full Body A', 'Full Body B'],
        '3': ['Full Body A', 'Full Body B', 'Full Body C'],
        '4': ['Upper 1', 'Lower 1', 'Upper 2', 'Lower 2'],
        '5': ['Push', 'Pull', 'Legs', 'Upper', 'Lower']
    };

    function roundToNearest5(value) {
        return Math.round(value / 5) * 5;
    }

    function estimate1RM(weight, reps) {
        return weight * (1 + reps / 30);
    }

    function getLiftMax(input, weight, reps) {
        var direct = parseFloat(input);
        if (!isNaN(direct) && direct > 0) {
            return direct;
        }
        var estWeight = parseFloat(weight);
        var estReps = parseFloat(reps);
        if (!isNaN(estWeight) && !isNaN(estReps) && estWeight > 0 && estReps > 0) {
            return estimate1RM(estWeight, estReps);
        }
        return null;
    }

    function getGoalProfile(goal) {
        if (goal === 'Get stronger') {
            return { type: 'strength', accessoryRepRange: '6-10', blurb: 'Lower-rep compound focus with supportive accessory work.' };
        }
        if (goal === 'Build muscle' || goal === 'Powerbuilding') {
            return { type: goal === 'Build muscle' ? 'hypertrophy' : 'strength', accessoryRepRange: goal === 'Build muscle' ? '8-15' : '8-12', blurb: 'Heavy compounds plus hypertrophy-focused accessories.' };
        }
        return { type: 'recomposition', accessoryRepRange: '8-12', blurb: 'Efficient sessions to keep strength and muscle while cutting fat.' };
    }

    function exercisesByDay(splitName, equipment) {
        var templates = {
            'Full Body A': ['Barbell squat', 'Flat barbell bench press', 'Chin-up', 'Barbell row', 'Abs'],
            'Full Body B': ['Deadlift', 'Overhead press', 'Chin-up', 'Split squat', 'Abs'],
            'Full Body C': ['Barbell squat', 'Flat barbell bench press', 'Deadlift (light technique)', 'Barbell row', 'Abs'],
            'Upper 1': ['Flat barbell bench press', 'Chin-up', 'Barbell row', 'Overhead press', 'Abs'],
            'Lower 1': ['Barbell squat', 'Deadlift', 'Walking lunge', 'Leg curl', 'Abs'],
            'Upper 2': ['Flat barbell bench press', 'Chin-up', 'Barbell row', 'Close-grip bench press', 'Abs'],
            'Lower 2': ['Deadlift', 'Barbell squat', 'Romanian deadlift', 'Step-up', 'Abs'],
            Push: ['Flat barbell bench press', 'Overhead press', 'Close-grip bench press', 'Dips', 'Abs'],
            Pull: ['Deadlift', 'Chin-up', 'Barbell row', 'Rear delt raise', 'Abs'],
            Legs: ['Barbell squat', 'Deadlift', 'Romanian deadlift', 'Split squat', 'Abs'],
            Upper: ['Flat barbell bench press', 'Chin-up', 'Barbell row', 'Overhead press', 'Abs'],
            Lower: ['Deadlift', 'Barbell squat', 'Split squat', 'Hamstring curl', 'Abs']
        };

        var available = templates[splitName] ? templates[splitName].slice() : [];
        if (equipment === 'Home gym') {
            return available.map(function (item) {
                return item.replace('Machine', 'Dumbbell').replace('cable', 'band/cable');
            });
        }
        if (equipment === 'Basic gym') {
            return available.map(function (item) {
                return item.replace('Weighted pull variation', 'Pull-up / assisted pull-up');
            });
        }
        return available;
    }

    function getCoreExercises(experience) {
        if (experience === 'Beginner') {
            return ['Crunches', 'Fifer scissors'];
        }
        return ['Ab wheel rollout', 'Fifer scissors'];
    }

    function getSubstitutions(avoidLift, jointLimitation) {
        var substitutions = [];
        var liftMap = {
            'Back squat': 'Using front squat, hack squat, leg press, or goblet squat options.',
            'Barbell bench press': 'Using dumbbell bench, machine press, and incline dumbbell press options.',
            'Conventional deadlift': 'Using Romanian deadlift, trap bar deadlift, and machine hinge variations.',
            'Overhead press': 'Using dumbbell/machine shoulder press and lateral raise-focused work.'
        };
        var jointMap = {
            'Shoulder discomfort': 'Reduced deep pressing range and prioritized neutral-grip pressing + rear delt support.',
            'Knee discomfort': 'Used knee-friendly squat options, controlled tempo, and machine leg work as needed.',
            'Low back discomfort': 'Reduced axial fatigue and emphasized supported rows + stable hinge patterns.',
            'Wrist or elbow discomfort': 'Selected neutral-grip pressing/curling and cable-based arm patterns.'
        };

        if (liftMap[avoidLift]) {
            substitutions.push(liftMap[avoidLift]);
        }
        if (jointMap[jointLimitation]) {
            substitutions.push(jointMap[jointLimitation]);
        }
        return substitutions;
    }

    function applyExerciseReplacements(name, avoidLift) {
        var lowerName = name.toLowerCase();
        if (avoidLift === 'Back squat' && lowerName.indexOf('squat') >= 0) {
            return 'Front squat / hack squat';
        }
        if (avoidLift === 'Barbell bench press' && lowerName.indexOf('bench') >= 0) {
            return 'Dumbbell bench / machine press';
        }
        if (avoidLift === 'Conventional deadlift' && lowerName.indexOf('deadlift') >= 0) {
            return 'Romanian deadlift / trap bar deadlift';
        }
        if (avoidLift === 'Overhead press' && lowerName.indexOf('overhead press') >= 0) {
            return 'Dumbbell shoulder press + lateral raise pairing';
        }
        return name;
    }

    function getAccessoryCount(lengthLabel) {
        if (lengthLabel === '30 minutes') {
            return 3;
        }
        if (lengthLabel === '45 minutes') {
            return 4;
        }
        if (lengthLabel === '60 minutes') {
            return 5;
        }
        return 6;
    }

    function priorityAddOn(priority) {
        var map = {
            Chest: 'extra chest press/fly volume',
            Shoulders: 'extra lateral and rear-delt work',
            Back: 'extra row and pulldown volume',
            Arms: 'extra direct biceps and triceps sets',
            Legs: 'extra quad/hamstring accessory work',
            'Overall balanced development': 'balanced accessory distribution'
        };
        return map[priority] || 'balanced accessory distribution';
    }

    function renderSummary(data, split) {
        summaryTarget.innerHTML = '<article class="program-summary-card">'
            + '<h3>Program Summary</h3>'
            + '<div class="program-summary-grid">'
            + '<p><strong>Goal:</strong> ' + data.goal + '</p>'
            + '<p><strong>Experience:</strong> ' + data.experience + '</p>'
            + '<p><strong>Frequency:</strong> ' + data.frequency + ' days/week</p>'
            + '<p><strong>Workout length:</strong> ' + data.workoutLength + '</p>'
            + '<p><strong>Equipment:</strong> ' + data.equipment + '</p>'
            + '<p><strong>Priority:</strong> ' + data.priority + '</p>'
            + '<p><strong>Split:</strong> ' + split.join(' / ') + '</p>'
            + '</div>'
            + '<p class="program-summary-note">This six-week plan is built around progressive overload on your main lifts, with ' + priorityAddOn(data.priority) + ' and accessories scaled to your schedule.</p>'
            + '</article>';
    }

    function renderProgramHero(data, profile, split, notes) {
        var generatedOn = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        var commitmentLine = data.frequency + ' days/week • ' + data.workoutLength + ' sessions';
        var noteItems = notes.length
            ? notes.map(function (note) { return '<li>' + note + '</li>'; }).join('')
            : '<li>No forced substitutions selected. Train the base templates as written.</li>';

        heroTarget.innerHTML = '<article class="program-hero-card">'
            + '<p class="program-hero-card__eyebrow">Coach deliverable · Generated ' + generatedOn + '</p>'
            + '<h3>' + data.goal + ' blueprint</h3>'
            + '<p class="program-hero-card__intro">' + profile.blurb + '</p>'
            + '<div class="program-hero-card__chips">'
            + '<span>' + data.experience + ' lifter</span>'
            + '<span>' + commitmentLine + '</span>'
            + '<span>' + data.equipment + '</span>'
            + '<span>Split: ' + split.join(' · ') + '</span>'
            + '</div>'
            + '<div class="program-hero-card__standards">'
            + '<h4>Execution standards</h4>'
            + '<ul>'
            + '<li>Leave 1-2 reps in reserve on most accessory sets and push close to technical failure only on final sets.</li>'
            + '<li>Add load only when all prescribed reps are completed with clean tempo and stable form.</li>'
            + '<li>Track sleep, stress, and joint feedback so recovery drives progression week to week.</li>'
            + '</ul>'
            + '</div>'
            + '<div class="program-hero-card__notes">'
            + '<h4>Customization notes</h4>'
            + '<ul>' + noteItems + '</ul>'
            + '</div>'
            + '</article>';
    }

    function renderProgression(maxes, profile) {
        var weeks = weekPresets[profile.type];
        var lifts = [
            { key: 'bench', label: 'Flat barbell bench press', max: maxes.bench, weeklyAdd: 5 },
            { key: 'squat', label: 'Barbell squat', max: maxes.squat, weeklyAdd: 5 },
            { key: 'deadlift', label: 'Deadlift', max: maxes.deadlift, weeklyAdd: 10 }
        ];

        var headCells = weeks.map(function (_, i) { return '<th>Week ' + (i + 1) + '</th>'; }).join('');
        var bodyRows = lifts.map(function (lift) {
            var startLoad = roundToNearest5(lift.max * 0.7);
            var row = weeks.map(function (week, weekIndex) {
                var load = startLoad + (weekIndex * lift.weeklyAdd);
                return '<td>' + week.sets + 'x' + week.reps + ' @ ' + Math.round((load / lift.max) * 100) + '% (~' + load + ' lbs)</td>';
            }).join('');
            return '<tr><th scope="row">' + lift.label + '</th>' + row + '</tr>';
        }).join('');

        progressionTarget.innerHTML = '<article class="program-card"><h3>Main Lift Progression (Weeks 1-6)</h3>'
            + '<div class="table-wrap"><table><thead><tr><th>Lift</th>' + headCells + '</tr></thead><tbody>' + bodyRows + '</tbody></table></div>'
            + '<p class="field-note">Linear loading model: start at ~70% estimated 1RM, then add 5 lb/week on bench + squat and 10 lb/week on deadlift.</p>'
            + '<p class="field-note">Optional warm-up: 5-8 minutes of light movement + 2-4 progressive warm-up sets before your first main lift.</p>'
            + '</article>';
    }

    function renderWeeks(data, split, profile) {
        var weeks = weekPresets[profile.type];
        var accessoryCount = getAccessoryCount(data.workoutLength);
        var html = '';
        var sessionFocusMap = {
            'Full Body A': 'Primary lower-body squat focus + upper push volume',
            'Full Body B': 'Posterior-chain hinge focus + vertical pressing',
            'Full Body C': 'Balanced volume with quad and upper-back emphasis',
            'Upper 1': 'Main upper strength work and controlled pressing',
            'Lower 1': 'Quad and hamstring base strength development',
            'Upper 2': 'Overhead + pulling volume with arm finishers',
            'Lower 2': 'Heavy hinge pattern with unilateral lower-body support',
            Push: 'Pressing strength and chest/shoulder hypertrophy',
            Pull: 'Back density, hinge work, and arm pulling volume',
            Legs: 'Lower-body hypertrophy with controlled hinge loading',
            Upper: 'Balanced upper-body volume and shoulder stability',
            Lower: 'Posterior chain + quad support with core bracing'
        };
        var durationMap = {
            '30 minutes': '25-35 min',
            '45 minutes': '40-50 min',
            '60 minutes': '50-65 min',
            '75+ minutes': '65-85 min'
        };

        weeks.forEach(function (week, weekIndex) {
            html += '<article class="program-card"><h3>Week ' + (weekIndex + 1) + ' <span>' + week.note + '</span></h3><div class="week-grid">';

            split.forEach(function (dayName, dayIndex) {
                var pool = exercisesByDay(dayName, data.equipment).map(function (name) {
                    return applyExerciseReplacements(name, data.avoidLift);
                });
                var mainExercise = pool[0] || 'Main compound lift';
                var accessory = pool.slice(1, accessoryCount);
                var coreExercises = getCoreExercises(data.experience);
                var accessoryWithCore = accessory.map(function (exercise) {
                    return exercise === 'Abs' ? coreExercises.join(' + ') : exercise;
                });
                var restText = '3-4 min on compounds, 2-3 min on accessories';
                var sessionFocus = sessionFocusMap[dayName] || 'Balanced full-body emphasis';
                var estimatedDuration = durationMap[data.workoutLength] || data.workoutLength;

                var accessoryList = accessoryWithCore.map(function (exercise) {
                    return '<li><span class="label">Accessory</span><strong>' + exercise + '</strong><span>3 sets x ' + profile.accessoryRepRange + '</span></li>';
                }).join('');

                html += '<div class="day-card">'
                    + '<h4>Day ' + (dayIndex + 1) + ': ' + dayName + '</h4>'
                    + '<p class="day-card__meta"><span>' + sessionFocus + '</span><span>Estimated duration: ' + estimatedDuration + '</span></p>'
                    + '<ul>'
                    + '<li><span class="label label-main">Main lift</span><strong>' + mainExercise + '</strong><span>' + week.sets + ' sets x ' + week.reps + ' reps @ ' + Math.round(week.pct * 100) + '%</span></li>'
                    + accessoryList
                    + '</ul>'
                    + '<p class="rest-note">Rest: ' + restText + '</p>'
                    + '</div>';
            });

            html += '</div></article>';
        });

        weeksTarget.innerHTML = html;
    }

    function renderSubstitutions(notes) {
        if (!notes.length) {
            substitutionsTarget.innerHTML = '';
            return;
        }
        substitutionsTarget.innerHTML = '<article class="program-card"><h3>Exercise Substitution Notes</h3><ul class="substitution-list">'
            + notes.map(function (note) { return '<li>' + note + '</li>'; }).join('')
            + '</ul></article>';
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        errorTarget.textContent = '';

        var formData = new FormData(form);
        var payload = {
            goal: formData.get('goal'),
            experience: formData.get('experience'),
            frequency: formData.get('frequency'),
            workoutLength: formData.get('workoutLength'),
            equipment: formData.get('equipment'),
            priority: formData.get('priority'),
            avoidLift: formData.get('avoidLift'),
            jointLimitation: formData.get('jointLimitation')
        };

        if (!payload.goal || !payload.experience || !payload.frequency || !payload.workoutLength || !payload.equipment || !payload.priority) {
            errorTarget.textContent = 'Please complete all required fields before generating your program.';
            return;
        }

        var maxes = {
            bench: getLiftMax(formData.get('bench1rm'), formData.get('benchWeight'), formData.get('benchReps')),
            squat: getLiftMax(formData.get('squat1rm'), formData.get('squatWeight'), formData.get('squatReps')),
            deadlift: getLiftMax(formData.get('deadlift1rm'), formData.get('deadliftWeight'), formData.get('deadliftReps'))
        };

        if (!maxes.bench || !maxes.squat || !maxes.deadlift) {
            errorTarget.textContent = 'Enter either a known 1RM or a weight + reps estimate for bench, squat, and deadlift.';
            return;
        }

        var split = splitByFrequency[payload.frequency];
        var profile = getGoalProfile(payload.goal);
        var substitutions = getSubstitutions(payload.avoidLift, payload.jointLimitation);

        renderSummary(payload, split);
        renderProgression(maxes, profile);
        renderWeeks(payload, split, profile);
        renderSubstitutions(substitutions);
        renderProgramHero(payload, profile, split, substitutions);

        resultsSection.hidden = false;
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
})();
