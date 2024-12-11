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

const enunciado = document.getElementById("enunciado");
const alternativa1 = document.querySelector(".alternativa1");
const alternativa2 = document.querySelector(".alternativa2");
const alternativa3 = document.querySelector(".alternativa3");
const alternativa4 = document.querySelector(".alternativa4");

function exibePergunta(numero) {
  enunciado.innerText = perguntas[numero].enunciado;
  alternativa1.innerText = perguntas[numero].alternativas[0];
  alternativa2.innerText = perguntas[numero].alternativas[1];
  alternativa3.innerText = perguntas[numero].alternativas[2];
  alternativa4.innerText = perguntas[numero].alternativas[3];
}

// Gera um número aleatório entre 0 e o total de perguntas
const geraNumeroAleatorio = () => Math.floor(Math.random() * perguntas.length);

exibePergunta(geraNumeroAleatorio());
