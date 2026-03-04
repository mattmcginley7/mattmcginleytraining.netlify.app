const articles = [
    {
        title: "The #1 Weight Loss Cheat Code: Eat the Same Foods, Just Less of Them",
        category: "Nutrition",
        date: "2026-03-02",
        readTime: "6 min",
        excerpt: "The simplest fat-loss strategy is usually the most sustainable: keep foods you enjoy and scale portions with intention.",
        content: [
            "Most people fail fat-loss plans because the plan asks them to become a different person overnight. You do not need to swap every meal for bland food. Keep the meals you already like and reduce portion sizes by about 10–20%.",
            "That small shift lowers calories without triggering the all-or-nothing mindset. Hunger stays manageable, social meals still fit your life, and compliance stays high long enough to matter.",
            "Track body weight trends for two to three weeks, then adjust only if progress stalls. Simple, repeatable habits beat aggressive short-term diets every time."
        ]
    },
    {
        title: "How Many People Can Really Bench 225 Pounds in the World?",
        category: "Strength",
        date: "2026-02-23",
        readTime: "6 min",
        excerpt: "The 225-pound bench is a cultural milestone in gyms, but population-level rarity is more surprising than most lifters expect.",
        content: [
            "In training circles, benching 225 pounds can seem common because strong people are overrepresented in gym content. In the broader population, very few people train consistently enough to reach that benchmark.",
            "When you account for training age, body weight, sex, and access to coaching, 225 remains a meaningful achievement. It is not elite powerlifting strength, but it is far above average recreational capability.",
            "Use the benchmark as motivation, not identity. Build your press with progressive overload, enough weekly volume, and patient technical practice."
        ]
    },
    {
        title: "Day One: Exactly What to Do When You Start Lifting",
        category: "Programming",
        date: "2026-02-16",
        readTime: "6 min",
        excerpt: "New lifters need clarity, not complexity: a clear first-week structure, realistic targets, and habits they can keep.",
        content: [
            "Your first month should prioritize consistency and movement quality. Choose a full-body routine three days per week with basic patterns: squat, hinge, push, pull, and loaded carry.",
            "Keep effort around two to three reps in reserve on most sets so technique improves without excessive soreness. Add small amounts of weight when reps feel controlled.",
            "Sleep, hydration, and protein intake are your force multipliers. If those basics are present, your first twelve weeks can deliver dramatic progress."
        ]
    },
    {
        title: "How Rare Is a 315-Pound Bench Press?",
        category: "Strength",
        date: "2026-02-09",
        readTime: "7 min",
        excerpt: "A three-plate bench is a respected milestone because it requires years of focused training for most lifters.",
        content: [
            "A 315-pound bench is uncommon even among people who lift casually. It usually reflects long-term specialization, good shoulder tolerance, and consistent loading over years.",
            "Most plateaus happen from poor exercise selection around the main lift: not enough upper-back work, too little triceps volume, or inconsistent bench frequency.",
            "If 315 is your target, treat it like a project. Track weekly tonnage, rotate rep ranges intelligently, and protect recovery so momentum never fully resets."
        ]
    },
    {
        title: "How Long It Takes to Actually Build a Great Physique",
        category: "Programming",
        date: "2026-02-02",
        readTime: "9 min",
        excerpt: "Physique development is a multi-year process; understanding that timeline prevents frustration and keeps expectations grounded.",
        content: [
            "Most people overestimate what can happen in twelve weeks and underestimate what can happen in three years. Early gains are fastest, then progress slows as you approach your ceiling.",
            "A strong physique is usually built through repeating focused phases: gaining muscle in slight surpluses, trimming fat in small deficits, and maintaining long enough to stabilize habits.",
            "Think in seasons, not sprints. The people who look impressive for decades are usually the ones who avoided burnout in year one."
        ]
    },
    {
        title: "Coffee, Caffeine, and Performance: What Athletes Should Know",
        category: "Nutrition",
        date: "2026-01-26",
        readTime: "8 min",
        excerpt: "Caffeine can boost performance, but dose, timing, and tolerance determine whether it helps or backfires.",
        content: [
            "Caffeine improves alertness, perceived effort, and output in many training contexts. A practical evidence-based range is roughly 1.5 to 3 mg per kilogram for many athletes.",
            "Timing matters: consume it about 45 to 60 minutes before training and keep late-day intake low if sleep quality drops.",
            "Cycling intake is optional, but periodic lower-caffeine days can restore sensitivity for people who rely on high daily doses."
        ]
    },
    {
        title: "Is There a Dangerous Amount of Lead in Protein Powder?",
        category: "Nutrition",
        date: "2026-01-19",
        readTime: "10 min",
        excerpt: "Context matters when evaluating contaminant reports: dose, frequency, and independent testing all shape real-world risk.",
        content: [
            "Headlines about contaminants can sound alarming, but risk should always be evaluated relative to dose and exposure patterns. A trace amount does not automatically imply meaningful harm.",
            "Look for brands with transparent third-party testing and lot-specific quality controls. Consistent documentation matters more than marketing language.",
            "If you want extra margin of safety, diversify protein sources across whole foods and supplements rather than relying on one product repeatedly."
        ]
    },
    {
        title: "Best Training Split? How to Design Your Week",
        category: "Programming",
        date: "2026-01-12",
        readTime: "9 min",
        excerpt: "There is no universally best split. The right plan is the one that matches your schedule, recovery, and progression needs.",
        content: [
            "A training split is just a schedule for distributing hard sets across the week. The best one is the split you can run consistently while progressing load, reps, or quality.",
            "For most lifters, hitting each muscle group two times weekly balances frequency and recovery well. Beginners often thrive on full-body or upper/lower templates.",
            "Advanced lifters can use push-pull-legs or body-part emphasis, but only if sleep, nutrition, and stress management support that workload."
        ]
    }
];

(function renderArticles() {
    const list = document.getElementById("articlesList");

    if (!list) {
        return;
    }

    const sortedArticles = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));

    list.innerHTML = sortedArticles
        .map((article, index) => {
            const metaDate = new Date(`${article.date}T00:00:00`).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
            });
            const paragraphs = article.content.map((paragraph) => `<p>${paragraph}</p>`).join("");

            return `
                <details class="article-card" ${index === 0 ? "open" : ""}>
                    <summary class="article-card__summary">
                        <span class="article-card__category">${article.category}</span>
                        <h2 class="article-card__title">${article.title}</h2>
                        <p class="article-card__excerpt">${article.excerpt}</p>
                        <div class="article-card__meta">${metaDate} • ${article.readTime} read</div>
                    </summary>
                    <div class="article-card__content">
                        ${paragraphs}
                    </div>
                </details>
            `;
        })
        .join("");
})();
