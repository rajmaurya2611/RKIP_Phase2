import React, { useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { CustomerServiceOutlined, CopyOutlined } from '@ant-design/icons';
import Lottie from 'lottie-react';
import backgroundAnimation from '../../assets/animations/bg.json'; // Adjust the path as needed

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

interface ChatWindowProps {
  messages: Message[];
  userStyle?: string;
  botStyle?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  userStyle = 'bg-gray-700 text-white',
  botStyle = 'bg-gray-700 text-white',
}) => {
  const isSpeakingRef = useRef<boolean>(false);

  // Function to speak the given text using the Web Speech API
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeakingRef.current) {
        window.speechSynthesis.cancel(); // Stop speech if already speaking
        isSpeakingRef.current = false;
      } else {
        window.speechSynthesis.cancel(); // Ensure any previous speech is stopped
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';

        utterance.onend = () => {
          isSpeakingRef.current = false;
        };

        isSpeakingRef.current = true;
        window.speechSynthesis.speak(utterance);
      }
    } else {
      console.warn("Speech Synthesis API not supported in this browser.");
    }
  };

  // Function to copy text to clipboard
  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative flex-grow overflow-hidden bg-transparent p-4">
      {/* Chat container with beams and background animation */}
      <div className="relative w-full h-full rounded-md overflow-hidden">

        {/* Background animation using lottie-react */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Lottie
            animationData={backgroundAnimation}
            loop={true}
            style={{
              width: '70%',
              height: '70%',
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.7,
            }}
          />
        </div>

        {/* Chat messages */}
        <div className="relative z-20 h-full overflow-y-auto space-y-4 p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <DotLottieReact
                  src="https://lottie.host/910d0a6d-d9bc-4e46-b80d-000bc077f82e/RZV3nE6vu1.lottie"
                  loop
                  autoplay
                  style={{ width: '60px', height: '60px', marginRight: '10px' }}
                />
              )}

              <div
                className={`max-w-3xl px-4 py-2 rounded-lg break-words flex flex-col ${
                  message.sender === 'user' ? userStyle : botStyle
                }`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  components={{
                    table: ({ node, ...props }) => (
                      <table className="min-w-full border-collapse border border-gray-300 mb-4" {...props} />
                    ),
                    thead: ({ node, ...props }) => (
                      <thead className="bg-gray-200 text-black" {...props} />
                    ),
                    tbody: ({ node, ...props }) => <tbody {...props} />,
                    tr: ({ node, ...props }) => (
                      <tr className="border-t border-gray-300" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                      <th
                        className="px-4 py-2 text-left text-sm font-semibold border border-gray-300 text-black"
                        {...props}
                      />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="px-4 py-2 text-sm border border-gray-300 text-white" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-5 space-y-1 text-white" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="text-base text-white" {...props} />
                    ),
                    p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                  }}
                >
                  {message.text}
                </ReactMarkdown>

                <div className="flex gap-2 mt-1 self-end">
                  <button
                    onClick={() => speakText(message.text)}
                    className="p-1 hover:bg-gray-300 rounded"
                    title="Listen"
                  >
                    <CustomerServiceOutlined style={{ fontSize: '16px' }} />
                  </button>
                  <button
                    onClick={() => copyText(message.text)}
                    className="p-1 hover:bg-gray-300 rounded"
                    title="Copy"
                  >
                    <CopyOutlined style={{ fontSize: '16px' }} />
                  </button>
                </div>
              </div>

              {message.sender === 'user' && (
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    marginLeft: '10px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <DotLottieReact
                    src="https://lottie.host/f2413721-41cb-473d-a5f8-7c66293cde14/86pBQ0ZvuQ.lottie"
                    loop
                    autoplay
                    style={{
                      transform: 'scale(2)',
                      transformOrigin: 'center',
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
