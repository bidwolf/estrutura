const { Circulo } = require("./Circulo");
const { Ponto } = require("./Ponto");
const { Reta } = require("./Reta");

exports.__notF__ = function(f) {
    let originalFunction = f;
    f = function(args) {
        return !originalFunction(args);
    };
    return f;
};

function intervaloNoEixoX(inicio, fim) {
    if (typeof inicio == 'function')
        if (typeof fim == 'function')
            return function(ponto) { return inicio(ponto.y) <= ponto.x && ponto.x <= fim(ponto.y); };
        else throw new TypeError();
    else return function(ponto) { return inicio <= ponto.x && ponto.x <= fim; };
}

function intervaloNoEixoY(inicio, fim) {
    if (typeof inicio == 'function')
        if (typeof fim == 'function')
            return function(ponto) { return inicio(ponto.x) <= ponto.y && ponto.y <= fim(ponto.x); };
        else throw new TypeError();
    else return function(ponto) { return inicio <= ponto.y && ponto.y <= fim; };

}

function configurarRegião(intervaloX, intervaloY) {
    return {
        ruleX: intervaloX,
        ruleY: intervaloY
    };
}

function chamar(obj, método) {
    return function(x) {
        return obj[método](x);
    };
}

function gerarRegião1(reta, dimensãoDoEixoX) {
    let inicio = -dimensãoDoEixoX / 6,
        fim = 0;

    let settings = [
        configurarRegião(intervaloNoEixoX(inicio, fim), intervaloNoEixoY((x) => 0, chamar(reta, 'f'))),
        configurarRegião(intervaloNoEixoX(fim, -1 * inicio), intervaloNoEixoY(chamar(reta, 'inversaDef'), (x) => 0)),
        configurarRegião(intervaloNoEixoX(inicio, fim), intervaloNoEixoY(chamar(reta, 'imparDef'), (x) => 0)),
        configurarRegião(intervaloNoEixoX(fim, -inicio), intervaloNoEixoY((x) => 0, chamar(reta, 'inversaDaImparDef')))
    ];
    return settings;
}

function gerarRegião4(intervaloX, reta, circulo) {
    if (reta instanceof Reta && circulo instanceof Circulo) {
        let settings = [
            configurarRegião(intervaloNoEixoX(intervaloX.inicio, intervaloX.fim), intervaloNoEixoY(chamar(reta, 'f'), chamar(circulo, 'f'))),
            configurarRegião(intervaloNoEixoX(intervaloX.inicio, intervaloX.fim), intervaloNoEixoY(chamar(circulo, 'negative_f'), chamar(reta, 'imparDef'))),
            configurarRegião(intervaloNoEixoX(intervaloX.inicio, -1 * intervaloX.fim), intervaloNoEixoY(chamar(reta, 'parDef'), chamar(circulo, 'f'))),
            configurarRegião(intervaloNoEixoX(intervaloX.inicio, -1 * intervaloX.fim), intervaloNoEixoY(chamar(circulo, 'negative_f'), chamar(reta, 'inversaDaParDef'))),
        ];
        return settings;
    } else throw new TypeError();

}

function gerarRegião3(intervaloY, reta, circulo) {

    if (reta instanceof Reta) {
        if (circulo instanceof Circulo) {
            let retaInversa = Reta.inversa(reta);

            for (let y = 0; y <= 10; y++) {}
            let settings = [

                configurarRegião(intervaloNoEixoX(chamar(retaInversa, 'f'), chamar(circulo, 'f')), intervaloNoEixoY(intervaloY.inicio, intervaloY.fim)),
                configurarRegião(intervaloNoEixoX(chamar(retaInversa, 'imparDef'), chamar(circulo, 'f')), intervaloNoEixoY(intervaloY.inicio, -intervaloY.fim)),
                configurarRegião(intervaloNoEixoX(chamar(circulo, 'negative_f'), chamar(Reta.impar(retaInversa), 'parDef')), intervaloNoEixoY(intervaloY.inicio, -intervaloY.fim)),
                configurarRegião(intervaloNoEixoX(chamar(circulo, 'negative_f'), chamar(retaInversa, 'parDef')), intervaloNoEixoY(intervaloY.inicio, intervaloY.fim)),

            ];
            return settings;
        } else throw new TypeError();
    } else throw new TypeError();
}

exports.gerarRegião3 = gerarRegião3;
exports.gerarRegião1 = gerarRegião1;
exports.gerarRegião4 = gerarRegião4;