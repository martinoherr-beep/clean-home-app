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
    notas: ''
  });

  const [showReviewModal, setShowReviewModal] = useState(false);

  // DATOS SIMULADOS DE LA AGENDA
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
      notas: ''
    });
  };

  // =========================================================
  // VISTA 1: PANEL DE ADMINISTRACIÓN RESPONSIVO
  // =========================================================
  if (vista === 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-sans antialiased">
        <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-row lg:flex-col justify-between lg:justify-start p-4 lg:p-6 shrink-0">
          <div className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-cyan-500">•</span> CleanAdmin
          </div>
          <nav className="hidden lg:flex flex-col flex-1 gap-2 mt-8 w-full">
            <button className="w-full flex items-center gap-3 p-3 bg-cyan-50 text-cyan-700 rounded-xl font-medium text-left">📅 Agenda</button>
            <button className="w-full flex items-center gap-3 p-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors text-left">👥 Clientes</button>
          </nav>
          <div className="lg:pt-4 lg:border-t lg:border-slate-100 w-auto lg:w-full flex items-center">
            <button onClick={() => setVista('landing')} className="text-sm text-blue-600 font-bold hover:underline bg-slate-100 lg:bg-transparent px-3 py-2 lg:p-0 rounded-xl">
              ← <span className="hidden lg:inline">Volver a la</span> Web
            </button>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-hidden">
          <header className="mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Control de Agenda</h1>
            <p className="text-slate-500 text-xs sm:text-sm">Gestiona las solicitudes de limpieza de hoy.</p>
          </header>

          <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left min-w-[600px] sm:min-w-0">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Servicio</th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Fecha / Hora</th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Estatus</th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {citas.map((cita) => (
                    <tr key={cita.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{cita.cliente}</div>
                        <div className="text-xs text-slate-400">ID: #00{cita.id}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase">{cita.servicio}</span>
                      </td>
                      <td className="p-4">
                        <div className="text-slate-700 font-medium">{cita.fecha}</div>
                        <div className="text-xs text-slate-400">{cita.hora}</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                          cita.estatus === 'Confirmada' ? 'bg-blue-100 text-blue-600' : 
                          cita.estatus === 'Completada' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                        }`}>{cita.estatus}</span>
                      </td>
                      <td className="p-4">
                        <select 
                          className="text-xs bg-slate-100 border-none rounded-lg p-1.5 focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                          value={cita.estatus}
                          onChange={(e) => cambiarEstatus(cita.id, e.target.value)}
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="Confirmada">Confirmar</option>
                          <option value="Completada">Terminada</option>
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
  // VISTA 2: LANDING PAGE PÚBLICA (MÁS COLOR VERSIÓN 2.0)
  // =========================================================
  return (
    <div className="min-h-screen bg-cyan-50/50 text-slate-800 font-sans antialiased selection:bg-cyan-200">
      
      {/* Navbar */}
      <header className="sticky top-0 z-50 max-w-6xl mx-auto px-4 pt-4">
        <div className="backdrop-blur-xl bg-white/70 border border-slate-200/40 rounded-3xl shadow-lg shadow-cyan-900/5 px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter text-slate-900 flex items-center gap-1">
            <span className="text-cyan-500">•</span> CleanHome
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-semibold text-blue-900/80">
            <a href="#inicio" className="hover:text-cyan-600 transition-colors">Inicio</a>
            <a href="#beneficios" className="hover:text-cyan-600 transition-colors">Beneficios</a>
            <a href="#servicios" className="hover:text-cyan-600 transition-colors">Servicios</a>
            <a href="#opiniones" className="hover:text-cyan-600 transition-colors">Opiniones</a>
          </nav>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-2xl shadow-md transition-all hover:scale-[1.03] active:scale-100"
          >
            Agendar Ahora
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="inicio" className="relative px-4 pt-20 pb-16 max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-100 rounded-full blur-[128px] -z-10" />
        <div className="md:col-span-7 space-y-6 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 tracking-tighter leading-[0.95]">
            Hogar impecable,<br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">mientras tú</span> disfrutas
          </h1>
          <p className="text-xl text-slate-700 max-w-xl mx-auto md:mx-0 leading-relaxed font-medium">
            Servicios profesionales de limpieza con agenda transparente para tu tranquilidad. Seguridad, frescura y confianza en cada visita.
          </p>
          <div className="pt-2">
            <button 
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-100"
            >
              Empieza Hoy – Cotizar y Agendar
            </button>
          </div>
        </div>

        {/* Column Derecha Opiniones */}
        <div className="md:col-span-5 flex flex-col gap-4 w-full max-w-md mx-auto md:mx-0">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 text-center md:text-left mb-1">Clientes satisfechos:</div>
          {testimonios.slice(0, 2).map((t) => (
            <div key={t.id} className="p-5 bg-cyan-50 border border-cyan-100 rounded-3xl shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold text-sm shrink-0 border border-cyan-200">{t.nombre[0]}</div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-base font-bold text-slate-900">{t.nombre}</h4>
                    <span className="text-amber-500 text-xs tracking-tighter">{t.estrellas}</span>
                  </div>
                  <p className="text-sm text-slate-700 italic leading-relaxed">"{t.comentario}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cintillo Eco */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200/80 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left shadow-inner">
          <span className="text-3xl">🌱</span>
          <p className="text-base font-semibold text-emerald-900">
            <strong className="font-extrabold text-emerald-950">Hogar Saludable:</strong> Usamos productos biodegradables, 100% seguros para tus niños y mascotas.
          </p>
        </div>
      </div>

      {/* Beneficios */}
      <section id="beneficios" className="py-16 max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 mb-4">¿Por qué confiar en nosotros?</h2>
          <p className="text-lg text-slate-600 font-medium">Ofrecemos más que limpieza; ofrecemos tranquilidad.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-lg shadow-cyan-900/5 text-center">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Máxima Seriedad</h3>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">Todo nuestro personal pasa por filtros estrictos de seguridad.</p>
          </div>
          <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-3xl shadow-lg shadow-emerald-900/5 text-center">
            <div className="text-4xl mb-4">🐾</div>
            <h3 className="text-xl font-bold text-emerald-950 mb-2">Hogar Protegido</h3>
            <p className="text-sm text-emerald-900 font-medium leading-relaxed">Fórmulas libres de químicos agresivos, ideales para animales.</p>
          </div>
          <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-lg shadow-cyan-900/5 text-center">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Agenda Inteligente</h3>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">Reserva y consulta tus servicios de forma transparente.</p>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-24 bg-cyan-50 border-t border-b border-cyan-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-950 mb-4">Servicios Profesionales</h2>
            <p className="text-lg text-slate-700 font-medium">Soluciones a tu ritmo, con la frescura que te mereces.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {servicios.map((s) => (
              <div key={s.id} className="group bg-white border border-cyan-100 p-10 rounded-[32px] hover:border-cyan-200 hover:shadow-2xl hover:shadow-cyan-900/10 transition-all duration-300">
                <div className="w-16 h-16 rounded-3xl bg-cyan-100 text-cyan-600 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-cyan-50 transition-all border border-cyan-200">{s.icon}</div>
                <h3 className="text-2xl font-bold text-slate-950 mb-3">{s.titulo}</h3>
                <p className="text-base text-slate-600 font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opiniones */}
      <section id="opiniones" className="py-24 max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 mb-4">Lo que dice la comunidad</h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">Transparencia y seriedad en cada rincón.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonios.map((t) => (
            <div key={t.id} className="p-8 bg-cyan-50 border border-cyan-100 rounded-3xl shadow-sm">
              <div className="text-amber-500 text-sm mb-4 tracking-tighter">{t.estrellas}</div>
              <p className="text-base text-slate-700 italic mb-5 leading-relaxed">"{t.comentario}"</p>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold text-xs shrink-0 border border-cyan-200">{t.nombre[0]}</div>
                 <span className="text-sm font-bold text-slate-950">— {t.nombre}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 space-y-4">
          <p className="text-base text-slate-600 font-medium">¿Ya probaste nuestro servicio?</p>
          <button 
            onClick={() => setShowReviewModal(true)} 
            className="px-8 py-4 bg-white text-blue-600 border border-blue-200 hover:border-blue-500 rounded-2xl font-semibold text-base transition-all shadow-sm active:scale-95"
          >
            Dejar una Opinión
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-blue-950 py-16 text-slate-100">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-base font-medium">© 2026 CleanHome. Todos los derechos reservados.</p>
          <button 
            onClick={() => setShowLoginModal(true)}
            className="text-sm text-cyan-200 hover:text-white transition-colors bg-blue-900 hover:bg-blue-800 px-5 py-2.5 rounded-xl border border-blue-800"
          >
            Acceso Sistema 📅
          </button>
        </div>
      </footer>

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-8 border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-slate-950">Acceso Privado</h3>
              <button onClick={() => { setShowLoginModal(false); setErrorPassword(false); setPasswordInput(''); }} className="text-slate-400 hover:text-slate-600 font-bold text-xl">&times;</button>
            </div>
            <form onSubmit={manejarLogin} className="space-y-4">
              <input 
                type="password" 
                required
                placeholder="Introduce la contraseña"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className={`w-full p-3.5 bg-slate-50 border rounded-xl text-sm focus:outline-none transition-colors ${
                  errorPassword ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-cyan-500'
                }`}
              />
              <button type="submit" className="w-full py-4 bg-slate-950 hover:bg-slate-800 text-white font-bold text-base rounded-xl transition-all">Ingresar al Panel</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE RESERVA POR PASOS */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-6 sm:p-8 border border-slate-100 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-black text-xl text-slate-950">Agendar tu Servicio</h3>
                <p className="text-sm text-slate-500 font-medium mt-1">Frescura en camino, en menos de 1 minuto</p>
              </div>
              <button 
                onClick={() => { setShowModal(false); setPasoAgenda(1); }} 
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="flex items-center justify-between mb-8 bg-cyan-50 p-3 rounded-2xl border border-cyan-100 text-xs font-bold tracking-wider text-cyan-600 uppercase">
              <span className={`px-3 py-1.5 rounded-xl ${pasoAgenda === 1 ? 'bg-cyan-500 text-white shadow-sm' : ''}`}>1. Tipo</span>
              <span className="text-cyan-300">→</span>
              <span className={`px-3 py-1.5 rounded-xl ${pasoAgenda === 2 ? 'bg-cyan-500 text-white shadow-sm' : ''}`}>2. Fecha</span>
              <span className="text-cyan-300">→</span>
              <span className={`px-3 py-1.5 rounded-xl ${pasoAgenda === 3 ? 'bg-cyan-500 text-white shadow-sm' : ''}`}>3. Datos</span>
            </div>

            <form onSubmit={manejarEnvioReserva} className="space-y-6">
              
              {/* PASO 1 */}
              {pasoAgenda === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2.5">Servicio</label>
                    <select value={reserva.servicio} onChange={(e) => setReserva({...reserva, servicio: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-cyan-500 focus:outline-none bg-white">
                      <option value="Limpieza Express">🧹 Limpieza Express</option>
                      <option value="Limpieza Profunda">🧽 Limpieza Profunda</option>
                      <option value="Limpieza Especializada">🏠 Limpieza Especializada</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2.5">Tamaño</label>
                    <select value={reserva.tamano} onChange={(e) => setReserva({...reserva, tamano: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-cyan-500 focus:outline-none bg-white">
                      <option value="Departamento (1-2 hab)">🏢 Departamento (1-2 habitaciones)</option>
                      <option value="Casa Mediana (3-4 hab)">🏡 Casa Mediana (3-4 habitaciones)</option>
                      <option value="Residencial Grande">🏰 Residencial Grande</option>
                    </select>
                  </div>
                  <button type="button" onClick={() => setPasoAgenda(2)} className="w-full py-4 bg-slate-950 text-white text-base font-bold rounded-xl active:scale-95 transition-all">Siguiente</button>
                </div>
              )}

              {/* PASO 2 */}
              {pasoAgenda === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2.5">Día</label>
                    <input type="date" required value={reserva.fecha} onChange={(e) => setReserva({...reserva, fecha: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-cyan-500 focus:outline-none"/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2.5">Hora</label>
                    <select value={reserva.hora} onChange={(e) => setReserva({...reserva, hora: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-cyan-500 focus:outline-none bg-white">
                      <option value="08:00 AM">08:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                    </select>
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setPasoAgenda(1)} className="w-1/3 py-4 bg-slate-100 text-slate-600 text-sm font-bold rounded-xl">Atrás</button>
                    <button type="button" onClick={() => { if(reserva.fecha) setPasoAgenda(3); else alert('Selecciona una fecha'); }} className="w-2/3 py-4 bg-slate-950 text-white text-base font-bold rounded-xl">Continuar</button>
                  </div>
                </div>
              )}

              {/* PASO 3 */}
              {pasoAgenda === 3 && (
                <div className="space-y-5">
                  <input type="text" required placeholder="Nombre Completo" value={reserva.nombre} onChange={(e) => setReserva({...reserva, nombre: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm"/>
                  <input type="tel" required placeholder="Teléfono" value={reserva.telefono} onChange={(e) => setReserva({...reserva, telefono: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm"/>
                  <textarea rows="2" placeholder="Notas (opcional)" value={reserva.notes} onChange={(e) => setReserva({...reserva, notas: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm resize-none"/>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setPasoAgenda(2)} className="w-1/3 py-4 bg-slate-100 text-slate-600 text-sm font-bold rounded-xl">Atrás</button>
                    <button type="submit" className="w-2/3 py-4 bg-blue-600 text-white text-base font-bold rounded-xl active:scale-95 transition-all">Confirmar Reserva 🚀</button>
                  </div>
                </div>
              )}

            </form>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-8 border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-slate-950">Dejar Opinión</h3>
              <button onClick={() => setShowReviewModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">&times;</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert("¡Gracias!"); setShowReviewModal(false); }} className="space-y-4">
              <input type="text" required placeholder="Nombre" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              <textarea rows="3" required placeholder="Comentario" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm resize-none" />
              <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold text-base rounded-xl">Enviar</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}