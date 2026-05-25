import React, { useState } from 'react';

export default function App() {
  // CONTROL DE VISTAS Y SEGURIDAD
  const [vista, setVista] = useState('landing'); // 'landing' o 'admin'
  const [passwordInput, setPasswordInput] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const CONTRASEÑA_CORRECTA = "admin123";

  // MODALS Y PASOS DE AGENDA
  const [showModal, setShowModal] = useState(false);
  const [pasoAgenda, setPasoAgenda] = useState(1); // Pasos: 1, 2, 3
  
  // ESTADO DEL FORMULARIO DE RESERVA
  const [reserva, setReserva] = useState({
    servicio: 'Limpieza Express',
    tamano: 'Departamento (1-2 hab)',
    fecha: '',
    hora: '08:00 AM',
    nombre: '',
    telefono: '',
    notes: ''
  });

  const [showReviewModal, setShowReviewModal] = useState(false);

  // DATOS SIMULADOS DE LA AGENDA (CORREGIDO)
  const [citas, setCitas] = useState([
    { id: 1, cliente: "Laura Estévez", fecha: "2026-05-20", hora: "08:00 AM", servicio: "Profunda", estatus: "Confirmada" },
    { id: 2, cliente: "Roberto Sanz", fecha: "2026-05-20", hora: "12:00 PM", servicio: "Express", estatus: "Pendiente" },
    { id: 3, cliente: "Familia Díaz", fecha: "2026-05-21", hora: "09:00 AM", servicio: "Express", estatus: "Completada" },
  ]);

  const cambiarEstatus = (id, nuevoEstatus) => {
    setCitas(citas.map(cita => cita.id === id ? { ...cita, estatus: nuevoEstatus } : cita));
  };

  const servicios = [
    { id: 1, icon: "🧹", titulo: "Limpieza Express", desc: "Mantenimiento rápido y eficiente para el día a día de tu hogar." },
    { id: 2, icon: "🧽", titulo: "Profunda", desc: "Desinfección de pies a cabeza, ideal para mudanzas o cambios de estación." },
    { id: 3, icon: "🏠", titulo: "Especializada", desc: "Planes a la medida según los requerimientos únicos de tu espacio." }
  ];

  const testimonios = [
    { id: 1, nombre: "María R.", comentario: "¡Increíble servicio. Casa reluciente!", estrellas: "⭐⭐⭐⭐⭐" },
    { id: 2, nombre: "Carlos S.", comentario: "Muy puntuales y profesionales.", estrellas: "⭐⭐⭐⭐⭐" },
    { id: 3, nombre: "Ana G.", comentario: "¡La mejor limpieza profunda!", estrellas: "⭐⭐⭐⭐⭐" }
  ];

  const manejarLogin = (e) => {
    e.preventDefault();
    if (passwordInput === CONTRASEÑA_CORRECTA) {
      setVista('admin');
      setShowLoginModal(false);
      setPasswordInput('');
      setErrorPassword(false);
    } else {
      setErrorPassword(true);
    }
  };

  const manejarEnvioReserva = (e) => {
    e.preventDefault();
    const nuevaCita = {
      id: citas.length + 1,
      cliente: reserva.nombre,
      fecha: reserva.fecha,
      hora: reserva.hora,
      servicio: reserva.servicio.replace("Limpieza ", ""),
      estatus: "Pendiente"
    };
    
    setCitas([nuevaCita, ...citas]);
    alert(`¡Reserva recibida con éxito, ${reserva.nombre}! Tu solicitud quedó en estatus 'Pendiente' en el sistema.`);
    
    setShowModal(false);
    setPasoAgenda(1);
    setReserva({
      servicio: 'Limpieza Express',
      tamano: 'Departamento (1-2 hab)',
      fecha: '',
      hora: '08:00 AM',
      nombre: '',
      telefono: '',
      notes: ''
    });
  };

  // =========================================================
  // VISTA 1: PANEL DE ADMINISTRACIÓN TOTALMENTE RESPONSIVO
  // =========================================================
  if (vista === 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-sans antialiased">
        <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-row lg:flex-col justify-between lg:justify-start p-4 lg:p-6 shrink-0 items-center lg:items-start">
          <div className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-cyan-500">•</span> CleanAdmin
          </div>
          <nav className="hidden lg:flex flex-col flex-1 gap-2 mt-8 w-full">
            <button className="w-full flex items-center gap-3 p-3 bg-cyan-50 text-cyan-700 rounded-xl font-medium text-left">📅 Agenda</button>
            <button className="w-full flex items-center gap-3 p-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors text-left">👥 Clientes</button>
          </nav>
          <div className="w-auto lg:w-full flex items-center">
            <button onClick={() => setVista('landing')} className="text-xs sm:text-sm text-blue-600 font-bold hover:underline bg-slate-100 lg:bg-transparent px-3 py-2 lg:p-0 rounded-xl">
              ← Volver <span className="hidden sm:inline">a la Web</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
          <header className="mb-6">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">Control de Agenda</h1>
            <p className="text-slate-500 text-xs sm:text-sm">Gestiona las solicitudes de hoy de manera táctil.</p>
          </header>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto w-full block whitespace-nowrap lg:whitespace-normal">
              <table className="w-full text-left border-collapse min-w-[500px] lg:min-w-0">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-3 sm:p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                    <th className="p-3 sm:p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Servicio</th>
                    <th className="p-3 sm:p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fecha/Hora</th>
                    <th className="p-3 sm:p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estatus</th>
                    <th className="p-3 sm:p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {citas.map((cita) => (
                    <tr key={cita.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-3 sm:p-4">
                        <div className="font-bold text-slate-900 break-words max-w-[120px] sm:max-w-none">{cita.cliente}</div>
                        <div className="text-[10px] text-slate-400">ID: #00{cita.id}</div>
                      </td>
                      <td className="p-3 sm:p-4">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[9px] font-black uppercase">{cita.servicio}</span>
                      </td>
                      <td className="p-3 sm:p-4">
                        <div className="text-slate-700 font-medium">{cita.fecha}</div>
                        <div className="text-[10px] text-slate-400">{cita.hora}</div>
                      </td>
                      <td className="p-3 sm:p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                          cita.estatus === 'Confirmada' ? 'bg-blue-100 text-blue-600' : 
                          cita.estatus === 'Completada' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                        }`}>{cita.estatus}</span>
                      </td>
                      <td className="p-3 sm:p-4">
                        <select 
                          className="text-[11px] bg-slate-100 border-none rounded-lg p-1 focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                          value={cita.estatus}
                          onChange={(e) => cambiarEstatus(cita.id, e.target.value)}
                        >
                          <option value="Pendiente">Pnd</option>
                          <option value="Confirmada">Ok</option>
                          <option value="Completada">Fin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // =========================================================
  // VISTA 2: LANDING PAGE PÚBLICA (ESTRUCTURA ORIGINAL LIMPIA)
  // =========================================================
  return (
    <div className="min-h-screen w-full bg-cyan-50/50 text-slate-800 font-sans antialiased selection:bg-cyan-200 pt-24 sm:pt-28">
      
      {/* NAVBAR ORIGINAL FIJO CORREGIDO */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 sm:pt-4 bg-transparent pointer-events-none">
        <header className="max-w-6xl mx-auto backdrop-blur-md bg-white/80 border border-slate-200/40 rounded-2xl sm:rounded-3xl shadow-lg px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center pointer-events-auto">
          <div className="text-xl sm:text-2xl font-black tracking-tighter text-slate-900 flex items-center gap-1">
            <span className="text-cyan-500">•</span> AGG Cleaning
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-semibold text-blue-900/80">
            <a href="#inicio" className="hover:text-cyan-600 transition-colors">Inicio</a>
            <a href="#beneficios" className="hover:text-cyan-600 transition-colors">Beneficios</a>
            <a href="#servicios" className="hover:text-cyan-600 transition-colors">Servicios</a>
            <a href="#opiniones" className="hover:text-cyan-600 transition-colors">Opiniones</a>
          </nav>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-md transition-all active:scale-95"
          >
            Agendar
          </button>
        </header>
      </div>

      {/* Hero */}
      <section id="inicio" className="relative px-4 pb-12 max-w-6xl mx-auto grid md:grid-cols-12 gap-8 items-center pt-4">
        <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-100 rounded-full blur-[100px] -z-10" />
        <div className="md:col-span-7 space-y-4 sm:space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-950 tracking-tighter leading-[1.05] md:leading-[0.95]">
            Hogar impecable,<br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">mientras tú</span> disfruta
          </h1>
          <p className="text-base sm:text-xl text-slate-700 max-w-xl mx-auto md:mx-0 leading-relaxed font-medium">
            Servicios profesionales de limpieza con agenda transparente para tu tranquilidad. Seguridad, frescura y confianza.
          </p>
          <div className="pt-2">
            <button 
              onClick={() => setShowModal(true)}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
            >
              Empieza Hoy – Cotizar y Agendar
            </button>
          </div>
        </div>

        {/* Testimonios Cortos Hero */}
        <div className="md:col-span-5 flex flex-col gap-3 w-full max-w-md mx-auto md:mx-0">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center md:text-left">Clientes satisfechos:</div>
          {testimonios.slice(0, 2).map((t) => (
            <div key={t.id} className="p-4 sm:p-5 bg-white border border-cyan-100 rounded-2xl sm:rounded-3xl shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold text-xs shrink-0 border border-cyan-200">{t.nombre[0]}</div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{t.nombre}</h4>
                    <span className="text-amber-500 text-[10px] tracking-tighter shrink-0">{t.estrellas}</span>
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed break-words">"{t.comentario}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cintillo Eco */}
      <div className="max-w-6xl mx-auto px-4 mb-12 sm:mb-20">
        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <span className="text-2xl sm:text-3xl">🌱</span>
          <p className="text-xs sm:text-base font-semibold text-emerald-900 leading-relaxed">
            <strong className="font-extrabold text-emerald-950">Hogar Saludable:</strong> Usamos productos biodegradables, 100% seguros para niños y mascotas.
          </p>
        </div>
      </div>

      {/* Beneficios */}
      <section id="beneficios" className="py-10 max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 mb-2">¿Por qué confiar?</h2>
          <p className="text-sm sm:text-lg text-slate-600 font-medium">Ofrecemos tranquilidad para tu espacio.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 sm:gap-10">
          <div className="p-6 sm:p-8 bg-white border border-slate-100 rounded-2xl sm:rounded-3xl shadow-sm text-center">
            <div className="text-3xl sm:text-4xl mb-3">🛡️</div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Máxima Seriedad</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">Personal verificado con filtros estrictos.</p>
          </div>
          <div className="p-6 sm:p-8 bg-emerald-50 border border-emerald-100 rounded-2xl sm:rounded-3xl shadow-sm text-center">
            <div className="text-3xl sm:text-4xl mb-3">🐾</div>
            <h3 className="text-lg font-bold text-emerald-950 mb-1">Hogar Protegido</h3>
            <p className="text-xs sm:text-sm text-emerald-900 font-medium">Libre de químicos agresivos o tóxicos.</p>
          </div>
          <div className="p-6 sm:p-8 bg-white border border-slate-100 rounded-2xl sm:rounded-3xl shadow-sm text-center">
            <div className="text-3xl sm:text-4xl mb-3">📅</div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Agenda Inteligente</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">Reserva de forma transparente y ágil.</p>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-16 sm:py-24 bg-cyan-50 border-t border-b border-cyan-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-slate-950 mb-3">Servicios Disponibles</h2>
            <p className="text-sm sm:text-lg text-slate-700 font-medium">Frescura a tu medida de forma impecable.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-10">
            {servicios.map((s) => (
              <div key={s.id} className="group bg-white border border-cyan-100 p-6 sm:p-10 rounded-2xl sm:rounded-[32px] hover:shadow-xl transition-all">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-3xl bg-cyan-100 text-cyan-600 flex items-center justify-center text-2xl sm:text-3xl mb-5 border border-cyan-200">{s.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-2">{s.titulo}</h3>
                <p className="text-xs sm:text-base text-slate-600 font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opiniones */}
      <section id="opiniones" className="py-16 sm:py-24 max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 mb-3">Comunidad Satisfecha</h2>
          <p className="text-sm sm:text-lg text-slate-600 font-medium">Transparencia en cada rincón de tu casa.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {testimonios.map((t) => (
            <div key={t.id} className="p-5 sm:p-8 bg-white border border-cyan-100 rounded-2xl sm:rounded-3xl shadow-sm">
              <div className="text-amber-500 text-xs sm:text-sm mb-3 tracking-tighter">{t.estrellas}</div>
              <p className="text-xs sm:text-base text-slate-700 italic mb-4 leading-relaxed">"{t.comentario}"</p>
              <div className="flex items-center gap-2.5">
                 <div className="w-7 h-7 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold text-[11px] shrink-0 border border-cyan-200">{t.nombre[0]}</div>
                 <span className="text-xs sm:text-sm font-bold text-slate-950">— {t.nombre}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16 space-y-3">
          <p className="text-xs sm:text-base text-slate-600 font-medium">¿Ya probaste el servicio?</p>
          <button 
            onClick={() => setShowReviewModal(true)} 
            className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 border border-blue-200 hover:border-blue-500 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all active:scale-95 shadow-sm"
          >
            Dejar una Opinión
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-blue-950 py-12 sm:py-16 text-slate-100">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
          <p className="text-xs sm:text-base font-medium">© 2026 CleanHome. Todos los derechos reservados.</p>
          <button 
            onClick={() => setShowLoginModal(true)}
            className="text-[11px] sm:text-sm text-cyan-200 hover:text-white transition-colors bg-blue-900 hover:bg-blue-800 px-4 py-2 rounded-xl border border-blue-800"
          >
            Sistema 📅
          </button>
        </div>
      </footer>

      {/* MODALES */}

      {/* MODAL LOGIN */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-xs sm:max-w-sm shadow-2xl p-5 sm:p-8 border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg sm:text-xl text-slate-950">Acceso Privado</h3>
              <button onClick={() => { setShowLoginModal(false); setErrorPassword(false); setPasswordInput(''); }} className="text-slate-400 hover:text-slate-600 font-bold text-xl">&times;</button>
            </div>
            <form onSubmit={manejarLogin} className="space-y-4">
              <input 
                type="password" 
                required
                placeholder="Contraseña"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className={`w-full p-3 bg-slate-50 border rounded-xl text-xs sm:text-sm focus:outline-none transition-colors ${
                  errorPassword ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-cyan-500'
                }`}
              />
              <button type="submit" className="w-full py-3 sm:py-4 bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm sm:text-base rounded-xl transition-all">Ingresar</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL AGENDAR POR PASOS */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-md shadow-2xl p-4 sm:p-6 border border-slate-100 max-h-[85vh] overflow-y-auto">
            
            <div className="flex justify-between items-center mb-4">
              <div className="min-w-0 flex-1">
                <h3 className="font-black text-base sm:text-xl text-slate-950 truncate">Agendar tu Servicio</h3>
                <p className="text-[11px] sm:text-sm text-slate-500 font-medium truncate">Completa los datos en 1 min.</p>
              </div>
              <button 
                onClick={() => { setShowModal(false); setPasoAgenda(1); }} 
                className="text-slate-400 hover:text-slate-600 text-2xl p-1"
              >
                &times;
              </button>
            </div>

            <div className="flex items-center justify-between mb-5 bg-cyan-50 p-2 rounded-xl border border-cyan-100 text-[10px] sm:text-xs font-bold tracking-tight text-cyan-600 uppercase">
              <span className={`px-2 py-1 rounded-lg ${pasoAgenda === 1 ? 'bg-cyan-500 text-white shadow-sm' : ''}`}>1. Tipo</span>
              <span className="text-cyan-300">→</span>
              <span className={`px-2 py-1 rounded-lg ${pasoAgenda === 2 ? 'bg-cyan-500 text-white shadow-sm' : ''}`}>2. Fecha</span>
              <span className="text-cyan-300">→</span>
              <span className={`px-2 py-1 rounded-lg ${pasoAgenda === 3 ? 'bg-cyan-500 text-white shadow-sm' : ''}`}>3. Datos</span>
            </div>

            <form onSubmit={manejarEnvioReserva} className="space-y-4">
              {pasoAgenda === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Servicio</label>
                    <select value={reserva.servicio} onChange={(e) => setReserva({...reserva, servicio: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none bg-white">
                      <option value="Limpieza Express">🧹 Limpieza Express</option>
                      <option value="Limpieza Profunda">🧽 Limpieza Profunda</option>
                      <option value="Limpieza Especializada">🏠 Limpieza Especializada</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tamaño</label>
                    <select value={reserva.tamano} onChange={(e) => setReserva({...reserva, tamano: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none bg-white">
                      <option value="Departamento (1-2 hab)">🏢 Depa (1-2 hab)</option>
                      <option value="Casa Mediana (3-4 hab)">🏡 Casa (3-4 hab)</option>
                      <option value="Residencial Grande">🏰 Residencial / Oficinas</option>
                    </select>
                  </div>
                  <button type="button" onClick={() => setPasoAgenda(2)} className="w-full py-3 bg-slate-950 text-white text-sm font-bold rounded-xl active:scale-95 transition-all">Siguiente</button>
                </div>
              )}

              {pasoAgenda === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Día</label>
                    <input type="date" required value={reserva.fecha} onChange={(e) => setReserva({...reserva, fecha: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none"/>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Hora</label>
                    <select value={reserva.hora} onChange={(e) => setReserva({...reserva, hora: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none bg-white">
                      <option value="08:00 AM">08:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                    </select>
                  </div>
                  <div className="flex gap-2.5">
                    <button type="button" onClick={() => setPasoAgenda(1)} className="w-1/3 py-3 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl">Atrás</button>
                    <button type="button" onClick={() => { if(reserva.fecha) setPasoAgenda(3); else alert('Selecciona una fecha'); }} className="w-2/3 py-3 bg-slate-950 text-white text-sm font-bold rounded-xl">Continuar</button>
                  </div>
                </div>
              )}

              {pasoAgenda === 3 && (
                <div className="space-y-4">
                  <input type="text" required placeholder="Nombre Completo" value={reserva.nombre} onChange={(e) => setReserva({...reserva, nombre: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"/>
                  <input type="tel" required placeholder="Teléfono" value={reserva.telefono} onChange={(e) => setReserva({...reserva, telefono: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"/>
                  <textarea rows="2" placeholder="Notas adicionales (opcional)" value={reserva.notes} onChange={(e) => setReserva({...reserva, notes: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm resize-none"/>
                  <div className="flex gap-2.5">
                    <button type="button" onClick={() => setPasoAgenda(2)} className="w-1/3 py-3 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl">Atrás</button>
                    <button type="submit" className="w-2/3 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl active:scale-95 transition-all">Confirmar 🚀</button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* MODAL OPINIÓN RESPONSIVO */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-xs sm:max-w-sm shadow-2xl p-5 sm:p-6 border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-base sm:text-lg text-slate-950">Tu Opinión Cuenta</h3>
              <button onClick={() => setShowReviewModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-xl p-1">&times;</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert("¡Gracias por tu reseña!"); setShowReviewModal(false); }} className="space-y-4">
              <input type="text" required placeholder="Tu Nombre" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm" />
              <textarea rows="3" required placeholder="¿Qué tal fue tu experiencia?" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm resize-none" />
              <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold text-sm sm:text-base rounded-xl transition-all active:scale-95">Enviar Reseña</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}