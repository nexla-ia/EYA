export default function SimpleGlobe() {
  const size = 420;
  const cx = size / 2;
  const cy = size / 2;
  const r  = 160;

  const latLines = [-60, -30, 0, 30, 60].map(lat => {
    const y = cy - (lat / 90) * r;
    const rx = Math.sqrt(Math.max(0, r * r - (y - cy) * (y - cy)));
    return { y, rx };
  });

  const lonAngles = [0, 30, 60, 90, 120, 150];

  const markers: [number, number, number, string, boolean][] = [
    [0.48, 0.60, 8,  '#00e8d0', true ],
    [0.51, 0.55, 6,  '#00e8d0', false],
    [0.45, 0.52, 5,  '#b8ff57', true ],
    [0.50, 0.48, 4,  '#ffb224', false],
    [0.52, 0.64, 5,  '#b8ff57', false],
    [0.55, 0.56, 4,  '#00e8d0', false],
    [0.55, 0.50, 3,  '#ffb224', true ],
    [0.44, 0.57, 4,  '#b8ff57', false],
  ];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="globeGrad" cx="38%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#0d3352" />
          <stop offset="60%"  stopColor="#051826" />
          <stop offset="100%" stopColor="#020c14" />
        </radialGradient>
        <radialGradient id="rimGlow" cx="50%" cy="50%" r="50%">
          <stop offset="75%"  stopColor="transparent" />
          <stop offset="95%"  stopColor="rgba(0,232,208,0.15)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="atmoGrad" cx="50%" cy="50%" r="50%">
          <stop offset="80%"  stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(0,232,208,0.08)" />
        </radialGradient>
        <clipPath id="globeClip">
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
        <radialGradient id="specular" cx="32%" cy="28%" r="45%">
          <stop offset="0%"   stopColor="rgba(0,232,208,0.12)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="transparent" />
          <stop offset="50%"  stopColor="rgba(0,232,208,0.15)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* Atmosphere */}
      <circle cx={cx} cy={cy} r={r + 18} fill="url(#atmoGrad)" />

      {/* Orbit ring */}
      <ellipse cx={cx} cy={cy} rx={r + 35} ry={12} fill="none" stroke="rgba(0,232,208,0.12)" strokeWidth="1" strokeDasharray="4 8" />

      {/* Globe body */}
      <circle cx={cx} cy={cy} r={r} fill="url(#globeGrad)" />

      {/* Grid */}
      <g clipPath="url(#globeClip)" opacity="0.35">
        {latLines.map(({ y, rx }, i) => (
          <ellipse key={`lat-${i}`} cx={cx} cy={y} rx={rx} ry={rx * 0.15} fill="none" stroke="#0e3d5e" strokeWidth="0.8" />
        ))}
        <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.15} fill="none" stroke="#1a6a8a" strokeWidth="1" />
        {lonAngles.map((angle, i) => (
          <ellipse
            key={`lon-${i}`}
            cx={cx} cy={cy}
            rx={r * Math.abs(Math.cos((angle * Math.PI) / 180))}
            ry={r}
            fill="none" stroke="#0e3d5e" strokeWidth="0.8"
          />
        ))}
      </g>

      {/* Scan sweep */}
      <g clipPath="url(#globeClip)">
        <rect x={cx - r} width={r * 2} height={r * 0.4} fill="url(#scanGrad)">
          <animateTransform
            attributeName="transform" type="translate"
            values={`0,${-r * 1.2}; 0,${r * 1.2}`}
            dur="4s" repeatCount="indefinite"
          />
        </rect>
      </g>

      {/* Rim + specular */}
      <circle cx={cx} cy={cy} r={r} fill="url(#rimGlow)" />
      <circle cx={cx} cy={cy} r={r} fill="url(#specular)" />

      {/* Markers */}
      {markers.map(([mx, my, ms, color, hasRing], i) => {
        const px = mx * size;
        const py = my * size;
        return (
          <g key={i}>
            {hasRing && (
              <circle cx={px} cy={py} r={ms * 2.5} fill="none" stroke={color} strokeWidth="1" opacity="0.3">
                <animate attributeName="r" values={`${ms * 1.5};${ms * 4};${ms * 1.5}`} dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0;0.4" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={px} cy={py} r={ms} fill={color}>
              <animate attributeName="opacity" values="0.9;0.5;0.9" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={px} cy={py} r={ms * 0.5} fill="white" opacity="0.6" />
          </g>
        );
      })}

      {/* HUD corners */}
      {([
        [cx - r - 20, cy - r - 20, 0],
        [cx + r + 20, cy - r - 20, 90],
        [cx + r + 20, cy + r + 20, 180],
        [cx - r - 20, cy + r + 20, 270],
      ] as [number, number, number][]).map(([hx, hy, angle], i) => (
        <g key={`hud-${i}`} transform={`rotate(${angle}, ${hx}, ${hy})`}>
          <path d={`M ${hx},${hy + 10} L ${hx},${hy} L ${hx + 10},${hy}`} fill="none" stroke="rgba(0,232,208,0.4)" strokeWidth="1.5" />
        </g>
      ))}

      {/* Telemetry labels */}
      <text x={cx - r - 18} y={cy + r + 30} fill="rgba(0,232,208,0.5)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
        TROPOMI · S5P
      </text>
      <text x={cx + r - 45} y={cy + r + 30} fill="rgba(0,232,208,0.5)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
        LIVE
        <animate attributeName="opacity" values="1;0;1" dur="1.2s" repeatCount="indefinite" />
      </text>
    </svg>
  );
}
