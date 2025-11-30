export const coursesData = [
    {
        id: 1,
        title: 'Probability - The Science of Uncertainty and Data',
        badge: 'MIT',
        badgeColor: 'mit',
        status: 'expired',
        isPaid: true,
        image: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=500&h=300&fit=crop',
        bannerImage: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=1200&h=400&fit=crop',
        courseCode: '6.431x',
        expiryDate: 'June 19, 2024',
        progress: 75,
        enrolled: '45,230',
        duration: '16 weeks',
        rating: 4.8,
        reviews: 12420,
        modules: { completed: 15, total: 20 },
        tags: ['Statistics', 'Data Science', 'Mathematics'],
        progressGradient: 'progressGrad1',
        instructors: [
            {
                name: 'Prof. John Tsitsiklis',
                title: 'Professor of Electrical Engineering',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
            },
            {
                name: 'Dr. Patrick Jaillet',
                title: 'Professor of Operations Research',
                image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop'
            }
        ],
        about: 'Master the fundamentals of probability and statistics. This comprehensive course covers probability models, random variables, Bayesian inference, and statistical methods. Learn how to analyze data, make predictions, and understand uncertainty in real-world scenarios. Perfect for data scientists, engineers, and anyone looking to strengthen their analytical skills.',
        learningOutcomes: [
            'Apply probability theory to real-world problems and data analysis',
            'Master discrete and continuous random variables',
            'Understand Bayesian inference and statistical estimation',
            'Analyze uncertainty using probabilistic models',
            'Implement Monte Carlo simulations',
            'Make data-driven decisions using statistical methods'
        ],
        syllabus: [
            {
                id: 1,
                title: 'Probability Models and Axioms',
                lectures: 8,
                duration: '2 weeks',
                completed: true,
                topics: ['Sample spaces', 'Probability axioms', 'Conditional probability', 'Independence']
            },
            {
                id: 2,
                title: 'Discrete Random Variables',
                lectures: 10,
                duration: '2 weeks',
                completed: true,
                topics: ['PMF and expectations', 'Variance and standard deviation', 'Bernoulli and Binomial', 'Geometric and Poisson']
            },
            {
                id: 3,
                title: 'Continuous Random Variables',
                lectures: 12,
                duration: '3 weeks',
                completed: true,
                topics: ['PDF and CDF', 'Normal distribution', 'Exponential distribution', 'Joint distributions']
            },
            {
                id: 4,
                title: 'Bayesian Inference',
                lectures: 9,
                duration: '2 weeks',
                completed: false,
                topics: ['Bayes theorem', 'Prior and posterior', 'Maximum likelihood', 'MAP estimation']
            },
            {
                id: 5,
                title: 'Limit Theorems and Statistics',
                lectures: 11,
                duration: '3 weeks',
                completed: false,
                topics: ['Law of large numbers', 'Central limit theorem', 'Confidence intervals', 'Hypothesis testing']
            }
        ],
        resources: [
            { name: 'Course Textbook (PDF)', size: '12.5 MB', type: 'pdf' },
            { name: 'Problem Sets & Solutions', size: '8.2 MB', type: 'pdf' },
            { name: 'Lecture Slides (All Weeks)', size: '45.3 MB', type: 'zip' },
            { name: 'Python Code Examples', size: '2.1 MB', type: 'zip' }
        ]
    },
    {
        id: 2,
        title: 'CS50\'s Introduction to Programming with Python',
        badge: 'Harvard',
        badgeColor: 'harvard',
        status: 'progress',
        image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&h=300&fit=crop',
        bannerImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=400&fit=crop',
        enrolled: '89,450 enrolled',
        duration: '10 weeks',
        progress: 42,
        rating: 4.9,
        reviews: 23845,
        modules: { completed: 8, total: 19 },
        tags: ['Programming', 'Python', 'Trending'],
        progressGradient: 'progressGrad2',
        isActive: true,
        instructors: [
            {
                name: 'Prof. David J. Malan',
                title: 'Gordon McKay Professor of Computer Science',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
            }
        ],
        about: 'Learn to code in Python, one of the most popular programming languages today. This course teaches you how to read and write code as well as how to test and debug it. Designed for students with or without prior programming experience, CS50P introduces you to programming in Python through hands-on problems inspired by real-world applications.',
        learningOutcomes: [
            'Write and execute Python programs confidently',
            'Understand functions, variables, and conditionals',
            'Master file I/O and exception handling',
            'Work with libraries and APIs',
            'Implement object-oriented programming concepts',
            'Debug and test code systematically'
        ],
        syllabus: [
            {
                id: 1,
                title: 'Functions, Variables & Conditionals',
                lectures: 6,
                duration: '1 week',
                completed: true,
                topics: ['Print and input', 'Variables and types', 'If statements', 'Boolean expressions']
            },
            {
                id: 2,
                title: 'Loops and Exceptions',
                lectures: 7,
                duration: '1 week',
                completed: true,
                topics: ['While loops', 'For loops', 'Try/except', 'Raising exceptions']
            },
            {
                id: 3,
                title: 'Libraries and Unit Tests',
                lectures: 8,
                duration: '2 weeks',
                completed: true,
                topics: ['Importing modules', 'Random numbers', 'Statistics', 'Unit testing with pytest']
            },
            {
                id: 4,
                title: 'File I/O and Regular Expressions',
                lectures: 9,
                duration: '2 weeks',
                completed: true,
                topics: ['Reading files', 'Writing files', 'CSV files', 'Regular expressions']
            },
            {
                id: 5,
                title: 'Object-Oriented Programming',
                lectures: 10,
                duration: '2 weeks',
                completed: false,
                topics: ['Classes and objects', 'Methods', 'Properties', 'Inheritance']
            },
            {
                id: 6,
                title: 'Final Project',
                lectures: 5,
                duration: '2 weeks',
                completed: false,
                topics: ['Project planning', 'Implementation', 'Testing', 'Presentation']
            }
        ],
        resources: [
            { name: 'Python Programming Guide', size: '5.8 MB', type: 'pdf' },
            { name: 'All Problem Sets', size: '3.2 MB', type: 'zip' },
            { name: 'Lecture Notes (Weeks 1-10)', size: '15.7 MB', type: 'pdf' },
            { name: 'Sample Projects', size: '6.5 MB', type: 'zip' }
        ]
    },
    {
        id: 3,
        title: 'Data Visualization and Building Dashboards',
        badge: 'IBM',
        badgeColor: 'ibm',
        status: 'progress',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
        bannerImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=400&fit=crop',
        duration: '6 weeks',
        enrolled: '34,120 enrolled',
        level: 'Intermediate',
        progress: 18,
        rating: 4.7,
        reviews: 8932,
        modules: { completed: 3, total: 17 },
        tags: ['Data Viz', 'Excel'],
        progressGradient: 'progressGrad3',
        instructors: [
            {
                name: 'Dr. Saishruthi Swaminathan',
                title: 'Senior Data Scientist at IBM',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
            }
        ],
        about: 'Transform raw data into compelling visual stories. Learn to create interactive dashboards using industry-standard tools like Tableau, Power BI, and Python. Master the art of data storytelling and help stakeholders make informed decisions through effective visualizations.',
        learningOutcomes: [
            'Create professional dashboards with Tableau and Power BI',
            'Design effective data visualizations using best practices',
            'Build interactive charts and graphs',
            'Apply color theory and design principles',
            'Present data insights to stakeholders',
            'Automate reporting workflows'
        ],
        syllabus: [
            {
                id: 1,
                title: 'Introduction to Data Visualization',
                lectures: 5,
                duration: '1 week',
                completed: true,
                topics: ['Visualization principles', 'Chart types', 'Color theory', 'Design best practices']
            },
            {
                id: 2,
                title: 'Excel for Data Visualization',
                lectures: 6,
                duration: '1 week',
                completed: true,
                topics: ['Advanced charts', 'Pivot tables', 'Conditional formatting', 'Interactive elements']
            },
            {
                id: 3,
                title: 'Tableau Fundamentals',
                lectures: 8,
                duration: '1 week',
                completed: true,
                topics: ['Tableau interface', 'Connecting data', 'Basic visualizations', 'Filters and parameters']
            },
            {
                id: 4,
                title: 'Building Interactive Dashboards',
                lectures: 9,
                duration: '2 weeks',
                completed: false,
                topics: ['Dashboard design', 'Actions and filters', 'KPI metrics', 'Mobile optimization']
            },
            {
                id: 5,
                title: 'Power BI Essentials',
                lectures: 7,
                duration: '1 week',
                completed: false,
                topics: ['Power BI Desktop', 'DAX formulas', 'Report building', 'Publishing and sharing']
            }
        ],
        resources: [
            { name: 'Dashboard Design Guide', size: '9.4 MB', type: 'pdf' },
            { name: 'Sample Datasets', size: '18.3 MB', type: 'zip' },
            { name: 'Tableau Workbooks', size: '12.1 MB', type: 'zip' },
            { name: 'Color Palette Reference', size: '2.8 MB', type: 'pdf' }
        ]
    },
    {
        id: 4,
        title: 'Machine Learning Specialization',
        badge: 'Stanford',
        badgeColor: 'stanford',
        status: 'completed',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop',
        bannerImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=400&fit=crop',
        certificateEarned: true,
        enrolled: '156,780 enrolled',
        duration: '3 months',
        progress: 100,
        rating: 4.9,
        reviews: 45623,
        modules: { completed: 20, total: 20 },
        tags: ['ML', 'AI', 'Certified'],
        progressGradient: 'progressGrad4',
        instructors: [
            {
                name: 'Prof. Andrew Ng',
                title: 'Founder of DeepLearning.AI, Co-founder of Coursera',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
            }
        ],
        about: 'Break into the field of Machine Learning with this comprehensive specialization taught by AI pioneer Andrew Ng. Master fundamental ML concepts, from supervised learning (regression, classification) to unsupervised learning (clustering, dimensionality reduction). Build and train neural networks with TensorFlow and apply best practices to real-world AI applications.',
        learningOutcomes: [
            'Build machine learning models in Python using NumPy and scikit-learn',
            'Implement supervised learning algorithms including linear regression and logistic regression',
            'Build and train neural networks with TensorFlow',
            'Apply best practices for machine learning development',
            'Build recommender systems and deep reinforcement learning models',
            'Deploy ML models to production environments'
        ],
        syllabus: [
            {
                id: 1,
                title: 'Supervised Machine Learning',
                lectures: 12,
                duration: '3 weeks',
                completed: true,
                topics: ['Linear regression', 'Logistic regression', 'Gradient descent', 'Regularization']
            },
            {
                id: 2,
                title: 'Advanced Learning Algorithms',
                lectures: 15,
                duration: '4 weeks',
                completed: true,
                topics: ['Neural networks', 'TensorFlow', 'Model evaluation', 'Decision trees']
            },
            {
                id: 3,
                title: 'Unsupervised Learning',
                lectures: 10,
                duration: '3 weeks',
                completed: true,
                topics: ['Clustering', 'Anomaly detection', 'Recommender systems', 'Reinforcement learning']
            },
            {
                id: 4,
                title: 'Capstone Project',
                lectures: 8,
                duration: '2 weeks',
                completed: true,
                topics: ['Project design', 'Model implementation', 'Optimization', 'Deployment']
            }
        ],
        resources: [
            { name: 'Course Certificate', size: '1.2 MB', type: 'pdf' },
            { name: 'All Jupyter Notebooks', size: '24.5 MB', type: 'zip' },
            { name: 'ML Cheat Sheets', size: '6.3 MB', type: 'pdf' },
            { name: 'Final Project Code', size: '8.9 MB', type: 'zip' }
        ]
    },
    {
        id: 5,
        title: 'Google Data Analytics Professional Certificate',
        badge: 'Google',
        badgeColor: 'google',
        status: 'progress',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
        bannerImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=400&fit=crop',
        courses: '8 courses',
        enrolled: '234,560 enrolled',
        duration: '6 months',
        progress: 65,
        rating: 4.8,
        reviews: 67834,
        modules: { completed: 13, total: 20 },
        tags: ['Analytics', 'Data'],
        progressGradient: 'progressGrad5',
        instructors: [
            {
                name: 'Google Career Certificates',
                title: 'Industry Professionals from Google',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop'
            }
        ],
        about: 'Prepare for a new career in the high-growth field of data analytics. Learn job-ready skills like data cleaning, analysis, and visualization using tools including spreadsheets, SQL, Tableau, and R. No degree or prior experience required. Upon completion, gain access to career resources and connect with over 150 employers in the Google Career Certificate Employer Consortium.',
        learningOutcomes: [
            'Gain an understanding of the data analysis process',
            'Clean and organize data for analysis using spreadsheets and SQL',
            'Visualize and present data findings using Tableau',
            'Perform analysis using R programming',
            'Complete a case study for your portfolio',
            'Prepare for entry-level data analyst roles'
        ],
        syllabus: [
            {
                id: 1,
                title: 'Foundations: Data, Data, Everywhere',
                lectures: 14,
                duration: '3 weeks',
                completed: true,
                topics: ['Data ecosystem', 'Analytical thinking', 'Spreadsheet basics', 'Data lifecycle']
            },
            {
                id: 2,
                title: 'Ask Questions to Make Data-Driven Decisions',
                lectures: 12,
                duration: '4 weeks',
                completed: true,
                topics: ['Effective questions', 'Data-driven decisions', 'Spreadsheet functions', 'Data visualization basics']
            },
            {
                id: 3,
                title: 'Prepare Data for Exploration',
                lectures: 16,
                duration: '5 weeks',
                completed: true,
                topics: ['Data types', 'Data structures', 'Data bias', 'Database fundamentals']
            },
            {
                id: 4,
                title: 'Process Data from Dirty to Clean',
                lectures: 15,
                duration: '5 weeks',
                completed: true,
                topics: ['Data integrity', 'SQL cleaning', 'Verification', 'Documentation']
            },
            {
                id: 5,
                title: 'Analyze Data to Answer Questions',
                lectures: 13,
                duration: '4 weeks',
                completed: false,
                topics: ['Data aggregation', 'Pivot tables', 'SQL calculations', 'Temporary tables']
            },
            {
                id: 6,
                title: 'Share Data Through Visualization',
                lectures: 11,
                duration: '4 weeks',
                completed: false,
                topics: ['Tableau', 'Data storytelling', 'Dashboard creation', 'Presentation skills']
            }
        ],
        resources: [
            { name: 'Data Analytics Glossary', size: '4.2 MB', type: 'pdf' },
            { name: 'SQL Practice Files', size: '15.6 MB', type: 'zip' },
            { name: 'Tableau Workbooks', size: '22.8 MB', type: 'zip' },
            { name: 'Case Study Templates', size: '7.3 MB', type: 'zip' }
        ]
    },
    {
        id: 6,
        title: 'Financial Markets',
        badge: 'Yale',
        badgeColor: 'yale',
        status: 'progress',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=300&fit=crop',
        bannerImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=400&fit=crop',
        instructor: 'Prof. Robert Shiller',
        enrolled: '67,890 enrolled',
        duration: '7 weeks',
        progress: 30,
        rating: 4.8,
        reviews: 19234,
        modules: { completed: 6, total: 20 },
        tags: ['Finance', 'Business'],
        progressGradient: 'progressGrad6',
        instructors: [
            {
                name: 'Prof. Robert J. Shiller',
                title: 'Nobel Prize Winner, Sterling Professor of Economics',
                image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop'
            }
        ],
        about: 'An overview of the ideas, methods, and institutions that permit human society to manage risks and foster enterprise. Learn about behavioral finance, forecasting, pricing, debt, inflation, stocks, bonds, derivatives, insurance, banking, and the regulation of markets. Taught by Nobel Prize winner Professor Robert Shiller, this course provides a comprehensive understanding of financial markets and their role in society.',
        learningOutcomes: [
            'Understand the function and structure of financial markets',
            'Learn about various financial instruments and their applications',
            'Explore the role of behavioral finance in market dynamics',
            'Analyze risk management strategies',
            'Understand banking systems and monetary policy',
            'Evaluate the impact of financial innovations on society'
        ],
        syllabus: [
            {
                id: 1,
                title: 'Introduction and Financial Instruments',
                lectures: 10,
                duration: '1 week',
                completed: true,
                topics: ['Market overview', 'Stocks and bonds', 'Present value', 'Market efficiency']
            },
            {
                id: 2,
                title: 'Behavioral Finance and Risk',
                lectures: 12,
                duration: '2 weeks',
                completed: true,
                topics: ['Human behavior', 'Cognitive biases', 'Risk perception', 'Portfolio theory']
            },
            {
                id: 3,
                title: 'Debt and Derivatives',
                lectures: 11,
                duration: '2 weeks',
                completed: true,
                topics: ['Government debt', 'Inflation', 'Options', 'Futures contracts']
            },
            {
                id: 4,
                title: 'Banking and Regulation',
                lectures: 9,
                duration: '1 week',
                completed: false,
                topics: ['Banking system', 'Central banks', 'Financial crises', 'Regulation']
            },
            {
                id: 5,
                title: 'Financial Innovation',
                lectures: 8,
                duration: '1 week',
                completed: false,
                topics: ['New markets', 'Financial technology', 'Global finance', 'Future of finance']
            }
        ],
        resources: [
            { name: 'Course Textbook: Finance and the Good Society', size: '8.7 MB', type: 'pdf' },
            { name: 'Lecture Transcripts', size: '5.1 MB', type: 'pdf' },
            { name: 'Financial Calculator Tools', size: '3.4 MB', type: 'zip' },
            { name: 'Case Studies', size: '11.2 MB', type: 'pdf' }
        ]
    }
]
