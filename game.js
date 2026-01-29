const personagem = document.getElementById("personagem");
const caixaInfo = document.getElementById("caixa-info");
const conteudoInfo = document.getElementById("conteudo-info");
const comemoracao = document.getElementById("comemoracao");

/* CONTROLE DE VISITA */
const topicosVisitados = {
    dados: false,
    formacao: false,
    experiencia: false,
    redes: false,
    carta: false
};

let popupMostrado = false;

/* POSIÇÃO */
let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
const velocidade = 2.5;

function atualizarPosicao() {
    personagem.style.left = x + "px";
    personagem.style.top = y + "px";
    verificarColisoes();
}

/* JOYSTICK */
function configurarJoystick(id, callback) {
    const joystick = document.getElementById(id);
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
        const dist = Math.min(Math.sqrt(dx * dx + dy * dy), max);
        const ang = Math.atan2(dy, dx);

        const mx = Math.cos(ang) * dist;
        const my = Math.sin(ang) * dist;

        handle.style.transform = `translate(${mx - 21}px, ${my - 21}px)`;
        callback(mx / max, my / max);
    });
}

/* MOVIMENTO */
configurarJoystick("joystick-esquerdo", (dx, dy) => {
    x += dx * velocidade * 2;
    y += dy * velocidade * 2;
    atualizarPosicao();
});

configurarJoystick("joystick-direito", () => {});

/* COLISÕES */
function verificarColisoes() {
    verificarZona("zona-dados", dados, "dados");
    verificarZona("zona-formacao", formacao, "formacao");
    verificarZona("zona-experiencia", experiencia, "experiencia");
    verificarZona("zona-redes", redes, "redes");
    verificarZona("zona-carta", carta, "carta");
}

function verificarZona(id, func, chave) {
    const zona = document.getElementById(id).getBoundingClientRect();
    const p = personagem.getBoundingClientRect();

    if (
        p.right > zona.left &&
        p.left < zona.right &&
        p.bottom > zona.top &&
        p.top < zona.bottom
    ) {
        caixaInfo.style.display = "block";
        conteudoInfo.innerHTML = func();
        comemoracao.style.display = "block";

        if (!topicosVisitados[chave]) {
            topicosVisitados[chave] = true;
            verificarConclusao();
        }
    }
}

/* POPUP FINAL */
function verificarConclusao() {
    if (Object.values(topicosVisitados).every(v => v) && !popupMostrado) {
        popupMostrado = true;

        const popup = document.createElement("div");
        popup.id = "popup-parabens";
        popup.innerHTML = `
            <h2>Parabéns!</h2>
            <p>Você explorou todo o currículo interativo.</p>
        `;
        document.body.appendChild(popup);

        popup.style.display = "block";

        setTimeout(() => {
            popup.remove();
        }, 5000);
    }
}
