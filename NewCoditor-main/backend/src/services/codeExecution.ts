import { Request } from 'express';
import User from '../models/User';

const ALL_LANGUAGES = [
  'javascript', 'typescript', 'python', 'java', 'go', 
  'rust', 'cpp', 'csharp', 'ruby', 'swift'
];

const FREE_LANGUAGES = ['javascript', 'python', 'java', 'cpp'];

export async function canExecuteLanguage(req: Request, language: string): Promise<boolean> {
  try {
    const clerkId = (req as any).auth?.clerkId;
    if (!clerkId) return false;

    const user = await User.findOne({ clerkId });
    if (!user) return false;

    // If user is pro, they can access all languages
    if (user.isPro) {
      return ALL_LANGUAGES.includes(language.toLowerCase());
    }

    // For free users, check if language is in free tier
    return FREE_LANGUAGES.includes(language.toLowerCase());
  } catch (error) {
    console.error('Error checking language access:', error);
    return false;
  }
}

export async function executeCode(code: string, language: string) {
  // Your existing code execution logic here
  // This is just a placeholder - implement your actual code execution
  return {
    output: `Executed ${language} code: ${code}`,
    error: null
  };
} 