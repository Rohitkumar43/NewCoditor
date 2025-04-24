// "use client";
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@/store';
// import { setIsRunning, setOutput, setError } from '@/store/features/editorSlice';
// import { executeCode } from '@/services/api';
// import { PlayIcon } from 'lucide-react';
// function RunButton() {
//   const { user } = useUser();
//   const { runCode, language, isRunning } = useCodeEditorStore();
//   const saveExecution = useMutation(api.codeExecutions.saveExecution);

//   const handleRun = async () => {
//     await runCode();
//     const result = getExecutionResult();

//     if (user && result) {
//       await saveExecution({
//         language,
//         code: result.code,
//         output: result.output || undefined,
//         error: result.error || undefined,
//       });
//     }
//   };

//   return (
//     <motion.button
//       onClick={handleRun}
//       disabled={isRunning}
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       className={`
//         group relative inline-flex items-center gap-2.5 px-5 py-2.5
//         disabled:cursor-not-allowed
//         focus:outline-none
//       `}
//     >
//       {/* bg wit gradient */}
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl opacity-100 transition-opacity group-hover:opacity-90" />

//       <div className="relative flex items-center gap-2.5">
//         {isRunning ? (
//           <>
//             <div className="relative">
//               <Loader2 className="w-4 h-4 animate-spin text-white/70" />
//               <div className="absolute inset-0 blur animate-pulse" />
//             </div>
//             <span className="text-sm font-medium text-white/90">Executing...</span>
//           </>
//         ) : (
//           <>
//             <div className="relative flex items-center justify-center w-4 h-4">
//               <Play className="w-4 h-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" />
//             </div>
//             <span className="text-sm font-medium text-white/90 group-hover:text-white">
//               Run Code
//             </span>
//           </>
//         )}
//       </div>
//     </motion.button>
//   );
// }
// export default RunButton;

"use client";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { setIsRunning, setOutput, setError } from '@/stores/features/editorSlice';
//import  executeCode  from '@/services/api';
import { PlayIcon } from 'lucide-react';
import { executeCode } from '@/services/api';

function RunButton() {
  const dispatch = useDispatch();
  const { language, code, isRunning } = useSelector((state: RootState) => state.editor);

  const handleRun = async () => {
    try {
      dispatch(setIsRunning(true));{}
      const result = await executeCode({code, language});
      dispatch(setOutput(result.data.output));
      dispatch(setIsRunning(false));
    } catch (error) {
      dispatch(setIsRunning(false));
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError('An unknown error occurred'));
      }
    }
  };

  return (
    <button
      onClick={handleRun}
      disabled={isRunning}
      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg
        hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <PlayIcon className="w-4 h-4" />
      {isRunning ? 'Running...' : 'Run'}
    </button>
  );
}

export default RunButton;