import React from "react";

export default function EstadisticasPersonales({ juegos = [] }) {
  const total = juegos.length;
  
  // Ajuste para leer variables en español (backend) o inglés (legacy)
  const completados = juegos.filter(j => j.completado || j.completed).length;
  
  const totalHoras = juegos.reduce((s, j) => s + (Number(j.horasJugadas || j.hoursPlayed) || 0), 0);
  
  const avgRating = total ? (juegos.reduce((s, j) => s + (Number(j.puntuacion || j.rating) || 0), 0) / total).toFixed(2) : "—";

  // genero mas jugado
  const genreCount = {};
  juegos.forEach(j => {
    const g = j.genero || j.genre;
    if (g) genreCount[g] = (genreCount[g] || 0) + 1;
  });
  
  const topGenre = Object.entries(genreCount).sort((a,b)=>b[1]-a[1])[0]?.[0] || "—";

  return (
    <div className="stats">
      <h3>Estadísticas personales</h3>
      <div className="stats-grid">
        <div className="stat-card"><h4>Total juegos</h4><strong>{total}</strong></div>
        <div className="stat-card"><h4>Completados</h4><strong>{completados}</strong></div>
        <div className="stat-card"><h4>Total horas</h4><strong>{totalHoras}</strong></div>
        <div className="stat-card"><h4>Puntuación promedio</h4><strong>{avgRating}</strong></div>
        <div className="stat-card"><h4>Género top</h4><strong>{topGenre}</strong></div>
      </div>
    </div>
  );
}