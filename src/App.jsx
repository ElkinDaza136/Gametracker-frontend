import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BibliotecaJuegos from "./components/BibliotecaJuegos";
import EstadisticasPersonales from "./components/EstadisticasPersonales";
import { getJuegos, crearJuego, editarJuego, eliminarJuego } from "./services/juegosService";

export default function App() {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargar = async () => {
    try {
      setLoading(true);
      const data = await getJuegos();
      setJuegos(data);
    } catch (err) {
      console.error("Error cargando juegos", err);
      alert("No se pudieron cargar los juegos. Revisa el backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleCrearJuego = async (payload) => {
    try {
      const nuevo = await crearJuego(payload);
      setJuegos((s) => [nuevo, ...s]);
    } catch (err) {
      console.error(err);
      alert("Error al crear juego.");
    }
  };

  const handleEditarJuego = async (id, payload) => {
    try {
      const actualizado = await editarJuego(id, payload);
      setJuegos((s) => s.map(j => j._id === id ? actualizado : j));
    } catch (err) {
      console.error(err);
      alert("Error al editar juego.");
    }
  };

  const handleEliminarJuego = async (id) => {
    if (!window.confirm("¿Eliminar este juego?")) return;
    try {
      await eliminarJuego(id);
      setJuegos((s) => s.filter(j => j._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error al eliminar juego.");
    }
  };

  const handleToggleCompletado = async (juego) => {
    // 1. Detectamos el estado actual 
    const estadoActual = juego.completado ?? juego.completed ?? false;

    // 2. Enviamos SOLO el campo que queremos cambiar, con el nombre en ESPAÑOL
    const payload = { 
      completado: !estadoActual 
    };

    try {
      // Enviamos la petición al backend
      const actualizado = await editarJuego(juego._id, payload);
      
      // Actualizamos el estado local con la respuesta del servidor
      setJuegos((s) => s.map(j => j._id === juego._id ? actualizado : j));
    } catch (err) {
      console.error(err);
      alert("Error cambiando estado");
    }
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>GameTracker</h1>
          <nav>
            <Link to="/">Biblioteca</Link>
            <Link to="/stats">Estadísticas</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={
              <BibliotecaJuegos
                juegos={juegos}
                loading={loading}
                onCrear={handleCrearJuego}
                onEditar={handleEditarJuego}
                onEliminar={handleEliminarJuego}
                onToggleCompletado={handleToggleCompletado}
                recargar={cargar}
              />
            }/>
            <Route path="/stats" element={<EstadisticasPersonales juegos={juegos} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}