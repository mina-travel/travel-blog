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

const tripList = document.getElementById("trip-list");

if (tripList) {
    const prefecture =
        document.body.dataset.prefecture;
    const filteredPosts = posts.filter(
        post => post.area === prefecture
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