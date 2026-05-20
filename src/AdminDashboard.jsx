import React, { useState } from 'react';

export default function AdminDashboard() {
  // Datos simulados de la agenda
  const [citas, setCitas] = useState([
    { id: 1, cliente: "Laura Estévez", fecha: "2024-05-20", hora: "08:00 AM", servicio: "Profunda", estatus: "Confirmada", pago: "$120" },
    { id: 2, cliente: "Roberto Sanz", fecha: "2024-05-20", hora: "12:00 PM", servicio: "Express", estatus: "Pendiente", pago: "$50" },
    { id: 3, cliente: "Familia Díaz", fecha: "2024-05-21", hora: "09:00 AM", servicio: "Express", estatus: "Completada", pago: "$65" },
  ]);

  // Función para cambiar el estatus (lo que haría tu cliente)
  const cambiarEstatus = (id, nuevoEstatus) => {
    setCitas(citas.map(cita => cita.id === id ? { ...cita, estatus: nuevoEstatus } : cita));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      
      {/* 1. BARRA LATERAL (SIDEBAR) */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col">
        <div className="p-6 text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="text-cyan-500">•</span> CleanAdmin
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <a href="#" className="flex items-center gap-3 p-3 bg-cyan-50 text-cyan-700 rounded-xl font-medium">📅 Agenda</a>
          <a href="#" className="flex items-center gap-3 p-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">⭐ Moderar Opiniones</a>
          <a href="#" className="flex items-center gap-3 p-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">👥 Clientes</a>
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button className="w-full text-left p-2 text-sm text-red-500 font-medium">Cerrar Sesión</button>
        </div>
      </aside>

      {/* 2. CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-8">
        
        {/* Encabezado y Estadísticas Rápidas */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Control de Agenda</h1>
            <p className="text-slate-500 text-sm">Gestiona las solicitudes de limpieza de hoy.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold">3</div>
              <span className="text-xs font-bold text-slate-400 uppercase">Citas Hoy</span>
            </div>
          </div>
        </header>

        {/* 3. TABLA DE CONTROL DE LA AGENDA */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Servicio</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Fecha / Hora</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Estatus</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {citas.map((cita) => (
                <tr key={cita.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-sm">{cita.cliente}</div>
                    <div className="text-xs text-slate-400">ID: #00{cita.id}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase">
                      {cita.servicio}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-slate-700 font-medium">{cita.fecha}</div>
                    <div className="text-xs text-slate-400">{cita.hora}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-sm ${
                      cita.estatus === 'Confirmada' ? 'bg-blue-100 text-blue-600' : 
                      cita.estatus === 'Completada' ? 'bg-emerald-100 text-emerald-600' : 
                      'bg-amber-100 text-amber-600'
                    }`}>
                      {cita.estatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <select 
                      className="text-xs bg-slate-100 border-none rounded-lg p-1 focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                      value={cita.estatus}
                      onChange={(e) => cambiarEstatus(cita.id, e.target.value)}
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Confirmada">Confirmar</option>
                      <option value="Completada">Marcar Terminada</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sección de ayuda rápida para el administrador */}
        <div className="mt-8 p-6 bg-cyan-600 rounded-3xl text-white flex justify-between items-center shadow-lg shadow-cyan-200">
          <div>
            <h3 className="font-bold text-lg">¿Necesitas ayuda con los pagos?</h3>
            <p className="text-cyan-100 text-sm">Consulta el historial de transacciones en la pestaña de facturación.</p>
          </div>
          <button className="px-6 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl font-bold text-sm hover:bg-white/30 transition-all">Ver manual</button>
        </div>

      </main>
    </div>
  );
}