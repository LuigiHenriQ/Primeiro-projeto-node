// 1. Lista com todos os personagens disponíveis
const players = [
  { nome: "Mario", velocidade: 4, manobrabilidade: 3, poder: 3, pontos: 0 },
  { nome: "Luigi", velocidade: 3, manobrabilidade: 4, poder: 4, pontos: 0 },
  { nome: "Peach", velocidade: 3, manobrabilidade: 2, poder: 2, pontos: 0 },
  { nome: "Yoshi", velocidade: 2, manobrabilidade: 4, poder: 3, pontos: 0 },
  { nome: "Bowser", velocidade: 5, manobrabilidade: 2, poder: 5, pontos: 0 },
  { nome: "Donkey Kong", velocidade: 2, manobrabilidade: 2, poder: 5, pontos: 0 }
];

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1; // Gera um número aleatório entre 1 e 6
}

async function getRandomBlock() {
  let random = Math.random();  
  let result;

  switch (true) {
    case random < 0.33:
      result = "reta";
      break;
    case random < 0.66:
      result = "curva";
      break;
    default:
      result = "confronto";
      break;
  }

  return result;
}

async function logRollResult(player, diceResult, block, attribute) {
    console.log(`${player.nome} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(player1, player2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🔄 Rodada ${round}`);
    
    // Sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco sorteado: ${block}`);

    // Rolar os dados
    let diceresult1 = await rollDice();
    let diceresult2 = await rollDice();

    // Teste de habilidade
    let TotalTestSkill1 = 0;
    let TotalTestSkill2 = 0;

    if (block === "reta") {
      TotalTestSkill1 = diceresult1 + player1.velocidade;
      TotalTestSkill2 = diceresult2 + player2.velocidade;

      await logRollResult(player1, diceresult1, block, player1.velocidade);
      await logRollResult(player2, diceresult2, block, player2.velocidade);
    }
    
    if (block === "curva") {
      TotalTestSkill1 = diceresult1 + player1.manobrabilidade;
      TotalTestSkill2 = diceresult2 + player2.manobrabilidade;

      await logRollResult(player1, diceresult1, block, player1.manobrabilidade);
      await logRollResult(player2, diceresult2, block, player2.manobrabilidade);
    }
    
    if (block === "confronto") {
      let powerResult1 = diceresult1 + player1.poder;
      let powerResult2 = diceresult2 + player2.poder;

      console.log(`${player1.nome} confrontou com poder ${player2.nome}!`);

      await logRollResult(player1, diceresult1, block, player1.poder);
      await logRollResult(player2, diceresult2, block, player2.poder);

      // Penaliza o jogador perdedor
      if (powerResult1 > powerResult2 && player2.pontos > 0) {
        console.log(`${player1.nome} venceu o confronto e ${player2.nome} perde um ponto! 🐢`);
        player2.pontos--;
      }
      if (powerResult2 > powerResult1 && player1.pontos > 0) {
        console.log(`${player2.nome} venceu o confronto e ${player1.nome} perde um ponto! 🐢`);
        player1.pontos--;
      }

      console.log(powerResult1 === powerResult2 ? "🤝 Empate no confronto! Nenhum jogador perde pontos." : "");
    }

    // 🏁 VERIFICANDO O VENCEDOR DA RODADA
    if (block !== "confronto") {
      if (TotalTestSkill1 > TotalTestSkill2) {
        console.log(`🏆 ${player1.nome} marcou ponto!`);
        player1.pontos++;
      } else if (TotalTestSkill2 > TotalTestSkill1) {
        console.log(`🏆 ${player2.nome} marcou ponto!`);
        player2.pontos++;
      } else {
        console.log("🤝 Rodada empatada! Ninguém pontuou.");
      }
    }

    console.log("_________________________________\n");
  }
}
   
async function declareWinner(player1, player2) {
  console.log("🏁 Corrida finalizada! Placar final:");
  console.log(`${player1.nome}: ${player1.pontos} ponto(s)`);
  console.log(`${player2.nome}: ${player2.pontos} ponto(s)`);

  if (player1.pontos > player2.pontos) {
    console.log(`\n 🎉 ${player1.nome} é o vencedor!`);
  } else if (player2.pontos > player1.pontos) {
    console.log(`\n 🎉 ${player2.nome} é o vencedor!`);
  } else {
    console.log(`\n 🤝 A corrida terminou empatada!`);
  }
}

// 3. Função principal modificada para realizar o sorteio dinâmico
(async function main() {
  // Sorteia o primeiro jogador
  const index1 = Math.floor(Math.random() * players.length);
  
  // Sorteia o segundo jogador garantindo que não seja igual ao primeiro
  let index2 = Math.floor(Math.random() * players.length);
  while (index2 === index1) {
    index2 = Math.floor(Math.random() * players.length);
  }

  // Usamos o operador spread (...) para criar cópias independentes dos objetos.
  // Isso garante que os pontos comecem sempre em 0 a cada execução.
  const player1 = { ...players[index1], pontos: 0 };
  const player2 = { ...players[index2], pontos: 0 };

  console.log(`🏁🏎️ 💨 Corrida aleatória entre ${player1.nome} e ${player2.nome} começando... \n`);

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();