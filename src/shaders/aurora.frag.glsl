uniform float uTime;
varying vec2 vUv;

float wave(float x, float freq, float speed, float phase) {
  return sin(x * freq + uTime * speed + phase);
}

void main() {
  vec2 uv = vUv;

  float w1 = wave(uv.x, 8.0, 0.5, 0.0) * 0.5 + 0.5;
  float w2 = wave(uv.x, 12.0, 0.3, 2.1) * 0.5 + 0.5;
  float w3 = wave(uv.x, 6.0, 0.7, 4.2) * 0.5 + 0.5;

  float bandHeight = 0.3;
  float y1 = 0.5 + w1 * 0.2;
  float y2 = 0.5 + w2 * 0.15;
  float y3 = 0.5 + w3 * 0.25;

  float band1 = smoothstep(bandHeight, 0.0, abs(uv.y - y1));
  float band2 = smoothstep(bandHeight * 0.8, 0.0, abs(uv.y - y2));
  float band3 = smoothstep(bandHeight * 0.6, 0.0, abs(uv.y - y3));

  vec3 c1 = vec3(0.0, 1.0, 0.94);  // ciano
  vec3 c2 = vec3(0.61, 0.36, 0.89); // roxo
  vec3 c3 = vec3(0.0, 0.83, 0.5);  // verde

  vec3 col = c1 * band1 + c2 * band2 + c3 * band3;
  float alpha = (band1 + band2 + band3) * 0.6;

  gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.8));
}
