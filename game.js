const personagem = document.getElementById("personagem");
const caixaInfo = document.getElementById("caixa-info");
const conteudoInfo = document.getElementById("conteudo-info");
const comemoracao = document.getElementById("comemoracao");

let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
const velocidade = 3;

let direcaoAtual = null;
let intervaloMovimento = null;

/* Movimento contínuo */
function iniciarMovimento(direcao) {
    direcaoAtual = direcao;

    if (intervaloMovimento) return;

    intervaloMovimento = setInterval(() => {
        if (direcaoAtual === "cima") y -= velocidade;
        if (direcaoAtual === "baixo") y += velocidade;
        if (direcaoAtual === "esquerda") x -= velocidade;
        if (direcaoAtual === "direita") x += velocidade;

        personagem.style.left = x + "px";
        personagem.style.top = y + "px";

        verificarColisoes();
    }, 16);
}

function pararMovimento() {
    clearInterval(intervaloMovimento);
    intervaloMovimento = null;
    direcaoAtual = null;
}

/* Eventos touch e mouse */
document.querySelectorAll("#controles button").forEach(botao => {
    const dir = botao.dataset.dir;

    botao.addEventListener("touchstart", e => {
        e.preventDefault();
        iniciarMovimento(dir);
    });

    botao.addEventListener("touchend", pararMovimento);
    botao.addEventListener("touchcancel", pararMovimento);

    botao.addEventListener("mousedown", () => iniciarMovimento(dir));
    botao.addEventListener("mouseup", pararMovimento);
    botao.addEventListener("mouseleave", pararMovimento);
});

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

/* Conteúdos */
function dados() {
return `
<h3>Dados Pessoais</h3>
<p><strong>Nacionalidade:</strong> Brasileira</p>
<p><strong>Nascimento:</strong> 25/10/2002</p>
<p><strong>Endereço:</strong> Zona Sul – São Paulo</p>
<p><strong>Celular:</strong> (11) 9 1422-2424</p>
<p><strong>E-mail:</strong> caueribeiroferreira@gmail.com</p>
`;
}

function formacao() {
return `
<h3>Formação</h3>
<p><strong>Uninter</strong></p>
<p>Análise e Desenvolvimento de Sistemas</p>
<p>2025 – 2027</p>
<p>Excel Básico – Fundação Bradesco</p>
`;
}

function experiencia() {
return `
<h3>Experiência</h3>
<p><strong>Hairline</strong> (2024–2025)</p>
<p>Vendas, caixa, estoque e e-commerce</p>
<p><strong>Cocadinha</strong> (2023)</p>
<p>Atendimento e estoque</p>
`;
}

function redes() {
return `
<h3>Redes</h3>
<p>GitHub: Caue2002</p>
<p>LinkedIn: ribeiroferreiracaue</p>
`;
}

function carta() {
return `
<h3>Carta</h3>
<p>
Sou estudante de Análise e Desenvolvimento de Sistemas, com grande interesse
em iniciar minha carreira em Tecnologia da Informação, buscando aprendizado
contínuo e aplicação prática dos conhecimentos.
</p>
`;
}
