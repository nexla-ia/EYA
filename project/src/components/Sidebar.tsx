import { useState } from 'react';
import { Layers, SlidersHorizontal, MapPin, BookOpen, RefreshCw, ChevronDown } from 'lucide-react';

interface SidebarProps {
  activeLayers: { airPollution: boolean; soilPollution: boolean; populationDensity: boolean };
  onLayerToggle: (layer: string) => void;
  filters: { severity: string; category: string; dateRange: number };
  onFilterChange: (filters: any) => void;
  onRefresh: () => void;
  dataCount: { airPollution: number; soilPollution: number };
  onShowEducational: () => void;
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <label className="toggle-wrap">
      <input type="checkbox" className="toggle-input" checked={checked} onChange={onChange} />
      <div className="toggle-track">
        <div className="toggle-thumb" />
      </div>
    </label>
  );
}

function Section({ icon, label, children, defaultOpen = true }: {
  icon: React.ReactNode; label: string; children: React.ReactNode; defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[var(--border)]">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-3 hover:bg-[rgba(0,232,208,0.03)] transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-[var(--teal)]">{icon}</span>
          <span className="font-data text-[10px] tracking-widest uppercase text-[var(--text-3)]">{label}</span>
        </div>
        <ChevronDown
          className="w-3 h-3 text-[var(--text-3)] transition-transform"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      {open && <div className="px-5 pb-4">{children}</div>}
    </div>
  );
}

