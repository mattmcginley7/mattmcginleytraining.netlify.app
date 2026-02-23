(function () {
    var LB_TO_KG = 0.45359237;
    var LEVELS = ['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Elite'];
    var PERCENTILE_BANDS = {
        belowNovice: { min: 5, max: 35 },
        novice: { min: 35, max: 70 },
        intermediate: { min: 70, max: 85 },
        advanced: { min: 85, max: 97 },
        elite: { min: 97, max: 99.7 }
    };

    function toLb(weight, unit) {
        return unit === 'kg' ? weight / LB_TO_KG : weight;
    }

    function toKg(weightLb) {
        return weightLb * LB_TO_KG;
    }

    function estimateOneRepMax(weight, reps, formula) {
        if (formula === 'brzycki') {
            return weight * (36 / (37 - reps));
        }
        return weight * (1 + reps / 30);
    }

    function interpolateThresholds(sex, lift, bodyweightLb) {
        var group = window.STRENGTH_STANDARDS[sex];
        var bins = group.bins;
        var liftData = group.lifts[lift];

        if (bodyweightLb <= bins[0]) {
            return liftData[bins[0]];
        }

        if (bodyweightLb >= bins[bins.length - 1]) {
            return liftData[bins[bins.length - 1]];
        }

        var lowerBin = bins[0];
        var upperBin = bins[bins.length - 1];

        for (var i = 0; i < bins.length - 1; i += 1) {
            if (bodyweightLb >= bins[i] && bodyweightLb <= bins[i + 1]) {
                lowerBin = bins[i];
                upperBin = bins[i + 1];
                break;
            }
        }

        var ratio = (bodyweightLb - lowerBin) / (upperBin - lowerBin);
        var lower = liftData[lowerBin];
        var upper = liftData[upperBin];

        return {
            novice: lower.novice + (upper.novice - lower.novice) * ratio,
            intermediate: lower.intermediate + (upper.intermediate - lower.intermediate) * ratio,
            advanced: lower.advanced + (upper.advanced - lower.advanced) * ratio,
            elite: lower.elite + (upper.elite - lower.elite) * ratio
        };
    }

    function percentileForLift(valueLb, thresholds) {
        var bands = PERCENTILE_BANDS;
        var progress;

        if (valueLb < thresholds.novice) {
            progress = Math.max(valueLb / Math.max(thresholds.novice, 1), 0);
            return bands.belowNovice.min + (bands.belowNovice.max - bands.belowNovice.min) * progress;
        }

        if (valueLb < thresholds.intermediate) {
            progress = (valueLb - thresholds.novice) / Math.max(thresholds.intermediate - thresholds.novice, 1);
            return bands.novice.min + (bands.novice.max - bands.novice.min) * progress;
        }

        if (valueLb < thresholds.advanced) {
            progress = (valueLb - thresholds.intermediate) / Math.max(thresholds.advanced - thresholds.intermediate, 1);
            return bands.intermediate.min + (bands.intermediate.max - bands.intermediate.min) * progress;
        }

        if (valueLb < thresholds.elite) {
            progress = (valueLb - thresholds.advanced) / Math.max(thresholds.elite - thresholds.advanced, 1);
            return bands.advanced.min + (bands.advanced.max - bands.advanced.min) * progress;
        }

        progress = (valueLb - thresholds.elite) / Math.max(thresholds.elite, 1);
        return bands.elite.min + (100 - bands.elite.min) * (1 - Math.exp(-progress * 3));
    }

    function classifyLevel(valueLb, thresholds) {
        var percentile = percentileForLift(valueLb, thresholds);

        if (valueLb < thresholds.novice) {
            return { level: LEVELS[0], percentile: percentile };
        }
        if (valueLb < thresholds.intermediate) {
            return { level: LEVELS[1], percentile: percentile };
        }
        if (valueLb < thresholds.advanced) {
            return { level: LEVELS[2], percentile: percentile };
        }
        if (valueLb < thresholds.elite) {
            return { level: LEVELS[3], percentile: percentile };
        }
        return { level: LEVELS[4], percentile: percentile };
    }

    function percentileText(percentile) {
        var boundedPercentile = Math.max(1, Math.min(percentile, 99.99));
        var roundedPercentile = boundedPercentile >= 99 ? boundedPercentile.toFixed(1) : Math.round(boundedPercentile);

        if (boundedPercentile >= 99) {
            return {
                percentileText: roundedPercentile + 'th percentile',
                topText: 'Top ' + (100 - boundedPercentile).toFixed(1) + '%',
                oneInText: 'about 1 in ' + Math.round(100 / Math.max(100 - boundedPercentile, 0.01))
            };
        }

        var topPercent = 100 - boundedPercentile;
        var oneIn = Math.round(100 / Math.max(topPercent, 0.01));
        oneIn = Math.min(oneIn, 10000);

        return {
            percentileText: Math.round(boundedPercentile) + 'th percentile',
            topText: 'Top ' + Math.round(topPercent) + '%',
            oneInText: 'about 1 in ' + oneIn
        };
    }

    function renderBar(container, userValue, thresholds) {
        var maxValue = Math.max(userValue * 1.15, thresholds.elite * 1.15);
        var markerPoints = [
            { label: 'Novice', value: thresholds.novice },
            { label: 'Intermediate', value: thresholds.intermediate },
            { label: 'Advanced', value: thresholds.advanced },
            { label: 'Elite', value: thresholds.elite }
        ];

        var markerHtml = markerPoints.map(function (marker) {
            var pos = Math.min((marker.value / maxValue) * 100, 100);
            return '<div class="strength-marker" style="left:' + pos + '%"></div>';
        }).join('');

        var labelHtml = markerPoints.map(function (marker) {
            var pos = Math.min((marker.value / maxValue) * 100, 100);
            return '<span class="strength-label" style="left:' + pos + '%">' + marker.label + '</span>';
        }).join('');

        var userPos = Math.min((userValue / maxValue) * 100, 100);
        container.innerHTML = '<div class="strength-bar-track">' +
            '<div class="strength-bar-fill" style="width:' + userPos + '%"></div>' +
            markerHtml +
            '<div class="strength-user-marker" style="left:' + userPos + '%"><strong>You</strong></div>' +
            '<div class="strength-bar-labels">' + labelHtml + '</div>' +
            '</div>';
    }

    function showInlineError(field, message) {
        var error = field.parentElement.querySelector('.input-error');
        if (error) {
            error.textContent = message;
        }
    }

    function clearInlineErrors(form) {
        var errors = form.querySelectorAll('.input-error');
        errors.forEach(function (error) {
            error.textContent = '';
        });
    }

    function init() {
        var form = document.querySelector('#strengthCalculatorForm');
        if (!form || !window.STRENGTH_STANDARDS) {
            return;
        }

        var modeSelect = document.querySelector('#inputMode');
        var repsFields = document.querySelector('#repsFields');
        var formulaRow = document.querySelector('#formulaRow');
        var estimateLine = document.querySelector('#estimatedLine');

        modeSelect.addEventListener('change', function () {
            var repsMode = modeSelect.value === 'reps';
            repsFields.hidden = !repsMode;
            formulaRow.hidden = !repsMode;
            estimateLine.hidden = !repsMode;
        });

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            clearInlineErrors(form);

            var sex = document.querySelector('#sex').value;
            var bodyweight = parseFloat(document.querySelector('#bodyweight').value);
            var bodyweightUnit = document.querySelector('#bodyweightUnit').value;
            var lift = document.querySelector('#lift').value;
            var inputMode = modeSelect.value;
            var liftWeight = parseFloat(document.querySelector('#liftWeight').value);
            var liftWeightUnit = document.querySelector('#liftWeightUnit').value;
            var reps = parseInt(document.querySelector('#reps').value, 10);
            var formula = document.querySelector('#formula').value;
            var warning = document.querySelector('#bodyweightWarning');

            var hasErrors = false;

            if (!bodyweight || bodyweight <= 0) {
                showInlineError(document.querySelector('#bodyweight'), 'Please enter a bodyweight greater than 0.');
                hasErrors = true;
            }

            if (!liftWeight || liftWeight <= 0) {
                showInlineError(document.querySelector('#liftWeight'), 'Please enter a lift weight greater than 0.');
                hasErrors = true;
            }

            if (inputMode === 'reps' && (!reps || reps < 1 || reps > 20)) {
                showInlineError(document.querySelector('#reps'), 'Reps must be between 1 and 20.');
                hasErrors = true;
            }

            if (hasErrors) {
                return;
            }

            var bodyweightLb = toLb(bodyweight, bodyweightUnit);
            warning.textContent = '';
            if (bodyweightLb < 70 || bodyweightLb > 400) {
                warning.textContent = 'Bodyweight looks outside the typical 70–400 lb range, but calculation will continue.';
            }

            var enteredWeightLb = toLb(liftWeight, liftWeightUnit);
            var oneRepMaxLb = inputMode === 'reps' ? estimateOneRepMax(enteredWeightLb, reps, formula) : enteredWeightLb;
            var comparisonLoadLb = oneRepMaxLb;

            if (lift === 'weightedChinUp') {
                comparisonLoadLb = bodyweightLb + oneRepMaxLb;
            }

            var thresholds = interpolateThresholds(sex, lift, bodyweightLb);
            var classification = classifyLevel(comparisonLoadLb, thresholds);
            var percentile = percentileText(classification.percentile);

            document.querySelector('#resultLevel').textContent = classification.level;
            document.querySelector('#resultPercentile').textContent = percentile.percentileText + ' · ' + percentile.topText;
            document.querySelector('#resultOneIn').textContent = percentile.oneInText;
            document.querySelector('#resultBodyweight').textContent = bodyweightLb.toFixed(1) + ' lb (' + toKg(bodyweightLb).toFixed(1) + ' kg)';

            document.querySelector('#resultMainLift').textContent = oneRepMaxLb.toFixed(1) + ' lb (' + toKg(oneRepMaxLb).toFixed(1) + ' kg)';

            var chinupLine = document.querySelector('#resultChinUpLine');
            if (lift === 'weightedChinUp') {
                chinupLine.hidden = false;
                chinupLine.textContent = 'Weighted chin-up total load: ' + comparisonLoadLb.toFixed(1) + ' lb (' + toKg(comparisonLoadLb).toFixed(1) + ' kg)';
            } else {
                chinupLine.hidden = true;
            }

            if (inputMode === 'reps') {
                estimateLine.hidden = false;
                estimateLine.textContent = 'Estimated 1RM using ' + (formula === 'brzycki' ? 'Brzycki' : 'Epley') + ' formula.';
            }

            renderBar(document.querySelector('#strengthBar'), comparisonLoadLb, thresholds);
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();
