const Note = require('../models/notes');

exports.createNote = async (req, res) => {
  const { title, note } = req.body;
  const datetime = new Date().toISOString().slice(0, 19).replace('T', ' '); // Menghasilkan datetime saat ini dalam format "YYYY-MM-DD HH:MM:SS"
  
  try {
    const result = await Note.create(title, datetime, note);
    res.status(201).json({
      message: 'Note Berhasil Dibuat',
      id: result.insertId,
      title,
      datetime,
      note
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.status(200).json({
      message: 'Semua Note Ditampilkan',
      notes
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (note) {
      res.status(200).json({
        message: 'Beberapa note Ditampilkan',
        note
      });
    } else {
      res.status(404).json({ error: 'Note tidak ada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, note } = req.body; // Hanya mengambil title dan note dari req.body
  try {
    const existingNote = await Note.findById(id);
    if (!existingNote) {
      return res.status(404).json({ error: 'Note Tidak ada' });
    }

    // Ambil datetime dari catatan yang ada untuk mempertahankan nilai saat ini
    const { datetime } = existingNote;

    const result = await Note.update(id, title, datetime, note);
    if (result.affectedRows > 0) {
      res.status(200).json({
        message: 'Note Diupdate',
        id,
        title,
        datetime,
        note
      });
    } else {
      res.status(404).json({ error: 'Note Tidak ada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Note.delete(id);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Note successfully deleted' });
    } else {
      res.status(404).json({ error: 'Note Tidak ada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
