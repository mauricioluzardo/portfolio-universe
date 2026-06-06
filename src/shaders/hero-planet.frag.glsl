varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewDir;
uniform sampler2D uMap;     // textura Jupiter como estrutura de bandas
uniform float     uTime;

// Paleta roxa — mapeia 0→1 do cinza da textura para roxo/violeta
vec3 purplePalette(float t) {
  vec3 dark   = vec3(0.05, 0.01, 0.15); // roxo muito escuro
  vec3 mid    = vec3(0.30, 0.08, 0.65); // violeta médio
  vec3 bright = vec3(0.62, 0.35, 0.98); // lavanda brilhante
  vec3 light  = vec3(0.80, 0.65, 1.00); // branco-lilás (bandas claras)

  if (t < 0.33) return mix(dark,   mid,    t * 3.0);
  if (t < 0.66) return mix(mid,    bright, (t - 0.33) * 3.0);
                return mix(bright, light,  (t - 0.66) * 3.0);
}

void main() {
  // Amostra textura — deriva lentamente no eixo x (rotação)
  vec2 uv = vec2(vUv.x + uTime * 0.004, vUv.y);
  vec4 tex = texture2D(uMap, uv);

  // Converte para luminância (preserva estrutura de bandas, ignora cor laranja)
  float lum = dot(tex.rgb, vec3(0.299, 0.587, 0.114));

  // Mapeia luminância → paleta roxa
  vec3 color = purplePalette(lum);

  // Fresnel — escurece borda para dar volume de esfera
  float rim = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 2.5);
  color = mix(color, vec3(0.02, 0.00, 0.08), rim * 0.5);

  // Glow interno sutil no centro
  float core = pow(max(dot(vNormal, vViewDir), 0.0), 4.0);
  color += vec3(0.08, 0.02, 0.18) * core * 0.4;

  gl_FragColor = vec4(color, 1.0);
}