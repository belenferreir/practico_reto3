import http from 'k6/http';
import { sleep } from 'k6';
import { Counter } from 'k6/metrics';

const cities = [
  'Montevideo',
  'Paysandu',
  'Salto',
  'Rivera',
  'Maldonado',
  'Tacuarembo',
  'Montefideo',
  'Paysandoom',
  'CasaDeSanta',
  'VillaNoel',
];

const status200 = new Counter('status_200');
const status400 = new Counter('status_400');

export const options = {
  vus: 100,
  duration: '2m',
};

export default function () {
  const city = cities[Math.floor(Math.random() * cities.length)];

  const url = `http://api.weatherapi.com/v1/forecast.json?key=082660052cdb413ca0f04613251512&q=${encodeURIComponent(city)}&dt=2025-12-24&days=1`;

  const response = http.get(url);

  if (response.status === 200) {
    status200.add(1);
  } else if (response.status === 400) {
    status400.add(1);
  }

  sleep(5);
}

export function handleSummary(data) {
  const avg = data.metrics.http_req_duration.values.avg;
  const throughput = data.metrics.http_reqs.values.rate;

  const pass200 = data.metrics.status_200?.values?.count ?? 0;
  const error400 = data.metrics.status_400?.values?.count ?? 0;

  const total = pass200 + error400;

  return {
    'resumen.txt': `RESULTADOS DE LA PRUEBA DE PERFORMANCE

Tiempo de respuesta promedio: ${avg.toFixed(2)} ms

Throughput: ${throughput.toFixed(2)} req/s

Total de requests: ${total}

Respuestas 200 (OK): ${pass200}

Respuestas 400 (Bad Request): ${error400}`,
};}