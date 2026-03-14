export const mockResults = {
  currentRole: 'Cashier',
  dreamRole: 'Data Analyst',
  currentSkills: ['Excel', 'Customer Service'],

  skillGap: {
    have: [
      {
        name: 'Excel',
        level: 'Intermediate',
        description: 'Spreadsheet formulas, pivot tables, and basic data organization.',
      },
      {
        name: 'Customer Service',
        level: 'Strong',
        description: 'Communication, problem-solving, and working under pressure.',
      },
    ],
    need: [
      {
        name: 'SQL',
        priority: 'High',
        description: 'Query databases to pull, filter, and aggregate data for analysis.',
      },
      {
        name: 'Python',
        priority: 'High',
        description: 'Automate tasks, manipulate datasets with pandas, and build scripts.',
      },
      {
        name: 'Statistics',
        priority: 'Medium',
        description: 'Understand distributions, hypothesis testing, and regression basics.',
      },
      {
        name: 'Data Visualization',
        priority: 'Medium',
        description: 'Create charts and dashboards using Tableau or Power BI.',
      },
      {
        name: 'Critical Thinking',
        priority: 'Medium',
        description: 'Translate business questions into data-driven insights.',
      },
    ],
  },

  roadmap: {
    totalTime: '5-7 months',
    steps: [
      {
        id: 1,
        title: 'Level Up Your Excel Skills',
        duration: '2-3 weeks',
        description:
          'Go beyond the basics: learn VLOOKUP, INDEX/MATCH, pivot tables, and intro to Power Query. You already have a head start here.',
        milestone: 'Build a personal budget tracker with pivot table dashboard',
      },
      {
        id: 2,
        title: 'Learn SQL Fundamentals',
        duration: '4-6 weeks',
        description:
          'Master SELECT, WHERE, JOIN, GROUP BY, and subqueries. SQL is the bread and butter of data analysis — almost every job listing requires it.',
        milestone: 'Complete 50 practice problems on SQLZoo or HackerRank',
      },
      {
        id: 3,
        title: 'Statistics & Data Thinking',
        duration: '3-4 weeks',
        description:
          'Cover descriptive statistics, probability, distributions, and hypothesis testing. Focus on applied concepts, not heavy math theory.',
        milestone: 'Analyze a real dataset and write up 3 key findings',
      },
      {
        id: 4,
        title: 'Python for Data Analysis',
        duration: '6-8 weeks',
        description:
          'Learn Python basics, then focus on pandas, NumPy, and Jupyter notebooks. Practice cleaning messy datasets and performing exploratory data analysis.',
        milestone: 'Complete a guided project analyzing LA Open Data',
      },
      {
        id: 5,
        title: 'Data Visualization & Dashboards',
        duration: '3-4 weeks',
        description:
          'Learn Tableau Public (free) or Power BI. Create interactive dashboards that tell a story. Also explore matplotlib and seaborn in Python.',
        milestone: 'Publish 2 interactive dashboards to Tableau Public',
      },
      {
        id: 6,
        title: 'Build Your Portfolio & Apply',
        duration: '3-4 weeks',
        description:
          'Create 3 end-to-end projects showcasing your skills. Set up a GitHub portfolio. Tailor your resume. Start applying to entry-level data analyst roles.',
        milestone: 'Submit applications to 10+ data analyst positions in LA',
      },
    ],
  },

  resources: [
    {
      skill: 'Excel',
      items: [
        {
          name: 'LinkedIn Learning via LAPL',
          type: 'Free Online Course',
          availability: 'Free with LA Public Library card',
          url: '#',
        },
        {
          name: 'Excel Skills for Data Analytics (Coursera)',
          type: 'Online Course',
          availability: 'Free to audit',
          url: '#',
        },
      ],
    },
    {
      skill: 'SQL',
      items: [
        {
          name: 'Khan Academy - Intro to SQL',
          type: 'Free Online Course',
          availability: 'Always free',
          url: '#',
        },
        {
          name: 'LA City College - CIS 191',
          type: 'Community College',
          availability: 'Fall & Spring semesters, ~$46/unit',
          url: '#',
        },
      ],
    },
    {
      skill: 'Python',
      items: [
        {
          name: 'Google Data Analytics Certificate',
          type: 'Certificate Program',
          availability: 'Free with LAPL card on Coursera',
          url: '#',
        },
        {
          name: 'LA Public Library Python Workshop',
          type: 'In-Person Workshop',
          availability: 'Monthly at Central Library, free',
          url: '#',
        },
      ],
    },
    {
      skill: 'Data Visualization',
      items: [
        {
          name: 'Tableau Public (Free)',
          type: 'Free Software',
          availability: 'Always free',
          url: '#',
        },
        {
          name: 'LA Open Data Portal Practice',
          type: 'Practice Dataset',
          availability: 'Free public datasets from City of LA',
          url: '#',
        },
      ],
    },
  ],

  jobPostings: [
    {
      id: 1,
      title: 'Junior Data Analyst',
      company: 'City of Los Angeles',
      location: 'Downtown LA',
      salary: '$55,000 - $68,000',
      matchPercent: 72,
      skills: ['Excel', 'SQL', 'Python', 'Tableau'],
      posted: '3 days ago',
    },
    {
      id: 2,
      title: 'Data Analyst I',
      company: 'Snap Inc.',
      location: 'Santa Monica, CA',
      salary: '$75,000 - $90,000',
      matchPercent: 58,
      skills: ['SQL', 'Python', 'Statistics', 'Looker'],
      posted: '1 week ago',
    },
    {
      id: 3,
      title: 'Business Data Analyst',
      company: 'Kaiser Permanente',
      location: 'Pasadena, CA',
      salary: '$62,000 - $78,000',
      matchPercent: 65,
      skills: ['Excel', 'SQL', 'Power BI', 'Statistics'],
      posted: '5 days ago',
    },
    {
      id: 4,
      title: 'Associate Data Analyst',
      company: 'SpaceX',
      location: 'Hawthorne, CA',
      salary: '$70,000 - $85,000',
      matchPercent: 51,
      skills: ['Python', 'SQL', 'R', 'Data Visualization'],
      posted: '2 weeks ago',
    },
  ],
}
