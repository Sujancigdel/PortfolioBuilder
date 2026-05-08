const pool = require('../db');

class Education {
  static async create(profileId, edu) {
    const { institution, degree, fieldOfStudy, startDate, endDate, description } = edu;
    const query = `
      INSERT INTO education (profile_id, institution, degree, field_of_study, start_date, end_date, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [
      profileId, 
      institution, 
      degree, 
      fieldOfStudy, 
      startDate === '' ? null : startDate, 
      endDate === '' ? null : endDate, 
      description
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByProfileId(profileId) {
    const query = `
      SELECT 
        id, 
        profile_id as "profileId", 
        institution, 
        degree, 
        field_of_study as "fieldOfStudy", 
        to_char(start_date, 'YYYY-MM-DD') as "startDate", 
        to_char(end_date, 'YYYY-MM-DD') as "endDate", 
        description 
      FROM education 
      WHERE profile_id = $1 
      ORDER BY start_date DESC
    `;
    const result = await pool.query(query, [profileId]);
    return result.rows;
  }

  static async deleteAllByProfileId(profileId) {
    const query = `DELETE FROM education WHERE profile_id = $1`;
    await pool.query(query, [profileId]);
  }
}

module.exports = Education;
