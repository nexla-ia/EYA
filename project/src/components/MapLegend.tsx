import { X } from 'lucide-react';

interface MapLegendProps {
  activeLayers: {
    airPollution: boolean;
    soilPollution: boolean;
    populationDensity: boolean;
  };
  onClose: () => void;
}

export default function MapLegend({ activeLayers, onClose }: MapLegendProps) {
  return (
    <div className="absolute bottom-8 left-4 bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-slate-700 p-4 max-w-xs z-10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-white">Legenda do Mapa</h3>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4 text-sm">
        {activeLayers.airPollution && (
          <div>
            <p className="font-medium text-slate-200 mb-2">Emissões de Metano (CH₄)</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FFFFB2' }}></div>
                <span className="text-slate-300">0-50 ppb - Baixo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FECC5C' }}></div>
                <span className="text-slate-300">50-100 ppb - Atenção</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FD8D3C' }}></div>
                <span className="text-slate-300">100-150 ppb - Moderado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#F03B20' }}></div>
                <span className="text-slate-300">150-200 ppb - Alto</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#BD0026' }}></div>
                <span className="text-slate-300">200+ ppb - Crítico</span>
              </div>
            </div>
          </div>
        )}

        {activeLayers.soilPollution && (
          <div>
            <p className="font-medium text-slate-200 mb-2">Poluição do Solo</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#006D2C' }}></div>
                <span className="text-slate-300">0-20 - Baixo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#66BD63' }}></div>
                <span className="text-slate-300">20-40 - Moderado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#F7F7F7' }}></div>
                <span className="text-slate-300">40-60 - Limite</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#F46D43' }}></div>
                <span className="text-slate-300">60-80 - Alto</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#A50026' }}></div>
                <span className="text-slate-300">80-100 - Crítico</span>
              </div>
            </div>
          </div>
        )}

        {activeLayers.populationDensity && (
          <div>
            <p className="font-medium text-slate-200 mb-2">Densidade Populacional</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FDE725' }}></div>
                <span className="text-slate-300">0-100 hab/km²</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#B8DE29' }}></div>
                <span className="text-slate-300">100-500 hab/km²</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#55C667' }}></div>
                <span className="text-slate-300">500-2.000 hab/km²</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#2A788E' }}></div>
                <span className="text-slate-300">2.000-8.000 hab/km²</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#440154' }}></div>
                <span className="text-slate-300">8.000+ hab/km²</span>
              </div>
            </div>
          </div>
        )}

        {!activeLayers.airPollution && !activeLayers.soilPollution && !activeLayers.populationDensity && (
          <p className="text-slate-400 italic">
            Ative camadas no painel lateral para ver a legenda
          </p>
        )}
      </div>
    </div>
  );
}
