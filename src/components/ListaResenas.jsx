import React from "react";

export default function ListaResenas({ resenas = [], onEditar, onEliminar, onCrear }) {
  return (
    <div className="resenas-list">
      <div className="header-row">
        <h3>Reseñas</h3>
        <button onClick={onCrear}>Agregar reseña</button>
      </div>

      {resenas.length === 0 && <p className="muted">Aún no hay reseñas.</p>}

      <ul>
        {resenas.map((r) => (
          <li key={r._id} className="resena-card">
            <div className="row space-between">
              {/* Leemos autor o author por compatibilidad */}
              <strong>{r.autor || r.author || "Anónimo"}</strong>
              <small>{new Date(r.fechaCreacion || r.createdAt || Date.now()).toLocaleString()}</small>
            </div>
            {/* Leemos puntuacion */}
            <div>⭐ {r.puntuacion ?? r.rating} / 5</div>
            {/* Leemos textoReseña */}
            <p>{r.textoReseña || r.text}</p>
            
            <div className="row actions">
              <button onClick={() => onEditar(r)}>Editar</button>
              <button onClick={() => onEliminar(r._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}