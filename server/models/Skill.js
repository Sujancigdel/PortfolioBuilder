const pool = require('../db');

class Skill {
  static async create(profileId, skill) {
    const { name, proficiency } = skill;
    const query = `
      INSERT INTO skills (profile_id, name, proficiency)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result = await pool.query(query, [profileId, name, proficiency]);
    return result.rows[0];
  }

  static async findByProfileId(profileId) {
    const query = `
      SELECT 
        id, 
        profile_id as "profileId", 
        name, 
        proficiency 
      FROM skills 
      WHERE profile_id = $1
    `;
    const result = await pool.query(query, [profileId]);
    return result.rows;
  }

  static async deleteAllByProfileId(profileId) {
    const query = `DELETE FROM skills WHERE profile_id = $1`;
    await pool.query(query, [profileId]);
  }
}

module.exports = Skill;
