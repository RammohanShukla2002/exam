import { Exam } from '../types';

export const SAMPLE_EXAMS: Exam[] = [
  {
    id: 'general-knowledge',
    title: 'General Knowledge & Current Affairs',
    subject: 'General Knowledge',
    description: 'Test your awareness of world geography, history, global landmarks, and monumental achievements.',
    iconName: 'Globe',
    durationMinutes: 10,
    totalQuestions: 10,
    passingScorePercent: 40,
    difficulty: 'Beginner',
    questions: [
      {
        id: 1,
        question: 'Which is the largest ocean on Earth by surface area?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
        correctAnswer: 2,
        explanation: 'The Pacific Ocean is the largest and deepest ocean on Earth, covering more than 63 million square miles.'
      },
      {
        id: 2,
        question: 'Who was the first person to step on the Moon?',
        options: ['Yuri Gagarin', 'Neil Armstrong', 'Buzz Aldrin', 'Michael Collins'],
        correctAnswer: 1,
        explanation: 'Neil Armstrong became the first human to walk on the lunar surface during the Apollo 11 mission on July 20, 1969.'
      },
      {
        id: 3,
        question: 'What is the capital city of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
        correctAnswer: 2,
        explanation: 'Canberra was chosen as the capital city of Australia in 1908 as a compromise between Sydney and Melbourne.'
      },
      {
        id: 4,
        question: 'Which country is famously known as the "Land of the Rising Sun"?',
        options: ['China', 'Japan', 'South Korea', 'Thailand'],
        correctAnswer: 1,
        explanation: 'Japan is called Nihon or Nippon natively, which translates poetically to "origin of the sun".'
      },
      {
        id: 5,
        question: 'In which year did the United Nations (UN) officially come into existence?',
        options: ['1918', '1939', '1945', '1950'],
        correctAnswer: 2,
        explanation: 'The United Nations officially came into existence on October 24, 1945, after the ratification of the UN Charter.'
      },
      {
        id: 6,
        question: 'Which river is recognized as the longest in the world?',
        options: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
        correctAnswer: 1,
        explanation: 'The Nile River in northeastern Africa is traditionally considered the longest river at approximately 6,650 km (4,132 miles).'
      },
      {
        id: 7,
        question: 'What is the currency of the United Kingdom?',
        options: ['Euro', 'Pound Sterling', 'Dollar', 'Swiss Franc'],
        correctAnswer: 1,
        explanation: 'The Pound Sterling (£) is the official currency of the United Kingdom and its crown dependencies.'
      },
      {
        id: 8,
        question: 'Which African nation was formerly known as Abyssinia?',
        options: ['Egypt', 'Ethiopia', 'Somalia', 'Sudan'],
        correctAnswer: 1,
        explanation: 'Ethiopia was historically known to outsiders as Abyssinia until the early to mid-20th century.'
      },
      {
        id: 9,
        question: 'Who painted the famous masterpiece "The Starry Night"?',
        options: ['Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Claude Monet'],
        correctAnswer: 1,
        explanation: 'Vincent van Gogh painted The Starry Night in June 1889 while staying at the Saint-Paul-de-Mausole asylum in Saint-Rémy-de-Provence.'
      },
      {
        id: 10,
        question: 'What is the highest mountain peak in North America?',
        options: ['Mount Whitney', 'Mount McKinley (Denali)', 'Mount Elbert', 'Mount Logan'],
        correctAnswer: 1,
        explanation: 'Denali (formerly known officially as Mount McKinley) is the highest peak in North America at 20,310 feet (6,190 meters).'
      }
    ]
  },
  {
    id: 'mathematics',
    title: 'Essential Mathematics & Algebra',
    subject: 'Mathematics',
    description: 'Assess foundational arithmetic, linear equations, percentages, geometry, and basic probability.',
    iconName: 'Calculator',
    durationMinutes: 15,
    totalQuestions: 10,
    passingScorePercent: 40,
    difficulty: 'Intermediate',
    questions: [
      {
        id: 1,
        question: 'What is the solution for x in the equation: 3x + 15 = 45?',
        options: ['5', '10', '15', '20'],
        correctAnswer: 1,
        explanation: 'Subtract 15 from both sides: 3x = 30. Divide by 3: x = 10.'
      },
      {
        id: 2,
        question: 'If a jacket is priced at $120 and discounted by 25%, what is the sale price?',
        options: ['$80', '$90', '$95', '$100'],
        correctAnswer: 1,
        explanation: '25% of 120 = 0.25 * 120 = $30 discount. Sale price = 120 - 30 = $90.'
      },
      {
        id: 3,
        question: 'What is the sum of angles inside any triangle?',
        options: ['90 degrees', '180 degrees', '270 degrees', '360 degrees'],
        correctAnswer: 1,
        explanation: 'The interior angles of any planar Euclidean triangle always sum to 180 degrees.'
      },
      {
        id: 4,
        question: 'What is the value of 2^6 (2 raised to the power of 6)?',
        options: ['32', '64', '128', '256'],
        correctAnswer: 1,
        explanation: '2 * 2 * 2 * 2 * 2 * 2 = 64.'
      },
      {
        id: 5,
        question: 'What is the perimeter of a rectangle with length 14 cm and width 6 cm?',
        options: ['20 cm', '40 cm', '84 cm', '48 cm'],
        correctAnswer: 1,
        explanation: 'Perimeter = 2 * (length + width) = 2 * (14 + 6) = 2 * 20 = 40 cm.'
      },
      {
        id: 6,
        question: 'A fair 6-sided die is rolled. What is the probability of rolling a prime number (2, 3, 5)?',
        options: ['1/6', '1/3', '1/2', '2/3'],
        correctAnswer: 2,
        explanation: 'The primes are {2, 3, 5}, which is 3 favorable outcomes out of 6 possible = 3/6 = 1/2.'
      },
      {
        id: 7,
        question: 'What is the least common multiple (LCM) of 6 and 8?',
        options: ['12', '16', '24', '48'],
        correctAnswer: 2,
        explanation: 'Multiples of 6 are 6, 12, 18, 24... Multiples of 8 are 8, 16, 24... The least common multiple is 24.'
      },
      {
        id: 8,
        question: 'Solve for y: 5y - 7 = 2y + 14',
        options: ['7', '6', '5', '8'],
        correctAnswer: 0,
        explanation: 'Rearrange: 5y - 2y = 14 + 7 => 3y = 21 => y = 7.'
      },
      {
        id: 9,
        question: 'What is the square root of 289?',
        options: ['13', '15', '17', '19'],
        correctAnswer: 2,
        explanation: '17 * 17 = 289.'
      },
      {
        id: 10,
        question: 'If the radius of a circle is 7 cm, what is its approximate circumference? (Use π ≈ 22/7)',
        options: ['22 cm', '44 cm', '88 cm', '154 cm'],
        correctAnswer: 1,
        explanation: 'Circumference = 2 * π * r = 2 * (22/7) * 7 = 44 cm.'
      }
    ]
  },
  {
    id: 'science',
    title: 'General Science & Natural Laws',
    subject: 'Science',
    description: 'Explore the core principles of Physics, Chemistry, and Biology that explain our natural universe.',
    iconName: 'FlaskConical',
    durationMinutes: 12,
    totalQuestions: 10,
    passingScorePercent: 40,
    difficulty: 'Intermediate',
    questions: [
      {
        id: 1,
        question: 'What is the chemical symbol for Gold?',
        options: ['Ag', 'Au', 'Fe', 'Gd'],
        correctAnswer: 1,
        explanation: 'Au comes from the Latin word "Aurum", meaning shining dawn, which represents Gold.'
      },
      {
        id: 2,
        question: 'Which organelle is often referred to as the "powerhouse of the cell"?',
        options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Endoplasmic Reticulum'],
        correctAnswer: 2,
        explanation: 'Mitochondria produce ATP (adenosine triphosphate), the primary biochemical energy currency of cells.'
      },
      {
        id: 3,
        question: 'What is the approximate speed of light in a vacuum?',
        options: ['300,000 km/s', '150,000 km/s', '3,000 km/s', '1,000,000 km/s'],
        correctAnswer: 0,
        explanation: 'The speed of light in vacuum is approximately 299,792 km/s, rounded to 300,000 km/s.'
      },
      {
        id: 4,
        question: 'What is the pH level of pure, neutral water at 25°C?',
        options: ['0', '7', '14', '5.5'],
        correctAnswer: 1,
        explanation: 'Pure water has an equal concentration of H+ and OH- ions, resulting in a neutral pH of exactly 7.'
      },
      {
        id: 5,
        question: 'Which gas is most abundant in the Earth\'s atmosphere?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'],
        correctAnswer: 2,
        explanation: 'Nitrogen gas accounts for approximately 78% of Earth\'s atmosphere by volume.'
      },
      {
        id: 6,
        question: 'Which subatomic particle carries a negative electrical charge?',
        options: ['Proton', 'Neutron', 'Electron', 'Positron'],
        correctAnswer: 2,
        explanation: 'Electrons carry a unit negative charge, while protons are positive and neutrons are neutral.'
      },
      {
        id: 7,
        question: 'What process do green plants use to convert sunlight into glucose?',
        options: ['Respiration', 'Photosynthesis', 'Fermentation', 'Transpiration'],
        correctAnswer: 1,
        explanation: 'Photosynthesis synthesizes organic compounds from water and carbon dioxide using radiant energy absorbed by chlorophyll.'
      },
      {
        id: 8,
        question: 'Which law states that "For every action, there is an equal and opposite reaction"?',
        options: ['Newton\'s First Law', 'Newton\'s Second Law', 'Newton\'s Third Law', 'Law of Conservation of Momentum'],
        correctAnswer: 2,
        explanation: 'Newton\'s Third Law of Motion states that forces always occur in matched interaction pairs.'
      },
      {
        id: 9,
        question: 'What type of blood cells are responsible for carrying oxygen throughout the human body?',
        options: ['Red Blood Cells (Erythrocytes)', 'White Blood Cells (Leukocytes)', 'Platelets (Thrombocytes)', 'Plasma cells'],
        correctAnswer: 0,
        explanation: 'Red blood cells contain hemoglobin, an iron-rich protein that binds and delivers oxygen to tissues.'
      },
      {
        id: 10,
        question: 'Which planet is known as the "Red Planet" due to iron oxide on its surface?',
        options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
        correctAnswer: 1,
        explanation: 'Mars exhibits a reddish appearance due to the abundance of oxidized iron minerals across its soil and crust.'
      }
    ]
  },
  {
    id: 'english',
    title: 'English Language & Verbal Ability',
    subject: 'English',
    description: 'Test your vocabulary, sentence structure, idioms, grammatical precision, and comprehension skills.',
    iconName: 'BookOpen',
    durationMinutes: 10,
    totalQuestions: 10,
    passingScorePercent: 40,
    difficulty: 'Beginner',
    questions: [
      {
        id: 1,
        question: 'Choose the word that is an antonym of "EXPEDITE":',
        options: ['Accelerate', 'Delay', 'Facilitate', 'Promote'],
        correctAnswer: 1,
        explanation: '"Expedite" means to speed up or accomplish promptly. Its direct antonym is to delay or hinder.'
      },
      {
        id: 2,
        question: 'Identify the sentence with the correct subject-verb agreement:',
        options: [
          'Neither the teacher nor the students was present.',
          'The committee has made its final decision.',
          'Each of the candidates are qualified.',
          'The news are spreading very fast.'
        ],
        correctAnswer: 1,
        explanation: '"The committee" acts as a collective singular noun here, correctly agreeing with "has made".'
      },
      {
        id: 3,
        question: 'What is the meaning of the idiom "Burn the midnight oil"?',
        options: ['To waste precious resources', 'To work or study late into the night', 'To cause accidental damage', 'To celebrate enthusiastically'],
        correctAnswer: 1,
        explanation: '"Burning the midnight oil" originates from using oil lamps to work or study late into the night.'
      },
      {
        id: 4,
        question: 'Which of the following is a synonym for "PRAGMATIC"?',
        options: ['Idealistic', 'Practical', 'Theoretical', 'Impulsive'],
        correctAnswer: 1,
        explanation: 'Pragmatic means dealing with matters sensibly and realistically based on practical considerations.'
      },
      {
        id: 5,
        question: 'Fill in the blank: "She has been working on this project _____ last Monday."',
        options: ['for', 'since', 'from', 'during'],
        correctAnswer: 1,
        explanation: 'Use "since" with a specific starting point in time ("since last Monday") with present perfect continuous.'
      },
      {
        id: 6,
        question: 'Select the correctly spelled word:',
        options: ['Accomodate', 'Acommodate', 'Accommodate', 'Acomodate'],
        correctAnswer: 2,
        explanation: '"Accommodate" is spelled with two "c"s and two "m"s.'
      },
      {
        id: 7,
        question: 'Identify the part of speech of the word "quickly" in: "She solved the puzzle quickly."',
        options: ['Adjective', 'Adverb', 'Noun', 'Conjunction'],
        correctAnswer: 1,
        explanation: '"Quickly" modifies the verb "solved", describing how the action was performed, making it an adverb.'
      },
      {
        id: 8,
        question: 'Choose the passive voice form of: "The chef cooked a gourmet meal."',
        options: [
          'A gourmet meal was cooked by the chef.',
          'A gourmet meal is cooked by the chef.',
          'A gourmet meal had cooked by the chef.',
          'The chef was cooking a gourmet meal.'
        ],
        correctAnswer: 0,
        explanation: 'Simple past "cooked" transforms to "was cooked" + agent "by the chef" in passive voice.'
      },
      {
        id: 9,
        question: 'What is a group of lions called?',
        options: ['Pack', 'Flock', 'Pride', 'Herd'],
        correctAnswer: 2,
        explanation: 'A social family group of lions is known as a pride.'
      },
      {
        id: 10,
        question: 'Select the phrase that best fits: "He is famous _____ his philanthropic contributions."',
        options: ['for', 'with', 'about', 'to'],
        correctAnswer: 0,
        explanation: 'The adjective "famous" takes the preposition "for" when specifying the reason for renown.'
      }
    ]
  },
  {
    id: 'computer-basics',
    title: 'Computer Basics & IT Literacy',
    subject: 'Computer Basics',
    description: 'Evaluate your knowledge of hardware, operating systems, networking, databases, and software fundamentals.',
    iconName: 'Cpu',
    durationMinutes: 10,
    totalQuestions: 10,
    passingScorePercent: 40,
    difficulty: 'Intermediate',
    questions: [
      {
        id: 1,
        question: 'What does CPU stand for?',
        options: [
          'Central Performance Unit',
          'Central Processing Unit',
          'Computer Peripheral Unit',
          'Core Programming Utility'
        ],
        correctAnswer: 1,
        explanation: 'CPU stands for Central Processing Unit, the primary hardware component that executes computer program instructions.'
      },
      {
        id: 2,
        question: 'Which type of memory is volatile (loses its data when power is turned off)?',
        options: ['ROM (Read Only Memory)', 'SSD (Solid State Drive)', 'RAM (Random Access Memory)', 'HDD (Hard Disk Drive)'],
        correctAnswer: 2,
        explanation: 'RAM is temporary working storage that requires continuous electrical power to maintain stored data.'
      },
      {
        id: 3,
        question: 'What protocol is used to secure browsing communications over the World Wide Web?',
        options: ['FTP', 'HTTP', 'HTTPS', 'SMTP'],
        correctAnswer: 2,
        explanation: 'HTTPS (Hypertext Transfer Protocol Secure) encrypts communications using TLS/SSL.'
      },
      {
        id: 4,
        question: 'How many bits are in a single byte?',
        options: ['4 bits', '8 bits', '16 bits', '32 bits'],
        correctAnswer: 1,
        explanation: 'One byte is standardly composed of 8 binary digits (bits).'
      },
      {
        id: 5,
        question: 'Which of the following is an open-source operating system kernel?',
        options: ['Windows 11', 'macOS', 'Linux', 'iOS'],
        correctAnswer: 2,
        explanation: 'Linux is an open-source Unix-like operating system kernel created by Linus Torvalds in 1991.'
      },
      {
        id: 6,
        question: 'What is the primary function of a DNS (Domain Name System) server?',
        options: [
          'To store website images',
          'To translate domain names into IP addresses',
          'To block unauthorized email traffic',
          'To format HTML documents'
        ],
        correctAnswer: 1,
        explanation: 'DNS acts as the phonebook of the internet, resolving human-readable names (like example.com) to machine IP addresses.'
      },
      {
        id: 7,
        question: 'Which of the following is NOT a relational database management system (RDBMS)?',
        options: ['PostgreSQL', 'MySQL', 'MongoDB', 'Oracle Database'],
        correctAnswer: 2,
        explanation: 'MongoDB is a document-oriented NoSQL database, whereas MySQL, PostgreSQL, and Oracle are relational (SQL) databases.'
      },
      {
        id: 8,
        question: 'What keyboard shortcut is universally used to undo the last action on Windows/Linux?',
        options: ['Ctrl + C', 'Ctrl + V', 'Ctrl + Z', 'Ctrl + Y'],
        correctAnswer: 2,
        explanation: 'Ctrl + Z (or Cmd + Z on macOS) is the standard shortcut to undo the previous command or edit.'
      },
      {
        id: 9,
        question: 'Which language is used to structure content on the World Wide Web?',
        options: ['CSS', 'HTML', 'JavaScript', 'SQL'],
        correctAnswer: 1,
        explanation: 'HTML (HyperText Markup Language) defines the fundamental layout and semantic structure of web pages.'
      },
      {
        id: 10,
        question: 'What does URL stand for?',
        options: [
          'Uniform Resource Locator',
          'Universal Reference Link',
          'Unified Retrieval Language',
          'User Remote Login'
        ],
        correctAnswer: 0,
        explanation: 'URL stands for Uniform Resource Locator, specifying the address of a unique web resource.'
      }
    ]
  },
  {
    id: 'reasoning',
    title: 'Logical Reasoning & Analytical Aptitude',
    subject: 'Reasoning',
    description: 'Challenge your critical thinking, number patterns, syllogisms, and deduction capabilities.',
    iconName: 'BrainCircuit',
    durationMinutes: 12,
    totalQuestions: 10,
    passingScorePercent: 40,
    difficulty: 'Intermediate',
    questions: [
      {
        id: 1,
        question: 'Look at this sequence: 2, 6, 12, 20, 30, ... What is the next number in the pattern?',
        options: ['40', '42', '44', '48'],
        correctAnswer: 1,
        explanation: 'The differences between consecutive terms increase by 2: +4, +6, +8, +10, so next is +12 => 30 + 12 = 42 (also n*(n+1): 1*2, 2*3, 3*4, 4*5, 5*6, 6*7=42).'
      },
      {
        id: 2,
        question: 'If "CAT" is coded as "3120" (C=3, A=1, T=20), how is "DOG" coded in the same system?',
        options: ['4157', '4147', '3157', '4158'],
        correctAnswer: 0,
        explanation: 'D is 4th letter, O is 15th letter, G is 7th letter => 4157.'
      },
      {
        id: 3,
        question: 'Pointing to a photograph, John says: "She is the only daughter of my mother\'s only son." Who is the person in the photograph to John?',
        options: ['His sister', 'His daughter', 'His niece', 'His mother'],
        correctAnswer: 1,
        explanation: 'John\'s mother\'s only son is John himself. The only daughter of John is John\'s daughter.'
      },
      {
        id: 4,
        question: 'Which word does NOT belong with the others in the set?',
        options: ['Apple', 'Banana', 'Carrot', 'Orange'],
        correctAnswer: 2,
        explanation: 'Carrot is a root vegetable, whereas Apple, Banana, and Orange are botanical fruits.'
      },
      {
        id: 5,
        question: 'Statements: All dogs are mammals. All mammals are animals. Conclusion: Are all dogs animals?',
        options: [
          'Yes, definitively true',
          'No, definitively false',
          'Cannot be determined from the premises',
          'Only some dogs are animals'
        ],
        correctAnswer: 0,
        explanation: 'By standard transitive categorical syllogism: If A ⊆ B and B ⊆ C, then A ⊆ C. All dogs are animals.'
      },
      {
        id: 6,
        question: 'A clock shows 3:15. What is the angle between the hour hand and the minute hand?',
        options: ['0 degrees', '7.5 degrees', '15 degrees', '22.5 degrees'],
        correctAnswer: 1,
        explanation: 'At 3:15, the minute hand is at 90°. The hour hand moves 0.5° per minute: 3 * 30° + 15 * 0.5° = 90° + 7.5° = 97.5°. The difference is |97.5° - 90°| = 7.5°.'
      },
      {
        id: 7,
        question: 'If South-East becomes North, and North-East becomes West, what will West become?',
        options: ['North-East', 'South-East', 'South-West', 'North-West'],
        correctAnswer: 1,
        explanation: 'The directions are rotated 135 degrees counter-clockwise (or 225° clockwise). West rotated 135° counter-clockwise becomes South-East.'
      },
      {
        id: 8,
        question: 'Complete the analogy: Doctor : Hospital :: Teacher : ?',
        options: ['School', 'Student', 'Chalk', 'Library'],
        correctAnswer: 0,
        explanation: 'A doctor works within a hospital; analogously, a teacher conducts their primary professional work in a school.'
      },
      {
        id: 9,
        question: 'In a row of 30 students, Alex is 10th from the left. What is Alex\'s position from the right end?',
        options: ['20th', '21st', '22nd', '19th'],
        correctAnswer: 1,
        explanation: 'Position from right = Total - Position from left + 1 = 30 - 10 + 1 = 21st.'
      },
      {
        id: 10,
        question: 'If all Zips are Zaps, and some Zaps are Zops, which statement MUST be true?',
        options: [
          'All Zips are Zops',
          'Some Zips are Zops',
          'Some Zaps might not be Zips',
          'No Zip is a Zop'
        ],
        correctAnswer: 2,
        explanation: 'Since all Zips are Zaps, the set of Zips is contained within Zaps. Unless Zips and Zaps are identical sets, there are Zaps that are not Zips.'
      }
    ]
  }
];
