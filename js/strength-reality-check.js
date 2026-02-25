(function () {
    var LB_TO_KG = 0.45359237;

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

    function getTierAndBarPosition(valueLb, thresholds) {
        var tier = 'Novice';

        if (valueLb < thresholds.novice) {
            tier = 'Novice';
        } else if (valueLb < thresholds.intermediate) {
            tier = 'Intermediate';
        } else if (valueLb < thresholds.advanced) {
            tier = 'Advanced';
        } else {
            tier = 'Elite';
        }

        var maxValue = Math.max(valueLb * 1.15, thresholds.elite * 1.15);
        var userPosition = Math.min((valueLb / maxValue) * 100, 100);

        return {
            tier: tier,
            userPosition: userPosition,
            maxValue: maxValue
        };
    }

    function getTraineePercentileFromThresholdAnchors(valueLb, thresholds, config) {
        var anchors = config.percentileAnchorsWithinTrainees;
        var safeValue = Math.max(1, valueLb);

        if (safeValue <= thresholds.novice) {
            return Math.max(0.01, Math.min(anchors.novice * (safeValue / Math.max(1, thresholds.novice)), anchors.novice));
        }

        if (safeValue <= thresholds.intermediate) {
            return anchors.novice + (anchors.intermediate - anchors.novice) *
                ((safeValue - thresholds.novice) / Math.max(1, thresholds.intermediate - thresholds.novice));
        }

        if (safeValue <= thresholds.advanced) {
            return anchors.intermediate + (anchors.advanced - anchors.intermediate) *
                ((safeValue - thresholds.intermediate) / Math.max(1, thresholds.advanced - thresholds.intermediate));
        }

        if (safeValue <= thresholds.elite) {
            return anchors.advanced + (anchors.elite - anchors.advanced) *
                ((safeValue - thresholds.advanced) / Math.max(1, thresholds.elite - thresholds.advanced));
        }

        var ratioOverElite = safeValue / Math.max(1, thresholds.elite);
        var tailGain = 1 - Math.exp(-1.35 * Math.log(ratioOverElite));
        return Math.min(anchors.eliteCeiling, anchors.elite + (anchors.eliteCeiling - anchors.elite) * tailGain);
    }

    function getExerciserRarity(options) {
        var config = window.EXERCISER_RARITY_CONFIG;
        if (!config) {
            return null;
        }

        var sexLiftConfig = config.perSexLift[options.sex] && config.perSexLift[options.sex][options.lift];
        if (!sexLiftConfig) {
            return {
                supported: false,
                message: 'Modeled rarity is currently unavailable for this lift.',
                assumptionsText: 'This modeled view needs a configured lift prevalence profile. Standards tier remains available for all lifts.'
            };
        }

        var basePrevalence = sexLiftConfig.p_exercisers_who_train_lift;
        var presetMap = sexLiftConfig.prevalencePresets || {};
        var selectedPrevalence = presetMap[options.prevalencePreset] || basePrevalence;
        var traineePercentile = getTraineePercentileFromThresholdAnchors(options.comparisonLoadLb, options.thresholds, config);
        var topRateTrainees = Math.max(0.00001, 1 - traineePercentile);
        var topRateExercisers = Math.max(0.0000001, selectedPrevalence * topRateTrainees);
        var oneInN = Math.min(config.oneInCap, Math.round(1 / topRateExercisers));

        return {
            supported: true,
            oneInN: oneInN,
            topPercentExercisers: topRateExercisers * 100,
            topPercentTrainees: topRateTrainees * 100,
            traineePercentile: traineePercentile * 100,
            belowNovice: options.comparisonLoadLb < options.thresholds.novice,
            assumptionsText: sexLiftConfig.label + ' Modeled trainee anchors: novice≈50th, intermediate≈75th, advanced≈90th, elite≈97th, above elite tapers toward≈99.5th (modeled, not measured).',
            prevalenceUsed: selectedPrevalence
        };
    }


    function updatePrevalencePresetOptions(selectEl, state) {
        var config = window.EXERCISER_RARITY_CONFIG;
        if (!config || !selectEl || !state) {
            return;
        }

        var sexLiftConfig = config.perSexLift[state.sex] && config.perSexLift[state.sex][state.lift];
        if (!sexLiftConfig) {
            return;
        }

        var presetOrder = config.prevalencePresetOrder || ['conservative', 'default', 'liberal'];
        var presetMap = sexLiftConfig.prevalencePresets || {};

        presetOrder.forEach(function (presetName) {
            var option = selectEl.querySelector('option[value="' + presetName + '"]');
            if (!option) {
                return;
            }

            var pct = Math.round((presetMap[presetName] || sexLiftConfig.p_exercisers_who_train_lift) * 100);
            var labelPrefix = presetName.charAt(0).toUpperCase() + presetName.slice(1);
            option.textContent = labelPrefix + ' (' + pct + '%)';
        });

        if (!presetMap[selectEl.value]) {
            selectEl.value = 'default';
        }
    }

    function runRarityDebugTests() {
        var config = window.EXERCISER_RARITY_CONFIG;
        if (!config) {
            console.warn('Rarity config missing.');
            return;
        }

        var sex = 'male';
        var bodyweightLb = 180;
        var lifts = ['benchPress', 'squat', 'deadlift'];

        console.group('Strength rarity debug checks (modeled estimates)');
        lifts.forEach(function (lift) {
            var thresholds = interpolateThresholds(sex, lift, bodyweightLb);
            var testLoads = [
                { label: 'just below novice', value: thresholds.novice - 5 },
                { label: 'around advanced', value: thresholds.advanced },
                { label: 'well above elite', value: thresholds.elite * 1.2 }
            ];

            console.group(lift + ' @ ' + bodyweightLb + ' lb BW');
            testLoads.forEach(function (testCase) {
                var rarity = getExerciserRarity({
                    sex: sex,
                    lift: lift,
                    comparisonLoadLb: testCase.value,
                    thresholds: thresholds,
                    prevalencePreset: 'default'
                });
                console.log(testCase.label + ':', {
                    loadLb: Math.round(testCase.value),
                    oneInN: rarity && rarity.oneInN,
                    topPercentExercisers: rarity && rarity.topPercentExercisers && rarity.topPercentExercisers.toFixed(3)
                });
            });
            console.groupEnd();
        });
        console.groupEnd();
    }

    function renderBar(container, userValue, thresholds, tierData) {
        var maxValue = tierData.maxValue;
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

        container.innerHTML = '<div class="strength-bar-track">' +
            '<div class="strength-bar-fill" style="width:' + tierData.userPosition + '%"></div>' +
            markerHtml +
            '<div class="strength-user-marker" style="left:' + tierData.userPosition + '%"><strong>You</strong></div>' +
            '<div class="strength-bar-labels">' + labelHtml + '</div>' +
            '</div>';
    }

    function renderResultsTabs(activeTab) {
        var tabTier = document.querySelector('#tabTier');
        var tabRarity = document.querySelector('#tabRarity');
        var panelTier = document.querySelector('#panelTier');
        var panelRarity = document.querySelector('#panelRarity');

        var tierActive = activeTab === 'tier';
        tabTier.classList.toggle('is-active', tierActive);
        tabRarity.classList.toggle('is-active', !tierActive);
        tabTier.setAttribute('aria-selected', tierActive ? 'true' : 'false');
        tabRarity.setAttribute('aria-selected', tierActive ? 'false' : 'true');
        panelTier.hidden = !tierActive;
        panelRarity.hidden = tierActive;
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
        var rarityPrevalence = document.querySelector('#rarityPrevalence');
        var latestState = null;

        function renderRarityFromState() {
            if (!latestState) {
                return;
            }

            updatePrevalencePresetOptions(rarityPrevalence, latestState);

            var rarity = getExerciserRarity({
                sex: latestState.sex,
                lift: latestState.lift,
                comparisonLoadLb: latestState.comparisonLoadLb,
                thresholds: latestState.thresholds,
                prevalencePreset: rarityPrevalence.value
            });

            var rarityLine = document.querySelector('#resultRarity');
            var topLine = document.querySelector('#resultTopPercent');
            var assumptionsText = document.querySelector('#rarityAssumptionsText');
            var presetRow = document.querySelector('#rarityPresetRow');

            if (!rarity || !rarity.supported) {
                rarityLine.textContent = rarity ? rarity.message : 'Rarity model unavailable.';
                topLine.textContent = '—';
                assumptionsText.textContent = rarity ? rarity.assumptionsText : 'Rarity assumptions are not configured.';
                presetRow.hidden = true;
                return;
            }

            presetRow.hidden = false;
            rarityLine.textContent = 'about 1 in ' + rarity.oneInN;
            topLine.textContent = 'Top ' + (rarity.topPercentExercisers < 0.1 ? rarity.topPercentExercisers.toFixed(2) : rarity.topPercentExercisers.toFixed(1)) + '% of exercising adults' +
                (rarity.belowNovice ? ' · Common among trainees below novice threshold.' : '');
            assumptionsText.textContent = rarity.assumptionsText + ' Selected prevalence: ' + Math.round(rarity.prevalenceUsed * 100) + '%.';
        }

        modeSelect.addEventListener('change', function () {
            var repsMode = modeSelect.value === 'reps';
            repsFields.hidden = !repsMode;
            formulaRow.hidden = !repsMode;
            estimateLine.hidden = !repsMode;
        });

        document.querySelector('#tabTier').addEventListener('click', function () {
            renderResultsTabs('tier');
        });
        document.querySelector('#tabRarity').addEventListener('click', function () {
            renderResultsTabs('rarity');
        });

        rarityPrevalence.addEventListener('change', renderRarityFromState);

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
            var comparisonLoadLb = lift === 'weightedChinUp' ? bodyweightLb + oneRepMaxLb : oneRepMaxLb;

            var thresholds = interpolateThresholds(sex, lift, bodyweightLb);
            var tierData = getTierAndBarPosition(comparisonLoadLb, thresholds);

            document.querySelector('#resultLevel').textContent = tierData.tier;
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
            } else {
                estimateLine.hidden = true;
            }

            renderBar(document.querySelector('#strengthBar'), comparisonLoadLb, thresholds, tierData);

            latestState = {
                sex: sex,
                lift: lift,
                comparisonLoadLb: comparisonLoadLb,
                thresholds: thresholds
            };
            renderRarityFromState();
            renderResultsTabs('tier');
        });

        renderResultsTabs('tier');
    }

    window.runStrengthRarityDebugTests = runRarityDebugTests;

    document.addEventListener('DOMContentLoaded', init);
})();
