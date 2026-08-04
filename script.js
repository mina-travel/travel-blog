const posts = [{title: "【香川女子旅】<br>「ご当地グルメ&小豆島の旅」",
                number: "［旅記録 #1］",
                date: "2025.08.23〜24",
                description: "1泊2日で親友と香川へ<br>ご当地グルメを楽しみ、小豆島にも訪れました",
                image: "images/kagawa-1.jpg",
                url: "travel-1.html"},
               {title: "【長野一人旅 Day1】<br>「善光寺に栗の町\"小布施\"を巡る」",
                number: "［旅記録 #2］",
                date: "2025.08.23〜24",
                description: "前日に急遽思い立ち、長野へ一人旅へ。<br>素敵な出会いが沢山の旅です。",
                image: "images/nagano-19.jpg",
                url: "travel-2.html"}];

const latest = posts[posts.length - 1];

const latestNote = document.getElementById("latest-note");

latestNote.innerHTML = `
    <img src="${latest.image}" alt="${latest.title}">
    <h3>${latest.title}</h3>
    <p>${latest.number}<br>${latest.date}</p>
    <p>${latest.description}</p>
    <a href="${latest.url}" class="read-more">
        Read Note →
    </a>
`;