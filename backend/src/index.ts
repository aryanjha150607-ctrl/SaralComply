import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from './generated/prisma/client.js';
import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup local uploads directory
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

const app = express();
const port = process.env.PORT || 3001;
const prisma = new PrismaClient();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

app.use(cors());
app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'SaralComply Backend is running!' });
});

app.get('/api/tasks', async (req: Request, res: Response) => {
    try {
        const tasks = await prisma.complianceTask.findMany({
            orderBy: { dueDate: 'asc' }
        });
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

app.post('/api/tasks', async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, dueDate, severity } = req.body;

        if (!title || !dueDate) {
            res.status(400).json({ error: 'Title and dueDate are required' });
            return;
        }

        const newTask = await prisma.complianceTask.create({
            data: {
                title,
                dueDate: new Date(dueDate),
                severity: severity || 'Medium',
                status: 'Pending',
            }
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

app.post('/api/tasks/extract', async (req: Request, res: Response): Promise<void> => {
    try {
        const { text } = req.body;
        if (!text) {
            res.status(400).json({ error: 'Regulation text is required' });
            return;
        }

        const prompt = `You are a compliance assistant. Extract a clear, actionable task title, a strict deadline (in YYYY-MM-DD format), and deduce the severity of the task ("High", "Medium", or "Low") from the following regulation text. If no exact date is found, suggest a reasonable deadline 30 days from now. 
        Respond ONLY with a valid JSON object of the form: {"title": "Task title here", "dueDate": "YYYY-MM-DD", "severity": "High"}
        Do not include markdown blocks or any other text.
        Text to analyze:
        ${text}`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const responseText = response.text || '';
        // Clean up markdown code blocks if present
        const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const extracted = JSON.parse(cleanedText);

        if (!extracted.title || !extracted.dueDate || !extracted.severity) {
            throw new Error("Invalid format returned by LLM");
        }

        const newTask = await prisma.complianceTask.create({
            data: {
                title: extracted.title,
                dueDate: new Date(extracted.dueDate),
                severity: extracted.severity,
                status: 'Pending',
            }
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error extracting task:', error);
        res.status(500).json({ error: 'Failed to extract and create task from text' });
    }
});

app.post('/api/tasks/upload-pdf', upload.single('file'), async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No PDF file uploaded' });
            return;
        }

        const dataBuffer = fs.readFileSync(req.file.path);
        const data = await pdfParse(dataBuffer);
        const text = data.text;

        if (!text || text.trim().length === 0) {
            res.status(400).json({ error: 'Could not extract text from the PDF' });
            return;
        }

        const prompt = `You are a compliance assistant. Extract a clear, actionable task title, a strict deadline (in YYYY-MM-DD format), and deduce the severity ("High", "Medium", or "Low") from the following document text. If no exact date is found, suggest a reasonable deadline 30 days from now. 
        Respond ONLY with a valid JSON object of the form: {"title": "Task title here", "dueDate": "YYYY-MM-DD", "severity": "Medium"}
        Do not include markdown blocks or any other text.
        Text to analyze:
        \${text.substring(0, 15000)}`; // limit token length for huge PDFs

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const responseText = response.text || '';
        const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const extracted = JSON.parse(cleanedText);

        if (!extracted.title || !extracted.dueDate || !extracted.severity) {
            throw new Error("Invalid format returned by LLM");
        }

        // Log the processed document
        await prisma.documentLog.create({
            data: {
                filename: req.file.originalname
            }
        });

        const newTask = await prisma.complianceTask.create({
            data: {
                title: extracted.title,
                dueDate: new Date(extracted.dueDate),
                severity: extracted.severity,
                status: 'Pending',
            }
        });

        res.status(201).json({ task: newTask, extractedTextLength: text.length });
    } catch (error) {
        console.error('Error parsing PDF:', error);
        res.status(500).json({ error: 'Failed to parse PDF and extract tasks' });
    }
});

app.put('/api/tasks/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        const { title, dueDate, status, severity } = req.body;

        const updatedTask = await prisma.complianceTask.update({
            where: { id: parseInt(id) },
            data: {
                ...(title && { title }),
                ...(dueDate && { dueDate: new Date(dueDate) }),
                ...(status && { status }),
                ...(severity && { severity }),
            }
        });

        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Failed to update task' });
    }
});

app.delete('/api/tasks/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;

        await prisma.complianceTask.delete({
            where: { id: parseInt(id) }
        });

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

app.get('/api/documents', async (req: Request, res: Response) => {
    try {
        const logs = await prisma.documentLog.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(logs);
    } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ error: 'Failed to fetch document logs' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
