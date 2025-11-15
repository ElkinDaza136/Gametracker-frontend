import React from "react";

export default function TarjetaJuego({
  juego,
  onEditar,
  onEliminar,
  onVerResenas,
  onToggleCompletado
}) {
  // juego: { _id, title, coverUrl, genre, platforms, rating, hoursPlayed, completed }
  return (
    <div className="card">
      <img
        className="card-cover"
        src={juego.coverUrl || "https://via.placeholder.com/240x140?text=No+Cover"}
        alt={juego.title}
      />
      <div className="card-body">
        <h3>{juego.title}</h3>
        <p className="muted">{juego.genre} • {juego.platforms?.join(", ")}</p>
        <div className="row">
          <div>
            <strong>{juego.rating ?? "—"}</strong> / 5 ⭐
          </div>
          <div>
            {juego.hoursPlayed ?? 0} hrs
          </div>
        </div>
        <div className="row actions">
          <button onClick={() => onVerResenas(juego)}>Reseñas</button>
          <button onClick={() => onEditar(juego)}>Editar</button>
          <button onClick={() => onEliminar(juego._id)}>Eliminar</button>
          <button onClick={() => onToggleCompletado(juego)}>
            {juego.completed ? "Marcar Pendiente" : "Marcar Completado"}
          </button>
        </div>
      </div>
    </div>
  );
}