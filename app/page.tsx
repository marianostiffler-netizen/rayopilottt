'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [distance, setDistance] = useState(5);
  const [lightningBolts, setLightningBolts] = useState<Array<{id: number, x: number, y: number, angle: number, length: number}>>([]);
  
  const calculatePrice = (dist: number) => {
    if (dist <= 3) return 3500;
    if (dist <= 5) return 4300;
    if (dist <= 7) return 5100;
    if (dist <= 9) return 6000;
    if (dist <= 11) return 6800;
    if (dist <= 13) return 7600;
    if (dist <= 15) return 8200;
    if (dist <= 17) return 9000;
    return 10000;
  };

  const price = calculatePrice(distance);

  // Efecto de rayos cinéticos
  useEffect(() => {
    const generateLightning = () => {
      const newBolt = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        angle: Math.random() * 360,
        length: 20 + Math.random() * 40
      };
      
      setLightningBolts(prev => [...prev.slice(-8), newBolt]);
      
      setTimeout(() => {
        setLightningBolts(prev => prev.filter(bolt => bolt.id !== newBolt.id));
      }, 800 + Math.random() * 1200);
    };

    const interval = setInterval(generateLightning, 200 + Math.random() * 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Fondo con efecto de red neuronal */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-transparent to-yellow-900/20"></div>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="#FFD700" opacity="0.3" style={{filter: 'drop-shadow(0 0 3px #FFD700)'}}/>
              <path d="M20 0 L20 40 M0 20 L40 20" stroke="#FFD700" strokeWidth="0.5" opacity="0.2" style={{filter: 'drop-shadow(0 0 2px #FFD700)'}}/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" style={{filter: 'drop-shadow(0 0 4px #FFD700)'}} />
        </svg>
        
        {/* Efecto de rayos cinéticos */}
        {lightningBolts.map(bolt => (
          <div
            key={bolt.id}
            className="absolute animate-pulse"
            style={{
              left: `${bolt.x}%`,
              top: `${bolt.y}%`,
              transform: `rotate(${bolt.angle}deg)`,
              transformOrigin: 'center'
            }}
          >
            <svg 
              width={bolt.length} 
              height="2" 
              className="animate-ping"
              style={{
                filter: 'drop-shadow(0 0 6px #FFD700) drop-shadow(0 0 12px #FFD700)',
                animation: 'lightningFlash 0.8s ease-out forwards'
              }}
            >
              <line 
                x1="0" 
                y1="1" 
                x2={bolt.length} 
                y2="1" 
                stroke="#FFD700" 
                strokeWidth="0.5" 
                opacity="0.8"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center gap-2">
          {/* Logo animado de Rayo */}
          <svg className="w-10 h-10 text-yellow-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
          <span className="text-2xl font-bold text-yellow-500">Rayo</span>
        </div>
        <button className="px-6 py-2 border border-yellow-500 text-yellow-500 rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300">
          Coordinar Envío
        </button>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Rayo Cadetería
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">
            Rosario - Entregas Inmediatas
          </p>
          <p className="text-lg text-gray-400">
            Conectando la ciudad a la velocidad del rayo
          </p>
        </div>

        {/* Calculadora Inteligente */}
        <div className="bg-black/50 backdrop-blur-lg border border-yellow-500/30 rounded-2xl p-8 max-w-md w-full mb-12">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-6 text-center">
            Calculá tu envío
          </h2>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-3">
              Distancia: <span className="text-yellow-500 font-bold">{distance} km</span>
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #FFD700 0%, #FFD700 ${(distance / 20) * 100}%, #374151 ${(distance / 20) * 100}%, #374151 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>1km</span>
              <span>20km</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-400 mb-2">Precio estimado:</p>
            <p className="text-4xl font-bold text-yellow-500 transition-all duration-300">
              ${price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Sección de Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-12">
          <a
            href="https://wa.me/5493417537034?text=Hola%20Rayo,%20necesito%20realizar%20una%20mensajer%C3%ADa%20urgente."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black/30 backdrop-blur border border-yellow-500/20 rounded-xl p-6 text-center hover:border-yellow-500/50 transition-all duration-300 cursor-pointer hover:bg-black/40"
          >
            <svg className="w-12 h-12 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="text-xl font-semibold text-yellow-500 mb-2">Mensajería</h3>
            <p className="text-gray-400">Entregas urgentes en minutos</p>
          </a>
          
          <a
            href="https://wa.me/5493417537034?text=Hola%20Rayo,%20necesito%20enviar%20un%20paquete."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black/30 backdrop-blur border border-yellow-500/20 rounded-xl p-6 text-center hover:border-yellow-500/50 transition-all duration-300 cursor-pointer hover:bg-black/40"
          >
            <svg className="w-12 h-12 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-xl font-semibold text-yellow-500 mb-2">Paquetería</h3>
            <p className="text-gray-400">Paquetes seguros y rápidos</p>
          </a>
          
          <a
            href="https://wa.me/5493417537034?text=Hola%20Rayo,%20necesito%20realizar%20un%20tr%C3%A1mite%20administrativo."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black/30 backdrop-blur border border-yellow-500/20 rounded-xl p-6 text-center hover:border-yellow-500/50 transition-all duration-300 cursor-pointer hover:bg-black/40"
          >
            <svg className="w-12 h-12 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-yellow-500 mb-2">Trámites</h3>
            <p className="text-gray-400">Gestión documental rápida</p>
          </a>
        </div>
      </main>

      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/5493417537034?text=Hola%20Rayo,%20quiero%20coordinar%20un%20envío"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-2 transition-all duration-300 hover:scale-105 z-20"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        Pedir Cadete
      </a>

      <style jsx>{`
        @keyframes lightningFlash {
          0% {
            opacity: 0;
            transform: scaleX(0.5);
          }
          20% {
            opacity: 1;
            transform: scaleX(1.2);
          }
          40% {
            opacity: 0.8;
            transform: scaleX(0.9);
          }
          60% {
            opacity: 1;
            transform: scaleX(1.1);
          }
          80% {
            opacity: 0.6;
            transform: scaleX(0.95);
          }
          100% {
            opacity: 0;
            transform: scaleX(0.3);
          }
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #FFD700;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #FFD700;
          cursor: pointer;
          border-radius: 50%;
          border: none;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }
      `}</style>
    </div>
  );
}
