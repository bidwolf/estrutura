const { Ponto } = require('./Ponto');

function Reta(pontoInicial, pontoFinal) {
    if (pontoFinal instanceof Ponto && pontoInicial instanceof Ponto) {
        this.pontoFinal = pontoFinal;
        this.pontoInicial = pontoInicial;

    } else throw new TypeError();
}
Reta.prototype.alpha = function() {
    let deltaY = this.pontoInicial.y - this.pontoFinal.y;
    let deltaX = this.pontoInicial.x - this.pontoFinal.x;
    return deltaY / deltaX;
};
Reta.prototype.equação = function() {
    return `y-${this.pontoInicial.y}=${this.alpha()}(x-${this.pontoInicial.x})`;
};
Reta.prototype.f = function(x) {
    let y = (this.alpha() * (x - this.pontoInicial.x)) + this.pontoInicial.y;
    return y;
};
Reta.prototype.contains = function(ponto) {
    if (ponto instanceof Ponto) {
        return this.f(ponto.x) == ponto.y;
    } else throw new TypeError();
};
Reta.prototype.alphaInversa = function() {
    return (1 / (this.alpha()));
};
Reta.prototype.inversaDef = function(x) {
    let y = (this.alphaInversa() * (x - this.pontoInicial.y)) + this.pontoInicial.x;
    return y;
};
Reta.prototype.imparDef = function(x) {

    let y = -1 * this.f(x);
    return y;
};

Reta.prototype.inversaDaImparDef = function(x) {

    let y = -1 * this.inversaDef(x);
    return y;
};
Reta.prototype.parDef = function(x) {
    let y = -1 * this.alpha() * (x - this.pontoInicial.x) + this.pontoInicial.y;
    return y;
};
Reta.prototype.inversaDaParDef = function(x) {

    let y = -1 * this.alphaInversa * (x - this.pontoInicial.y) + this.pontoInicial.x;
    return y;
};
Reta.par = function(reta) {
    if (reta instanceof Reta) {
        let retaAtual = new Reta(
            new Ponto(reta.pontoInicial.x, reta.parDef(reta.pontoInicial.x)),
            new Ponto(reta.pontoFinal.x, reta.parDef(reta.pontoFinal.x))
        );
        return retaAtual;
    } else throw new TypeError();
};

Reta.impar = function(reta) {
    if (reta instanceof Reta) {
        let retaAtual = new Reta(
            new Ponto(reta.pontoInicial.x, reta.imparDef(reta.pontoInicial.x)),
            new Ponto(reta.pontoFinal.x, reta.imparDef(reta.pontoFinal.x))
        );

        return retaAtual;
    } else throw new TypeError();
};

Reta.inversa = function(reta) {
    if (reta instanceof Reta) {
        let retaAtual = new Reta(
            new Ponto(reta.pontoInicial.x, reta.inversaDef(reta.pontoInicial.x)),
            new Ponto(reta.pontoFinal.x, reta.inversaDef(reta.pontoFinal.x))
        );

        return retaAtual;
    } else throw new TypeError();
};
exports.Reta = Reta;