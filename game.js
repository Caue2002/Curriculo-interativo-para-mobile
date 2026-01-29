const personagem = document.getElementById("personagem");
const caixaInfo = document.getElementById("caixa-info");
const conteudoInfo = document.getElementById("conteudo-info");
const comemoracao = document.getElementById("comemoracao");

let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;

let dirX = 0;
let dirY = 0;

const velocidade = 2.2;

/* Loop de movimento */
function atualizar() {
    posX += dirX * velocidade;
    posY += dirY * velocidade;

    personagem.style.left = posX + "px";
    personagem.style.top = posY + "px";

    verificarColisoes();
    requestAnimationFrame(atualizar);
}
requestAnimationFrame(atualizar);

/* Colisões */
function verificarColisoes() {
    verificarZona("zona-dados", dados());
    verificarZona("zona-formacao", formacao());
    verificarZona("zona-experiencia", experiencia());
    verificarZona("zona-redes", redes());
    verificarZona("zona-carta", carta());
}

function verificarZona(id, conteudo) {
    const zona = document.getElementById(id).getBoundingClientRect();
    const p = personagem.getBoundingClientRect();

    if (
        p.right > zona.left &&
        p.left < zona.right &&
        p.bottom > zona.top &&
        p.top < zona.bottom
    ) {
        caixaInfo.style.display = "block";
        conteudoInfo.innerHTML = conteudo;
        comemoracao.style.display = "block";
    }
}

/* JOYSTICK */
const base = document.getElementById("joystick-base");
const stick = document.getElementById("joystick-stick");

let ativo = false;

base.addEventListener("touchstart", e => {
    ativo = true;
});

base.addEventListener("touchend", () => {
    ativo = false;
    dirX = 0;
    dirY = 0;
    stick.style.transform = "translate(0,0)";
});

base.addEventListener("touchmove", e => {
    if (!ativo) return;

    const rect = base.getBoundingClientRect();
    const touch = e.touches[0];

    const dx = touch.clientX - (rect.left + rect.width / 2);
    const dy = touch.clientY - (rect.top + rect.height / 2);

    const dist = Math.min(30, Math.hypot(dx, dy));
    const ang = Math.atan2(dy, dx);

    stick.style.transform =
        `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist}px)`;

    dirX = Math.cos(ang);
    dirY = Math.sin(ang);
});

/* Conteúdos – preservados */
function dados() {
return `
<h3>Dados Pessoais</h3>
<p><strong>Nacionalidade:</strong> Brasileira</p>
<p><strong>Data de nascimento:</strong> 25/10/2002</p>
<p><strong>Endereço:</strong> Zona Sul, São Paulo</p>
<p><strong>Celular:</strong> (11) 9 1422-2424</p>
<p><strong>E-mail:</strong> caueribeiroferreira@gmail.com</p>
`;
}

function formacao() {
return `
<h3>Formação & Conhecimentos</h3>
<p><strong>Faculdade Uninter</strong></p>
<p>Análise e Desenvolvimento de Sistemas</p>
<p>2025 – 2027</p>
<p>Excel Básico – Fundação Bradesco</p>
`;
}

function experiencia() {
return `
<h3>Experiência & Habilidades</h3>
<p><strong>Hairline</strong> (2024–2025)</p>
<p>Vendas, caixa, estoque e e-commerce</p>
<p><strong>Cocadinha</strong> (2023)</p>
<p>Atendimento ao cliente</p>
`;
}

function redes() {
return `
<h3>Redes Sociais</h3>
<p>GitHub: Caue2002</p>
<p>LinkedIn: ribeiroferreiracaue</p>
`;
}

function carta() {
return `
<h3>Carta de Apresentação</h3>
<p>
Sou estudante de Análise e Desenvolvimento de Sistemas,
buscando iniciar minha carreira em Tecnologia da Informação,
com foco em aprendizado contínuo e aplicação prática.
</p>
`;
}
