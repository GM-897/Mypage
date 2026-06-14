require('dotenv').config();
const mongoose = require('mongoose');

const Bio = require('./models/Bio');
const Experience = require('./models/Experience');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Education = require('./models/Education');

const bioData = {
  name: "G MAN MOHIT MAHADEV",
  roles: ["Fullstack Developer", "Passionate Programmer", "Tech Enthusiast"],
  description: "I am a motivated and versatile individual, always eager to take on new challenges. With a passion for learning I am dedicated to delivering high-quality results. With a positive attitude and a growth mindset, I am ready to make a meaningful contribution and achieve great things.",
  github: "https://github.com/gm-897",
  resume: "https://drive.google.com/file/d/1KiMqFpYNDE5WU9xme0jYt3ppR_waUiPW/view?usp=sharing",
  linkedin: "https://www.linkedin.com/in/gman897/",
  twitter: "https://twitter.com",
  insta: "https://www.instagram.com/the_beast_gm/",
  facebook: "https://www.facebook.com/manmohit.grandhi/",
};

const skillsData = [
  {
    title: "Frontend",
    order: 0,
    skills: [
      { name: "React Js", image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" },
      { name: "Redux", image: "https://d33wubrfki0l68.cloudfront.net/0834d0215db51e91525a25acf97433051f280f2f/c30f5/img/redux.svg" },
      { name: "Next Js", image: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png" },
      { name: "HTML", image: "https://www.w3.org/html/logo/badge/html5-badge-h-solo.png" },
      { name: "CSS", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1452px-CSS3_logo_and_wordmark.svg.png" },
      { name: "JavaScript", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png" },
      { name: "Bootstrap", image: "https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png" },
      { name: "Material UI", image: "https://mui.com/static/logo.png" },
    ],
  },
  {
    title: "Backend",
    order: 1,
    skills: [
      { name: "Node Js", image: "https://nodejs.org/static/images/logo.svg" },
      { name: "Express Js", image: "https://expressjs.com/images/express-facebook-share.png" },
      { name: "Python", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
      { name: "Go", image: "https://go.dev/blog/go-brand/Go-Logo/PNG/go_logo_blue.png" },
      { name: "MongoDB", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" },
      { name: "Firebase", image: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" },
    ],
  },
  {
    title: "Others",
    order: 2,
    skills: [
      { name: "GitHub", image: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" },
      { name: "VS Code", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/512px-Visual_Studio_Code_1.35_icon.svg.png" },
      { name: "MySQL", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" },
      { name: "Postman", image: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
      { name: "Vercel", image: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" },
    ],
  },
];

const experiencesData = [
  {
    img: "https://firebasestorage.googleapis.com/v0/b/flexi-coding.appspot.com/o/flipr.jpeg?alt=media&token=1d72532a-45eb-4c1a-a81a-c9bed9fec543",
    role: "DevOps & Fullstack Engineering Intern",
    company: "Flipr Inovations Pvt. Ltd.",
    date: "Aug 2023 - July 2023",
    desc: "Working on Flipr Platforms, managing DevOps, and streamlining the process with automation.",
    skills: ["Docker", "Terraform", "AWS", "EC2", "Portainer", "Nginx", "JavaScript", "TypeScript", "Node Js", "Next Js"],
    doc: "https://media.licdn.com/dms/image/D4D2DAQFlp60ZqHuaFQ/profile-treasury-image-shrink_1280_1280/0/1691180828512?e=1692381600&v=beta&t=mM5Y_NE5EPlQhez5FAN6NLVSKcO_Ojt_9Gq3mnFGkAQ",
    type: "internship",
    order: 0,
  },
];

// NOTE: Education images were base64 in constants.js — upload proper logos via the admin panel after seeding.
const educationData = [
  {
    img: "",
    school: "Your School / University Name",
    date: "20XX - 20XX",
    degree: "Your Degree",
    desc: "Brief description of your education.",
    grade: "Your Grade / GPA",
    order: 0,
  },
];

// NOTE: Project images were local imports — upload via admin panel after seeding.
const projectsData = [
  {
    image: "",
    title: "Netflix Clone",
    description: "A Netflix clone built with React and Firebase featuring authentication and video streaming.",
    date: "Jun 2023",
    tags: ["React Js", "Firebase", "Styled Components"],
    category: "web app",
    github: "https://github.com/GM-897",
    webapp: "",
    order: 0,
  },
  {
    image: "",
    title: "Minesweeper",
    description: "Classic Minesweeper game built with React.",
    date: "May 2023",
    tags: ["React Js", "JavaScript"],
    category: "web app",
    github: "https://github.com/GM-897",
    webapp: "",
    order: 1,
  },
  {
    image: "",
    title: "Real Estate Brochure",
    description: "Modern real estate website with property listings and interactive UI.",
    date: "Apr 2023",
    tags: ["React Js", "Node Js", "MongoDB"],
    category: "web app",
    github: "https://github.com/GM-897",
    webapp: "",
    order: 2,
  },
  {
    image: "",
    title: "Meeting Notes App",
    description: "Collaborative meeting notes application with real-time sync.",
    date: "Mar 2023",
    tags: ["React Js", "Node Js", "Socket.io"],
    category: "web app",
    github: "https://github.com/GM-897",
    webapp: "",
    order: 3,
  },
  {
    image: "",
    title: "myNote",
    description: "Personal notes app with markdown support.",
    date: "Feb 2023",
    tags: ["React Js", "Firebase"],
    category: "web app",
    github: "https://github.com/GM-897",
    webapp: "",
    order: 4,
  },
  {
    image: "",
    title: "Nudge App",
    description: "Social nudge application for habit building.",
    date: "Jan 2023",
    tags: ["React Native", "Firebase"],
    category: "android app",
    github: "https://github.com/GM-897",
    webapp: "",
    order: 5,
  },
  {
    image: "",
    title: "Dashboard",
    description: "Analytics dashboard with charts and data visualizations.",
    date: "Dec 2022",
    tags: ["React Js", "Chart.js", "Material UI"],
    category: "web app",
    github: "https://github.com/GM-897",
    webapp: "",
    order: 6,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Promise.all([
      Bio.deleteMany({}),
      Experience.deleteMany({}),
      Project.deleteMany({}),
      Skill.deleteMany({}),
      Education.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    await Bio.create(bioData);
    await Skill.insertMany(skillsData);
    await Experience.insertMany(experiencesData);
    await Education.insertMany(educationData);
    await Project.insertMany(projectsData);

    console.log('Seed complete!');
    console.log('  Bio: 1 document');
    console.log(`  Skills: ${skillsData.length} categories`);
    console.log(`  Experiences: ${experiencesData.length} entries`);
    console.log(`  Education: ${educationData.length} entries`);
    console.log(`  Projects: ${projectsData.length} entries`);
    console.log('\nNote: Project and education images are empty — upload them via /admin after starting the server.');
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    mongoose.disconnect();
  }
}

seed();
