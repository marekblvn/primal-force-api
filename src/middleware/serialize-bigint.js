const serializeBigInt = function (req, res, next) {
  BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
  };
  next();
};

module.exports = serializeBigInt;
