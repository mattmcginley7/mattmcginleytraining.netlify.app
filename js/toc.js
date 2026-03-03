(function buildTableOfContents() {
    const tocHost = document.querySelector("[data-toc]");
    if (!tocHost) {
        return;
    }

    const containerSelector = tocHost.getAttribute("data-toc-container") || ".article-content";
    const articleContainer = document.querySelector(containerSelector);
    if (!articleContainer) {
        return;
    }

    const headings = [...articleContainer.querySelectorAll("h2, h3")];
    if (!headings.length) {
        tocHost.hidden = true;
        return;
    }

    tocHost.setAttribute("data-toc-sticky", "true");

    const headingTitle = document.createElement("h2");
    headingTitle.className = "toc-title";
    headingTitle.textContent = "Table of Contents";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "toc-toggle";
    toggle.textContent = "Table of Contents";
    toggle.setAttribute("aria-expanded", "false");

    const panel = document.createElement("div");
    panel.setAttribute("data-toc-panel", "");
    panel.hidden = true;

    const list = document.createElement("ul");
    list.className = "toc-list";

    function slugify(text) {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-");
    }

    const idMap = new Map();
    function uniqueId(base) {
        const count = (idMap.get(base) || 0) + 1;
        idMap.set(base, count);
        return count === 1 ? base : `${base}-${count}`;
    }

    headings.forEach((heading) => {
        if (!heading.id) {
            heading.id = uniqueId(slugify(heading.textContent) || "section");
        }

        const item = document.createElement("li");
        if (heading.tagName === "H3") {
            item.classList.add("toc-level-3");
        }

        const link = document.createElement("a");
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;

        item.appendChild(link);
        list.appendChild(item);
    });

    panel.appendChild(list);

    toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        panel.hidden = expanded;
    });

    tocHost.innerHTML = "";
    tocHost.appendChild(headingTitle);
    tocHost.appendChild(toggle);
    tocHost.appendChild(panel);

    if (window.matchMedia("(min-width: 1024px)").matches) {
        toggle.setAttribute("aria-expanded", "true");
        panel.hidden = false;
    }
})();
