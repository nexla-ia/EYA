import { useState } from 'react';
import {
  Layers,
  Filter,
  Globe,
  Calendar,
  Search,
  BookOpen,
  MapPin,
} from 'lucide-react';

interface SidebarProps {
  activeLayers: {
    airPollution: boolean;
    soilPollution: boolean;
    populationDensity: boolean;
  };
  onLayerToggle: (layer: string) => void;
  filters: {
    severity: string;
    category: string;
    dateRange: number;
  };
  onFilterChange: (filters: any) => void;
  onRefresh: () => void;
  dataCount: {
    airPollution: number;
    soilPollution: number;
  };
  onShowEducational: () => void;
}

export default function Sidebar({
  activeLayers,
  onLayerToggle,
  filters,
  onFilterChange,
  onRefresh,
  dataCount,
  onShowEducational,
}: SidebarProps) {
  const [showEducational, setShowEducational] = useState(false);
  const [searchCity, setSearchCity] = useState('');
  const [searchState, setSearchState] = useState('');

  const brazilianCities = [
    'São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Belo Horizonte',
    'Manaus', 'Curitiba', 'Recife', 'Porto Alegre', 'Fortaleza',
    'Goiânia', 'Belém', 'Guarulhos', 'Campinas', 'São Luís'
  ];

  const brazilianStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <div className="w-96 bg-slate-800 text-white flex flex-col h-full overflow-hidden border-r border-slate-700">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3 mb-2">
          <Globe className="w-8 h-8 text-emerald-400" />
          <div>
            <h1 className="text-2xl font-bold">EYA</h1>
            <p className="text-xs text-slate-400">Earth + IA Platform</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-semibold">Camadas</h2>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={activeLayers.airPollution}
                  onChange={() => onLayerToggle('airPollution')}
                  className="w-4 h-4 rounded accent-emerald-500"
                />
                <div className="flex-1">
                  <div className="font-medium">Emissões de Metano (CH₄)</div>
                  <div className="text-xs text-slate-400">
                    {dataCount.airPollution} pontos detectados
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={activeLayers.soilPollution}
                  onChange={() => onLayerToggle('soilPollution')}
                  className="w-4 h-4 rounded accent-emerald-500"
                />
                <div className="flex-1">
                  <div className="font-medium">Resíduos Urbanos</div>
                  <div className="text-xs text-slate-400">
                    {dataCount.soilPollution} áreas detectadas
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={activeLayers.populationDensity}
                  onChange={() => onLayerToggle('populationDensity')}
                  className="w-4 h-4 rounded accent-emerald-500"
                />
                <div className="flex-1">
                  <div className="font-medium">Densidade Populacional</div>
                  <div className="text-xs text-slate-400">
                    Mapa de calor populacional
                  </div>
                </div>
              </label>

            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-semibold">Filtros</h2>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-300">
                  Gravidade
                </label>
                <select
                  value={filters.severity}
                  onChange={(e) => onFilterChange({ severity: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                >
                  <option value="all">Todas</option>
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                  <option value="critical">Crítica</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-slate-300">
                  Categoria (Solo)
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => onFilterChange({ category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                >
                  <option value="all">Todas</option>
                  <option value="Resíduos Urbanos">Resíduos Urbanos</option>
                  <option value="Lixo Industrial">Lixo Industrial</option>
                  <option value="Deposição Irregular">Deposição Irregular</option>
                  <option value="Aterro">Aterro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-slate-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Últimos {filters.dateRange} dias
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={filters.dateRange}
                  onChange={(e) =>
                    onFilterChange({ dateRange: parseInt(e.target.value) })
                  }
                  className="w-full accent-cyan-500"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Search className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-semibold">Localização</h2>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-300 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Cidade
                </label>
                <select
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                >
                  <option value="">Selecione uma cidade</option>
                  {brazilianCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-slate-300">
                  Estado
                </label>
                <select
                  value={searchState}
                  onChange={(e) => setSearchState(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                >
                  <option value="">Todos os estados</option>
                  {brazilianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={onShowEducational}
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-colors flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Abrir Guia Educativo
          </button>

          <button
            onClick={() => setShowEducational(!showEducational)}
            className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <BookOpen className="w-4 h-4" />
            {showEducational ? 'Ocultar' : 'Ver'} Dicas Rápidas
          </button>

          {showEducational && (
            <div className="p-4 bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-lg space-y-4 border border-blue-700/50">
              <div>
                <h3 className="font-semibold text-cyan-300 mb-2 flex items-center gap-2">
                  🔬 O que é Metano (CH₄)?
                </h3>
                <p className="text-sm text-slate-300">
                  Metano é um gás incolor e inodoro produzido pela decomposição de matéria orgânica. É um dos principais gases de efeito estufa, 25x mais potente que o CO₂.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-orange-300 mb-2 flex items-center gap-2">
                  ⚠️ Impactos Ambientais
                </h3>
                <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
                  <li>Aquecimento global acelerado</li>
                  <li>Poluição do ar urbano</li>
                  <li>Contaminação do solo e água</li>
                  <li>Degradação de ecossistemas</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-red-300 mb-2 flex items-center gap-2">
                  🏥 Riscos à Saúde
                </h3>
                <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
                  <li>Problemas respiratórios</li>
                  <li>Náuseas e tonturas</li>
                  <li>Dores de cabeça</li>
                  <li>Asfixia em altas concentrações</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
                  ✅ Como Prevenir
                </h3>
                <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
                  <li>Gestão adequada de resíduos</li>
                  <li>Coleta seletiva e reciclagem</li>
                  <li>Compostagem de orgânicos</li>
                  <li>Aterros sanitários modernos</li>
                  <li>Captura de metano em aterros</li>
                </ul>
              </div>

              <div className="pt-3 border-t border-blue-700/50">
                <p className="text-xs text-slate-400 italic">
                  Esta plataforma ajuda gestores públicos a identificar áreas críticas e tomar decisões baseadas em dados para melhorar a qualidade ambiental urbana.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-slate-700 text-xs text-slate-400">
        <p>
          EYA — Plataforma governamental de monitoramento ambiental via satélite. Dados integráveis com NASA Earthdata, Copernicus e INPE.
        </p>
      </div>
    </div>
  );
}