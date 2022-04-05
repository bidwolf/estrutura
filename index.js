const { Região } = require('./lib/Região');
const { Reta } = require('./lib/Reta');
const { Ponto } = require('./lib/Ponto');
const { Circulo } = require('./lib/Circulo');
const { gerarRegião1, gerarRegião3, gerarRegião4 } = require('./lib/utilities');

function whereIAm(ponto) {
    if (ponto instanceof Ponto) {
        let result = 5;
        for (let i = 0; i < regiões.length; i++) {
            if (elipse.contains(ponto)) {
                if (regiões[i].região.contains(ponto)) result = regiões[i].id;
            } else result = 2;
        }
        return result;
    } else throw new TypeError();
}
const dimensãoDoEixoX = 30;
const dimensãoDoEixoY = 30;

let pontoA = new Ponto(-1 * dimensãoDoEixoX / 6, 0);
let pontoB = new Ponto(0, dimensãoDoEixoY / 6);

let retaArea1 = new Reta(pontoA, pontoB);

let pontoC = new Ponto(dimensãoDoEixoX / 6, 0);
let pontoD = new Ponto(dimensãoDoEixoX / 4, dimensãoDoEixoY / 4);

let retaArea3 = new Reta(pontoC, pontoD);

let pontoE = new Ponto(0, dimensãoDoEixoY / 6);
let pontoF = new Ponto((dimensãoDoEixoX / 4), dimensãoDoEixoY / 4);

let retaArea4 = new Reta(pontoE, pontoF);

let elipse = new Circulo(0, 0, dimensãoDoEixoX / 3);
let settingsArea1 = gerarRegião1(retaArea1, dimensãoDoEixoX);
let settingsArea3 = gerarRegião3({ inicio: dimensãoDoEixoX / 6, fim: dimensãoDoEixoX / 4 }, retaArea3, elipse);
let settingsArea4 = gerarRegião4({ inicio: 0, fim: dimensãoDoEixoX / 4 }, retaArea4, elipse);

const regiões = [];
settingsArea1.forEach((setting) => regiões.push({ região: new Região(setting), id: 1 }));
settingsArea3.forEach((setting) => regiões.push({ região: new Região(setting), id: 3 }));
settingsArea4.forEach((setting) => regiões.push({ região: new Região(setting), id: 4 }));
let regionId = 2;
for (let x = -10; x <= 10; x++) {
    for (let y = -10; y <= 10; y++) {
        let ponto = new Ponto(x, y);
        console.log(`O ponto (${ponto.x},${ponto.y}) pertence a região número ${whereIAm(ponto)}`);
    }
}