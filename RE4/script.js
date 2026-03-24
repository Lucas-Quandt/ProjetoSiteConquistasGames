    // Script simples para abrir/fechar o menu no mobile
        const menuBtn = document.getElementById("menuBtn");
        const navMenu = document.getElementById("navMenu");

        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("open");
        });


function abrirPopup() {
    document.getElementById("popup").style.display = "flex";

    // URL do vídeo com autoplay
    const videoURL = "https://www.youtube.com/embed/C_IdgsdHwAo?autoplay=1&mute=1";

    document.getElementById("video-frame").src = videoURL;
}

function fecharPopup() {
    document.getElementById("popup").style.display = "none";

    // Limpa o vídeo para parar a reprodução
    document.getElementById("video-frame").src = "";
}





