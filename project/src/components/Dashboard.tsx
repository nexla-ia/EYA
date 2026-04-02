import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Sidebar from './Sidebar';
import MapView from './MapView';
import InspectionPanel from './InspectionPanel';
import EducationalPage from './EducationalPage';
import { supabase, AirPollution, SoilPollution, PopulationDensity } from '../lib/supabase';

interface DashboardProps {
  onBack: () => void;
}

export default function Dashboard({ onBack }: DashboardProps) {
  const [activeLayers, setActiveLayers] = useState({
    airPollution: true,
    soilPollution: true,
    populationDensity: false,
  });

  const [filters, setFilters] = useState({
    severity: 'all',
    category: 'all',
    dateRange: 90,
  });

  const [airPollutionData, setAirPollutionData] = useState<AirPollution[]>([]);
  const [soilPollutionData, setSoilPollutionData] = useState<SoilPollution[]>([]);
  const [populationData, setPopulationData] = useState<PopulationDensity[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showEducational, setShowEducational] = useState(false);

  useEffect(() => {
    loadData();
  }, [filters]);

  async function loadData() {
    setLoading(true);
    try {
      const dateThreshold = new Date();
      dateThreshold.setDate(dateThreshold.getDate() - filters.dateRange);

      let airQuery = supabase
        .from('air_pollution')
        .select('*')
        .gte('recorded_at', dateThreshold.toISOString())
        .order('recorded_at', { ascending: false });

      if (filters.severity !== 'all') {
        airQuery = airQuery.eq('severity', filters.severity);
      }

      let soilQuery = supabase
        .from('soil_pollution')
        .select('*')
        .gte('recorded_at', dateThreshold.toISOString())
        .order('recorded_at', { ascending: false });

      if (filters.severity !== 'all') {
        soilQuery = soilQuery.eq('severity', filters.severity);
      }

      if (filters.category !== 'all') {
        soilQuery = soilQuery.eq('category', filters.category);
      }

      const popQuery = supabase
        .from('population_density_grid')
        .select('*');

      const [airResult, soilResult, popResult] = await Promise.all([
        airQuery,
        soilQuery,
        popQuery,
      ]);

      if (airResult.data) setAirPollutionData(airResult.data);
      if (soilResult.data) setSoilPollutionData(soilResult.data);
      if (popResult.data) setPopulationData(popResult.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (showEducational) {
    return <EducationalPage onBack={() => setShowEducational(false)} />;
  }

  return (
    <div className="h-screen flex overflow-hidden bg-slate-900">
      <Sidebar
        activeLayers={activeLayers}
        onLayerToggle={(layer) =>
          setActiveLayers((prev) => ({ ...prev, [layer]: !prev[layer] }))
        }
        filters={filters}
        onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters })}
        onRefresh={loadData}
        dataCount={{
          airPollution: airPollutionData.length,
          soilPollution: soilPollutionData.length,
        }}
        onShowEducational={() => setShowEducational(true)}
      />

      <div className="flex-1 relative">
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg shadow-lg border border-slate-700 flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          <button
            onClick={() => setShowEducational(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg shadow-lg flex items-center gap-2 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Guia Educativo
          </button>
        </div>

        <MapView
          activeLayers={activeLayers}
          airPollutionData={airPollutionData}
          soilPollutionData={soilPollutionData}
          populationData={populationData}
          onFeatureClick={setSelectedFeature}
        />

        {selectedFeature && (
          <InspectionPanel
            feature={selectedFeature}
            onClose={() => setSelectedFeature(null)}
          />
        )}

        {loading && (
          <div className="absolute top-4 right-4 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg border border-slate-700">
            Carregando dados...
          </div>
        )}
      </div>
    </div>
  );
}
