const FIELD_RADIUS = 4.1;
const TAU = Math.PI * 2;

function seededRandom(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;

  return value - Math.floor(value);
}

function centeredNoise(index: number, salt: number) {
  return seededRandom(index, salt) - 0.5;
}

export function createCloudFormation(count: number) {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const i = index * 3;
    const radius = Math.cbrt(seededRandom(index, 1)) * FIELD_RADIUS * 1.08;
    const theta = seededRandom(index, 2) * TAU;
    const phi = Math.acos(2 * seededRandom(index, 3) - 1);
    const looseness = 0.82 + seededRandom(index, 4) * 0.58;
    const outerDrift = Math.pow(seededRandom(index, 5), 5) * 1.65;

    positions[i] = (radius + outerDrift) * Math.sin(phi) * Math.cos(theta) * 1.34 * looseness;
    positions[i + 1] = (radius + outerDrift) * Math.sin(phi) * Math.sin(theta) * 0.82 * looseness;
    positions[i + 2] = radius * Math.cos(phi) * 1.02 + centeredNoise(index, 6) * 0.42;
  }

  return positions;
}

export function createRibbonFormation(count: number) {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const i = index * 3;
    const t = count > 1 ? index / (count - 1) : 0;
    const wave = t * TAU * 2.85;
    // ancho coherente a lo largo de la cinta (no salta de carril)
    const across = seededRandom(index, 11) - 0.5;
    const taper = Math.sin(t * Math.PI);
    const noise = centeredNoise(index, 12);

    positions[i] = (t - 0.5) * 8.05 + noise * 0.08;
    positions[i + 1] = Math.sin(wave) * (0.9 + taper * 0.25) + across * (0.34 + taper * 0.12);
    positions[i + 2] = across * 0.18 + Math.sin(wave * 0.5) * 0.12;
  }

  return positions;
}

export function createClusterFormation(count: number) {
  const positions = new Float32Array(count * 3);
  const centers = [
    [-3.25, 1.15, -0.1],
    [-1.62, -1.18, 0.48],
    [0.02, 0.34, -0.52],
    [1.74, 1.28, 0.36],
    [3.24, -0.72, -0.16],
  ];
  const scales = [0.82, 0.58, 0.72, 0.64, 0.78];

  for (let index = 0; index < count; index += 1) {
    const i = index * 3;
    const clusterIndex = index % centers.length;
    const localIndex = Math.floor(index / centers.length);
    const center = centers[clusterIndex];
    const angle = seededRandom(localIndex, 21 + clusterIndex) * TAU;
    const radius = Math.sqrt(seededRandom(localIndex, 31 + clusterIndex)) * scales[clusterIndex];
    const satellite = index % 17 === 0 ? 0.52 : 0;

    positions[i] = center[0] + Math.cos(angle) * (radius + satellite) * 1.28;
    positions[i + 1] = center[1] + Math.sin(angle) * radius * 0.76;
    positions[i + 2] = center[2] + centeredNoise(localIndex, 41 + clusterIndex) * 0.82;
  }

  return positions;
}

export function createCoreFormation(count: number) {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const i = index * 3;
    const coreBias = seededRandom(index, 51);
    const radius = Math.pow(coreBias, 2.25) * 1.36;
    const theta = seededRandom(index, 52) * TAU;
    const phi = Math.acos(2 * seededRandom(index, 53) - 1);
    const signalRing = index % 23 === 0 ? 0.58 : 0;
    const halo = index % 7 === 0 ? 0.24 : 0;

    positions[i] = (radius + signalRing + halo) * Math.sin(phi) * Math.cos(theta) * 0.98;
    positions[i + 1] = (radius + signalRing + halo) * Math.sin(phi) * Math.sin(theta) * 0.98;
    positions[i + 2] = (radius + signalRing) * Math.cos(phi) * 0.78;
  }

  return positions;
}

export const formationGenerators = [
  createCloudFormation,
  createRibbonFormation,
  createClusterFormation,
  createCoreFormation,
];
