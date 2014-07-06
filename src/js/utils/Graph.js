'use strict';

function Graph(v) {
    this.vertices = _.range(v);
    this.edges = 0;
    this.adj = [];
    this.vertices.forEach(function (value, index) {
        this.adj[index] = [''];
    }.bind(this));
}

function Graph$addEdge(v, w) {
    this.adj[v].push(w);
    this.adj[w].push(v);
    this.edges++;
}

function Graph$toString() {
    var resultString = '',
        vert = this.vertices,
        adj = this.adj;

    vert.forEach(function (value, i) {
        resultString += i + ' -> ';
        vert.forEach(function (value, j) {
            if (!!adj[i][j]) resultString += adj[i][j] + '\n';
        });
    });

    return resultString;
}

Graph.prototype = {
    constructor: Graph,
    addEdge: Graph$addEdge,
    toString: Graph$toString
};

function Vertex(label) {
    this.label = label;
}

module.exports = Graph;
