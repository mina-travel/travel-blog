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