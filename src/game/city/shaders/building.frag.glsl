precision highp float;

varying vec3 vWorldPosition;
varying vec3 vLocalPosition;
varying vec3 vNormal;
varying float vSeed;
varying vec3 vScale;

uniform float uTime;
uniform vec3 uWallColor;
uniform vec3 uNeonColor1;
uniform vec3 uNeonColor2;
uniform vec3 uWarmWindow;
uniform vec3 uCoolWindow;

float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

void main() {
    // Roof surface check
    if (vNormal.y > 0.7) {
        vec2 dEdge = min(vLocalPosition.xz + 0.5, 0.5 - vLocalPosition.xz);
        float edgeDist = min(dEdge.x, dEdge.y);
        
        // Glowing parapet trim
        if (edgeDist < 0.04) {
            vec3 roofNeon = (hash21(vec2(vSeed, 0.0)) > 0.5) ? uNeonColor1 : uNeonColor2;
            gl_FragColor = vec4(roofNeon * 3.0, 1.0);
            return;
        }
        
        gl_FragColor = vec4(vec3(0.06, 0.07, 0.1), 1.0);
        return;
    }

    // Determine planar mapping coordinates based on wall orientation (X or Z)
    vec2 wallCoord;
    if (abs(vNormal.x) > 0.5) {
        wallCoord = vec2(vLocalPosition.z * vScale.z, vLocalPosition.y * vScale.y);
    } else {
        wallCoord = vec2(vLocalPosition.x * vScale.x, vLocalPosition.y * vScale.y);
    }

    vec2 windowSize = vec2(1.6, 2.4);
    vec2 gridUv = fract(wallCoord / windowSize);
    vec2 cellId = floor(wallCoord / windowSize);

    vec2 framePadding = vec2(0.18, 0.14);
    vec2 isWindow = step(framePadding, gridUv) * step(gridUv, 1.0 - framePadding);
    float windowMask = isWindow.x * isWindow.y;

    float rnd = hash21(cellId + vec2(vSeed * 17.13, vSeed * 43.71));
    float isLit = step(0.42, rnd);

    if (rnd > 0.95) {
        isLit *= step(0.3, sin(uTime * 4.0 + rnd * 60.0));
    }

    vec3 windowColor = (rnd > 0.75) ? uCoolWindow * 1.5 : uWarmWindow * 1.6;
    if (rnd > 0.96) {
        windowColor = uNeonColor2 * 3.0;
    }

    vec3 unlitGlass = vec3(0.04, 0.06, 0.11);
    vec3 finalColor = uWallColor;

    if (windowMask > 0.5) {
        finalColor = mix(unlitGlass, windowColor, isLit);
    } else {
        if (vLocalPosition.y > 0.2 && (abs(vLocalPosition.x) > 0.47 || abs(vLocalPosition.z) > 0.47)) {
            if (hash21(vec2(vSeed, 88.0)) > 0.45) {
                vec3 stripeNeon = (hash21(vec2(vSeed, 12.0)) > 0.5) ? uNeonColor1 : uNeonColor2;
                finalColor = stripeNeon * 2.8;
            }
        }
    }

    gl_FragColor = vec4(finalColor, 1.0);
}
