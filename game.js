const personagem = document.getElementById("personagem");
const caixaInfo = document.getElementById("caixa-info");
const conteudoInfo = document.getElementById("conteudo-info");
const comemoracao = document.getElementById("comemoracao");
const popupFinal = document.getElementById("popup-final");

let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
const velocidade = 2.5;

const vistos = new Set();

/* ATUALIZA POSIÇÃO */
function atualizarPosicao() {
    personagem.style.left = x + "px";
    personagem.style.top = y + "px";
    verificarColisoes();
}

/* JOYSTICK */
const joystick = document.getElementById("joystick");
const handle = joystick.querySelector(".joystick-handle");
let ativo = false;

joystick.addEventListener("touchstart", e => {
    ativo = true;
    e.preventDefault();
});

joystick.addEventListener("touchend", () => {
    ativo = false;
    handle.style.transform = "translate(-50%, -50%)";
});

joystick.addEventListener("touchmove", e => {
    if (!ativo) return;

    const touch = e.touches[0];
    const rect = joystick.getBoundingClientRect();

    const dx = touch.clientX - (rect.left + rect.width / 2);
    const dy = touch.clientY - (rect.top + rect.height / 2);

    const max = 35;
    const dist = Math.min(Math.sqrt(dx*dx + dy*dy), max);
    const ang = Math.atan2(dy, dx);

    const mx = Math.cos(ang) * dist;
    const my = Math.sin(ang) * dist;

    handle.style.transform = `translate(${mx - 20}px, ${my - 20}px)`;

    x += (mx / max) * velocidade;
    y += (my / max) * velocidade;

    x = Math.max(0, Math.min(window.innerWidth, x));
    y = Math.max(0, Math.min(window.innerHeight, y));

    atualizarPosicao();
});

/* COLISÕES */
function verificarColisoes() {
    verificarZona("zona-dados");
    verificarZona("zona-formacao");
    verificarZona("zona-experiencia");
    verificarZona("zona-redes");
    verificarZona("zona-carta");

    if (vistos.size === 5) {
        popupFinal.style.display = "flex";
        setTimeout(() => popupFinal.style.display = "none", 5000);
    }
}

function verificarZona(id) {
    const zona = document.getElementById(id).getBoundingClientRect();
    const p = personagem.getBoundingClientRect();

    if (
        p.right > zona.left &&
        p.left < zona.right &&
        p.bottom > zona.top &&
        p.top < zona.bottom
    ) {
        caixaInfo.style.display = "block";
        comemoracao.style.display = "block";
        vistos.add(id);
    }
}

atualizarPosicao();
