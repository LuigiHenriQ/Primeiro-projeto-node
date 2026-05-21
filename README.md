# Primeiro-projeto-node
🏎️ Um simulador de corrida dinâmico baseado no universo de Mario Kart, desenvolvido em JavaScript (Node.js) utilizando lógica de atributos, dados e programação assíncrona.

# 🏎️ Mario Kart JS - Simulator

Este é um projeto desenvolvido em JavaScript (Node.js) que simula uma corrida de 5 rodadas entre os personagens clássicos do universo Mario Kart. O motor da corrida calcula os resultados combinando a sorte dos dados com os atributos específicos de cada corredor.

## 🚀 Funcionalidades Principais

* **Seleção Aleatória e Inteligente:** A cada execução, o script sorteia dois corredores diferentes (sem repetição) a partir de um pool de personagens (Mario, Luigi, Peach, Yoshi, Bowser e Donkey Kong).
* **Atributos Personalizados:** Cada personagem possui uma distribuição única de pontos em **Velocidade**, **Manobrabilidade** e **Poder**.
* **Pistas Dinâmicas:** O sistema sorteia blocos de pista a cada rodada:
  * **Retas:** Testam a *Velocidade* dos personagens.
  * **Curvas:** Testam a *Manobrabilidade*.
  * **Confrontos:** Uma disputa direta de *Poder* onde o perdedor pode perder pontos na tabela!
* **Fluxo Assíncrono:** Construído utilizando funções `async/await` para simular o andamento da corrida passo a passo diretamente no terminal.

## 🛠️ Tecnologias Utilizadas

* **JavaScript (ES6+)**
* **Node.js** (Ambiente de execução)
