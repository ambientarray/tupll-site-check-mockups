/* Tupll Site Check mockup maps. MapLibre over OpenFreeMap tiles; geometry from data/sample.js. */
(function () {
  var C = { site: '#1f2a37', ring: '#3b4a5e', drive: '#1f6b57', indie: '#b4541a', chain: '#5b4bb5', hood: '#1f6b57' };
  function circle(lat, lon, miles, n) {
    var pts = [], R = 3958.8, d = miles / R, la = lat * Math.PI / 180, lo = lon * Math.PI / 180;
    for (var i = 0; i <= (n || 96); i++) {
      var b = 2 * Math.PI * i / (n || 96);
      var la2 = Math.asin(Math.sin(la) * Math.cos(d) + Math.cos(la) * Math.sin(d) * Math.cos(b));
      var lo2 = lo + Math.atan2(Math.sin(b) * Math.sin(d) * Math.cos(la), Math.cos(d) - Math.sin(la) * Math.sin(la2));
      pts.push([lo2 * 180 / Math.PI, la2 * 180 / Math.PI]);
    }
    return pts;
  }
  function boundsOf(coords) {
    var b = [[180, 90], [-180, -90]];
    coords.forEach(function (p) { b[0][0] = Math.min(b[0][0], p[0]); b[0][1] = Math.min(b[0][1], p[1]); b[1][0] = Math.max(b[1][0], p[0]); b[1][1] = Math.max(b[1][1], p[1]); });
    return b;
  }
  /* opts: {drive:bool, rings:[1,2,3], shops:bool, shopLimitMiles:number, numbered:[{lat,lon,n}], fit:'rings'|'drive', interactive:bool} */
  window.tupllMap = function (el, opts) {
    var S = window.SAMPLE, o = opts || {};
    var map = new maplibregl.Map({ container: el, style: 'https://tiles.openfreemap.org/styles/positron', center: [S.lon, S.lat], zoom: 12, attributionControl: false, interactive: o.interactive !== false, cooperativeGestures: true });
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');
    if (o.interactive !== false) map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    if (window.ResizeObserver) new ResizeObserver(function () { map.resize(); }).observe(map.getContainer());
    map.on('load', function () {
      if (o.drive) {
        map.addSource('drive', { type: 'geojson', data: { type: 'Feature', geometry: S.isochrone } });
        map.addLayer({ id: 'drive-fill', type: 'fill', source: 'drive', paint: { 'fill-color': C.drive, 'fill-opacity': 0.13 } });
        map.addLayer({ id: 'drive-line', type: 'line', source: 'drive', paint: { 'line-color': C.drive, 'line-width': 2 } });
      }
      (o.rings || []).forEach(function (mi, i) {
        map.addSource('ring' + mi, { type: 'geojson', data: { type: 'Feature', geometry: { type: 'LineString', coordinates: circle(S.lat, S.lon, mi) } } });
        map.addLayer({ id: 'ring' + mi, type: 'line', source: 'ring' + mi, paint: { 'line-color': C.ring, 'line-width': 1.5, 'line-dasharray': i === 0 ? [1, 0] : i === 1 ? [4, 3] : [1, 3] } });
      });
      if (o.shops) {
        var lim = o.shopLimitMiles || 3;
        var feats = S.shops.filter(function (s) { return s.mi <= lim; }).map(function (s) { return { type: 'Feature', properties: { name: s.name, chain: s.brand ? 1 : 0, mi: s.mi }, geometry: { type: 'Point', coordinates: [s.lon, s.lat] } }; });
        map.addSource('shops', { type: 'geojson', data: { type: 'FeatureCollection', features: feats } });
        map.addLayer({ id: 'shops', type: 'circle', source: 'shops', paint: { 'circle-radius': 5, 'circle-color': ['case', ['==', ['get', 'chain'], 1], C.chain, C.indie], 'circle-stroke-color': '#ffffff', 'circle-stroke-width': 1.5 } });
        if (o.interactive !== false) {
          map.on('click', 'shops', function (e) { var p = e.features[0].properties; new maplibregl.Popup({ closeButton: false }).setLngLat(e.lngLat).setHTML('<strong>' + p.name + '</strong><br>' + Number(p.mi).toFixed(1) + ' miles' + (p.chain ? ' · chain' : '')).addTo(map); });
          map.on('mouseenter', 'shops', function () { map.getCanvas().style.cursor = 'pointer'; });
          map.on('mouseleave', 'shops', function () { map.getCanvas().style.cursor = ''; });
        }
      }
      (o.numbered || []).forEach(function (p) {
        var m = document.createElement('div'); m.className = 'num-pin'; m.textContent = p.n;
        new maplibregl.Marker({ element: m }).setLngLat([p.lon, p.lat]).addTo(map);
      });
      var pin = document.createElement('div'); pin.className = 'site-pin'; pin.setAttribute('aria-label', 'Candidate address');
      new maplibregl.Marker({ element: pin, anchor: 'bottom' }).setLngLat([S.lon, S.lat]).addTo(map);
      var fitCoords = o.fit === 'drive' ? S.isochrone.coordinates[0] : circle(S.lat, S.lon, o.fitMiles || Math.max.apply(null, o.rings || [3]));
      map.fitBounds(boundsOf(fitCoords), { padding: o.padding || 24, animate: false });
      if (o.interactive === false) { var at = map.getContainer().querySelector('.maplibregl-ctrl-attrib'); if (at) { at.classList.remove('maplibregl-compact-show'); at.removeAttribute('open'); } }
      map.getContainer().setAttribute('data-ready', '1');
    });
    return map;
  };
  window.tupllFmt = function (n) { return Number(n).toLocaleString('en-US'); };
  window.tupllRound = function (n, to) { return Math.round(n / to) * to; };
})();
