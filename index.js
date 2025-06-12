const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Permitir peticiones desde el frontend
app.use(express.json()); // Para parsear JSON en body

// Datos de ejemplo (en memoria)
let citas = [
  {
    id: 1,
    paciente: "Juan Perez",
    fecha: "2025-06-15",
    hora: "10:00",
    estado: "Confirmada"
  },
  {
    id: 2,
    paciente: "Ana Gómez",
    fecha: "2025-06-16",
    hora: "11:30",
    estado: "Pendiente"
  }
];

// Obtener todas las citas
app.get("/api/citas", (req, res) => {
  res.json(citas);
});

// Crear nueva cita
app.post("/api/citas", (req, res) => {
  const { paciente, fecha, hora, estado } = req.body;
  if (!paciente || !fecha || !hora || !estado) {
    return res.status(400).json({ error: "Faltan datos" });
  }
  const nuevaCita = {
    id: citas.length + 1,
    paciente,
    fecha,
    hora,
    estado,
  };
  citas.push(nuevaCita);
  res.status(201).json(nuevaCita);
});

// Editar cita (por id)
app.put("/api/citas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = citas.findIndex((c) => c.id === id);
  if (index === -1) return res.status(404).json({ error: "Cita no encontrada" });

  const { paciente, fecha, hora, estado } = req.body;
  if (!paciente || !fecha || !hora || !estado) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  citas[index] = { id, paciente, fecha, hora, estado };
  res.json(citas[index]);
});

// Eliminar cita (por id)
app.delete("/api/citas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = citas.findIndex((c) => c.id === id);
  if (index === -1) return res.status(404).json({ error: "Cita no encontrada" });

  citas.splice(index, 1);
  res.json({ message: "Cita eliminada" });
});

app.listen(PORT, () => {
  console.log(`API escuchando en puerto ${PORT}`);
});
