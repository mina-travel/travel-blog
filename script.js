const latestNote = document.getElementById("latest-note");
if (latestNote) {
    const latest = posts[posts.length - 1];
    latestNote.innerHTML = `
        <div class="latest-content">
            <div class="latest-image">
                <img src="${latest.image}" alt="${latest.title}">
            </div>
            <div class="latest-info">
                <p class="latest-number">${latest.number}</p>
                <h3>${latest.title}</h3>
                <p class="latest-date">${latest.date}</p>
                <p class="latest-description">${latest.description}</p>
                <a href="${latest.url}" class="read-more">
                    Read Note →
                </a>
            </div>
        </div>
    `;
}

const homeNoteList = document.getElementById("home-note-list");
if (homeNoteList) {
    const latest = posts[posts.length - 1];
    const previousPosts = posts
        .slice(-4, -1)
        .reverse();
    homeNoteList.innerHTML = previousPosts.map(post => `
        <a href="${post.url}" class="trip-card">
            <img src="${post.image}" alt="${post.title}">
            <div class="trip-content">
                <p class="trip-category">
                    ${post.category} ・ ${post.areas.join("・")}
                </p>
                <h2>${post.title}</h2>
                <p class="trip-date">
                    ${post.date}
                </p>
                <p>
                    ${post.description}
                </p>
            </div>
        </a>
    `).join("");
}

const categoryList = document.getElementById("category-list");
if (categoryList) {
    // posts.jsからカテゴリーを重複なしで取得
    const categories = [
        ...new Set(posts.map(post => post.category))
    ];
    categories.forEach(category => {
        // 「国内」「海外」を作る
        const categoryDetails = document.createElement("details");
        // そのカテゴリーの記事だけ取り出す
        const categoryPosts = posts.filter(
            post => post.category === category
        );
        // そのカテゴリーに含まれる場所を重複なしで取得
        const areas = [
            ...new Set(
                categoryPosts.flatMap(post => post.areas)
            )
        ];
        // 都道府県・国のリストを作る
        let areaList = "";
        areas.forEach(area => {
            areaList += `
                <li>
                    <a href="area.html?category=${encodeURIComponent(category)}&area=${encodeURIComponent(area)}">
                        ${area}
                    </a>
                </li>
            `;
        });
        // HTMLを作る
        categoryDetails.innerHTML = `
    <summary>
        <i class="${category === "国内" ? "fa-solid fa-house" : "fa-solid fa-globe"}"></i>
        ${category}
    </summary>
    <ul>
        ${areaList}
    </ul>
`;
        // Categoryの中に追加
        categoryList.appendChild(categoryDetails);
    });
}

const tripList = document.getElementById("trip-list");
if (tripList) {
    const params = new URLSearchParams(window.location.search);
    const selectedCategory = params.get("category");
    // 表示するカテゴリー
    const categories = [
        {name: "国内",
         english: "Japan",
         icon: "fa-solid fa-house"},
        {name: "海外",
         english: "Overseas",
         icon: "fa-solid fa-globe"},
        {name: "雑記",
         english: "Miscellaneous",
         icon: "fa-regular fa-bookmark"}];
    // カテゴリーを選択している場合は、そのカテゴリーだけ表示
    const displayCategories = selectedCategory
        ? categories.filter(category =>
            category.name === selectedCategory
        )
        : categories;
    displayCategories.forEach(category => {
        // カテゴリーに属する記事を取得
        let categoryPosts = posts.filter(post =>
            post.category === category.name
        );
        // 通常表示では最新3件、カテゴリー選択時は全件
        categoryPosts = categoryPosts.reverse();
        if (!selectedCategory) {
            categoryPosts = categoryPosts.slice(0, 3);
        }

        // 記事カードを作成
const cards = categoryPosts.map(post => `
    <a href="${post.url}" class="trip-card notes-card">
        <img src="${post.image}" alt="${post.title}">
            <div class="trip-content">
                <p class="trip-category">
                    ${post.category} ・ ${post.areas.join("・")}
                </p>
                <h3>${post.title}</h3>
                <p class="trip-date">
                    ${post.date}
                </p>
                <p class="notes-description">
                    ${post.description}
                </p>
            </div>
        </a>
    `).join("");

        // カテゴリー全体を作成
        const section = document.createElement("section");
        section.className = "notes-category";
        section.innerHTML = `
            <div class="notes-category-heading">
                <div class="notes-category-title">
                    <i class="${category.icon}"></i>
                    <h2>${category.name}</h2>
                    <span>${category.english}</span>
                </div>
                ${
    category.name !== "雑記" &&
    !new URLSearchParams(window.location.search).has("category")
        ? `
            <a class="notes-all-link" href="travel-notes.html?category=${encodeURIComponent(category.name)}">
                記録をすべて読む
                <span>→</span>
            </a>
        `
        : ""
}
            </div>
            ${categoryPosts.length > 0
                    ? `
                        <div class="notes-card-list">
                            ${cards}
                        </div>
                    `
                    : `
                        <div class="notes-empty">
                            <i class="fa-regular fa-bookmark"></i>
                            <p>旅の記録を、少しずつ。</p>
                            <span>記事を準備中です。</span>
                        </div>
                    `
            }
            ${selectedCategory
                    ? `
                        <a class="notes-back-link" href="travel-notes.html">
                            ← すべてのカテゴリーに戻る
                        </a>
                    `
                    : ""
            }
        `;
        tripList.appendChild(section);
    });
}

const archiveList = document.getElementById("archive-list");
if (archiveList) {
    const years = [...new Set(posts.map(post => post.year))];
    years.forEach(year => {
        const yearDetails = document.createElement("details");
        const months = [
            ...new Set(
                posts
                    .filter(post => post.year === year)
                    .map(post => post.month)
            )
        ];
        let monthList = "";
        months.forEach(month => {
            monthList += `
                <li>
                    <a href="archive.html?year=${year}&month=${month}">
                        ${month}月
                    </a>
                </li>
            `;
        });
        yearDetails.innerHTML = `
            <summary>${year}年</summary>
            <ul>
                ${monthList}
            </ul>
        `;
        archiveList.appendChild(yearDetails);
    });
}

const archivePosts = document.getElementById("archive-posts");
if (archivePosts) {
    const params = new URLSearchParams(window.location.search);
    const year = Number(params.get("year"));
    const month = Number(params.get("month"));
    const filteredPosts = posts.filter(post =>
        post.year === year && post.month === month
    );
    const archiveTitle = document.getElementById("archive-title");
    archiveTitle.textContent = `${year}年${month}月`;
    filteredPosts.forEach(post => {
        archivePosts.innerHTML += `
            <a href="${post.url}" class="trip-card">
                <div class="trip-content">
                    <img src="${post.image}" alt="${post.title}">
                    <p class="trip-date">
                        ${post.number}<br>
                        ${post.date}<br>
                        ${post.title}
                    </p>
                </div>
            </a>
        `;
    });
}

const areaPosts = document.getElementById("area-posts");
if (areaPosts) {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const area = params.get("area");
    const filteredPosts = posts.filter(post =>
        post.category === category && 
        post.areas.includes(area)
    );
    const areaTitle = document.getElementById("area-title");
    areaTitle.textContent = area;
    filteredPosts.forEach(post => {
        areaPosts.innerHTML += `
            <a href="${post.url}" class="trip-card">
                <div class="trip-content">
                    <img
                        src="${post.image}" alt="${post.title}">
                    <p class="trip-date">
                        ${post.number}<br>
                        ${post.date}<br>
                        ${post.title}
                    </p>
                </div>
            </a>
        `;
    });
}