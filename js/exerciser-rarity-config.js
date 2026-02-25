/*
 * Modeled rarity assumptions for "exercising adults" estimates.
 * PLACEHOLDER DEFAULTS: tune these values as better evidence/data becomes available.
 */
window.EXERCISER_RARITY_CONFIG = {
    percentileAnchorsWithinTrainees: {
        novice: 0.5,
        intermediate: 0.75,
        advanced: 0.9,
        elite: 0.97,
        eliteCeiling: 0.995
    },
    oneInCap: 100000,
    prevalencePresetOrder: ['conservative', 'default', 'liberal'],
    perSexLift: {
        male: {
            benchPress: {
                p_exercisers_who_train_lift: 0.25,
                prevalencePresets: {
                    conservative: 0.1,
                    default: 0.25,
                    liberal: 0.4
                },
                label: 'Placeholder default: about 25% of exercising men regularly train barbell bench press with enough seriousness for 1RM-style comparison.'
            },
            squat: {
                p_exercisers_who_train_lift: 0.2,
                prevalencePresets: {
                    conservative: 0.08,
                    default: 0.2,
                    liberal: 0.32
                },
                label: 'Placeholder default: about 20% of exercising men regularly train barbell squat with enough consistency for 1RM-style comparison (slightly lower than bench due to movement constraints and setup requirements).'
            },
            deadlift: {
                p_exercisers_who_train_lift: 0.16,
                prevalencePresets: {
                    conservative: 0.06,
                    default: 0.16,
                    liberal: 0.28
                },
                label: 'Placeholder default: about 16% of exercising men regularly train deadlift with enough consistency for 1RM-style comparison (often lower than bench/squat among general exercisers).'
            }
        },
        female: {
            benchPress: {
                p_exercisers_who_train_lift: 0.12,
                prevalencePresets: {
                    conservative: 0.1,
                    default: 0.25,
                    liberal: 0.4
                },
                label: 'Placeholder default: about 12% of exercising women regularly train barbell bench press with enough seriousness for 1RM-style comparison.'
            },
            squat: {
                p_exercisers_who_train_lift: 0.16,
                prevalencePresets: {
                    conservative: 0.08,
                    default: 0.16,
                    liberal: 0.26
                },
                label: 'Placeholder default: about 16% of exercising women regularly train barbell squat with enough consistency for 1RM-style comparison.'
            },
            deadlift: {
                p_exercisers_who_train_lift: 0.11,
                prevalencePresets: {
                    conservative: 0.05,
                    default: 0.11,
                    liberal: 0.2
                },
                label: 'Placeholder default: about 11% of exercising women regularly train deadlift with enough consistency for 1RM-style comparison (typically lower participation than squat).'
            }
        }
    }
};
