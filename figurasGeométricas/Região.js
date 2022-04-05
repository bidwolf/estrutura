const { Ponto } = require('./Ponto');
const { __notF__ } = require('./utilities');

function Região(args) {
    this.ruleX = args.ruleX || intervaloEntreFunções(args.funçãoMenorQueX, args.funçãoMaiorQueX);
    this.ruleY = args.ruleY || intervaloEntreFunções(args.funçãoMenorQueY, args.funçãoMaiorQueY);
    if (args.inicio && args.inicio instanceof Ponto) {
        this.ruleX = function(ponto) { return ponto.x >= args.inicio.x; };
        this.ruleY = function(ponto) { return ponto.y >= args.inicio.y; };
    }
}
Região.prototype.contains = function(ponto) {
    if (ponto instanceof Ponto) {
        return (this.ruleX(ponto) && this.ruleY(ponto));
    } else throw new TypeError();
};
Região.PRIMEIRO_QUADRANTE = new Região({ inicio: new Ponto(0, 0) });
Região.SEGUNDO_QUADRANTE = new Região({
    ruleX: function(x) { return x <= 0; },
    ruleY: function(ponto) { return ponto.y >= 0; }
});
Região.TERCEIRO_QUADRANTE = new Região({
    ruleX: Região.SEGUNDO_QUADRANTE.ruleX,
    ruleY: __notF__(Região.SEGUNDO_QUADRANTE.ruleY)
});
Região.QUARTO_QUADRANTE = new Região({
    ruleX: __notF__(Região.TERCEIRO_QUADRANTE.ruleX),
    ruleY: Região.TERCEIRO_QUADRANTE.ruleY
});
/*
function describeReturn(textFunction) {
    let start = textFunction.indexOf('x', (textFunction.indexOf('return')));
    let end = textFunction.indexOf(';');
    let result = textFunction.substring(start, end);
    return result;
}*/

function intervaloEntreFunções(funçãoMenorQuePonto, funçãoMaiorQuePonto) {
    return function(ponto) {
        return funçãoMenorQuePonto(ponto.x) <= ponto.y && ponto.y <= funçãoMaiorQuePonto(ponto.x);
    };
}
exports.Região = Região;