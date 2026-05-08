const Profile = require('../models/Profile');
const Skill = require('../models/Skill');
const Education = require('../models/Education');
const Project = require('../models/Project');

const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const profile = await Profile.findByUserId(userId);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const skills = await Skill.findByProfileId(profile.id);
    const education = await Education.findByProfileId(profile.id);
    const projects = await Project.findByProfileId(profile.id);

    res.json({ ...profile, skills, education, projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const saveProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { fullName, bio, contactEmail, linkedinUrl, githubUrl, skills, education, projects } = req.body;

    // Check if profile exists, if not create
    let profile = await Profile.findByUserId(userId);
    if (profile) {
      profile = await Profile.update(userId, { fullName, bio, contactEmail, linkedinUrl, githubUrl });
    } else {
      profile = await Profile.create(userId, { fullName, bio, contactEmail, linkedinUrl, githubUrl });
    }

    // Handle Skills (Delete all and recreate - Simple strategy)
    if (skills) {
      await Skill.deleteAllByProfileId(profile.id);
      for (const skill of skills) {
        await Skill.create(profile.id, skill);
      }
    }

    // Handle Education
    if (education) {
      await Education.deleteAllByProfileId(profile.id);
      for (const edu of education) {
        await Education.create(profile.id, edu);
      }
    }

    // Handle Projects
    if (projects) {
      await Project.deleteAllByProfileId(profile.id);
      for (const proj of projects) {
        await Project.create(profile.id, proj);
      }
    }

    res.json({ message: 'Profile saved successfully', profileId: profile.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProfile, saveProfile };
