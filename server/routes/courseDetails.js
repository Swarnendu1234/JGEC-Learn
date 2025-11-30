import express from 'express';
const router = express.Router();

router.get('/courses/:id/details', async (req, res) => {
    try {
        const courseDetails = {
            courseTitle: "Introduction to Computer Science",
            courseDescription: "Learn the fundamentals of computer science and programming",
            institutionName: "MIT",
            courseRating: "4.8",
            learnersCount: "2,345",
            courseDuration: "4 weeks",
            tags: ["Computer Science", "Programming", "Algorithms"],
            progressPercentage: 45,
            completedModules: 3,
            totalModules: 8,
            modules: [
                {
                    moduleId: 1,
                    moduleTitle: "Introduction to Programming",
                    isCompleted: true,
                    isLocked: false,
                    videoUrl: "https://www.youtube.com/embed/zOjov-2OZ0E",
                    summary: "Learn the basics of programming and computational thinking",
                    keyPoints: ["Variables and data types", "Control structures", "Functions"],
                    resources: [
                        { name: "Lecture Slides.pdf", url: "#" },
                        { name: "Code Examples.zip", url: "#" }
                    ],
                    quizAvailable: true
                },
                {
                    moduleId: 2,
                    moduleTitle: "Data Structures",
                    isCompleted: true,
                    isLocked: false,
                    videoUrl: "https://www.youtube.com/embed/RBSGKlAvoiM",
                    summary: "Understanding arrays, linked lists, and basic data structures",
                    keyPoints: ["Arrays", "Linked Lists", "Stacks and Queues"],
                    resources: [{ name: "Data Structures Guide.pdf", url: "#" }],
                    quizAvailable: true
                },
                {
                    moduleId: 3,
                    moduleTitle: "Algorithms Basics",
                    isCompleted: true,
                    isLocked: false,
                    videoUrl: "https://www.youtube.com/embed/8hly31xKli0",
                    summary: "Introduction to algorithmic thinking and problem solving",
                    keyPoints: ["Sorting algorithms", "Searching algorithms", "Time complexity"],
                    resources: [],
                    quizAvailable: false
                },
                {
                    moduleId: 4,
                    moduleTitle: "Object-Oriented Programming",
                    isCompleted: false,
                    isLocked: false,
                    videoUrl: "https://www.youtube.com/embed/pTB0EiLXUC8",
                    summary: "Learn OOP concepts and design patterns",
                    keyPoints: ["Classes and Objects", "Inheritance", "Polymorphism"],
                    resources: [{ name: "OOP Examples.zip", url: "#" }],
                    quizAvailable: true
                },
                {
                    moduleId: 5,
                    moduleTitle: "Advanced Algorithms",
                    isCompleted: false,
                    isLocked: true,
                    videoUrl: "",
                    summary: "Deep dive into advanced algorithmic techniques",
                    keyPoints: [],
                    resources: [],
                    quizAvailable: false
                }
            ],
            instructor: {
                name: "Dr. John Smith",
                position: "Professor of Computer Science",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
                bio: "Dr. Smith has 15 years of experience teaching computer science at MIT."
            }
        };
        
        res.json(courseDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/courses/:courseId/modules/:moduleId/progress', async (req, res) => {
    try {
        const { completed } = req.body;
        res.json({ success: true, completed });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/courses/:courseId/modules/:moduleId/notes', async (req, res) => {
    try {
        const { note } = req.body;
        res.json({ success: true, note });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/courses/:courseId/modules/:moduleId/notes', async (req, res) => {
    try {
        res.json({ note: "" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/courses/:courseId/modules/:moduleId/video-progress', async (req, res) => {
    try {
        const { progress } = req.body;
        res.json({ success: true, progress });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
