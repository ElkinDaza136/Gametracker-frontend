import React from "react";

export default function TarjetaJuego({
  juego,
  onEditar,
  onEliminar,
  onVerResenas,
  onToggleCompletado
}) {
  
  const display = {
      titulo: juego.titulo || juego.title || "Sin título",
      imagen: juego.imagenPortada || juego.coverUrl || "https://via.placeholder.com/240x140?text=No+Cover",
      genero: juego.genero || juego.genre || "Desconocido",
      plataforma: juego.plataforma || juego.platforms || "",
      puntuacion: juego.puntuacion ?? juego.rating ?? "—",
      horas: juego.horasJugadas ?? juego.hoursPlayed ?? 0,
      completado: juego.completado ?? juego.completed
  };

  return (
    <div className="card">
      <img
        className="card-cover"
        src={display.imagen}
        alt={display.titulo}
      />
      <div className="card-body">
        <h3>{display.titulo}</h3>
        <p className="muted">{display.genero} • {display.plataforma}</p>
        <div className="row">
          <div>
            <strong>{display.puntuacion}</strong> / 5 ⭐
          </div>
          <div>
            {display.horas} hrs
          </div>
        </div>
        <div className="row actions">
          <button onClick={() => onVerResenas(juego)}>Reseñas</button>
          <button onClick={() => onEditar(juego)}>Editar</button>
          <button onClick={() => onEliminar(juego._id)}>Eliminar</button>
          <button onClick={() => onToggleCompletado(juego)}>
            {display.completado ? "Marcar Pendiente" : "Marcar Completado"}
          </button>
        </div>
      </div>
    </div>
  );
}