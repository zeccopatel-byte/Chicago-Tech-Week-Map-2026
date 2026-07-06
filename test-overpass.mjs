import fs from 'fs';

async function fetchBuildings() {
  // Try to find buildings with levels, if strict. But many don't have levels.
  // We'll get all buildings and default to 15m.
  const query = `[out:json];(way["building"](41.87,-87.645,41.895,-87.615););out geom;`;
  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "data=" + encodeURIComponent(query)
  });
  const data = await res.json();
  const features = data.elements.filter(el => el.geometry && el.geometry.length > 2).map(el => {
    let rawLevels = el.tags["building:levels"] || "0";
    let levels = parseInt(rawLevels);
    let rawHeight = el.tags["height"] || "0";
    let height = parseFloat(rawHeight.replace('m',''));
    
    // Extrude height estimation
    let finalHeight = height > 0 ? height : (levels > 0 ? levels * 4 : 20 + Math.random() * 40);

    return {
      type: "Feature",
      properties: {
        id: el.id,
        height: finalHeight
      },
      geometry: {
        type: "Polygon",
        coordinates: [el.geometry.map(g => [g.lon, g.lat])]
      }
    };
  });
  const geojson = { type: "FeatureCollection", features };
  
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
  }
  fs.writeFileSync('public/chicago-buildings.json', JSON.stringify(geojson));
  console.log("Saved " + features.length + " buildings");
}
fetchBuildings().catch(console.error);
