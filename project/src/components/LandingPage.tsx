import { Satellite, ChevronRight, Zap, Eye, GitBranch } from 'lucide-react';
import SimpleGlobe from './SimpleGlobe';

interface LandingPageProps {
  onEnter: () => void;
  onEducational: () => void;
}

export default function LandingPage({ onEnter, onEducational }: LandingPageProps) {
  return (
    <div className="min-h-screen topo-bg text-[var(--text-1)] relative overflow-x-hidden">

      {/* Scanline sweep */}
      <div className="scanline" />

      {/* Nav */}
      <nav className="relative z-20 glass border-b border-[var(--border)] px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-[var(--teal)] flex items-center justify-center" style={{clipPath:'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)'}}>
              <Satellite className="w-4 h-4 text-[var(--void)]" />
            </div>
            <span className="font-display text-lg font-bold tracking-widest text-[var(--teal)]">EYA</span>
            <span className="text-[var(--text-3)] text-xs font-ui tracking-widest uppercase ml-1">Earth + IA</span>
          </div>

          <div className="flex items-center gap-6 text-sm font-ui tracking-wide">
            {['Missão','Tecnologia','Dados'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[var(--text-2)] hover:text-[var(--teal)] transition-colors">
                {item}
              </a>
            ))}
            <button onClick={onEducational} className="text-[var(--text-2)] hover:text-[var(--teal)] transition-colors">
              Guia
            </button>
            <button
              onClick={onEnter}
              className="px-5 py-2 font-ui font-semibold tracking-widest uppercase text-xs text-[var(--void)] bg-[var(--teal)] hover:bg-[var(--acid)] transition-colors rounded-sm glow-teal"
            >
              Acessar
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — typography */}
          <div>
            {/* Status pill */}
            <div className="inline-flex items-center gap-2 mb-10 opacity-0-init animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-[var(--teal)] animate-glow-pulse" />
              <span className="font-data text-xs tracking-widest uppercase text-[var(--teal)]">
                Sistema online — Sentinel-5P/TROPOMI
              </span>
            </div>

            {/* Big wordmark */}
            <h1
              className="font-display font-black leading-none mb-4 opacity-0-init animate-fade-up"
              style={{ fontSize: 'clamp(5rem, 12vw, 9rem)', letterSpacing: '-0.02em', color: 'var(--text-1)' }}
            >
              EYA
            </h1>

            <div className="opacity-0-init animate-fade-up delay-100">
              <div className="h-px bg-gradient-to-r from-[var(--teal)] via-[var(--acid)] to-transparent mb-6" />
              <p className="font-ui text-2xl font-light tracking-wide text-[var(--text-2)] leading-snug">
                Monitoramento urbano de<br />
                <span className="font-semibold text-[var(--text-1)]">emissões de metano</span> via satélite
              </p>
            </div>

            <p className="font-ui text-base text-[var(--text-3)] mt-4 mb-10 leading-relaxed max-w-md opacity-0-init animate-fade-up delay-200">
              Plataforma governamental de análise geoespacial para gestão inteligente
              de resíduos urbanos e mitigação de gases de efeito estufa.
            </p>

            {/* CTA */}
            <div className="flex gap-4 mb-14 opacity-0-init animate-fade-up delay-300">
              <button
                onClick={onEnter}
                className="group bracket flex items-center gap-3 px-8 py-4 font-ui font-semibold tracking-widest uppercase text-sm text-[var(--void)] bg-[var(--teal)] hover:bg-[var(--acid)] transition-all glow-teal"
              >
                Iniciar Monitoramento
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onEducational}
                className="px-6 py-4 font-ui font-medium tracking-wide text-sm text-[var(--teal)] border border-[var(--border-hi)] hover:border-[var(--teal)] hover:bg-[rgba(0,232,208,0.06)] transition-all"
              >
                Guia Educativo
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 opacity-0-init animate-fade-up delay-400">
              {[
                { val: '2.160+', label: 'Pontos monitorados' },
                { val: '15',     label: 'Cidades brasileiras' },
                { val: '7km',    label: 'Resolução espacial' },
              ].map(({ val, label }) => (
                <div key={label} className="glass p-4 rounded-sm border border-[var(--border)] hover:border-[var(--teal)] transition-colors group">
                  <div className="led text-2xl font-semibold group-hover:text-[var(--acid)] transition-colors">{val}</div>
                  <div className="font-ui text-xs text-[var(--text-3)] mt-1 uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — globe */}
          <div className="hidden lg:flex flex-col items-center justify-center opacity-0-init animate-fade-in delay-300">
            <div className="relative">
              {/* outer ring */}
              <div className="absolute inset-[-40px] rounded-full border border-[var(--border)] animate-spin-slow opacity-40" />
              <div className="absolute inset-[-20px] rounded-full border border-dashed border-[var(--teal)] opacity-10 animate-spin-slow" style={{animationDirection:'reverse', animationDuration:'30s'}} />
              <SimpleGlobe />
            </div>
            {/* Telemetry readout under globe */}
            <div className="mt-8 glass px-6 py-3 rounded-sm border border-[var(--border)] flex gap-8">
              {[
                { key: 'SAT', val: 'S5P-OFFL' },
                { key: 'RES', val: '7×7km' },
                { key: 'LAT', val: '≤5d' },
              ].map(({ key, val }) => (
                <div key={key} className="text-center">
                  <div className="font-data text-[10px] text-[var(--text-3)] tracking-widest uppercase">{key}</div>
                  <div className="font-data text-xs text-[var(--teal)] mt-0.5">{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="hr-glow mx-8" />

      {/* ── MISSION ── */}
      <section id="missão" className="max-w-7xl mx-auto px-8 py-24">
        <div className="mb-12">
          <span className="font-data text-xs tracking-widest uppercase text-[var(--teal)]">// missão</span>
          <h2 className="font-display text-3xl font-bold mt-2 text-[var(--text-1)]">
            Dados de satélite → ação pública
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Satellite className="w-5 h-5" />,
              title: 'Detecção Precisa',
              color: 'var(--teal)',
              body: 'Sentinel-5P TROPOMI da ESA + MODIS Terra/Aqua da NASA identificam CH₄ com resolução espacial de 7×7km e cobertura diária.',
              tags: ['CH₄', 'NO₂', 'TROPOMI'],
            },
            {
              icon: <GitBranch className="w-5 h-5" />,
              title: 'Análise Integrada',
              color: 'var(--acid)',
              body: 'Correlação de emissões com densidade populacional, NDVI e categorias de resíduo para análise de impacto ambiental completa.',
              tags: ['NDVI', 'GEE', 'Supabase'],
            },
            {
              icon: <Eye className="w-5 h-5" />,
              title: 'Decisão Baseada em Dados',
              color: 'var(--amber)',
              body: 'Insights acionáveis para gestores priorizarem intervenções e alocarem recursos em áreas críticas com precisão científica.',
              tags: ['Dashboard', 'PDF', 'Real-time'],
            },
          ].map(({ icon, title, color, body, tags }, i) => (
            <div
              key={title}
              className="glass rounded-sm p-6 border border-[var(--border)] hover:border-[var(--border-hi)] transition-all group opacity-0-init animate-fade-up"
              style={{ animationDelay: `${i * 0.15}s`, '--card-color': color } as any}
            >
              <div
                className="w-10 h-10 flex items-center justify-center rounded-sm mb-5 transition-all"
                style={{ background: `rgba(${color === 'var(--teal)' ? '0,232,208' : color === 'var(--acid)' ? '184,255,87' : '255,178,36'},0.1)`, color }}
              >
                {icon}
              </div>
              <h3 className="font-ui font-semibold text-lg text-[var(--text-1)] mb-2">{title}</h3>
              <p className="font-ui text-sm text-[var(--text-2)] leading-relaxed mb-4">{body}</p>
              <div className="flex gap-2 flex-wrap">
                {tags.map(tag => (
                  <span key={tag} className="font-data text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-sm" style={{ background: `rgba(${color === 'var(--teal)' ? '0,232,208' : color === 'var(--acid)' ? '184,255,87' : '255,178,36'},0.08)`, color }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="hr-glow mx-8" />

      {/* ── TECHNOLOGY ── */}
      <section id="tecnologia" className="max-w-7xl mx-auto px-8 py-24">
        <span className="font-data text-xs tracking-widest uppercase text-[var(--teal)]">// tecnologia</span>
        <h2 className="font-display text-3xl font-bold mt-2 mb-12 text-[var(--text-1)]">
          Fontes de dados científicos
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              name: 'Sentinel-5P TROPOMI',
              agency: 'European Space Agency (ESA)',
              desc: 'Espectrômetro de imageamento para concentrações atmosféricas de CH₄ e NO₂. Resolução 7×7 km, cobertura diária global.',
              tags: [['CH₄','var(--teal)'],['NO₂','var(--teal)'],['7×7km','var(--text-2)'],['Diário','var(--text-2)']],
              accent: 'var(--teal)',
            },
            {
              name: 'MODIS Terra / Aqua',
              agency: 'NASA Earth Observing System',
              desc: 'Espectrômetro multiespectral para análise de NDVI e identificação de áreas degradadas. Resolução 250m–1km.',
              tags: [['NDVI','var(--acid)'],['LST','var(--acid)'],['250m–1km','var(--text-2)'],['1–2 dias','var(--text-2)']],
              accent: 'var(--acid)',
            },
          ].map(({ name, agency, desc, tags, accent }) => (
            <div key={name} className="glass-hi rounded-sm p-8 border border-[var(--border-hi)]">
              <div className="flex items-start gap-3 mb-5">
                <div className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
                <div>
                  <h4 className="font-display text-xl font-bold text-[var(--text-1)]">{name}</h4>
                  <p className="font-data text-xs text-[var(--text-3)] tracking-wide mt-0.5">{agency}</p>
                </div>
              </div>
              <p className="font-ui text-sm text-[var(--text-2)] leading-relaxed mb-5">{desc}</p>
              <div className="flex gap-2 flex-wrap">
                {tags.map(([label, color]) => (
                  <span
                    key={label}
                    className="font-data text-[10px] tracking-widest uppercase px-2 py-1 rounded-sm border"
                    style={{ color, borderColor: color, background: `rgba(0,0,0,0.3)` }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="hr-glow mx-8" />

      {/* ── CTA ── */}
      <section id="dados" className="max-w-7xl mx-auto px-8 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="font-data text-xs tracking-widest uppercase text-[var(--teal)]">// começar</span>
          <h2 className="font-display text-4xl font-bold mt-3 mb-4 text-[var(--text-1)]">
            Acesse a plataforma
          </h2>
          <p className="font-ui text-[var(--text-2)] mb-10 leading-relaxed">
            Dados de satélite em tempo real. Relatórios técnicos. Decisões baseadas em ciência.
          </p>
          <button
            onClick={onEnter}
            className="group bracket inline-flex items-center gap-4 px-12 py-5 font-ui font-bold tracking-widest uppercase text-sm text-[var(--void)] bg-[var(--teal)] hover:bg-[var(--acid)] transition-all glow-teal"
          >
            <Zap className="w-5 h-5" />
            Acessar Dashboard
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-[var(--border)] py-10">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-bold text-[var(--teal)] tracking-widest">EYA</span>
            <span className="text-[var(--border-hi)]">·</span>
            <span className="font-ui text-xs text-[var(--text-3)] tracking-wide">
              Plataforma governamental de monitoramento ambiental via satélite
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] animate-glow-pulse" />
            <span className="font-data text-[10px] text-[var(--text-3)] tracking-widest uppercase">
              NASA · ESA · Copernicus · INPE
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
