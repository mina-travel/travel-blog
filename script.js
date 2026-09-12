const latestNote = document.getElementById("latest-note");

if (latestNote) {
    const latest = posts[posts.length - 1];
    latestNote.innerHTML = `
        <img src="${latest.image}" alt="${latest.title}">
        <h3>${latest.title}</h3>
        <p>${latest.number}<br>${latest.date}</p>
        <p>${latest.description}</p>
        <a href="${latest.url}" class="read-more">
            Read Note →
        </a>
    `;
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
            <summary>${category}</summary>
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
    const prefecture =
        document.body.dataset.prefecture;
    const filteredPosts = posts.filter(
        post => post.areas.includes(prefecture)
    );
    filteredPosts.forEach(post => {
        tripList.innerHTML += `
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