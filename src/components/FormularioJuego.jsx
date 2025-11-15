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

  useEffect(() => {
    if (modo === "editar" && juego) {
      setForm({
        title: juego.title || "",
        coverUrl: juego.coverUrl || "",
        genre: juego.genre || "",
        platforms: (juego.platforms || []).join(", "),
        rating: juego.rating ?? 0,
        hoursPlayed: juego.hoursPlayed ?? 0,
        completed: juego.completed ?? false,
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
      title: form.title,
      coverUrl: form.coverUrl,
      genre: form.genre,
      platforms: form.platforms.split(",").map(p => p.trim()).filter(Boolean),
      rating: Number(form.rating),
      hoursPlayed: Number(form.hoursPlayed),
      completed: Boolean(form.completed),
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