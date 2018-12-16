L.LeafletLayerBoilerplate = L.Layer.extend({

    initialize: function (options) {
        this._latLng = options.latLng;
    },

    onAdd: function (map) {

        this._map = map;
        
        var layerElementTag = 'div';
        var layerElementClasses = ' leaflet-layer-boilerplate leaflet-zoom-hide ';
        this._layerElement = L.DomUtil.create(layerElementTag, layerElementClasses);

        // 
        this._layerElement.innerHTML = 'x';
        // 

        map.getPanes().overlayPane.appendChild(this._layerElement);

        map.on('viewreset', this._updatePosition, this);

        this._updatePosition();
    },

    _updatePosition: function () {
        var position = this._map.latLngToLayerPoint(this._latLng);
        L.DomUtil.setPosition(this._layerElement, position);
    },

    onRemove: function (map) {
        map.getPanes().overlayPane.removeChild(this._layerElement);
        map.off('viewreset', this._updatePosition, this);
    }
});

L.leafletLayerBoilerplate = function (options) {
    return new L.LeafletLayerBoilerplate(options);
};

