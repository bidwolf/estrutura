function Ponto(x, y) {
    this.x = x;
    this.y = y;
}
Ponto.prototype.somar = function(thatPonto) {
    if (thatPonto instanceof Ponto) {
        this.x += thatPonto.x;
        this.y += thatPonto.y;
    } else throw new TypeError();
};

Ponto.prototype.subtrair = function(thatPonto) {
    if (thatPonto instanceof Ponto) {
        this.x -= thatPonto.x;
        this.y -= thatPonto.y;
    } else throw new TypeError();
};
Ponto.prototype.multiplicarPorEscalar = function(escalar) {
    if (typeof escalar === 'number' && isFinite(escalar)) {
        this.x *= escalar;
        this.y *= escalar;
    } else throw new TypeError();
};
Ponto.prototype.distanciaAoPonto = function(ponto) {
    if (ponto instanceof Ponto) {
        return Math.sqrt((this.x - ponto.x) ** 2 + (this.y - ponto.y) ** 2);
    } else throw new TypeError();
};
exports.Ponto = Ponto;