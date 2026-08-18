export const atmosphereVertexShader = /* glsl */ `
varying vec3 vNormal;

void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

// BackSide 구에서 시선과 법선의 각도로 프레넬 림 글로우를 만든다.
export const atmosphereFragmentShader = /* glsl */ `
varying vec3 vNormal;
uniform vec3 uColor;

void main() {
  float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
  gl_FragColor = vec4(uColor, 1.0) * max(intensity, 0.0);
}
`
