attribute vec3 aTo;

uniform float uSize;
uniform float uTime;
uniform float uDriftStrength;
uniform float uMix;

void main() {
  vec3 morphed = mix(position, aTo, uMix);
  vec3 transformed = morphed;

  float waveA = sin(morphed.y * 2.4 + uTime * 0.7);
  float waveB = cos(morphed.x * 1.8 + uTime * 0.5);

  transformed.x += waveA * uDriftStrength;
  transformed.y += waveB * uDriftStrength;
  transformed.z += sin((morphed.x + morphed.y) * 1.2 + uTime * 0.4) * uDriftStrength;

  vec4 modelPosition = modelMatrix * vec4(transformed, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  gl_PointSize = uSize;
  gl_PointSize *= 1.0 / -viewPosition.z;
}
