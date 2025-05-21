import { useEffect, useRef, useState, useMemo } from 'react';
import Globe from 'react-globe.gl';
import { feature as topo2geo } from 'topojson-client';

const URL_MUNDO  = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';
const URL_PLACAS = 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json';
const URL_QUAKE  = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson'; // últimos 7 dias

export default function GLOBO_SISMICO({
  PAISES_ATIVADO = false,
  PLACAS_ATIVADO = false,
  QUAKES_ATIVADO = false
}) {
  const globeRef = useRef();

  const [countries, setCountries] = useState([]);
  const [plates,    setPlates]    = useState([]);   // Array<Array<[lng,lat]>>
  const [quakes,    setQuakes]    = useState([]);

  /* ─────────────── DOWNLOAD ÚNICO ─────────────── */
  useEffect(() => {
    (async () => {
      /* Países */
      const topo = await (await fetch(URL_MUNDO)).json();
      setCountries(topo2geo(topo, topo.objects.countries).features);

      /* Placas → achata MultiLineString */
      const placasJSON = await (await fetch(URL_PLACAS)).json();
      const flat = placasJSON.features.flatMap(f =>
        f.geometry.type === 'LineString'
          ? [f.geometry.coordinates]        // já é array de pontos
          : f.geometry.coordinates          // MultiLineString → vários arrays
      );
      setPlates(flat);

      /* Terremotos (últimos 7 dias) */
      const quakesJSON = await (await fetch(URL_QUAKE)).json();
      setQuakes(quakesJSON.features);
    })();
  }, []);

  /* ─────────────── QUAKES 3-D ─────────────── */
  const quakes3D = useMemo(
    () =>
      quakes.map(q => ({
        lat:   q.geometry.coordinates[1],
        lng:   q.geometry.coordinates[0],
        mag:   q.properties.mag,
        depth: q.geometry.coordinates[2]
      })),
    [quakes]
  );

  /* ─────────────── RENDER ─────────────── */
  return (
    <Globe
      ref={globeRef}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
      backgroundColor="rgba(0,0,0,0)"

      /* PAÍSES */
      polygonsData={PAISES_ATIVADO ? countries : []}
      polygonCapColor={() => 'rgba(0,150,255,0.2)'}
      polygonSideColor={() => 'rgba(0,100,180,0.4)'}
      polygonAltitude={0.01}
      onPolygonClick={({ properties }) =>
        alert(`PAÍS: ${properties.NAME || properties.name}`)}

      /* PLACAS */
      pathsData={PLACAS_ATIVADO ? plates : []}   // já é Array<Array<[lng,lat]>>
      pathColor={() => 'orange'}
      pathDashLength={0.5}
      pathDashGap={0.2}
      pathDashInitialGap={() => Math.random()}

      /* TERREMOTOS */
      pointsData={QUAKES_ATIVADO ? quakes3D : []}
      pointLat="lat"
      pointLng="lng"
      pointAltitude={d => 0.05 + d.mag * 0.015}
      pointRadius={d => 0.06 + d.mag * 0.02}
      pointColor={d =>
        d.depth < 70   ? 'red' :
        d.depth < 300  ? 'gold' :
                         'royalblue'}
    />
  );
}
