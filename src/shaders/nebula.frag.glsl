uniform float uTime;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}

void main() {
  vec2 uv = vUv * 2.5;
  float t = uTime * 0.04;

  float n1 = fbm(uv + t);
  float n2 = fbm(uv + n1 + vec2(1.7, 9.2) + t * 0.4);
  float n3 = fbm(uv + n2 + vec2(8.3, 2.8) - t * 0.25);

  vec3 colorA = vec3(0.48, 0.18, 0.74);
  vec3 colorB = vec3(0.0, 0.83, 1.0);
  vec3 colorC = vec3(0.02, 0.01, 0.06);

  vec3 col = mix(colorC, colorA, n1 * 0.7);
  col = mix(col, colorB, n3 * 0.35);
  col += colorA * pow(n2, 3.0) * 0.5;

  // Vignette radial: fade para zero nas bordas do plano
  vec2 center = vUv - 0.5;
  float dist = length(center);
  float vignette = 1.0 - smoothstep(0.25, 0.5, dist);

  float rawAlpha = smoothstep(0.1, 0.5, n1) * 0.4;
  float alpha = rawAlpha * vignette;

  gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
}
