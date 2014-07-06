var products = [];

function Product(data) {
  this._data = data;
  console.log(data);
}

Product.prototype.getLevel = function() {
  return this._data.unlocklevel;
};

Product.prototype.popularity = function() {
    return Number(this._data.basepopularity);
};

Product.prototype.profit = function() {
    return Number(this._data.profit);
};

module.exports = {
    create: function(rawData) {
        products = [];
        rawData.elements.forEach(function(pr, index) {
          products.push(new Product(pr));
        });
        return products;
    },
    getByLevel: function(level) {
        return products.filter(function (product) {
            return product.getLevel() == level;
        });
    }
};
