import { X, Download, MapPin, Calendar, Gauge, Flame, Leaf, Users, Droplets } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface InspectionPanelProps {
  feature: {
    type: string;
    properties: any;
    coordinates: [number, number];
  };
  onClose: () => void;
}

export default function InspectionPanel({ feature, onClose }: InspectionPanelProps) {
  const { type, properties, coordinates } = feature;

  function getSeverityColor(severity: string): string {
    switch (severity) {
      case 'low':
        return 'bg-emerald-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'high':
        return 'bg-orange-500';
      case 'critical':
        return 'bg-red-600';
      default:
        return 'bg-slate-500';
    }
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  }

  async function handleExportPDF() {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = margin;

    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('EYA - Relatório de Inspeção', margin, yPosition);
    yPosition += 15;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100);
    pdf.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, margin, yPosition);
    yPosition += 15;

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0);

    if (type === 'air-pollution') {
      pdf.text('Emissão de Metano (CH₄)', margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Concentração CH₄: ${properties.value.toFixed(2)} ppb`, margin, yPosition);
      yPosition += 8;
      pdf.text(`Gravidade: ${properties.severity}`, margin, yPosition);
      yPosition += 8;
    } else if (type === 'soil-pollution') {
      pdf.text('Detecção de Resíduos Urbanos', margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Score de Risco Ambiental: ${properties.risk_score?.toFixed(2) || properties.score.toFixed(2)}`, margin, yPosition);
      yPosition += 8;
      pdf.text(`Categoria: ${properties.category}`, margin, yPosition);
      yPosition += 8;
      pdf.text(`Gravidade: ${properties.severity}`, margin, yPosition);
      yPosition += 8;
      pdf.text(`Emissão CH₄: ${properties.ch4_value?.toFixed(2) || 'N/A'} ppb`, margin, yPosition);
      yPosition += 8;
      pdf.text(`NDVI: ${properties.ndvi_value?.toFixed(3) || 'N/A'}`, margin, yPosition);
      yPosition += 8;
      pdf.text(`Densidade Pop.: ${properties.population_density || 'N/A'} hab/km²`, margin, yPosition);
      yPosition += 8;
      pdf.text(`Intensidade de Poluição: ${properties.pollution_intensity || 'N/A'}`, margin, yPosition);
      yPosition += 8;
    }

    pdf.text(`Fonte: ${properties.source}`, margin, yPosition);
    yPosition += 8;
    pdf.text(`Data/Hora: ${formatDate(properties.recorded_at)}`, margin, yPosition);
    yPosition += 8;
    pdf.text(`Coordenadas: ${coordinates[1].toFixed(6)}, ${coordinates[0].toFixed(6)}`, margin, yPosition);
    yPosition += 15;

    try {
      const mapElement = document.querySelector('.maplibregl-canvas') as HTMLCanvasElement;
      if (mapElement) {
        const canvas = await html2canvas(mapElement, {
          useCORS: true,
          allowTaint: true,
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pageWidth - 2 * margin;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (yPosition + imgHeight > pdf.internal.pageSize.getHeight() - margin) {
          pdf.addPage();
          yPosition = margin;
        }

        pdf.text('Visualização do Mapa:', margin, yPosition);
        yPosition += 10;
        pdf.addImage(imgData, 'PNG', margin, yPosition, imgWidth, imgHeight);
      }
    } catch (error) {
      console.error('Error capturing map:', error);
    }

    pdf.save(`eya-relatorio-${Date.now()}.pdf`);
  }

  return (
    <div className="absolute top-4 left-4 w-96 bg-slate-800 rounded-lg shadow-2xl border border-slate-700 text-white z-10">
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <h3 className="font-semibold text-lg">Inspeção de Dados</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-slate-700 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {type === 'air-pollution' && (
          <>
            <div className="p-3 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Tipo</div>
              <div className="font-medium">Emissão de Metano (CH₄)</div>
            </div>

            <div className="p-3 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Concentração CH₄</div>
              <div className="text-2xl font-bold">{properties.value.toFixed(2)} ppb</div>
              <div className="text-xs text-slate-500 mt-1">partes por bilhão</div>
            </div>

            <div className="p-3 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Gravidade</div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(properties.severity)}`}>
                  {properties.severity}
                </span>
              </div>
            </div>
          </>
        )}

        {type === 'soil-pollution' && (
          <>
            <div className="p-3 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Tipo</div>
              <div className="font-medium">Detecção de Resíduos Urbanos</div>
            </div>

            <div className="p-3 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Score de Risco Ambiental</div>
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5" />
                <div className="text-2xl font-bold">{properties.risk_score?.toFixed(2) || properties.score.toFixed(2)}</div>
              </div>
            </div>

            <div className="p-3 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Categoria</div>
              <div className="font-medium">{properties.category}</div>
            </div>

            <div className="p-3 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Gravidade</div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(properties.severity)}`}>
                  {properties.severity}
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
                <Flame className="w-4 h-4" />
                Emissão de Metano (CH₄)
              </div>
              <div className="text-xl font-bold">{properties.ch4_value?.toFixed(2) || 'N/A'} <span className="text-sm font-normal">ppb</span></div>
            </div>

            <div className="p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
                <Users className="w-4 h-4" />
                Densidade Populacional
              </div>
              <div className="text-xl font-bold">{properties.population_density || 'N/A'} <span className="text-sm font-normal">hab/km²</span></div>
              <div className="text-xs text-slate-500 mt-1">
                População potencialmente afetada
              </div>
            </div>

            <div className="p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
                <Droplets className="w-4 h-4" />
                Intensidade de Poluição do Solo
              </div>
              <div className="text-xl font-bold">{properties.pollution_intensity || 'N/A'}</div>
              <div className="text-xs text-slate-500 mt-1">
                {properties.pollution_intensity === 'Alta' ? 'Solo severamente contaminado' :
                 properties.pollution_intensity === 'Média' ? 'Solo moderadamente contaminado' :
                 'Solo levemente contaminado'}
              </div>
            </div>

            <div className="p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
                <Leaf className="w-4 h-4" />
                NDVI (Vegetação)
              </div>
              <div className="text-xl font-bold">{properties.ndvi_value?.toFixed(3) || 'N/A'}</div>
              <div className="text-xs text-slate-500 mt-1">
                {properties.ndvi_value && properties.ndvi_value < 0.2 ? 'Solo degradado' :
                 properties.ndvi_value && properties.ndvi_value < 0.4 ? 'Vegetação esparsa' :
                 'Vegetação saudável'}
              </div>
            </div>
          </>
        )}


        <div className="p-3 bg-slate-700/50 rounded-lg">
          <div className="text-sm text-slate-400 mb-1">Fonte</div>
          <div className="font-medium text-sm">{properties.source}</div>
        </div>

        <div className="p-3 bg-slate-700/50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
            <Calendar className="w-4 h-4" />
            Data/Hora
          </div>
          <div className="font-medium text-sm">{formatDate(properties.recorded_at)}</div>
        </div>

        <div className="p-3 bg-slate-700/50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
            <MapPin className="w-4 h-4" />
            Coordenadas
          </div>
          <div className="font-mono text-sm">
            {coordinates[1].toFixed(6)}, {coordinates[0].toFixed(6)}
          </div>
        </div>

        <button
          onClick={handleExportPDF}
          className="w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <Download className="w-5 h-5" />
          Exportar PDF
        </button>
      </div>
    </div>
  );
}
