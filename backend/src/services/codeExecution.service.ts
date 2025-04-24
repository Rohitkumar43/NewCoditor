import axios from 'axios';

interface PistonExecutionResult {
  output: string;
  error: string | null;
}

/**
 * Execute code using the Piston API
 * @param code The code to execute
 * @param language The programming language
 * @returns The execution result
 */
export const executeCodeInSandbox = async (
  code: string,
  language: string
): Promise<PistonExecutionResult> => {
  try {
    // Map our language identifiers to Piston's language identifiers
    const languageMap: Record<string, { language: string; version: string }> = {
      javascript: { language: 'javascript', version: '18.15.0' },
      typescript: { language: 'typescript', version: '5.0.3' },
      python: { language: 'python', version: '3.10.0' },
      java: { language: 'java', version: '15.0.2' },
      go: { language: 'go', version: '1.16.2' },
      rust: { language: 'rust', version: '1.68.2' },
      cpp: { language: 'cpp', version: '12.2.0' },
      csharp: { language: 'csharp', version: '6.12.0' },
      ruby: { language: 'ruby', version: '3.2.1' },
      swift: { language: 'swift', version: '5.8' }
    };

    const runtimeConfig = languageMap[language] || { language, version: '*' };

    // Call the Piston API
    const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
      language: runtimeConfig.language,
      version: runtimeConfig.version,
      files: [
        {
          name: `main.${getFileExtension(language)}`,
          content: code
        }
      ]
    });

    // Process the response
    if (response.data.run) {
      const { stdout, stderr, code: exitCode } = response.data.run;
      
      return {
        output: stdout,
        error: stderr || (exitCode !== 0 ? `Process exited with code ${exitCode}` : null)
      };
    }

    return {
      output: '',
      error: 'Failed to execute code'
    };
  } catch (error) {
    console.error('Code execution error:', error);
    
    return {
      output: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

/**
 * Get the file extension for a language
 */
function getFileExtension(language: string): string {
  const extensionMap: Record<string, string> = {
    javascript: 'js',
    typescript: 'ts',
    python: 'py',
    java: 'java',
    go: 'go',
    rust: 'rs',
    cpp: 'cpp',
    csharp: 'cs',
    ruby: 'rb',
    swift: 'swift'
  };

  return extensionMap[language] || language;
}
