import React, { useState, useEffect } from "react";

export default function FormularioResena({ modo = "crear", resena = null, onCancelar, onGuardar }) {
  const [form, setForm] = useState({
    author: "",
    rating: 5,
    text: "",
  });

  useEffect(() => {
    if (modo === "editar" && resena) {
      setForm({
        author: resena.author || "",
        rating: resena.rating ?? 5,
        text: resena.text || "",
      });
    }
  }, [modo, resena]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    onGuardar({
      author: form.author,
      rating: Number(form.rating),
      text: form.text,
    });
  };

  return (
    <form className="form-card" onSubmit={submit}>
      <h3>{modo === "crear" ? "Agregar reseña" : "Editar reseña"}</h3>

      <label>Autor (opcional)</label>
      <input name="author" value={form.author} onChange={handleChange} />

      <label>Puntuación (1-5)</label>
      <input name="rating" type="number" min="1" max="5" value={form.rating} onChange={handleChange} required />

      <label>Texto</label>
      <textarea name="text" value={form.text} onChange={handleChange} required />

      <div className="row actions">
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancelar}>Cancelar</button>
      </div>
    </form>
  );
}