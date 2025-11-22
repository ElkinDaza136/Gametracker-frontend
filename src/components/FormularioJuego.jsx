import React, { useState, useEffect } from "react";

export default function FormularioJuego({ modo = "crear", juego = null, onCancelar, onGuardar }) {
  const [form, setForm] = useState({
    title: "",
    coverUrl: "",
    genre: "",
    platforms: "",
    rating: 0,
    hoursPlayed: 0,
    completed: false,
  });

  // Cargar datos si estamos en modo edición
  useEffect(() => {
    if (modo === "editar" && juego) {
      setForm({
        // Intentamos leer en español (del backend), si no existe, probamos inglés
        title: juego.titulo || juego.title || "",
        coverUrl: juego.imagenPortada || juego.coverUrl || "",
        genre: juego.genero || juego.genre || "",
        platforms: juego.plataforma || (Array.isArray(juego.platforms) ? juego.platforms.join(", ") : "") || "",
        rating: juego.puntuacion ?? juego.rating ?? 0,
        hoursPlayed: juego.horasJugadas ?? juego.hoursPlayed ?? 0,
        completed: juego.completado ?? juego.completed ?? false,
      });
    }
  }, [modo, juego]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = (e) => {
    e.preventDefault();
    
    const payload = {
      titulo: form.title,                  
      imagenPortada: form.coverUrl,
      genero: form.genre,
      plataforma: form.platforms,          
      puntuacion: Number(form.rating),
      horasJugadas: Number(form.hoursPlayed),
      completado: Boolean(form.completed),
    };

    onGuardar(payload);
  };

  return (
    <form className="form-card" onSubmit={submit}>
      <h3>{modo === "crear" ? "Agregar juego" : "Editar juego"}</h3>

      <label>Nombre</label>
      <input name="title" value={form.title} onChange={handleChange} required />

      <label>URL portada</label>
      <input name="coverUrl" value={form.coverUrl} onChange={handleChange} />

      <label>Género</label>
      <input name="genre" value={form.genre} onChange={handleChange} />

      <label>Plataformas (separadas por coma)</label>
      <input name="platforms" value={form.platforms} onChange={handleChange} />

      <label>Puntuación (0-5)</label>
      <input name="rating" type="number" min="0" max="5" value={form.rating} onChange={handleChange} />

      <label>Horas jugadas</label>
      <input name="hoursPlayed" type="number" min="0" value={form.hoursPlayed} onChange={handleChange} />

      <label>
        <input type="checkbox" name="completed" checked={form.completed} onChange={handleChange} />
        Completado
      </label>

      <div className="row actions">
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancelar}>Cancelar</button>
      </div>
    </form>
  );
}