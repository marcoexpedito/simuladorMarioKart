const player1 = {
    name: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
}

const player2 = {
    name: "Peach",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 2,
    pontos: 0,
};

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random()
    let result;


    switch (true) {
        case random < 0.33:
            result = "reta"
            break;
        case random < 0.66:
            result = "curva"
            break;    
        default:
            result = "confronto"
    }

    return result;
    
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`);


        // sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);


        // rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    // teste de habilidade 
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if(block === "reta") {
        totalTestSkill1 = diceResult1 + character1.velocidade;
        totalTestSkill2 = diceResult2 + character2.velocidade;

        await logRollResult(
            character1.name, 
            "velocidade", 
            diceResult1, 
            character1.velocidade
        )
        await logRollResult(
            character2.name, 
            "velocidade", 
            diceResult2, 
            character2.velocidade
        )
        
    } 
    if(block === "curva") {
        totalTestSkill1 = diceResult1 + character1.manobrabilidade;
        totalTestSkill2 = diceResult2 + character2.manobrabilidade;

        await logRollResult(
            character1.name, 
            "manobrabilidade", 
            diceResult1, 
            character1.manobrabilidade
        )
        await logRollResult(
            character2.name, 
            "manobrabilidade", 
            diceResult2, 
            character2.manobrabilidade
        )
    } 
    if(block === "confronto") {
        let powerResult1= diceResult1 + character1.poder;
        let powerResult2 = diceResult2 + character2.poder;

        console.log(`${character1.name} confrontou com ${character2.name}! 🥊`);

        await logRollResult(
            character1.name, 
            "poder", 
            diceResult1, 
            character1.poder
        );

        await logRollResult(
            character2.name, 
            "poder", 
            diceResult2, 
            character2.poder
        );

        if(powerResult1 > powerResult2 && character2.pontos > 0){
            console.log(
                `${character1.name} venceu o confronto! ${character2.name} perdeu 1 ponto 🐢`
            );
                character2.pontos--;
            }
        if(powerResult2 > powerResult1 && character1.pontos > 0){
            console.log(
                `${character2.name} venceu o confronto! ${character1.name} perdeu 1 ponto 🐢`
            );
                character1.pontos--;
            }
        console.log(
            powerResult2 === powerResult1 
            ? "Confronto empatado! Nenhum ponto foi perdido"
            : ""
        );
    }

    // verificando o vencedor

    if(totalTestSkill1 > totalTestSkill2) {
         console.log(`${character1.name} marcou um ponto!`);
        character1.pontos++;
    } else if(totalTestSkill2 > totalTestSkill1){
        console.log(`${character2.name} marcou um ponto!`);
        character2.pontos++;
    }

    console.log("--------------------------------------------------");
    }
}

async function declareWinner(character1, character2) {
    console.log("Resultado Final: ");
    console.log(`${character1.name}: ${character1.pontos} ponto(s)`);
    console.log(`${character2.name}: ${character2.pontos} ponto(s)`);

    if (character1.pontos > character2.pontos) {
        console.log(`\n${character1.name} venceu a corrida! Parabéns! 🏆`);
    } else if (character2.pontos > character1.pontos){
        console.log(`\n${character2.name} venceu a corrida! Parabéns! 🏆`);
    } else console.log("A corrida terminou empatada!");
    
}

(async function main() {
    console.log(
        `🏁🚨 Corrida entre ${player1.name} e ${player2.name} começando... \n`
    );

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();