const pool = require('../db');

class Project {
  static async create(profileId, project) {
    const { title, description, techStack, repoLink, liveLink } = project;
    const query = `
      INSERT INTO projects (profile_id, title, description, tech_stack, repo_link, live_link)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [profileId, title, description, techStack, repoLink, liveLink];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByProfileId(profileId) {
    const query = `
      SELECT 
        id, 
        profile_id as "profileId", 
        title, 
        description, 
        tech_stack as "techStack", 
        repo_link as "repoLink", 
        live_link as "liveLink" 
      FROM projects 
      WHERE profile_id = $1
    `;
    const result = await pool.query(query, [profileId]);
    return result.rows;
  }

  static async deleteAllByProfileId(profileId) {
    const query = `DELETE FROM projects WHERE profile_id = $1`;
    await pool.query(query, [profileId]);
  }
}

module.exports = Project;
