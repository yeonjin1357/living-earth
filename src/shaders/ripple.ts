export const rippleVertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

// 원판 중심에서 파문 링 두 개가 반주기 간격으로 퍼져나가며 소멸한다.
export const rippleFragmentShader = /* glsl */ `
varying vec2 vUv;
uniform float uTime;
uniform vec3 uColor;
uniform float uPeriod;
uniform float uPhase;

float ring(float d, float t) {
  float front = fract(t);
  float band = smoothstep(0.08, 0.0, abs(d - front));
  return band * (1.0 - front);
}

void main() {
  float d = length(vUv - 0.5) * 2.0; // 0 = 중심, 1 = 원판 가장자리
  float t = (uTime + uPhase) / uPeriod;

  float alpha = ring(d, t) + ring(d, t + 0.5);
  alpha += smoothstep(0.1, 0.0, d) * 0.5; // 진원지 글로우

  gl_FragColor = vec4(uColor, alpha * 0.85);
}
`
