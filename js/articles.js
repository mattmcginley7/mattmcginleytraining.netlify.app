const articlesData = [
    {
        title: "How Many People Can Really Bench 225 Pounds in the World?",
        url: "how-many-people-bench-225-worldwide.html",
        category: "Strength",
        date: "2025-09-12",
        readTime: 8,
        excerpt: "A reality-check breakdown of global participation, training access, and why a 225 bench is uncommon in the full world population.",
        image: "MeFlexing1.jpg",
        popular: true
    },
    {
        title: "Day One: Exactly What to Do When You Start Lifting",
        url: "day-one-what-to-do-when-start-lifting.html",
        category: "Programming",
        date: "2025-09-01",
        readTime: 6,
        excerpt: "Your beginner blueprint: the first week, the first month, and the exact habits that prevent confusion and keep progress moving.",
        image: "MeFlexing2.jpg",
        popular: true
    },
    {
        title: "How Rare Is a 315-Pound Bench Press?",
        url: "how-rare-is-a-315-bench.html",
        category: "Strength",
        date: "2025-08-24",
        readTime: 7,
        excerpt: "315 has become a social-media milestone. Here is what it actually means in context, and who typically reaches it.",
        image: "MeFlexing3.jpg",
        popular: false
    },
    {
        title: "How Long It Takes to Actually Build a Great Physique",
        url: "how-long-to-build-a-great-physique.html",
        category: "Programming",
        date: "2025-08-15",
        readTime: 9,
        excerpt: "Set realistic expectations with a phase-by-phase timeline for muscle gain, fat loss, and sustainable body recomposition.",
        image: "",
        popular: true
    },
    {
        title: "Coffee, Caffeine, and Performance: What Athletes Should Know",
        url: "coffee-caffeine-performance-athletes.html",
        category: "Nutrition",
        date: "2025-08-03",
        readTime: 5,
        excerpt: "How caffeine improves performance, when dosing helps most, and how to avoid sleep disruption and tolerance issues.",
        image: "caffeine-preworkout.svg",
        popular: false
    },
    {
        title: "Is There a Dangerous Amount of Lead in Protein Powder?",
        url: "lead-in-protein-powder-safety-guide.html",
        category: "Nutrition",
        date: "2025-07-27",
        readTime: 6,
        excerpt: "What contamination reports actually show, how to interpret testing data, and practical steps to lower exposure risk.",
        image: "orgain.png",
        popular: false
    },
    {
        title: "Best Training Split? How to Design Your Week",
        url: "best-training-split-design-your-week.html",
        category: "Programming",
        date: "2025-07-18",
        readTime: 7,
        excerpt: "Choose the right split for your schedule, recovery, and goals with a system you can adapt over time.",
        image: "PTAIProgram.jpg",
        popular: true
    }
];

(function initializeArticlesPage() {
    const articlesGrid = document.getElementById("articlesGrid");
    const popularGrid = document.getElementById("popularArticles");
    const chipsRoot = document.getElementById("categoryChips");
    const searchInput = document.getElementById("articleSearch");
    const resultsCount = document.getElementById("resultsCount");
    const emptyState = document.getElementById("emptyState");

    if (!articlesGrid || !popularGrid || !chipsRoot || !searchInput || !resultsCount || !emptyState) {
        return;
    }

    const activeCategories = new Set();
    const categories = [...new Set(articlesData.map((article) => article.category))].sort();

    categories.forEach((category) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "category-chip";
        button.textContent = category;
        button.setAttribute("aria-pressed", "false");
        button.addEventListener("click", () => {
            const isActive = activeCategories.has(category);
            if (isActive) {
                activeCategories.delete(category);
                button.setAttribute("aria-pressed", "false");
            } else {
                activeCategories.add(category);
                button.setAttribute("aria-pressed", "true");
            }
            renderAllArticles();
        });
        chipsRoot.appendChild(button);
    });

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    }

    function getFilteredArticles() {
        const query = searchInput.value.trim().toLowerCase();

        return articlesData.filter((article) => {
            const matchesCategory = activeCategories.size === 0 || activeCategories.has(article.category);
            if (!matchesCategory) {
                return false;
            }

            if (!query) {
                return true;
            }

            const searchableText = `${article.title} ${article.excerpt} ${article.category}`.toLowerCase();
            return searchableText.includes(query);
        });
    }

    function createCard(article) {
        const card = document.createElement("article");
        card.className = "article-card";

        const imageBlock = article.image
            ? `<img class="article-card__image" src="${article.image}" alt="${article.title}" loading="lazy">`
            : `<div class="article-card__fallback" aria-hidden="true">Matt McGinley Articles</div>`;

        card.innerHTML = `
            <div class="article-card__image-wrap">
                ${imageBlock}
            </div>
            <div class="article-card__body">
                <span class="article-card__tag">${article.category}</span>
                <h3 class="article-card__title">${article.title}</h3>
                <p class="article-card__excerpt">${article.excerpt}</p>
                <p class="article-card__meta">${formatDate(article.date)} · ${article.readTime} min read</p>
                <a class="article-card__link" href="${article.url}">Read Article →</a>
            </div>
        `;

        return card;
    }

    function renderMostPopular() {
        popularGrid.innerHTML = "";
        const popularArticles = articlesData.filter((article) => article.popular);

        popularArticles.forEach((article) => {
            popularGrid.appendChild(createCard(article));
        });
    }

    function renderAllArticles() {
        articlesGrid.innerHTML = "";
        const filtered = getFilteredArticles();

        filtered.forEach((article) => {
            articlesGrid.appendChild(createCard(article));
        });

        resultsCount.textContent = `${filtered.length} article${filtered.length === 1 ? "" : "s"} shown`;
        emptyState.hidden = filtered.length !== 0;
    }

    searchInput.addEventListener("input", renderAllArticles);

    renderMostPopular();
    renderAllArticles();
})();
