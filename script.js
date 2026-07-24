/* ==========================
   ABRIR CONVITE - COM VÍDEO DO VIMEO
========================== */

function abrirConvite() {
    const abertura = document.getElementById("abertura");
    const telaVideo = document.getElementById("tela-video");
    const loading = document.getElementById("video-loading");

    abertura.style.display = "none";
    
    telaVideo.classList.add("ativo");
    telaVideo.style.display = "flex";

    inicializarPlayerVimeo();

    setTimeout(() => {
        if (loading) {
            loading.classList.add("hidden");
        }
    }, 3000);

    const duracaoVideo = 46000; // 30 segundos - ALTERE AQUI
    
    setTimeout(() => {
        if (document.getElementById("convite").style.display !== "block") {
            mostrarConvite();
        }
    }, duracaoVideo + 2000);
}

/* ==========================
   PLAYER DO VIMEO
========================== */

let playerVimeo = null;

function inicializarPlayerVimeo() {
    const iframe = document.getElementById('video-convite');
    if (iframe) {
        playerVimeo = new Vimeo.Player(iframe);
        
        playerVimeo.on('loaded', function() {
            console.log('Vídeo do Vimeo carregado!');
            const btnSom = document.getElementById('btn-ativar-som');
            if (btnSom) {
                btnSom.style.display = 'block';
            }
        });
    }
}

/* ==========================
   ATIVAR SOM DO VÍDEO
========================== */

function ativarSomVideo() {
    if (playerVimeo) {
        playerVimeo.setVolume(1).then(function() {
            console.log('Som ativado!');
            const btn = document.getElementById('btn-ativar-som');
            if (btn) {
                btn.classList.add('ativo');
                btn.innerHTML = '🔊';
                const aviso = document.querySelector('.video-aviso');
                if (aviso) {
                    aviso.style.opacity = '0.3';
                }
            }
        }).catch(function(error) {
            console.error('Erro ao ativar som:', error);
        });
    } else {
        console.log('Player do Vimeo não inicializado, tentando novamente...');
        inicializarPlayerVimeo();
        setTimeout(ativarSomVideo, 1000);
    }
}

/* ==========================
   MOSTRAR CONVITE
========================== */

function mostrarConvite() {
    const telaVideo = document.getElementById("tela-video");
    const convite = document.getElementById("convite");
    const musica = document.getElementById("musica");

    telaVideo.classList.remove("ativo");
    telaVideo.style.display = "none";

    convite.style.display = "block";
    convite.style.opacity = "1";

    // ===== REPRODUÇÃO AUTOMÁTICA CORRIGIDA =====
    const playMusic = function() {
        musica.play().then(() => {
            console.log("🎵 Música reproduzindo!");
            const btn = document.querySelector(".btn-musica");
            if (btn) btn.textContent = "🔊";
        }).catch((err) => {
            console.log("⚠️ Reprodução automática bloqueada. Aguardando interação.", err);
            // Tenta novamente quando o usuário clicar em qualquer lugar
            document.addEventListener('click', function tocarNaInteracao() {
                musica.play().then(() => {
                    console.log("🎵 Música ativada após clique do usuário!");
                    const btn = document.querySelector(".btn-musica");
                    if (btn) btn.textContent = "🔊";
                }).catch((e) => {
                    console.log("❌ Erro ao reproduzir:", e);
                });
                document.removeEventListener('click', tocarNaInteracao);
            }, { once: true });
        });
    };

    // Pequeno atraso para garantir que o DOM está pronto
    setTimeout(playMusic, 100);

    iniciarElementos();
}

/* ==========================
   PULAR VÍDEO
========================== */

function pularVideo() {
    mostrarConvite();
}

/* ==========================
   INICIAR ELEMENTOS
========================== */

