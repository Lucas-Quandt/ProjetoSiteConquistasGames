// --- CONTROLE DO MENU MOBILE --- 

const botaoMenu = document.getElementById("menu-mobile-btn");
const menuNavegacao = document.getElementById("menu-navegacao");

// Só adiciona evento se o botão existir
if (botaoMenu) {
    botaoMenu.addEventListener("click", () => {
        menuNavegacao.classList.toggle("ativo");
    });
}


// --- CONTROLE DO POPUP DE VÍDEO ---

// Função única para abrir ou fechar, dependendo do parâmetro (verdadeiro/falso)
function alternarPopup(abrir) {
    const popup = document.getElementById("janela-popup");
    const frameVideo = document.getElementById("iframe-video");
    
    if (abrir) {
        // Mostra o popup (flex para centralizar)
        popup.style.display = "flex";
        // Insere o link com Autoplay
        frameVideo.src = "https://www.youtube.com/embed/LembwKDo1Dk?autoplay=1&mute=1";
    } else {
        // Esconde o popup
        popup.style.display = "none";
        // Remove o link para parar o som do vídeo imediatamente
        frameVideo.src = "";
    }
}

// Dica: Se quiser fechar o popup clicando fora dele (no fundo escuro)
document.getElementById("janela-popup").addEventListener("click", (e) => {
    // Se o alvo do clique for exatamente o fundo escuro (overlay)
    if (e.target.id === "janela-popup") {
        alternarPopup(false);
    }
});