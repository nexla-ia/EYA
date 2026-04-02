import { Satellite, ChevronRight, Database, Globe as GlobeIcon, BarChart3 } from 'lucide-react';
import SimpleGlobe from './SimpleGlobe';
import SimpleStarfield from './SimpleStarfield';

interface LandingPageProps {
  onEnter: () => void;
  onEducational: () => void;
}

export default function LandingPage({ onEnter, onEducational }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#0a0e27] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/10 to-transparent"></div>

      <SimpleStarfield />

      <nav className="relative z-10 border-b border-slate-800/50 backdrop-blur-sm bg-slate-900/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <Satellite className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">EYA</h1>
                <p className="text-xs text-slate-400">Earth + IA Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#mission" className="text-slate-300 hover:text-white transition-colors">Missão</a>
              <a href="#technology" className="text-slate-300 hover:text-white transition-colors">Tecnologia</a>
              <a href="#data" className="text-slate-300 hover:text-white transition-colors">Dados</a>
              <button
                onClick={onEducational}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Guia Educacional
              </button>
              <button
                onClick={onEnter}
                className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 rounded font-semibold transition-colors"
              >
                Acessar Plataforma
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="container mx-auto px-6 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-8 animate-pulse">
                🛰️ Monitoramento via Satélite NASA
              </div>

              <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                Monitoramento Urbano de{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Emissões de Metano
                </span>
              </h2>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Plataforma governamental de análise geoespacial para gestão inteligente de resíduos urbanos e mitigação de gases de efeito estufa.
              </p>

              <div className="flex gap-4 mb-16">
                <button
                  onClick={onEnter}
                  className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold text-lg transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105"
                >
                  Iniciar Monitoramento
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="group bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 hover:border-cyan-500/50 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer animate-float" style={{ animationDelay: '0s' }}>
                  <div className="text-3xl font-bold text-cyan-400 mb-1 group-hover:scale-110 transition-transform">1.200+</div>
                  <div className="text-sm text-slate-400">Áreas Monitoradas</div>
                </div>
                <div className="group bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 hover:border-cyan-500/50 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer animate-float" style={{ animationDelay: '0.2s' }}>
                  <div className="text-3xl font-bold text-cyan-400 mb-1 group-hover:scale-110 transition-transform">10</div>
                  <div className="text-sm text-slate-400">Cidades Brasileiras</div>
                </div>
                <div className="group bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 hover:border-cyan-500/50 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer animate-float" style={{ animationDelay: '0.4s' }}>
                  <div className="text-3xl font-bold text-cyan-400 mb-1 group-hover:scale-110 transition-transform">99.2%</div>
                  <div className="text-sm text-slate-400">Precisão de Dados</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex justify-center items-center">
              <div className="scale-90">
                <SimpleGlobe />
              </div>
            </div>
          </div>
        </section>

        <section id="mission" className="container mx-auto px-6 py-24 border-t border-slate-800/50">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-sm font-bold text-cyan-400 mb-3 tracking-wider uppercase">Nossa Missão</h3>
            <h2 className="text-4xl font-bold mb-12">
              Transformando dados de satélite em ação governamental
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="group bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20 cursor-pointer animate-float" style={{ animationDelay: '0s' }}>
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all">
                  <Satellite className="w-6 h-6 text-cyan-400 group-hover:rotate-12 transition-transform" />
                </div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">Detecção Precisa</h4>
                <p className="text-slate-400 leading-relaxed">
                  Utilizamos dados do satélite Sentinel-5P (TROPOMI) da ESA e MODIS Terra/Aqua da NASA para identificar emissões de CH₄ com precisão espacial de 7x7 km.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20 cursor-pointer animate-float" style={{ animationDelay: '0.3s' }}>
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all">
                  <BarChart3 className="w-6 h-6 text-cyan-400 group-hover:rotate-12 transition-transform" />
                </div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">Análise Integrada</h4>
                <p className="text-slate-400 leading-relaxed">
                  Correlacionamos emissões de metano com densidade populacional, índices de vegetação (NDVI) e categorias de resíduos para análise de impacto completa.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20 cursor-pointer animate-float" style={{ animationDelay: '0.6s' }}>
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all">
                  <GlobeIcon className="w-6 h-6 text-cyan-400 group-hover:rotate-12 transition-transform" />
                </div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">Decisões Baseadas em Dados</h4>
                <p className="text-slate-400 leading-relaxed">
                  Fornecemos insights acionáveis para gestores públicos priorizarem intervenções e alocarem recursos de forma eficiente em áreas críticas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="technology" className="container mx-auto px-6 py-24 border-t border-slate-800/50">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-sm font-bold text-cyan-400 mb-3 tracking-wider uppercase">Tecnologia</h3>
            <h2 className="text-4xl font-bold mb-6">
              Fontes de dados científicos
            </h2>
            <p className="text-slate-400 mb-12 text-lg max-w-3xl">
              Nossa plataforma integra múltiplas fontes de observação da Terra para fornecer uma visão completa do cenário ambiental urbano.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Database className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-2">Sentinel-5P TROPOMI</h4>
                    <p className="text-sm text-cyan-400 mb-3">European Space Agency</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Espectrômetro de imageamento para medir concentrações atmosféricas de metano (CH₄) com resolução espacial de 7×7 km e temporal diária.
                </p>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-300">CH₄</span>
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-300">7x7 km</span>
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-300">Diário</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Database className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-2">MODIS Terra/Aqua</h4>
                    <p className="text-sm text-cyan-400 mb-3">NASA Earth Observing System</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Espectrômetro multiespectral para análise de cobertura vegetal (NDVI) e identificação de áreas de solo degradado por resíduos.
                </p>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-300">NDVI</span>
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-300">250m-1km</span>
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-300">1-2 dias</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="data" className="container mx-auto px-6 py-24 border-t border-slate-800/50">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-sm font-bold text-cyan-400 mb-3 tracking-wider uppercase">Comece Agora</h3>
            <h2 className="text-4xl font-bold mb-6">
              Acesse a plataforma de monitoramento
            </h2>
            <p className="text-slate-400 mb-12 text-lg max-w-2xl mx-auto">
              Visualize dados em tempo real, gere relatórios técnicos e tome decisões baseadas em ciência.
            </p>
            <button
              onClick={onEnter}
              className="group px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-bold text-xl transition-all flex items-center gap-3 shadow-xl shadow-cyan-500/30 mx-auto"
            >
              Acessar Dashboard
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-slate-800/50 backdrop-blur-sm bg-slate-900/30 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                  <Satellite className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">EYA</span>
              </div>
              <p className="text-sm text-slate-400">
                Monitoramento de emissões urbanas via satélite.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Plataforma</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Relatórios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Dados</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Sentinel-5P</a></li>
                <li><a href="#" className="hover:text-white transition-colors">MODIS</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Sobre</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Missão</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tecnologia</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800/50 pt-8 text-center text-sm text-slate-500">
            <p>© 2024 EYA Platform. Monitoramento via satélite NASA/ESA. Dados científicos para gestão pública.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
