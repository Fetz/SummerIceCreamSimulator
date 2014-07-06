var places = [],
    map,
    connections = {};

function Place(defaultData, marker) {
  this._defaultData = defaultData;
  this._marker = marker;
}

Place.prototype.getTitle = function() {
  return this._marker.options.title;
}

Place.prototype.getLatLong = function() {
  return [this._marker.feature.geometry.coordinates[1], this._marker.feature.geometry.coordinates[0]]
}

Place.prototype.getConnected = function() {
  return this._defaultData.connectedlocation;
}

function setLines() {
  connections = {};
  places.forEach(function(place1) {

    place1.getConnected().split(',').forEach(function(conn) {
      if (conn == '') return;

      var place2 = findLocation(conn);

      if (!place2) {
        console.log(conn, 'notFound :(');
        return;
      }

      var connectPlaces = [place1, place2].sort(sortPlaces),
          key = connectPlaces[0].getTitle() + '-' + connectPlaces[1].getTitle();

      connections[key] = { places: connectPlaces };
    });

  });
  _.forIn(connections, function(conn, key) {
    var coordinates = [conn.places[0].getLatLong(), conn.places[1].getLatLong()];
    conn.line = L.polyline(coordinates, {color: '#000'}).addTo(map);
  });
}

function sortPlaces(place1, place2) {
  return place1.getTitle() < place2.getTitle();
}

function findLocation(location) {
  var results = places.filter(function(place) {
    return place.getTitle().indexOf(location) > -1;
  })[0];
  return results;
}

module.exports = {
    create: function(rawData, mapParam, markers) {
        places = [];
        map = mapParam;
        rawData.elements.forEach(function(pl, index) {

          for (var i = markers.length - 1; i >= 0; i--) {
            if (pl.location.indexOf(markers[i].options.title) != -1) {
              places.push(new Place(pl, markers.splice(i, 1)[0]));
            }

          }
        });
        setLines();
    },
    findLocation: findLocation,
    getConnections: function(place) {
      var placeConn = [];
      _.forIn(connections, function(conn, key) {
        if (conn.indexOf(place) > -1) {
          placeConn.push(conn);
        }
      });
      return placeConn;
    }
};