export default function Sidebar({
  activeLayers, onLayerToggle, filters, onFilterChange,
  onRefresh, dataCount, onShowEducational
}: SidebarProps) {
  const [searchCity, setSearchCity] = useState('');

  const cities = [
    'São Paulo','Rio de Janeiro','Belo Horizonte','Manaus','Salvador',
    'Curitiba','Recife','Fortaleza','Belém','Porto Alegre',
    'Goiânia','Campo Grande','Cuiabá','Porto Velho','Vilhena',
  ];

  const severityColor: Record<string, string> = {
    all: 'var(--text-2)', low: 'var(--teal)', medium: 'var(--amber)',
    high: 'var(--acid)', critical: 'var(--crimson)',
  };

  const layers = [
    {
      key: 'airPollution',
      label: 'Emissões CH₄ / NO₂',
      sub: 'Sentinel-5P TROPOMI',
      count: dataCount.airPollution,
      active: activeLayers.airPollution,
      color: 'var(--teal)',
    },
    {
      key: 'soilPollution',
      label: 'Risco de Resíduos',
      sub: 'Solo / Metano elevado',
      count: dataCount.soilPollution,
      active: activeLayers.soilPollution,
      color: 'var(--acid)',
    },
    {
      key: 'populationDensity',
      label: 'Densidade Populacional',
      sub: 'IBGE — hab/km²',
      count: null,
      active: activeLayers.populationDensity,
      color: 'var(--violet)',
    },
  ];

  return (
    <div
      className="w-72 flex flex-col h-full overflow-hidden border-r border-[var(--border)]"
      style={{ background: 'var(--deep)' }}
    >
      {/* Header */}
      <div className="px-5 py-5 border-b border-[var(--border)] flex items-center justify-between">
        <div>
          <div className="font-display text-xl font-bold text-[var(--teal)] tracking-widest leading-none">EYA</div>
          <div className="font-data text-[9px] text-[var(--text-3)] tracking-widest uppercase mt-0.5">
            Earth + IA Platform
          </div>
        </div>
        <button
          onClick={onRefresh}
          className="p-2 rounded-sm border border-[var(--border)] text-[var(--text-3)] hover:text-[var(--teal)] hover:border-[var(--teal)] transition-colors"
          title="Atualizar dados"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">

        {/* Layers */}
        <Section icon={<Layers className="w-3.5 h-3.5" />} label="Camadas">
          <div className="space-y-2 mt-1">
            {layers.map(({ key, label, sub, count, active, color }) => (
              <div
                key={key}
                className="flex items-center justify-between p-3 rounded-sm border transition-all cursor-pointer group"
                style={{
                  background: active ? `rgba(${color === 'var(--teal)' ? '0,232,208' : color === 'var(--acid)' ? '184,255,87' : '168,85,247'},0.04)` : 'transparent',
                  borderColor: active ? color : 'var(--border)',
                }}
                onClick={() => onLayerToggle(key)}
              >
                <div className="flex-1 min-w-0 mr-3">
                  <div className="font-ui text-sm font-medium text-[var(--text-1)] leading-tight">{label}</div>
                  <div className="font-data text-[9px] text-[var(--text-3)] tracking-wide mt-0.5 uppercase">{sub}</div>
                  {count !== null && (
                    <div className="font-data text-[10px] mt-1" style={{ color: active ? color : 'var(--text-3)' }}>
                      {count.toLocaleString('pt-BR')} pts
                    </div>
                  )}
                </div>
                <Toggle checked={active} onChange={() => onLayerToggle(key)} />
              </div>
            ))}
          </div>
        </Section>

        {/* Filters */}
        <Section icon={<SlidersHorizontal className="w-3.5 h-3.5" />} label="Filtros">
          <div className="space-y-4 mt-1">

            {/* Severity */}
            <div>
              <label className="font-data text-[9px] text-[var(--text-3)] tracking-widest uppercase block mb-1.5">
                Gravidade
              </label>
              <div className="grid grid-cols-5 gap-1">
                {['all','low','medium','high','critical'].map(s => (
                  <button
                    key={s}
                    onClick={() => onFilterChange({ severity: s })}
                    className="py-1.5 text-center rounded-sm border text-[9px] font-data tracking-wide uppercase transition-all"
                    style={{
                      borderColor: filters.severity === s ? severityColor[s] : 'var(--border)',
                      color: filters.severity === s ? severityColor[s] : 'var(--text-3)',
                      background: filters.severity === s ? `rgba(${s === 'all' ? '111,184,204' : s === 'low' ? '0,232,208' : s === 'medium' ? '255,178,36' : s === 'high' ? '184,255,87' : '255,61,90'},0.08)` : 'transparent',
                    }}
                  >
                    {s === 'all' ? 'all' : s === 'low' ? 'low' : s === 'medium' ? 'med' : s === 'high' ? 'hi' : 'crit'}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="font-data text-[9px] text-[var(--text-3)] tracking-widest uppercase block mb-1.5">
                Categoria (Solo)
              </label>
              <select value={filters.category} onChange={e => onFilterChange({ category: e.target.value })}>
                <option value="all">Todas</option>
                <option value="methane_emission">Emissão de Metano</option>
                <option value="Resíduos Urbanos">Resíduos Urbanos</option>
                <option value="Aterro">Aterro</option>
              </select>
            </div>

            {/* Date range */}
            <div>
              <label className="font-data text-[9px] text-[var(--text-3)] tracking-widest uppercase block mb-3">
                Janela temporal
              </label>
              <div className="flex items-center justify-between mb-2">
                <span className="font-data text-[10px] text-[var(--text-3)]">1d</span>
                <span className="led text-sm">{filters.dateRange}d</span>
                <span className="font-data text-[10px] text-[var(--text-3)]">90d</span>
              </div>
              <input
                type="range" min="1" max="90"
                value={filters.dateRange}
                onChange={e => onFilterChange({ dateRange: parseInt(e.target.value) })}
              />
            </div>
          </div>
        </Section>

        {/* Location */}
        <Section icon={<MapPin className="w-3.5 h-3.5" />} label="Localização" defaultOpen={false}>
          <div className="mt-1">
            <select value={searchCity} onChange={e => setSearchCity(e.target.value)}>
              <option value="">Todas as cidades</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </Section>

        {/* Edu button */}
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <button
            onClick={onShowEducational}
            className="w-full flex items-center justify-center gap-2 py-2.5 font-ui font-medium tracking-widest uppercase text-xs text-[var(--teal)] border border-[var(--border-hi)] hover:border-[var(--teal)] hover:bg-[rgba(0,232,208,0.05)] transition-all rounded-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Guia Educativo
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-[var(--border)]">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] animate-glow-pulse" />
          <span className="font-data text-[9px] text-[var(--teal)] tracking-widest uppercase">Sistema online</span>
        </div>
        <p className="font-data text-[9px] text-[var(--text-3)] leading-relaxed">
          NASA Earthdata · ESA Copernicus · INPE
        </p>
      </div>
    </div>
  );
}
