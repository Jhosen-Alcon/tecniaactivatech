// Seleccionar elementos necesarios
const videoPlayer = document.querySelector("#main-Video");
const playlist = document.querySelector(".playlist");
const title = document.querySelector(".titlee");
const searchInput = document.getElementById("searchInput");

// Cargar videos en la lista de reproducción
window.addEventListener("load", () => {
    allVideos.forEach((video, index) => {
        let li = document.createElement("li");
        li.classList.add("list");
        li.setAttribute("data-src", video.src);

        let span = document.createElement("span");
        span.innerText = video.name;
        li.appendChild(span);

        playlist.appendChild(li);

        li.addEventListener("click", () => {
            loadVideo(video.src, video.name);
        });
    });

    // Cargar el primer video por defecto
    loadVideo(allVideos[0].src, allVideos[0].name);
});

// Función para cargar video
function loadVideo(src, name) {
    let videoSrc;
    if (src.includes("youtube") || src.includes("youtu.be")) {
        if (src.includes("shorts")) {
            // Ajustar la URL de YouTube Shorts para incrustarla
            videoSrc = src.replace("/shorts/", "/embed/");
        } else {
            videoSrc = src.replace("watch?v=", "embed/");
        }
    } else if (src.includes("tiktok")) {
        // Ajustar la URL de TikTok para incrustarla
        videoSrc = src.replace("vm.tiktok.com", "www.tiktok.com/embed");
    } else {
        videoSrc = src;
    }
    videoPlayer.src = videoSrc;
    title.innerHTML = name;
}

// Manejar búsqueda
searchInput.addEventListener("input", function() {
    const searchValue = searchInput.value.toLowerCase();
    for (const li of playlist.children) {
        const span = li.querySelector("span");
        const spanText = span.textContent;
        const spanTextLower = spanText.toLowerCase();
        const startIndex = spanTextLower.indexOf(searchValue);
        if (startIndex === -1) {
            li.style.display = "none";
        } else {
            li.style.display = "";
            span.innerHTML =
                spanText.slice(0, startIndex) +
                "<mark>" +
                spanText.slice(startIndex, startIndex + searchValue.length) +
                "</mark>" +
                spanText.slice(startIndex + searchValue.length);
        }
    }
});
