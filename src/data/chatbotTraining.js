// AI Chatbot Training Data
export const trainingData = {
  // Greetings and basic interactions
  greetings: {
    patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    responses: [
      "Hello! I'm your AI Study Assistant. How can I help you with your learning today?",
      "Hi there! Ready to dive into some learning? What would you like to explore?",
      "Hey! I'm here to help you succeed in your studies. What can I assist you with?",
      "Greetings! Let's make your learning journey amazing. How can I help?"
    ]
  },

  // Python programming help
  python: {
    patterns: ['python', 'programming', 'code', 'coding', 'script'],
    responses: [
      "Python is an excellent choice for beginners! Are you working on variables, functions, loops, or something specific?",
      "I'd love to help with Python! What concept are you trying to understand?",
      "Python programming is fun! Tell me what you're struggling with and I'll guide you through it.",
      "Great! Python is very versatile. Are you learning basics, data structures, or working on a project?"
    ]
  },

  // Functions in Python
  functions: {
    patterns: ['function', 'def', 'return', 'parameter', 'argument'],
    responses: [
      "Functions are like mini-programs! They're defined with 'def function_name():' and help organize your code. Need help with a specific function?",
      "Functions in Python use 'def' keyword. They can take parameters and return values. What would you like to know about functions?",
      "Think of functions as reusable code blocks. They make your programs cleaner and more efficient. Any specific function concept you need help with?"
    ]
  },

  // Loops
  loops: {
    patterns: ['loop', 'for', 'while', 'iteration', 'iterate'],
    responses: [
      "Loops are powerful! 'for' loops work great with lists and ranges, while 'while' loops continue until a condition is false. Which type interests you?",
      "Python has two main loop types: 'for' (iterates over sequences) and 'while' (continues while condition is true). Need examples?",
      "Loops help automate repetitive tasks. Are you working with for loops, while loops, or nested loops?"
    ]
  },

  // Variables and data types
  variables: {
    patterns: ['variable', 'string', 'integer', 'list', 'dictionary', 'data type'],
    responses: [
      "Variables in Python are like containers for data. You can store strings, numbers, lists, dictionaries, and more! What data type are you working with?",
      "Python variables are dynamically typed - no need to declare the type! Are you working with numbers, text, or collections?",
      "Variables store your data. Python has strings ('text'), integers (42), floats (3.14), lists [1,2,3], and dictionaries {'key': 'value'}. Which one?"
    ]
  },

  // Study tips and motivation
  study: {
    patterns: ['study', 'learn', 'tips', 'how to learn', 'study better'],
    responses: [
      "Great study tips: 1) Practice coding daily, 2) Break problems into smaller parts, 3) Use the Pomodoro technique, 4) Teach concepts to others!",
      "Effective learning strategies: Take regular breaks, practice with real projects, join coding communities, and don't be afraid to make mistakes!",
      "Study smart: Set specific goals, use active recall, practice problem-solving, and celebrate small wins. What subject are you focusing on?"
    ]
  },

  // Motivation and encouragement
  motivation: {
    patterns: ['difficult', 'hard', 'struggling', 'frustrated', 'give up', 'motivation'],
    responses: [
      "I understand it can be challenging! Remember, every expert was once a beginner. Take a break, then try breaking the problem into smaller steps.",
      "Feeling stuck is normal in learning! Try explaining the problem out loud, or take a different approach. You've got this! 💪",
      "Programming can be tough, but you're building valuable skills! Every error teaches you something. What specific part is challenging you?",
      "Don't give up! The most rewarding breakthroughs often come after the most challenging moments. Let's tackle this together!"
    ]
  },

  // Course-specific help
  course: {
    patterns: ['course', 'progress', 'module', 'lesson', 'assignment'],
    responses: [
      "I see you're making great progress! You're 42% through your Python course. Functions & Modules are coming up - they're really useful!",
      "Your learning journey is going well! Which part of your current course would you like to focus on?",
      "Courses are structured to build knowledge step by step. Are you having trouble with any specific module or concept?",
      "Great job staying consistent with your courses! What would you like to review or learn next?"
    ]
  },

  // Projects and practice
  projects: {
    patterns: ['project', 'build', 'create', 'practice', 'exercise'],
    responses: [
      "Projects are the best way to learn! Start with something simple like a calculator, then move to a to-do app, or a simple game. What interests you?",
      "Building projects reinforces your learning! Consider: a weather app, a quiz game, or a personal website. What would you like to create?",
      "Hands-on practice is key! Try coding challenges, build mini-projects, or contribute to open source. What type of project excites you?"
    ]
  },

  // Debugging and errors
  debugging: {
    patterns: ['error', 'bug', 'debug', 'fix', 'not working', 'broken'],
    responses: [
      "Debugging is a crucial skill! Read error messages carefully, use print statements to check values, and trace through your code step by step.",
      "Errors are learning opportunities! Common fixes: check indentation, variable names, and syntax. What error are you encountering?",
      "Debugging tips: 1) Read the error message, 2) Check the line number, 3) Use print() to see variable values, 4) Test small parts separately."
    ]
  },

  // Algorithms and problem solving
  algorithms: {
    patterns: ['algorithm', 'solve', 'problem solving', 'logic', 'approach'],
    responses: [
      "Algorithms are step-by-step solutions! Start by understanding the problem, break it down, then write pseudocode before coding. What problem are you solving?",
      "Problem-solving approach: 1) Understand the problem, 2) Plan your solution, 3) Code step by step, 4) Test and refine. Need help with any step?",
      "Think of algorithms as recipes for solving problems. Start simple, then optimize. What kind of problem are you working on?"
    ]
  },

  // Career and goals
  career: {
    patterns: ['career', 'job', 'future', 'goals', 'developer', 'programmer'],
    responses: [
      "Programming opens many career paths: web development, data science, mobile apps, AI, and more! What area interests you most?",
      "Building a strong foundation now will serve you well! Focus on problem-solving skills, build a portfolio, and keep learning. What's your goal?",
      "The tech industry values continuous learning. Keep building projects, contribute to open source, and network with other developers!"
    ]
  },

  // Help and support
  help: {
    patterns: ['help', 'support', 'assist', 'guide', 'explain'],
    responses: [
      "I'm here to help! I can assist with Python concepts, study strategies, debugging tips, project ideas, and motivation. What do you need?",
      "Happy to help! Whether it's coding problems, study techniques, or just encouragement, I'm here for you. What's on your mind?",
      "I can help with programming concepts, study tips, career advice, and keeping you motivated. What would you like to explore?"
    ]
  },

  // Thanks and appreciation
  thanks: {
    patterns: ['thank', 'thanks', 'appreciate', 'helpful'],
    responses: [
      "You're very welcome! I'm glad I could help. Keep up the great work with your studies!",
      "Happy to help! Remember, consistent practice is key to mastering programming. You're doing great!",
      "My pleasure! Feel free to ask anytime you need help or just want to chat about your learning journey.",
      "You're welcome! Keep that curiosity and determination - they'll take you far in programming!"
    ]
  },

  // Goodbye
  goodbye: {
    patterns: ['bye', 'goodbye', 'see you', 'later', 'exit'],
    responses: [
      "Goodbye! Keep coding and learning. Remember, every line of code makes you better! 🚀",
      "See you later! Don't forget to practice a little bit every day. You've got this!",
      "Bye for now! Keep up the excellent work on your learning journey. Happy coding!",
      "Take care! Remember, the best way to learn programming is by doing. Keep building!"
    ]
  },

  // Default fallback responses
  fallback: [
    "That's an interesting question! Could you tell me more about what you're trying to learn or understand?",
    "I'd love to help you with that! Can you provide a bit more context about your question?",
    "Great question! Are you looking for help with Python programming, study tips, or something else?",
    "I'm here to assist! Could you be more specific about what you'd like to explore or learn?",
    "Let me help you with that! What specific topic or concept would you like to dive into?"
  ]
};

// Enhanced response matching function
export const getSmartResponse = (userMessage) => {
  const message = userMessage.toLowerCase().trim();
  
  // Check each category for pattern matches
  for (const [category, data] of Object.entries(trainingData)) {
    if (category === 'fallback') continue;
    
    const patterns = data.patterns || [];
    const responses = data.responses || [];
    
    // Check if any pattern matches the user message
    for (const pattern of patterns) {
      if (message.includes(pattern.toLowerCase())) {
        // Return a random response from this category
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
  }
  
  // If no pattern matches, return a fallback response
  return trainingData.fallback[Math.floor(Math.random() * trainingData.fallback.length)];
};

// Context-aware responses based on user progress
export const getContextualResponse = (userMessage, userContext = {}) => {
  const message = userMessage.toLowerCase();
  const { currentCourse, progress, streak } = userContext;
  
  // Course-specific responses
  if (message.includes('progress') && progress) {
    return `You're doing amazing! You're ${progress}% through your ${currentCourse || 'current course'}. Keep up the momentum!`;
  }
  
  if (message.includes('streak') && streak) {
    return `Fantastic! You have a ${streak}-day learning streak. Consistency is key to mastering programming!`;
  }
  
  // Use the smart response system
  return getSmartResponse(userMessage);
};