// Initial.tsx
import React from "react";
import { motion } from "framer-motion";

interface InitialProps {
  onSelect: (view: string, sub?: string) => void;
}

const Initial: React.FC<InitialProps> = ({ onSelect }) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-black">Welcome to KIP Bot!</h1>
      </motion.div>
    </div>
  );
};

export default Initial;


// // Initial.tsx
// import React from "react";

// interface InitialProps {
//   onSelect: (view: string, sub?: string) => void;
// }

// const Initial: React.FC<InitialProps> = ({ onSelect }) => {
//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Welcome! Please choose an option</h1>
//       <div className="space-x-4">
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//           onClick={() => onSelect("chat", "patent")}
//         >
//           Patent
//         </button>
//         <button
//           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
//           onClick={() => onSelect("chat", "vishal")}
//         >
//           Vishal
//         </button>
//         <button
//           className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
//           onClick={() => onSelect("database")}
//         >
//           Dashboard2
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Initial;
