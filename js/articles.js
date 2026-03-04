const articles = [
    {
        title: "The #1 Weight Loss Cheat Code: Eat the Same Foods, Just Less of Them",
        slug: "weight-loss-cheat-code",
        category: "Nutrition",
        date: "2025-09-02",
        readTime: "6 min",
        excerpt: "The simplest fat-loss strategy: keep your favorite foods and reduce portion sizes slightly."
    },
    {
        title: "How Many People Can Really Bench 225 Pounds in the World?",
        slug: "bench-225-world",
        category: "Strength",
        date: "2025-08-31",
        readTime: "6 min",
        excerpt: "The 225-pound bench has a strange reputation… here’s how rare it is."
    },
    {
        title: "Day One: Exactly What to Do When You Start Lifting",
        slug: "day-one-start-lifting",
        category: "Programming",
        date: "2025-08-31",
        readTime: "6 min",
        excerpt: "Your beginner blueprint: the first week, the first month, and habits that keep progress moving."
    },
    {
        title: "How Rare Is a 315-Pound Bench Press?",
        slug: "bench-315-rarity",
        category: "Strength",
        date: "2025-08-20",
        readTime: "7 min",
        excerpt: "315 is a milestone. But how rare is it really across the whole population?"
    },
    {
        title: "How Long It Takes to Actually Build a Great Physique",
        slug: "how-long-build-physique",
        category: "Programming",
        date: "2025-08-14",
        readTime: "9 min",
        excerpt: "A phase-by-phase timeline for muscle gain, fat loss, and sustainable body recomposition."
    },
    {
        title: "Coffee, Caffeine, and Performance: What Athletes Should Know",
        slug: "caffeine-performance",
        category: "Nutrition",
        date: "2025-08-10",
        readTime: "8 min",
        excerpt: "How caffeine works, dose ranges, timing, and common mistakes."
    },
    {
        title: "Is There a Dangerous Amount of Lead in Protein Powder?",
        slug: "lead-in-protein-powder",
        category: "Nutrition",
        date: "2025-08-05",
        readTime: "10 min",
        excerpt: "What the research and testing does (and doesn’t) say—and how to think about real risk."
    },
    {
        title: "Best Training Split? How to Design Your Week",
        slug: "best-training-split",
        category: "Programming",
        date: "2025-07-28",
        readTime: "9 min",
        excerpt: "A simple framework to build a split that matches your schedule and recovery."
    }
];

(function renderArticles() {
    const list = document.getElementById("articlesList");

    if (!list) {
        return;
    }

    list.innerHTML = articles
        .map((article) => {
            const metaDate = new Date(`${article.date}T00:00:00`).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
            });

            return `
                <a class="card" href="/articles/${article.slug}.html">
                    <span class="card__category">${article.category}</span>
                    <h2 class="card__title">${article.title}</h2>
                    <p class="card__excerpt">${article.excerpt}</p>
                    <div class="card__meta">
                        <span>${metaDate} • ${article.readTime} read</span>
                        <span class="card__arrow" aria-hidden="true">→</span>
                    </div>
                </a>
            `;
        })
        .join("");
})();