function iniciarElementos() {
    if (!window.elementosAtivos) {
        window.elementosAtivos = true;
        
        setInterval(() => criarElemento("🦋", "borboleta"), 2000);
        setInterval(() => criarElemento("🌸", "flor"), 3000);
        setInterval(() => criarElemento("💝", "flor"), 5000);
        setInterval(() => criarElemento("✨", "flor"), 4000);
    }
}

/* ==========================
   CRIAR ELEMENTOS
========================== */

function criarElemento(emoji, classe) {
    const convite = document.getElementById("convite");
    if (convite.style.display !== "block") return;
    
    const elemento = document.createElement("div");
    elemento.innerHTML = emoji;
    elemento.classList.add(classe);
    elemento.style.left = Math.random() * window.innerWidth + "px";
    elemento.style.animationDuration = (10 + Math.random() * 10) + "s";
    elemento.style.fontSize = (20 + Math.random() * 20) + "px";
    document.body.appendChild(elemento);

    setTimeout(() => {
        elemento.remove();
    }, 20000);
}

/* ==========================
   CONTROLE DE MÚSICA
========================== */

function alternarMusica() {
    const musica = document.getElementById("musica");
    const btn = document.querySelector(".btn-musica");

    if (musica.paused) {
        musica.play().then(() => {
            btn.textContent = "🔊";
            console.log("🔊 Música ligada manualmente");
        }).catch((err) => {
            console.log("❌ Erro ao ligar música:", err);
        });
    } else {
        musica.pause();
        btn.textContent = "🔇";
        console.log("🔇 Música pausada manualmente");
    }
}

/* ==========================
   SLIDESHOW
========================== */

const slides = document.querySelectorAll(".slide");
const indicadores = document.querySelectorAll(".indicador");
let slideAtual = 0;

function trocarSlide(index) {
    slides.forEach(s => s.classList.remove("ativo"));
    indicadores.forEach(i => i.classList.remove("ativo"));

    if (index !== undefined) {
        slideAtual = index;
    } else {
        slideAtual++;
        if (slideAtual >= slides.length) {
            slideAtual = 0;
        }
    }

    slides[slideAtual].classList.add("ativo");
    indicadores[slideAtual].classList.add("ativo");
}

function irParaSlide(index) {
    clearInterval(intervaloSlide);
    trocarSlide(index);
    intervaloSlide = setInterval(() => trocarSlide(), 5000);
}

let intervaloSlide = setInterval(() => trocarSlide(), 5000);

/* ==========================
   CONTAGEM REGRESSIVA
========================== */

const dataEvento = new Date(2026, 7, 23, 14, 0, 0);

function atualizarContador() {
    const agora = new Date();
    const diferenca = dataEvento.getTime() - agora.getTime();

    if (diferenca <= 0) {
        document.getElementById("contador").innerHTML = 
            `<div class="contador-grid">
                <div>
                    <span>🎉</span>
                    <small>A festa começou!</small>
                </div>
            </div>`;
        return;
    }

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    document.getElementById("contador").innerHTML = `
        <div class="contador-grid">
            <div>
                <span>${String(dias).padStart(2, '0')}</span>
                <small>Dias</small>
            </div>
            <div>
                <span>${String(horas).padStart(2, '0')}</span>
                <small>Horas</small>
            </div>
            <div>
                <span>${String(minutos).padStart(2, '0')}</span>
                <small>Min</small>
            </div>
            <div>
                <span>${String(segundos).padStart(2, '0')}</span>
                <small>Seg</small>
            </div>
        </div>
    `;
}

setInterval(atualizarContador, 1000);
atualizarContador();

/* ==========================
   SCROLL SUAVE
========================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const alvo = document.querySelector(this.getAttribute("href"));
        if (alvo) {
            alvo.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

console.log("🦋 Jardim das Borboletas carregado com sucesso!");
console.log("🎀 Feliz Aniversário, Manuela!");

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

document.addEventListener('DOMContentLoaded', function() {
    const convite = document.getElementById("convite");
    if (convite.style.display === "block") {
        iniciarElementos();
    }
});

console.log("🦋 Todos os sistemas prontos! 🎀");
