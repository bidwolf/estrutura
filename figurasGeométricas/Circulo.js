function Circulo(x0, y0, raio) {
    this.x0 = x0;
    this.y0 = y0;
    this.raio = raio;
}
// Retorna o semiCirculo acima do eixo x
Circulo.prototype.f = function(x) {
    return this.y0 + Math.sqrt(this.raio ** 2 - (x - this.x0) ** 2);
};
Circulo.prototype.inversaDef = function(y) {
    return this.x0 + Math.sqrt(this.raio ** 2 - (y - this.y0) ** 2);
};
Circulo.prototype.negative_f = function(x) {
    return this.y0 - (Math.sqrt(this.raio ** 2 - (x - this.x0) ** 2));

};
Circulo.prototype.contains = function(ponto) {
    return this.f(ponto.x) >= ponto.y && ponto.y >= this.negative_f(ponto.x) && this.negative_f(ponto.y) <= ponto.x && ponto.x <= this.f(ponto.y);
};
exports.Circulo = Circulo;