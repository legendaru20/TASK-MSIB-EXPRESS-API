const db = require('../config/db');

class Note {
  static async create(title, datetime, note) {
    const [result] = await db.execute(
      'INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)',
      [title, datetime, note]
    );
    return result;
  }

  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM notes');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM notes WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, title, datetime, note) {
    const [result] = await db.execute(
      'UPDATE notes SET title = ?, note = ? WHERE id = ?',
      [title, note, id]
    );
    return result;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM notes WHERE id = ?', [id]);
    return result;
  }
}

module.exports = Note;
