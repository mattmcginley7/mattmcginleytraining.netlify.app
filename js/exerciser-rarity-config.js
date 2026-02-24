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
    prevalencePresets: {
        conservative: 0.1,
        default: 0.25,
        liberal: 0.4
    },
    perSexLift: {
        male: {
            benchPress: {
                p_exercisers_who_train_lift: 0.25,
                label: 'Placeholder default: about 25% of exercising men regularly train barbell bench press with enough seriousness for 1RM-style comparison.'
            }
        },
        female: {
            benchPress: {
                p_exercisers_who_train_lift: 0.12,
                label: 'Placeholder default: about 12% of exercising women regularly train barbell bench press with enough seriousness for 1RM-style comparison.'
            }
        }
    }
};
