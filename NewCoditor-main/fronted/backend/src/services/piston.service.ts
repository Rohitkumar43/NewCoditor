import axios from 'axios';

const PISTON_API = process.env.PISTON_API_URL || 'https://emkc.org/api/v2/piston';

export const executeCodeInPiston = async (code: string, language: string) => {
  try {
    const response = await axios.post(`${PISTON_API}/execute`, {
      language,
      source: code
    });
    
    return {
      output: response.data.output,
      error: response.data.error
    };
  } catch (error) {
    throw new Error('Code execution failed');
  }
};