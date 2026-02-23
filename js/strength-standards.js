/*
 * Strength standards reference data.
 * To edit/extend: update or add bins under male/female -> lift names.
 * Each bin is bodyweight in lb and each threshold has novice/intermediate/advanced/elite 1RM values in lb.
 */
window.STRENGTH_STANDARDS = {
    male: {
        bins: [132, 148, 165, 181, 198, 220, 242, 275],
        lifts: {
            benchPress: {
                132: { novice: 145, intermediate: 195, advanced: 245, elite: 300 },
                148: { novice: 160, intermediate: 215, advanced: 270, elite: 330 },
                165: { novice: 175, intermediate: 235, advanced: 295, elite: 360 },
                181: { novice: 190, intermediate: 255, advanced: 320, elite: 390 },
                198: { novice: 205, intermediate: 275, advanced: 345, elite: 420 },
                220: { novice: 220, intermediate: 295, advanced: 370, elite: 450 },
                242: { novice: 235, intermediate: 315, advanced: 395, elite: 475 },
                275: { novice: 250, intermediate: 335, advanced: 420, elite: 500 }
            },
            squat: {
                132: { novice: 185, intermediate: 255, advanced: 325, elite: 395 },
                148: { novice: 205, intermediate: 280, advanced: 355, elite: 430 },
                165: { novice: 225, intermediate: 305, advanced: 385, elite: 465 },
                181: { novice: 245, intermediate: 330, advanced: 415, elite: 500 },
                198: { novice: 265, intermediate: 355, advanced: 445, elite: 535 },
                220: { novice: 285, intermediate: 380, advanced: 475, elite: 570 },
                242: { novice: 300, intermediate: 400, advanced: 500, elite: 600 },
                275: { novice: 320, intermediate: 425, advanced: 530, elite: 635 }
            },
            deadlift: {
                132: { novice: 215, intermediate: 290, advanced: 365, elite: 445 },
                148: { novice: 235, intermediate: 320, advanced: 405, elite: 495 },
                165: { novice: 260, intermediate: 350, advanced: 440, elite: 535 },
                181: { novice: 285, intermediate: 380, advanced: 475, elite: 575 },
                198: { novice: 305, intermediate: 410, advanced: 515, elite: 620 },
                220: { novice: 330, intermediate: 440, advanced: 550, elite: 665 },
                242: { novice: 350, intermediate: 465, advanced: 580, elite: 700 },
                275: { novice: 375, intermediate: 495, advanced: 615, elite: 740 }
            },
            weightedChinUp: {
                132: { novice: 165, intermediate: 190, advanced: 220, elite: 255 },
                148: { novice: 180, intermediate: 210, advanced: 240, elite: 275 },
                165: { novice: 195, intermediate: 225, advanced: 260, elite: 295 },
                181: { novice: 210, intermediate: 245, advanced: 280, elite: 320 },
                198: { novice: 225, intermediate: 260, advanced: 300, elite: 340 },
                220: { novice: 240, intermediate: 280, advanced: 320, elite: 365 },
                242: { novice: 255, intermediate: 295, advanced: 340, elite: 385 },
                275: { novice: 275, intermediate: 320, advanced: 365, elite: 410 }
            }
        }
    },
    female: {
        bins: [114, 123, 132, 148, 165, 181, 198],
        lifts: {
            benchPress: {
                114: { novice: 75, intermediate: 105, advanced: 135, elite: 170 },
                123: { novice: 80, intermediate: 110, advanced: 142, elite: 178 },
                132: { novice: 85, intermediate: 118, advanced: 150, elite: 188 },
                148: { novice: 95, intermediate: 128, advanced: 162, elite: 202 },
                165: { novice: 105, intermediate: 138, advanced: 176, elite: 218 },
                181: { novice: 112, intermediate: 148, advanced: 188, elite: 232 },
                198: { novice: 120, intermediate: 158, advanced: 200, elite: 245 }
            },
            squat: {
                114: { novice: 115, intermediate: 165, advanced: 215, elite: 270 },
                123: { novice: 125, intermediate: 175, advanced: 228, elite: 285 },
                132: { novice: 135, intermediate: 188, advanced: 240, elite: 300 },
                148: { novice: 150, intermediate: 205, advanced: 260, elite: 325 },
                165: { novice: 165, intermediate: 225, advanced: 285, elite: 350 },
                181: { novice: 180, intermediate: 245, advanced: 310, elite: 375 },
                198: { novice: 192, intermediate: 260, advanced: 328, elite: 395 }
            },
            deadlift: {
                114: { novice: 145, intermediate: 200, advanced: 255, elite: 315 },
                123: { novice: 155, intermediate: 215, advanced: 275, elite: 335 },
                132: { novice: 168, intermediate: 230, advanced: 292, elite: 355 },
                148: { novice: 185, intermediate: 250, advanced: 315, elite: 385 },
                165: { novice: 200, intermediate: 270, advanced: 340, elite: 415 },
                181: { novice: 215, intermediate: 290, advanced: 365, elite: 440 },
                198: { novice: 228, intermediate: 308, advanced: 388, elite: 468 }
            },
            weightedChinUp: {
                114: { novice: 125, intermediate: 148, advanced: 172, elite: 198 },
                123: { novice: 133, intermediate: 158, advanced: 182, elite: 210 },
                132: { novice: 142, intermediate: 168, advanced: 194, elite: 222 },
                148: { novice: 155, intermediate: 182, advanced: 210, elite: 240 },
                165: { novice: 168, intermediate: 198, advanced: 228, elite: 260 },
                181: { novice: 182, intermediate: 212, advanced: 245, elite: 278 },
                198: { novice: 194, intermediate: 228, advanced: 262, elite: 298 }
            }
        }
    }
};
