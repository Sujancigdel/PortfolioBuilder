const pool = require('../db');

class Profile {
  static async create(userId, data) {
    const { fullName, bio, contactEmail, linkedinUrl, githubUrl } = data;
    const query = `
      INSERT INTO profiles (user_id, full_name, bio, contact_email, linkedin_url, github_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING 
        id, 
        user_id as "userId", 
        full_name as "fullName", 
        bio, 
        contact_email as "contactEmail", 
        linkedin_url as "linkedinUrl", 
        github_url as "githubUrl",
        updated_at as "updatedAt";
    `;
    const result = await pool.query(query, [userId, fullName, bio, contactEmail, linkedinUrl, githubUrl]);
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const query = `
      SELECT 
        id, 
        user_id as "userId", 
        full_name as "fullName", 
        bio, 
        contact_email as "contactEmail", 
        linkedin_url as "linkedinUrl", 
        github_url as "githubUrl",
        updated_at as "updatedAt"
      FROM profiles 
      WHERE user_id = $1
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }

  static async update(userId, data) {
    const { fullName, bio, contactEmail, linkedinUrl, githubUrl } = data;
    const query = `
      UPDATE profiles
      SET full_name = $1, bio = $2, contact_email = $3, linkedin_url = $4, github_url = $5, updated_at = NOW()
      WHERE user_id = $6
      RETURNING 
        id, 
        user_id as "userId", 
        full_name as "fullName", 
        bio, 
        contact_email as "contactEmail", 
        linkedin_url as "linkedinUrl", 
        github_url as "githubUrl",
        updated_at as "updatedAt";
    `;
    const result = await pool.query(query, [fullName, bio, contactEmail, linkedinUrl, githubUrl, userId]);
    return result.rows[0];
  }
}

module.exports = Profile;
