attribute float aInstanceSeed;
attribute vec3 aInstanceScale;

varying vec3 vWorldPosition;
varying vec3 vLocalPosition;
varying vec3 vNormal;
varying float vSeed;
varying vec3 vScale;

void main() {
    vSeed = aInstanceSeed;
    vScale = aInstanceScale;
    vNormal = normalize(normalMatrix * (instanceMatrix * vec4(normal, 0.0)).xyz);
    vLocalPosition = position;

    vec4 worldPosition = modelMatrix * instanceMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
