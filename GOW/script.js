    // Script simples para abrir/fechar o menu no mobile
        const menuBtn = document.getElementById("menuBtn");
        const navMenu = document.getElementById("navMenu");

        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("open");
        });


function abrirPopup() {
    document.getElementById("popup").style.display = "flex";

    // URL do vídeo com autoplay
    const videoURL = "https://www.youtube.com/embed/x6oF3Jxu7X0";

    document.getElementById("video-frame").src = videoURL;
}

function fecharPopup() {
    document.getElementById("popup").style.display = "none";

    // Limpa o vídeo para parar a reprodução
    document.getElementById("video-frame").src = "";
}

document.getElementById('btn-iniciar').addEventListener('click', function() {
    document.getElementById('entrar-site').style.display = 'none';
    const splashContainer = document.getElementById('splash-container');
    splashContainer.style.display = 'flex';

    // 1. Definição dos Áudios
    const somVoo = new Audio('AUDIO/SomArremesso.mp3');
    const somImpacto = new Audio('IMG/impacto_crack.mp3');
    
    // NOVO: Som ambiente do site
    const somAmbiente = new Audio('AUDIO/temaGodofwar.mp3'); 
    somAmbiente.loop = false; // Faz a música repetir infinitamente
    somAmbiente.volume = 0;  // Começa no mudo para fazer o efeito de Fade-in

    const splashBg = document.getElementById('splash-black-bg');
    const axeWrapper = document.querySelector('.axe-wrapper');
    const axeImg = document.querySelector('.kratos-axe');
    const crack = document.querySelector('.screen-crack');

    document.body.style.overflow = 'hidden';

    // Início da animação do machado
    setTimeout(() => {
        axeWrapper.classList.add('animate-axe-move');
        somVoo.play();

        // Momento do Impacto
        setTimeout(() => {
            axeImg.classList.add('stop-spin');
            crack.classList.add('crack-visible');
            document.body.classList.add('shake-active');
            
            somVoo.pause();
            somImpacto.play();
            splashBg.style.opacity = '0';

            // --- INÍCIO DO SOM AMBIENTE ---
            // Começa a tocar logo após o impacto
            somAmbiente.play();
            
            // Efeito de Fade-in (aumenta o volume aos poucos em 2 segundos)
            let fadeAudio = setInterval(() => {
                if (somAmbiente.volume < 1.0) { // Volume máximo de 40% para não atrapalhar
                    somAmbiente.volume += 1.0;
                } else {
                    clearInterval(fadeAudio);
                }
            }, 200);
            // ------------------------------

            setTimeout(() => {
                document.body.classList.remove('shake-active');
            }, 300);

            setTimeout(() => {
                splashContainer.style.transition = 'opacity 1s';
                splashContainer.style.opacity = '0';
                
                setTimeout(() => {
                    splashContainer.remove();
                    document.body.style.overflow = 'auto';
                }, 1000);
            }, 3000);

        }, 700); 
    }, 500);
});




