// Conjunto de perguntas, alternativas e respostas
// Você pode adicionar mais perguntas, alternativas e respostas
const perguntas = [
  {
    enunciado: "Qual é o maior planeta do sistema solar?",
    alternativas: ["Júpiter", "Saturno", "Urano", "Netuno"],
    resposta: "Júpiter",
  },
  {
    enunciado: "Qual é o menor planeta do sistema solar?",
    alternativas: ["Mercúrio", "Vênus", "Marte", "Plutão"],
    resposta: "Mercúrio",
  },
];

// Tabela de pontuação para cada rodada
const tabelaPontuacao = [
  { acertar: "R$ 1 mil", parar: "R$ 0", errar: "R$ 0" },
  { acertar: "R$ 2 mil", parar: "R$ 1 mil", errar: "R$ 500" },
  { acertar: "R$ 3 mil", parar: "R$ 2 mil", errar: "R$ 1 mil" },
  { acertar: "R$ 4 mil", parar: "R$ 3 mil", errar: "R$ 1.500" },
  { acertar: "R$ 5 mil", parar: "R$ 4 mil", errar: "R$ 2 mil" },
  { acertar: "R$ 10 mil", parar: "R$ 5 mil", errar: "R$ 2.500" },
  { acertar: "R$ 20 mil", parar: "R$ 10 mil", errar: "R$ 5 mil" },
  { acertar: "R$ 30 mil", parar: "R$ 20 mil", errar: "R$ 10 mil" },
  { acertar: "R$ 40 mil", parar: "R$ 30 mil", errar: "R$ 15 mil" },
  { acertar: "R$ 60 mil", parar: "R$ 40 mil", errar: "R$ 20 mil" },
  { acertar: "R$ 80 mil", parar: "R$ 60 mil", errar: "R$ 30 mil" },
  { acertar: "R$ 100 mil", parar: "R$ 80 mil", errar: "R$ 40 mil" },
  { acertar: "R$ 200 mil", parar: "R$ 100 mil", errar: "R$ 50 mil" },
  { acertar: "R$ 300 mil", parar: "R$ 200 mil", errar: "R$ 100 mil" },
  { acertar: "R$ 400 mil", parar: "R$ 300 mil", errar: "R$ 150 mil" },
  { acertar: "R$ 500 mil", parar: "R$ 400 mil", errar: "R$ 200 mil" },
  { acertar: "R$ 1 milhão", parar: "R$ 500 mil", errar: "R$ 0" },
];

// Captura os elementos do HTML
const alts = document.querySelectorAll(".alternativas .box");
const btnPerguntar = document.getElementById("btnPerguntar");
const btnParar = document.getElementById("btnParar");
const enunciado = document.getElementById("enunciado");
const alternativa1 = document.querySelector(".alternativa1");
const alternativa2 = document.querySelector(".alternativa2");
const alternativa3 = document.querySelector(".alternativa3");
const alternativa4 = document.querySelector(".alternativa4");
const boxErrar = document.querySelector(".pontuacao .errar");
const boxParar = document.querySelector(".pontuacao .parar");
const boxAcertar = document.querySelector(".pontuacao .acertar");
const mensagem = document.querySelector(".right");

// Verifica se a rodada já foi iniciada
if (localStorage.getItem("rodada") === null) {
  rodada = 0;
  localStorage.setItem("rodada", rodada);
} else {
  rodada = localStorage.getItem("rodada");
}

// Gera um número aleatório entre 0 e o total de perguntas
const geraNumeroAleatorio = () => Math.floor(Math.random() * perguntas.length);

if (localStorage.getItem("numPergunta") === null) {
  numPergunta = geraNumeroAleatorio();
  localStorage.setItem("numPergunta", numPergunta);
} else {
  numPergunta = localStorage.getItem("numPergunta");
}

// Função para atualizar a pontuação nos boxes inferiores
const atualizaPontuacao = () => {
  boxAcertar.innerHTML = tabelaPontuacao[rodada].acertar;
  boxErrar.innerHTML = tabelaPontuacao[rodada].errar;
  boxParar.innerHTML = tabelaPontuacao[rodada].parar;
};

// Exibe a pergunta no HTML, nos boxes de alternativas
const exibePergunta = (numero) => {
  enunciado.innerText = perguntas[numero].enunciado;
  [
    alternativa1.innerText,
    alternativa2.innerText,
    alternativa3.innerText,
    alternativa4.innerText,
  ] = perguntas[numero].alternativas;
  btnPerguntar.disabled = true;
  atualizaPontuacao();
  document.querySelector(".selecionada")?.classList.remove("selecionada");
};

// Define o comportamento ao clicar nas alternativas
alts.forEach((box) => {
  box.addEventListener("click", (event) => {
    document.querySelector(".selecionada")?.classList.remove("selecionada");
    event.target.classList.add("selecionada");
    btnPerguntar.disabled = false;
    mensagem.innerText = "";
  });
});

// Define o comportamento do botão Parar
btnParar.addEventListener("click", () => {
  delete localStorage.rodada;
  delete localStorage.numPergunta;
  mensagem.innerText = "Você parou o jogo!\nLevou apenas " + boxParar.innerHTML;
  rodada = 0;
  proximaPergunta();
});

// Define o comportamento do botão Perguntar
btnPerguntar.addEventListener("click", () => {
  if (document.querySelector(".selecionada") === null) {
    mensagem.innerText = "Selecione uma alternativa!";
    return;
  }

  const resposta = perguntas[numPergunta].resposta;
  const alternativa = document.querySelector(".selecionada").innerText;

  if (resposta === alternativa) {
    mensagem.innerText = "Você acertou!\nGanhou " + boxAcertar.innerHTML;
    rodada++;
    localStorage.rodada = rodada;
  } else {
    mensagem.innerText = "Você errou!\nGanhou apenas " + boxErrar.innerHTML;
    delete localStorage.rodada;
    rodada = 0;
  }

  proximaPergunta();
});

const proximaPergunta = () => {
  numPergunta = geraNumeroAleatorio();
  localStorage.numPergunta = numPergunta;
  exibePergunta(numPergunta);
};

// Inicia o jogo, exibindo a primeira pergunta
proximaPergunta();
