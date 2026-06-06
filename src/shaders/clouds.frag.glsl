varying vec3 vNormal;
varying vec3 vViewDir;
uniform float uTime;
uniform float uOpacity;

// Noise 3D — sem seam (não usa UV)
float hash3(vec3 p) {
  p  = fract(p * vec3(127.1, 311.7, 74.7));
  p += dot(p, p.yzx + 19.19);
  return fract((p.x + p.y) * p.z);
}
float noise3(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash3(i),               hash3(i+vec3(1,0,0)), f.x),
        mix(hash3(i+vec3(0,1,0)),   hash3(i+vec3(1,1,0)), f.x), f.y),
    mix(mix(hash3(i+vec3(0,0,1)),   hash3(i+vec3(1,0,1)), f.x),
        mix(hash3(i+vec3(0,1,1)),   hash3(i+vec3(1,1,1)), f.x), f.y),
    f.z
  );
}
float fbm3(vec3 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise3(p);
    p  = p * 2.1 + vec3(5.2, 1.3, 3.7);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec3 p = vNormal * 3.0 + vec3(uTime * 0.008, 0.0, uTime * 0.003);
  float cloud = fbm3(p);
  cloud = smoothstep(0.44, 0.70, cloud);

  // Suaviza nos polos
  float pole = abs(vNormal.y);
  cloud *= 1.0 - smoothstep(0.65, 1.0, pole);

  vec3 cloudColor = mix(vec3(0.95, 0.90, 1.00), vec3(0.70, 0.55, 1.00), 0.3);
  gl_FragColor = vec4(cloudColor, cloud * uOpacity);
}