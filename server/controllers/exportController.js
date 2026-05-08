const AdmZip = require('adm-zip');
const Handlebars = require('handlebars');
const xss = require('xss');
const Profile = require('../models/Profile');
const Skill = require('../models/Skill');
const Education = require('../models/Education');
const Project = require('../models/Project');
const Template = require('../models/Template');

const downloadPortfolio = async (req, res) => {
  try {
    const { templateId } = req.params;
    const userId = req.user.userId;

    // Fetch Data
    const profile = await Profile.findByUserId(userId);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found. Please complete your profile first.' });
    }
    const skills = await Skill.findByProfileId(profile.id);
    const education = await Education.findByProfileId(profile.id);
    const projects = await Project.findByProfileId(profile.id);
    const template = await Template.findById(templateId);

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    // Compile Data
    const data = {
      ...profile,
      skills,
      education,
      projects
    };

    // Compile HTML
    const compiledHtml = Handlebars.compile(template.html_structure)(data);
    const cleanHtml = xss(compiledHtml);

    // Create ZIP
    const zip = new AdmZip();
    zip.addFile('index.html', Buffer.from(cleanHtml, 'utf8'));
    zip.addFile('style.css', Buffer.from(template.css_styles, 'utf8'));

    // Add assets folder if needed (empty for now or placeholder)
    // zip.addLocalFolder('assets'); 

    const downloadName = `${profile.fullName.replace(/\s+/g, '_')}_portfolio.zip`;
    const dataBuffer = zip.toBuffer();

    res.set('Content-Type', 'application/zip');
    res.set('Content-Disposition', `attachment; filename=${downloadName}`);
    res.set('Content-Length', dataBuffer.length);
    res.send(dataBuffer);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error generating portfolio' });
  }
};

module.exports = { downloadPortfolio };
