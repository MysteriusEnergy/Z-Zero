uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uAccentMix;

void main() {
  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));

  if (distanceToCenter > 0.5) {
    discard;
  }

  float alpha = smoothstep(0.5, 0.12, distanceToCenter);
  vec3 color = mix(uColorA, uColorB, uAccentMix);

  gl_FragColor = vec4(color, alpha);
}