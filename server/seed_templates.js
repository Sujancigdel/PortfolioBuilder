const { Pool } = require('pg');
require('dotenv').config();
const Template = require('./models/Template');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const templates = [
  {
    name: 'Minimalist',
    description: 'A clean and simple portfolio template.',
    htmlStructure: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{fullName}} - Portfolio</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>{{fullName}}</h1>
        <p>{{bio}}</p>
        <nav>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>
    <section id="skills">
        <h2>Skills</h2>
        <ul>
            {{#each skills}}
            <li>{{name}} ({{proficiency}})</li>
            {{/each}}
        </ul>
    </section>
    <section id="projects">
        <h2>Projects</h2>
        <div class="project-grid">
            {{#each projects}}
            <div class="project-card">
                <h3>{{title}}</h3>
                <p>{{description}}</p>
                <p><strong>Stack:</strong> {{techStack}}</p>
                <a href="{{repoLink}}">GitHub</a> | <a href="{{liveLink}}">Live</a>
            </div>
            {{/each}}
        </div>
    </section>
    <section id="education">
        <h2>Education</h2>
        {{#each education}}
        <div class="edu-item">
            <h3>{{institution}}</h3>
            <p>{{degree}} in {{fieldOfStudy}}</p>
            <p>{{startDate}} - {{endDate}}</p>
        </div>
        {{/each}}
    </section>
    <footer id="contact">
        <p>Contact: <a href="mailto:{{contactEmail}}">{{contactEmail}}</a></p>
        <p><a href="{{linkedinUrl}}">LinkedIn</a> | <a href="{{githubUrl}}">GitHub</a></p>
    </footer>
</body>
</html>
    `,
    cssStyles: `
* { box-sizing: border-box; }
body { margin: 0 auto; font-family: sans-serif; line-height: 1.6; max-width: 800px; padding: 20px; color: #333; }
header { text-align: center; margin-bottom: 40px; }
h1 { margin-bottom: 10px; }
nav { margin: 15px 0; }
nav a { margin: 0 10px; text-decoration: none; color: #007bff; }
nav a:hover { text-decoration: underline; }
section { margin-bottom: 40px; }
h2 { border-bottom: 2px solid #eee; padding-bottom: 10px; }
ul { list-style: none; padding-left: 0; }
ul li { margin-bottom: 8px; }
.project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
.project-card { border: 1px solid #ddd; padding: 15px; border-radius: 5px; }
.project-card a { color: #007bff; text-decoration: none; }
.project-card a:hover { text-decoration: underline; }
.edu-item { margin-bottom: 20px; }
footer { text-align: center; margin-top: 50px; font-size: 0.9em; color: #666; }
footer a { color: #007bff; text-decoration: none; }
footer a:hover { text-decoration: underline; }
    `,
    // Simple SVG Data URI for placeholder
    previewImageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZmlsbD0iIzU1NSI+TWluaW1hbGlzdDwvdGV4dD48L3N2Zz4='
  },
  {
    name: 'Professional',
    description: 'A structured and formal template suitable for corporate roles.',
    htmlStructure: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{fullName}}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="sidebar">
        <h1>{{fullName}}</h1>
        <p>{{bio}}</p>
        <div class="contact">
            <p>{{contactEmail}}</p>
            <a href="{{linkedinUrl}}">LinkedIn</a>
            <a href="{{githubUrl}}">GitHub</a>
        </div>
    </div>
    <div class="main">
        <section>
            <h2>Experience & Projects</h2>
            {{#each projects}}
            <div class="item">
                <h3>{{title}}</h3>
                <p>{{description}}</p>
                <small>{{techStack}}</small>
            </div>
            {{/each}}
        </section>
        <section>
            <h2>Education</h2>
            {{#each education}}
            <div class="item">
                <h3>{{institution}}</h3>
                <p>{{degree}}, {{fieldOfStudy}}</p>
            </div>
            {{/each}}
        </section>
        <section>
            <h2>Skills</h2>
            <div class="skills">
                {{#each skills}}
                <span>{{name}}</span>
                {{/each}}
            </div>
        </section>
    </div>
</body>
</html>
    `,
    cssStyles: `
* { box-sizing: border-box; }
html, body { margin: 0; min-height: 100vh; font-family: 'Georgia', serif; }
body { display: flex; }
.sidebar { width: 300px; min-width: 300px; flex-shrink: 0; background: #2c3e50; color: white; padding: 40px; }
.sidebar h1 { margin-top: 0; margin-bottom: 15px; font-size: 1.5em; }
.sidebar p { margin: 0 0 15px 0; font-size: 0.95em; line-height: 1.5; }
.sidebar .contact { margin-top: 25px; }
.sidebar .contact p { margin-bottom: 10px; }
.sidebar a { color: #ecf0f1; display: block; margin: 5px 0; text-decoration: none; }
.sidebar a:hover { text-decoration: underline; }
.main { flex: 1; padding: 40px; background: #ecf0f1; min-width: 0; }
.main h2 { margin-top: 0; margin-bottom: 20px; }
.item { margin-bottom: 20px; background: white; padding: 20px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.item h3 { margin-top: 0; margin-bottom: 10px; }
.item p { margin: 0 0 8px 0; }
.item small { color: #666; font-size: 0.9em; }
.skills { display: flex; flex-wrap: wrap; gap: 8px; }
.skills span { display: inline-block; background: #34495e; color: white; padding: 5px 10px; border-radius: 3px; font-size: 0.9em; }
    `,
     // Simple SVG Data URI for placeholder
    previewImageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMmMzZTUwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZmlsbD0iI2ZmZiI+UHJvZmVzc2lvbmFsPC90ZXh0Pjwvc3ZnPg=='
},
  {
    name: 'Tech Noir',
    description: 'A retro-futuristic dark mode template with neon accents.',
    htmlStructure: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{fullName}}</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <header>
            <h1>{{fullName}}</h1>
            <p class="subtitle">> {{bio}}</p>
            <div class="terminal-line">Contact: <a href="mailto:{{contactEmail}}">{{contactEmail}}</a></div>
            <div class="terminal-line">
                [<a href="{{linkedinUrl}}">LNKD</a>] 
                [<a href="{{githubUrl}}">GTHB</a>]
            </div>
        </header>

        <section>
            <h2>// SKILLS_LOADED</h2>
            <div class="skills-grid">
                {{#each skills}}
                <div class="skill-tag">{{name}}::{{proficiency}}</div>
                {{/each}}
            </div>
        </section>

        <section>
            <h2>// PROJECT_LOG</h2>
            <div class="projects">
                {{#each projects}}
                <div class="project-card">
                    <h3>{{title}}</h3>
                    <p>{{description}}</p>
                    <div class="meta">STACK: {{techStack}}</div>
                    <div class="links">
                        <a href="{{repoLink}}">SOURCE</a>
                        <a href="{{liveLink}}">DEPLOY</a>
                    </div>
                </div>
                {{/each}}
            </div>
        </section>

        <section>
            <h2>// EDUCATION_HISTORY</h2>
            {{#each education}}
            <div class="edu-entry">
                <span class="date">[{{startDate}} -> {{endDate}}]</span>
                <strong>{{institution}}</strong>
                <div>{{degree}} in {{fieldOfStudy}}</div>
            </div>
            {{/each}}
        </section>
    </div>
</body>
</html>
    `,
    cssStyles: `
* { box-sizing: border-box; }
body { margin: 0; background-color: #0d0d0d; color: #00ff41; font-family: 'Roboto Mono', monospace; padding: 20px; line-height: 1.5; }
a { color: #ff00ff; text-decoration: none; }
a:hover { background-color: #ff00ff; color: #000; }
.container { max-width: 800px; margin: 0 auto; border: 1px solid #333; padding: 40px; box-shadow: 0 0 20px rgba(0, 255, 65, 0.1); }
h1, h2, h3 { text-transform: uppercase; letter-spacing: 2px; }
h1 { font-size: 2.5em; margin: 0 0 10px 0; text-shadow: 2px 2px #ff00ff; }
h2 { border-bottom: 1px dashed #00ff41; padding-bottom: 10px; margin-top: 40px; margin-bottom: 15px; color: #fff; }
h2:first-of-type { margin-top: 0; }
.subtitle { color: #ccc; margin-bottom: 30px; }
.terminal-line { margin-bottom: 5px; }
.skills-grid { display: flex; flex-wrap: wrap; gap: 10px; }
.skill-tag { border: 1px solid #00ff41; padding: 5px 10px; }
.projects { display: grid; gap: 20px; }
.project-card { border: 1px solid #333; padding: 20px; background: #111; transition: border-color 0.3s; }
.project-card h3 { margin-top: 0; margin-bottom: 10px; }
.project-card p { margin: 0 0 10px 0; }
.project-card:hover { border-color: #ff00ff; }
.meta { font-size: 0.8em; color: #888; margin: 10px 0; }
.links a { margin-right: 15px; border-bottom: 1px solid #ff00ff; }
.edu-entry { margin-bottom: 20px; border-left: 2px solid #333; padding-left: 15px; }
.edu-entry strong { display: block; margin-bottom: 5px; }
.date { color: #888; display: block; font-size: 0.9em; margin-bottom: 5px; }
    `,
    previewImageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMGQwZDBkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjMDBmZjQxIj5UZWNoIE5vaXI8L3RleHQ+PC9zdmc+'
  },
  {
    name: 'Split Focus',
    description: 'A modern layout with a fixed sidebar and scrolling content area.',
    htmlStructure: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{fullName}}</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;600&display=swap" rel="stylesheet">
</head>
<body>
    <div class="split-layout">
        <aside class="sidebar">
            <div class="profile-intro">
                <h1>{{fullName}}</h1>
                <p class="bio">{{bio}}</p>
                <div class="contact-links">
                    <a href="mailto:{{contactEmail}}" class="btn">Email Me</a>
                    <div class="socials">
                        <a href="{{linkedinUrl}}">LinkedIn</a>
                        <a href="{{githubUrl}}">GitHub</a>
                    </div>
                </div>
            </div>
        </aside>
        <main class="content">
            <section>
                <h2>My Work</h2>
                <div class="grid">
                    {{#each projects}}
                    <div class="card">
                        <h3>{{title}}</h3>
                        <p>{{description}}</p>
                        <div class="tags">{{techStack}}</div>
                        <div class="actions">
                            <a href="{{repoLink}}">Code</a>
                            <a href="{{liveLink}}">Live</a>
                        </div>
                    </div>
                    {{/each}}
                </div>
            </section>
            
            <section>
                <h2>Education</h2>
                {{#each education}}
                <div class="timeline-item">
                    <h4>{{institution}}</h4>
                    <p>{{degree}}, {{fieldOfStudy}}</p>
                    <small>{{startDate}} - {{endDate}}</small>
                </div>
                {{/each}}
            </section>

            <section>
                <h2>Expertise</h2>
                <div class="skills-list">
                    {{#each skills}}
                    <span class="pill">{{name}}</span>
                    {{/each}}
                </div>
            </section>
        </main>
    </div>
</body>
</html>
    `,
    cssStyles: `
* { box-sizing: border-box; }
html, body { margin: 0; min-height: 100vh; }
body { font-family: 'Outfit', sans-serif; color: #333; overflow-x: hidden; }
.split-layout { display: flex; min-height: 100vh; }
.sidebar { width: 40%; min-width: 280px; background: #f3f4f6; padding: 60px; position: fixed; top: 0; left: 0; height: 100vh; display: flex; flex-direction: column; justify-content: center; overflow-y: auto; }
.content { width: 60%; margin-left: 40%; padding: 60px; background: #fff; min-height: 100vh; }
.profile-intro h1 { font-size: 3em; line-height: 1.1; margin: 0 0 20px 0; color: #111; }
h2 { font-size: 1.8em; margin-bottom: 30px; position: relative; display: inline-block; }
h2::after { content: ''; display: block; width: 50px; height: 3px; background: #333; margin-top: 10px; }
.bio { font-size: 1.1em; line-height: 1.6; color: #555; margin-bottom: 40px; }
.contact-links { margin-top: 20px; }
.btn { display: inline-block; background: #111; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 30px; transition: transform 0.2s; }
.btn:hover { transform: translateY(-2px); }
.socials { margin-top: 20px; }
.socials a { color: #555; margin-right: 15px; text-decoration: none; font-weight: 600; }
.socials a:hover { color: #111; }
.grid { display: grid; gap: 30px; }
.card { padding: 30px; border: 1px solid #eaeaea; border-radius: 12px; transition: box-shadow 0.3s; }
.card h3 { margin-top: 0; margin-bottom: 15px; }
.card p { margin: 0 0 15px 0; }
.card:hover { box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
.tags { color: #888; font-size: 0.9em; margin: 15px 0; }
.actions a { margin-right: 15px; color: #111; text-decoration: none; border-bottom: 1px solid #111; }
.actions a:hover { opacity: 0.8; }
.timeline-item { margin-bottom: 30px; }
.timeline-item h4 { margin: 0 0 8px 0; }
.timeline-item p { margin: 0 0 5px 0; }
.skills-list { display: flex; flex-wrap: wrap; gap: 10px; }
.pill { background: #eee; padding: 8px 16px; border-radius: 20px; font-size: 0.9em; }
@media (max-width: 768px) {
    .split-layout { flex-direction: column; }
    .sidebar { width: 100%; min-width: auto; position: relative; height: auto; padding: 40px; }
    .content { width: 100%; margin-left: 0; padding: 40px; }
}
    `,
    previewImageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmM2Y0ZjYiLz48cmVjdCB4PSI0MCUiIHdpZHRoPSI2MCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2ZmZiIvPjx0ZXh0IHg9IjcwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZpbGw9IiMzMzMiPlNwbGl0IEZvY3VzPC90ZXh0Pjwvc3ZnPg=='
  },
  {
    name: 'Modern Grid',
    description: 'A vibrant, card-based layout perfect for showcasing many projects.',
    htmlStructure: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{fullName}}</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
    <header class="hero">
        <div class="hero-content">
            <h1>{{fullName}}</h1>
            <p>{{bio}}</p>
            <div class="links">
                <a href="mailto:{{contactEmail}}">Email</a>
                <a href="{{linkedinUrl}}">LinkedIn</a>
                <a href="{{githubUrl}}">GitHub</a>
            </div>
        </div>
    </header>

    <div class="container">
        <section class="projects-section">
            <h2 class="section-title">Selected Works</h2>
            <div class="grid-gallery">
                {{#each projects}}
                <div class="project-tile">
                    <div class="tile-content">
                        <h3>{{title}}</h3>
                        <p>{{description}}</p>
                        <span class="tech-badge">{{techStack}}</span>
                        <div class="tile-links">
                            <a href="{{repoLink}}">Repo</a>
                            <a href="{{liveLink}}">View</a>
                        </div>
                    </div>
                </div>
                {{/each}}
            </div>
        </section>

        <div class="bottom-split">
            <section class="edu-section">
                <h2 class="section-title">Education</h2>
                {{#each education}}
                <div class="edu-block">
                    <strong>{{institution}}</strong>
                    <div class="edu-details">{{degree}}, {{fieldOfStudy}}</div>
                    <div class="edu-date">{{startDate}} to {{endDate}}</div>
                </div>
                {{/each}}
            </section>

            <section class="skills-section">
                <h2 class="section-title">Skills</h2>
                <ul class="skills-ul">
                    {{#each skills}}
                    <li>{{name}} • <span class="prof">{{proficiency}}</span></li>
                    {{/each}}
                </ul>
            </section>
        </div>
    </div>
</body>
</html>
    `,
    cssStyles: `
* { box-sizing: border-box; }
body { margin: 0; background-color: #f8f9fa; font-family: 'Inter', sans-serif; color: #2d3436; }
.hero { background: linear-gradient(135deg, #6c5ce7, #a29bfe); color: white; padding: 80px 20px; text-align: center; }
.hero-content { max-width: 600px; margin: 0 auto; }
.hero h1 { margin: 0 0 15px 0; font-size: 3.5rem; }
.hero p { opacity: 0.9; margin: 0 0 30px 0; font-size: 1.2rem; }
.links { margin-top: 20px; }
.links a { color: white; margin: 0 10px; font-weight: bold; text-decoration: none; padding-bottom: 2px; border-bottom: 2px solid rgba(255,255,255,0.5); }
.links a:hover { border-bottom-color: white; }
.container { max-width: 1000px; margin: 0 auto; padding: 60px 20px; }
.section-title { font-size: 1.5rem; color: #6c5ce7; margin-bottom: 30px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
.projects-section { margin-bottom: 60px; }
.grid-gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px; }
.project-tile { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.05); transition: transform 0.3s ease; }
.project-tile:hover { transform: translateY(-5px); }
.tile-content { padding: 25px; }
.tile-content h3 { margin-top: 0; margin-bottom: 15px; color: #2d3436; }
.tile-content p { margin: 0 0 15px 0; }
.tech-badge { display: inline-block; background: #dfe6e9; color: #636e72; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; margin: 10px 0; font-weight: 600; }
.tile-links a { display: inline-block; margin-right: 15px; color: #6c5ce7; text-decoration: none; font-weight: bold; font-size: 0.9rem; }
.tile-links a:hover { text-decoration: underline; }
.bottom-split { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-top: 80px; }
.edu-section, .skills-section { margin-bottom: 0; }
.edu-block { margin-bottom: 25px; border-left: 3px solid #a29bfe; padding-left: 15px; }
.edu-block strong { display: block; margin-bottom: 5px; }
.edu-details { color: #636e72; margin: 5px 0; }
.edu-date { font-size: 0.85rem; color: #b2bec3; }
.skills-ul { list-style: none; padding: 0; margin: 0; column-count: 2; column-gap: 30px; }
.skills-ul li { margin-bottom: 10px; font-weight: 500; break-inside: avoid; }
.prof { color: #6c5ce7; font-size: 0.85rem; }
@media (max-width: 768px) {
    .bottom-split { grid-template-columns: 1fr; gap: 40px; margin-top: 60px; }
    .skills-ul { column-count: 1; }
}
    `,
    previewImageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmIi8+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iNDAlIiBmaWxsPSIjNmM1Y2U3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZmlsbD0iIzJkMzQzNiI+TW9kZXJuIEdyaWQ8L3RleHQ+PC9zdmc+'
  }
];

// NOTE: This updated seed script now UPSERTS (Updates if conflict)
async function seed() {
  try {
    for (const tmpl of templates) {
      const query = `
        INSERT INTO templates (name, description, html_structure, css_styles, preview_image_url)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (name) 
        DO UPDATE SET 
            description = EXCLUDED.description,
            html_structure = EXCLUDED.html_structure,
            css_styles = EXCLUDED.css_styles,
            preview_image_url = EXCLUDED.preview_image_url;
      `;
      await pool.query(query, [tmpl.name, tmpl.description, tmpl.htmlStructure, tmpl.cssStyles, tmpl.previewImageUrl]);
      console.log(`Seeded/Updated template: ${tmpl.name}`);
    }
    console.log('Seeding completed.');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    pool.end();
  }
}

seed();
