uniform vec3 glowColor;
uniform float intensity;
uniform float power;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 viewDir = normalize(-vPosition);
  float fresnel = pow(1.0 - dot(vNormal, viewDir), power);
  vec3 color = glowColor * fresnel * intensity;
  gl_FragColor = vec4(color, fresnel * 0.8);
}
