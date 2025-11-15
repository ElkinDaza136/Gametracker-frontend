import React, { useState } from "react";
import TarjetaJuego from "./TarjetaJuego";
import FormularioJuego from "./FormularioJuego";
import ListaResenas from "./ListaResenas";
import FormularioResena from "./FormularioResena";
import { getResenasPorJuego, crearResena, editarResena, eliminarResena } from "../services/resenasService";
import { editarJuego } from "../services/juegosService";

export default function BibliotecaJuegos({ juegos = [], loading, onCrear, onEditar, onEliminar, onToggleCompletado, recargar }) {
  const [query, setQuery] = useState("");
  const [modoFormJuego, setModoFormJuego] = useState(null); // 'crear' | 'editar' | null
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);
  const [resenas, setResenas] = useState([]);
  const [mostrarResenasDe, setMostrarResenasDe] = useState(null);
  const [modoFormResena, setModoFormResena] = useState(null);
  const [resenaEditar, setResenaEditar] = useState(null);

  const filtrar = juegos.filter(j => j.title.toLowerCase().includes(query.toLowerCase()));

  const abrirCrear = () => {
    setModoFormJuego("crear");
    setJuegoSeleccionado(null);
  };

  const abrirEditar = (juego) => {
    setModoFormJuego("editar");
    setJuegoSeleccionado(juego);
  };

  const guardarJuego = async (payload) => {
    if (modoFormJuego === "crear") {
      await onCrear(payload);
    } else if (modoFormJuego === "editar") {
      await onEditar(juegoSeleccionado._id, payload);
    }
    setModoFormJuego(null);
    setJuegoSeleccionado(null);
  };

  const verResenas = async (juego) => {
    setMostrarResenasDe(juego);
    try {
      const data = await getResenasPorJuego(juego._id);
      setResenas(data);
    } catch (err) {
      console.error(err);
      alert("No se pudieron cargar reseñas.");
    }
  };

  const crearResenaLocal = async (payload) => {
    try {
      const nueva = await crearResena(mostrarResenasDe._id, payload);
      setResenas((s) => [nueva, ...s]);
      setModoFormResena(null);
    } catch (err) {
      console.error(err);
      alert("Error creando reseña");
    }
  };

  const editarResenaLocal = async (payload) => {
    try {
      const actual = await editarResena(resenaEditar._id, payload);
      setResenas((s) => s.map(r => r._id === resenaEditar._id ? actual : r));
      setModoFormResena(null);
      setResenaEditar(null);
    } catch (err) {
      console.error(err);
      alert("Error editando reseña");
    }
  };

  const eliminarResenaLocal = async (id) => {
    if (!window.confirm("Eliminar reseña?")) return;
    try {
      await eliminarResena(id);
      setResenas((s) => s.filter(r => r._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error eliminando reseña");
    }
  };

  // Toggle completado handler (local UI + backend)
  const toggleCompletado = async (juego) => {
    await onToggleCompletado(juego);
    recargar && recargar();
  };

  return (
    <div className="container">
      <div className="top-row">
        <div>
          <input placeholder="Buscar juego..." value={query} onChange={e=>setQuery(e.target.value)} />
          <button onClick={abrirCrear}>+ Agregar juego</button>
        </div>
      </div>

      {modoFormJuego && (
        <div className="modal">
          <div className="modal-content">
            <FormularioJuego
              modo={modoFormJuego}
              juego={juegoSeleccionado}
              onCancelar={() => { setModoFormJuego(null); setJuegoSeleccionado(null); }}
              onGuardar={guardarJuego}
            />
          </div>
        </div>
      )}

      {loading ? <p>Cargando juegos...</p> :
        <div className="grid">
          {filtrar.map(j => (
            <TarjetaJuego
              key={j._id}
              juego={j}
              onEditar={abrirEditar}
              onEliminar={onEliminar}
              onVerResenas={verResenas}
              onToggleCompletado={toggleCompletado}
            />
          ))}
        </div>
      }

      {/* Panel de reseñas */}
      {mostrarResenasDe && (
        <div className="panel-right">
          <button className="close" onClick={()=> setMostrarResenasDe(null)}>Cerrar</button>

          <h2>{mostrarResenasDe.title} — Reseñas</h2>

          {modoFormResena ? (
            <div>
              <FormularioResena
                modo={modoFormResena}
                resena={resenaEditar}
                onCancelar={() => { setModoFormResena(null); setResenaEditar(null); }}
                onGuardar={modoFormResena === "crear" ? crearResenaLocal : editarResenaLocal}
              />
            </div>
          ) : (
            <ListaResenas
              resenas={resenas}
              onCrear={() => setModoFormResena("crear")}
              onEditar={(r) => { setResenaEditar(r); setModoFormResena("editar"); }}
              onEliminar={eliminarResenaLocal}
            />
          )}
        </div>
      )}
    </div>
  );
}