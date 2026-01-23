// Question bank for different assessments
export interface Question {
  question: string;
  options: string[];
  correct: string;
}

export interface QuestionBank {
  [key: string]: Question[];
}

export const questionBank: QuestionBank = {
  frontend: [
    {
      question: "Which CSS property is used to create a flexbox container?",
      options: [
        "display: flex",
        "flex-direction: row", 
        "justify-content: center",
        "align-items: center"
      ],
      correct: "A"
    },
    {
      question: "What is the correct way to create a React functional component?",
      options: [
        "function MyComponent() { return <div>Hello</div>; }",
        "const MyComponent = () => { return <div>Hello</div>; }",
        "Both A and B are correct",
        "class MyComponent extends Component { render() { return <div>Hello</div>; } }"
      ],
      correct: "C"
    },
    {
      question: "Which HTML5 semantic element should be used for the main content area?",
      options: [
        "<section>",
        "<article>",
        "<main>",
        "<div>"
      ],
      correct: "C"
    },
    {
      question: "What does the 'useState' hook return in React?",
      options: [
        "A single value",
        "An array with two elements: state value and setter function",
        "An object with state properties",
        "A function to update state"
      ],
      correct: "B"
    },
    {
      question: "Which CSS unit is relative to the viewport width?",
      options: [
        "px",
        "em",
        "rem", 
        "vw"
      ],
      correct: "D"
    }
  ],
  
  backend: [
    {
      question: "What is the purpose of middleware in Express.js?",
      options: [
        "To handle database connections",
        "To execute code between request and response",
        "To render HTML templates",
        "To manage user sessions only"
      ],
      correct: "B"
    },
    {
      question: "Which HTTP status code indicates a successful POST request that created a resource?",
      options: [
        "200 OK",
        "201 Created",
        "204 No Content",
        "202 Accepted"
      ],
      correct: "B"
    },
    {
      question: "What is the difference between SQL and NoSQL databases?",
      options: [
        "SQL databases are faster",
        "NoSQL databases use structured query language",
        "SQL databases use structured schemas, NoSQL databases are schema-flexible",
        "There is no difference"
      ],
      correct: "C"
    },
    {
      question: "Which Python framework is commonly used for building REST APIs?",
      options: [
        "Django",
        "Flask",
        "FastAPI",
        "All of the above"
      ],
      correct: "D"
    },
    {
      question: "What is the purpose of JWT (JSON Web Tokens)?",
      options: [
        "To store user passwords",
        "To securely transmit information between parties",
        "To encrypt database connections",
        "To compress JSON data"
      ],
      correct: "B"
    }
  ],

  devops: [
    {
      question: "What is the main purpose of Docker containers?",
      options: [
        "To replace virtual machines entirely",
        "To package applications with their dependencies for consistent deployment",
        "To manage database connections",
        "To monitor application performance"
      ],
      correct: "B"
    },
    {
      question: "In Kubernetes, what is a Pod?",
      options: [
        "A cluster of nodes",
        "The smallest deployable unit that can contain one or more containers",
        "A type of storage volume",
        "A network configuration"
      ],
      correct: "B"
    },
    {
      question: "What does CI/CD stand for?",
      options: [
        "Continuous Integration/Continuous Deployment",
        "Container Integration/Container Deployment", 
        "Code Integration/Code Deployment",
        "Cloud Integration/Cloud Deployment"
      ],
      correct: "A"
    },
    {
      question: "Which AWS service is used for serverless computing?",
      options: [
        "EC2",
        "S3",
        "Lambda",
        "RDS"
      ],
      correct: "C"
    },
    {
      question: "What is Infrastructure as Code (IaC)?",
      options: [
        "Writing application code for infrastructure",
        "Managing infrastructure through machine-readable definition files",
        "Coding directly on servers",
        "Using only cloud services"
      ],
      correct: "B"
    }
  ],

  "data-science": [
    {
      question: "Which Python library is primarily used for data manipulation and analysis?",
      options: [
        "NumPy",
        "Pandas", 
        "Matplotlib",
        "Scikit-learn"
      ],
      correct: "B"
    },
    {
      question: "What is the difference between supervised and unsupervised learning?",
      options: [
        "Supervised learning uses labeled data, unsupervised learning uses unlabeled data",
        "Supervised learning is faster",
        "Unsupervised learning is more accurate",
        "There is no difference"
      ],
      correct: "A"
    },
    {
      question: "Which SQL command is used to retrieve data from a database?",
      options: [
        "INSERT",
        "UPDATE",
        "SELECT",
        "DELETE"
      ],
      correct: "C"
    },
    {
      question: "What is overfitting in machine learning?",
      options: [
        "When a model performs well on training data but poorly on new data",
        "When a model is too simple",
        "When there's too much training data",
        "When the model trains too quickly"
      ],
      correct: "A"
    },
    {
      question: "Which measure of central tendency is most affected by outliers?",
      options: [
        "Mean",
        "Median",
        "Mode", 
        "All are equally affected"
      ],
      correct: "A"
    }
  ],

  fullstack: [
    {
      question: "What is the main advantage of using a REST API architecture?",
      options: [
        "It's faster than other architectures",
        "It provides stateless communication and is platform-independent",
        "It only works with JavaScript",
        "It requires less server resources"
      ],
      correct: "B"
    },
    {
      question: "Which database type would be best for storing user relationships in a social media app?",
      options: [
        "Document database (MongoDB)",
        "Graph database (Neo4j)",
        "Key-value store (Redis)",
        "Relational database (PostgreSQL)"
      ],
      correct: "B"
    },
    {
      question: "What is the purpose of a load balancer in web architecture?",
      options: [
        "To store user sessions",
        "To distribute incoming requests across multiple servers",
        "To compress web assets",
        "To handle database connections"
      ],
      correct: "B"
    },
    {
      question: "Which caching strategy involves storing frequently accessed data in memory?",
      options: [
        "Database caching",
        "Browser caching",
        "In-memory caching",
        "CDN caching"
      ],
      correct: "C"
    },
    {
      question: "What is the main benefit of using microservices architecture?",
      options: [
        "Easier to develop initially",
        "Better scalability and independent deployment of services",
        "Requires fewer developers",
        "Uses less server resources"
      ],
      correct: "B"
    }
  ],

  // --- NEW ASSESSMENTS ADDED BELOW ---

  cybersecurity: [
    {
      question: "What is the main goal of a 'Man-in-the-Middle' (MitM) attack?",
      options: ["To crash a server", "To intercept or alter communication between two parties", "To guess user passwords", "To install physical hardware"],
      correct: "B"
    },
    {
      question: "Which protocol is used to securely log into a remote server?",
      options: ["HTTP", "FTP", "SSH", "Telnet"],
      correct: "C"
    },
    {
      question: "What does 'salting' a password mean?",
      options: ["Making the password shorter", "Adding random data to a password before hashing", "Encrypted the password twice", "Sharing the password with admins"],
      correct: "B"
    },
    {
      question: "What is a 'zero-day' vulnerability?",
      options: ["A bug that has been fixed for zero days", "A vulnerability unknown to the software vendor", "A virus that lasts for one day", "A network with no traffic"],
      correct: "B"
    },
    {
      question: "Which organization maintains the 'Top 10' list of web security risks?",
      options: ["IEEE", "W3C", "OWASP", "NASA"],
      correct: "C"
    }
  ],

  mobile: [
    {
      question: "Which programming language is the primary choice for modern Android development?",
      options: ["Swift", "Kotlin", "Objective-C", "C#"],
      correct: "B"
    },
    {
      question: "In React Native, what component is used to display text?",
      options: ["<p>", "<div>", "<span>", "<Text>"],
      correct: "D"
    },
    {
      question: "What is the layout engine used by Flutter?",
      options: ["Flexbox", "Yoga", "Skia", "WebKit"],
      correct: "C"
    },
    {
      question: "What is a 'Manifest' file in Android used for?",
      options: ["Defining app permissions and components", "Storing user passwords", "Writing UI styles", "Compiling Java code"],
      correct: "A"
    },
    {
      question: "Which tool is used to manage iOS dependencies?",
      options: ["Gradle", "NPM", "CocoaPods", "Pip"],
      correct: "C"
    }
  ],

  typescript: [
    {
      question: "What is the primary benefit of using TypeScript over JavaScript?",
      options: ["It runs faster in the browser", "It provides static type checking", "It replaces HTML", "It is easier to learn"],
      correct: "B"
    },
    {
      question: "How do you define an optional property in an interface?",
      options: ["property!", "property?", "optional property", "property: optional"],
      correct: "B"
    },
    {
      question: "Which keyword is used to create a new type from existing types?",
      options: ["interface", "type", "alias", "Both A and B"],
      correct: "D"
    },
    {
      question: "What does the 'unknown' type represent?",
      options: ["A type that can be anything, similar to 'any' but safer", "A type that is undefined", "A type for private variables", "A type that cannot be assigned"],
      correct: "A"
    },
    {
      question: "How do you cast a variable to a specific type in TS?",
      options: ["as Type", "<Type>", "Both A and B", "cast(Type)"],
      correct: "C"
    }
  ],

  cloud: [
    {
      question: "What does 'SaaS' stand for?",
      options: ["Software as a Service", "System as a Service", "Storage as a Service", "Security as a Service"],
      correct: "A"
    },
    {
      question: "Which AWS service is used for scalable object storage?",
      options: ["EC2", "RDS", "S3", "IAM"],
      correct: "C"
    },
    {
      question: "What is a 'Region' in cloud computing?",
      options: ["A single server rack", "A physical location containing multiple availability zones", "A software version", "A user group"],
      correct: "B"
    },
    {
      question: "What is the main advantage of 'Serverless' computing?",
      options: ["No servers are actually used", "Users don't have to manage underlying infrastructure", "It is always free", "It works without internet"],
      correct: "B"
    },
    {
      question: "What is an 'Identity and Access Management' (IAM) system used for?",
      options: ["Storing database files", "Controlling who can access cloud resources", "Speeding up web requests", "Writing cloud functions"],
      correct: "B"
    }
  ],

  testing: [
    {
      question: "What is a 'Unit Test'?",
      options: ["Testing the entire application", "Testing the database connection", "Testing individual functions or components in isolation", "Testing the UI design"],
      correct: "C"
    },
    {
      question: "What is 'Regression Testing'?",
      options: ["Testing new features", "Re-running tests to ensure changes haven't broken existing functionality", "Testing the app's performance", "Testing the app's security"],
      correct: "B"
    },
    {
      question: "Which library is commonly used for testing React components?",
      options: ["Redux", "Jest", "Axios", "Express"],
      correct: "B"
    },
    {
      question: "What does 'TDD' stand for?",
      options: ["Total Data Delivery", "Test Driven Development", "Technical Design Document", "Time Delayed Deployment"],
      correct: "B"
    },
    {
      question: "What is an 'End-to-End' (E2E) test?",
      options: ["Testing a single function", "Testing the user flow from start to finish in a real browser", "Testing the backend only", "Testing code formatting"],
      correct: "B"
    }
  ],

  uiux: [
    {
      question: "What is a 'Wireframe'?",
      options: ["A high-fidelity prototype with animations", "A low-fidelity visual guide of a page's layout", "The final CSS code", "A tool for database modeling"],
      correct: "B"
    },
    {
      question: "What does 'Accessibility' (a11y) refer to in design?",
      options: ["Making the site load fast", "Ensuring the site is usable by people with disabilities", "Translating the site into many languages", "Making the site free to use"],
      correct: "B"
    },
    {
      question: "Which color scheme uses colors that are next to each other on the color wheel?",
      options: ["Monochromatic", "Complementary", "Analogous", "Triadic"],
      correct: "C"
    },
    {
      question: "What is a 'User Persona'?",
      options: ["A real person interviewed by the team", "A fictional character created to represent a user type", "The lead designer of the project", "A customer support representative"],
      correct: "B"
    },
    {
      question: "What is the 'Golden Ratio' often used for in design?",
      options: ["Setting the price of the app", "Creating aesthetically pleasing proportions and layouts", "Calculating load times", "Determining the number of users"],
      correct: "B"
    }
  ],

  ai: [
    {
      question: "What is a 'Neural Network'?",
      options: ["A type of computer hardware", "A series of algorithms that mimic the human brain to recognize patterns", "A social media platform", "A database system"],
      correct: "B"
    },
    {
      question: "What does 'NLP' stand for in AI?",
      options: ["Normal Logic Programming", "Natural Language Processing", "Node Link Protocol", "Neural Level Path"],
      correct: "B"
    },
    {
      question: "Which of the following is a supervised learning task?",
      options: ["Clustering users by behavior", "Classifying emails as spam or not spam", "Dimensionality reduction", "Finding hidden patterns in data"],
      correct: "B"
    },
    {
      question: "What is a 'Large Language Model' (LLM)?",
      options: ["A dictionary", "An AI model trained on massive amounts of text to generate human-like language", "A translation app", "A database for storing text"],
      correct: "B"
    },
    {
      question: "What is 'Reinforcement Learning'?",
      options: ["Learning by watching videos", "Learning through a system of rewards and punishments", "Learning by copying code", "Learning by memorizing formulas"],
      correct: "B"
    }
  ],

  git: [
    {
      question: "Which command is used to save changes to the local repository?",
      options: ["git push", "git commit", "git pull", "git add"],
      correct: "B"
    },
    {
      question: "What is a 'Merge Conflict'?",
      options: ["When Git crashes", "When two people change the same part of a file and Git cannot decide which to keep", "When the server is down", "When you delete a branch"],
      correct: "B"
    },
    {
      question: "What does 'git checkout -b <branch-name>' do?",
      options: ["Deletes a branch", "Creates a new branch and switches to it", "Updates the main branch", "Lists all branches"],
      correct: "B"
    },
    {
      question: "Which command uploads local commits to a remote server?",
      options: ["git pull", "git fetch", "git push", "git upload"],
      correct: "C"
    },
    {
      question: "What is the purpose of a '.gitignore' file?",
      options: ["To store sensitive passwords", "To list files and folders that Git should ignore", "To speed up the repository", "To keep track of project versions"],
      correct: "B"
    }
  ],

  blockchain: [
    {
      question: "What is a 'Distributed Ledger'?",
      options: ["A database controlled by one person", "A database shared and synchronized across multiple sites or institutions", "A physical book for accounting", "A cloud storage service"],
      correct: "B"
    },
    {
      question: "What is a 'Smart Contract'?",
      options: ["A digital signature", "A self-executing contract with the terms directly written into code", "A legal document sent via email", "A password-protected PDF"],
      correct: "B"
    },
    {
      question: "Which consensus mechanism is used by Bitcoin (as of its creation)?",
      options: ["Proof of Stake", "Proof of Authority", "Proof of Work", "Proof of Elapsed Time"],
      correct: "C"
    },
    {
      question: "What is 'DeFi'?",
      options: ["Deferred Finance", "Decentralized Finance", "Defined File", "Detailed Findings"],
      correct: "B"
    },
    {
      question: "What is an 'NFT'?",
      options: ["New File Transfer", "Non-Fungible Token", "Network Functional Test", "Node Frequency Table"],
      correct: "B"
    }
  ],

  linux: [
    {
      question: "Which command is used to list files in a directory?",
      options: ["cd", "ls", "pwd", "mkdir"],
      correct: "B"
    },
    {
      question: "What does the 'sudo' command stand for?",
      options: ["Superuser do", "System update do", "Start user data", "Switch user data"],
      correct: "A"
    },
    {
      question: "How do you check the current directory path?",
      options: ["dir", "path", "pwd", "whereami"],
      correct: "C"
    },
    {
      question: "Which command is used to change file permissions?",
      options: ["chown", "chmod", "mv", "rm"],
      correct: "B"
    },
    {
      question: "What is the 'root' user in Linux?",
      options: ["The first user created", "The user with all administrative privileges", "A user with no permissions", "The guest account"],
      correct: "B"
    }
  ]
};