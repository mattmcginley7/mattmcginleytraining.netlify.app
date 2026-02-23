(function () {
    var LB_TO_KG = 0.45359237;
    var LEVELS = ['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Elite'];
    var PERCENTILE_ANCHORS = {
        novice: 60,
        elite: 99.9
    };

    function normalCdf(z) {
        var sign = z < 0 ? -1 : 1;
        var absZ = Math.abs(z) / Math.sqrt(2);
        var t = 1 / (1 + 0.3275911 * absZ);
        var a1 = 0.254829592;
        var a2 = -0.284496736;
        var a3 = 1.421413741;
        var a4 = -1.453152027;
        var a5 = 1.061405429;
        var erf = 1 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absZ * absZ));

        return 0.5 * (1 + sign * erf);
    }

    function inverseNormalCdf(probability) {
        var p = Math.max(0.000001, Math.min(0.999999, probability));
        var a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
        var b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
        var c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
        var d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
        var plow = 0.02425;
        var phigh = 1 - plow;
        var q;
        var r;

        if (p < plow) {
            q = Math.sqrt(-2 * Math.log(p));
            return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
                ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
        }

        if (p > phigh) {
            q = Math.sqrt(-2 * Math.log(1 - p));
            return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
                ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
        }

        q = p - 0.5;
        r = q * q;

        return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
            (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
    }

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
        var safeValue = Math.max(valueLb, 1);
        var noviceZ = inverseNormalCdf(PERCENTILE_ANCHORS.novice / 100);
        var eliteZ = inverseNormalCdf(PERCENTILE_ANCHORS.elite / 100);
        var sigma = (Math.log(Math.max(thresholds.elite, thresholds.novice + 1)) - Math.log(Math.max(thresholds.novice, 1))) /
            Math.max(eliteZ - noviceZ, 0.001);
        var mu = Math.log(Math.max(thresholds.novice, 1)) - sigma * noviceZ;
        var zScore = (Math.log(safeValue) - mu) / Math.max(sigma, 0.001);

        return Math.max(1, Math.min(normalCdf(zScore) * 100, 99.99));
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

        var labelHtml = markerPoints.map(function (marker, index) {
            var pos = Math.min((marker.value / maxValue) * 100, 100);
            var positionClass = index % 2 === 0 ? 'strength-label--upper' : 'strength-label--lower';

            return '<span class="strength-label ' + positionClass + '" style="left:' + pos + '%">' + marker.label + '</span>';
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
