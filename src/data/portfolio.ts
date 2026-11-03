export const profile = {
  name: 'Nakuleshwaran Anusha',
  initials: 'NA',
  role: 'BICT Undergraduate | Aspiring Software Developer',
  tagline: 'Building modern digital experiences through technology, creativity, and problem-solving.',
  email: 'anushanakuleswaran55@gmail.com',
  phone: '+94 76 821 5708',
  // PLACEHOLDERS – replace with real values when available
  linkedin: 'https://www.linkedin.com/in/nakuleshwaran-anusha-821534397',
  github: 'https://github.com/anushanakuleswaran55-coder',
  cvUrl: `${import.meta.env.BASE_URL}assets/Anusha_Nakuleshwaran_CV_updated.pdf`,
  summary:
    'Motivated and hardworking BICT undergraduate with a strong interest in Information Technology and software development. Possess good problem-solving, communication, teamwork, and time-management skills. Eager to learn new technologies, develop practical skills, and contribute effectively in a professional environment.',
}

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const

export type SkillGroup = {
  title: string
  icon: 'palette' | 'code' | 'database' | 'users'
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  { title: 'Design Tools', icon: 'palette', items: ['Figma', 'Canva', 'Wireframing', 'Mockup Design', 'Prototyping'] },
  { title: 'Programming & Web', icon: 'code', items: ['Java', 'JavaScript', 'HTML', 'CSS', 'C#', 'C++', 'SQL'] },
  { title: 'Databases', icon: 'database', items: ['MySQL', 'XAMPP'] },
  { title: 'Soft Skills', icon: 'users', items: ['Problem-Solving', 'Creativity', 'Communication', 'Teamwork', 'Leadership'] },
]

export type Project = {
  number: string
  title: string
  description: string
  features: string[]
  tech: string[]
  github: string
}

export const projects: Project[] = [
  {
    number: '01',
    title: 'AI-Based Fake News Detection System',
    description:
      'Developed a full-stack web application to detect Real, Fake, or Misleading news using machine learning and NLP.',
    features: [
      'User authentication',
      'Real-time news analysis',
      'Confidence-based prediction results',
      'Responsive interface',
      'Secure JWT authentication',
    ],
    tech: ['React.js', 'Flask', 'Python', 'Scikit-learn', 'Tailwind CSS', 'JWT', 'Git'],
    github: 'https://github.com/anushanakuleswaran55-coder/fake-news-detector-new.git',
  },
  {
    number: '02',
    title: 'Career Roadmap Web Application',
    description: 'Built a web application for exploring technology career paths and learning roadmaps.',
    features: [
      'Technology career exploration',
      'Interactive learning roadmaps',
      'Responsive user interface',
      'Modern animations',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'JSON'],
    github: 'https://github.com/anushanakuleswaran55-coder/Career-Roadmap.git',
  },
  {
    number: '03',
    title: 'Member Management System | MERN Stack',
    description: 'Developed a MERN-based web application with secure authentication and member CRUD operations.',
    features: ['Secure authentication', 'Member CRUD operations'],
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    github: 'https://github.com/anushanakuleswaran55-coder/member-manager-system.git',
  },
]

export const education = [
  {
    title: 'Bachelor of Information and Communication Technology (Hons)',
    place: 'University of Vavuniya, Faculty of Technological Studies, Sri Lanka',
    period: 'August 2023 – Present',
  },
  {
    title: 'Advanced Level (A/L)',
    place: 'MN/Sethi Vinayakar Hindu College (National School)',
    period: 'September 2019 – August 2021',
  },
]

export const achievements = [
  'Completed academic projects in web development using Next.js, React, and TypeScript.',
  'Participated in university workshops or seminars.',
]

export const languages = [
  { name: 'Tamil', level: 'Native' },
  { name: 'English', level: 'Professional' },
]

export const references = [
  {
    name: 'Mr. V. Senthooran',
    role: 'Dean, Faculty of Technological Studies',
    phone: '+94 77 210 1863',
    email: 'v.senthooran@vau.ac.lk',
  },
  {
    name: 'Mr. V. Vinoharan',
    role: 'Head, Department of Information & Communication Technology',
    phone: '+94 77 248 7111',
    email: 'v.vinoharan@vau.ac.lk',
  },
]
