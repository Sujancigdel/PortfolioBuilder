const pool = require('../db');

class Template {
  static async findAll() {
    const query = `SELECT id, name, description, preview_image_url FROM templates`;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = `SELECT * FROM templates WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async create(template) {
    const { name, description, htmlStructure, cssStyles, previewImageUrl } = template;
    const query = `
      INSERT INTO templates (name, description, html_structure, css_styles, preview_image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const result = await pool.query(query, [name, description, htmlStructure, cssStyles, previewImageUrl]);
    return result.rows[0];
  }
}

module.exports = Template;
