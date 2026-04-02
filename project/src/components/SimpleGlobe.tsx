export default function SimpleGlobe() {
  const markers = [
    { top: '38%', left: '28%', size: 'large' },
    { top: '42%', left: '32%', size: 'large' },
    { top: '30%', left: '35%', size: 'medium' },
    { top: '36%', left: '33%', size: 'medium' },
    { top: '34%', left: '30%', size: 'medium' },
    { top: '32%', left: '29%', size: 'small' },
    { top: '44%', left: '31%', size: 'small' },
    { top: '48%', left: '34%', size: 'small' },
    { top: '26%', left: '38%', size: 'small' },
    { top: '33%', left: '27%', size: 'small' },
  ];

  return (
    <div className="relative w-[600px] h-[600px] mx-auto">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-900/40 via-blue-800/50 to-cyan-900/40 shadow-2xl shadow-cyan-500/20 animate-pulse-slow">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-blue-400/5 to-cyan-400/10"></div>

        <div className="absolute inset-4 rounded-full border-2 border-cyan-500/10"></div>
        <div className="absolute inset-8 rounded-full border border-cyan-500/5"></div>
        <div className="absolute inset-12 rounded-full border border-cyan-500/5"></div>

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600">
          <defs>
            <radialGradient id="globeGlow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.1)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
            </radialGradient>
          </defs>

          <circle cx="300" cy="300" r="280" fill="url(#globeGlow)" />

          <g opacity="0.15" stroke="#3b82f6" strokeWidth="1" fill="none">
            {[...Array(12)].map((_, i) => {
              const y = 50 + i * 45;
              return (
                <ellipse
                  key={`lat-${i}`}
                  cx="300"
                  cy="300"
                  rx={Math.abs(280 * Math.sin((i / 12) * Math.PI))}
                  ry="280"
                  transform={`rotate(0 300 300) translate(0 ${y - 300})`}
                />
              );
            })}
          </g>

          <g opacity="0.15" stroke="#3b82f6" strokeWidth="1" fill="none">
            {[...Array(12)].map((_, i) => (
              <ellipse
                key={`lng-${i}`}
                cx="300"
                cy="300"
                rx="280"
                ry={280 * Math.abs(Math.cos((i / 12) * Math.PI))}
                transform={`rotate(${i * 15} 300 300)`}
              />
            ))}
          </g>

          <path
            d="M 180,320 Q 200,280 240,260 T 320,250 Q 360,255 390,280"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            opacity="0.3"
          />
          <path
            d="M 150,350 Q 170,340 200,340 T 250,355 Q 280,365 310,360"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            opacity="0.3"
          />

          <path
            d="M 200,250 L 190,280 L 210,270 L 200,300 L 220,285 L 210,310 L 180,320"
            fill="#1e40af"
            opacity="0.4"
          />
          <path
            d="M 240,240 Q 250,250 260,245 L 265,255 L 270,248 Q 280,250 285,260 L 280,270 L 270,268 L 265,280 L 255,270 L 250,280 L 245,265 L 240,270 Z"
            fill="#1e40af"
            opacity="0.4"
          />
        </svg>

        {markers.map((marker, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              top: marker.top,
              left: marker.left,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            <div
              className={`rounded-full bg-orange-500 shadow-lg shadow-orange-500/50 ${
                marker.size === 'large'
                  ? 'w-4 h-4'
                  : marker.size === 'medium'
                  ? 'w-3 h-3'
                  : 'w-2 h-2'
              }`}
            />
            <div
              className={`absolute inset-0 rounded-full bg-orange-400/30 animate-ping ${
                marker.size === 'large'
                  ? 'w-4 h-4'
                  : marker.size === 'medium'
                  ? 'w-3 h-3'
                  : 'w-2 h-2'
              }`}
              style={{ animationDuration: '2s' }}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-white/5 pointer-events-none"></div>

      <div className="absolute -inset-20 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
    </div>
  );
}
