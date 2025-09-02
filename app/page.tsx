
'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';


interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }
}, [messages]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const userMessage = userInput.trim();
  if (!userMessage) return;

  
  setMessages((prev) => [...prev, { text: userMessage, sender: 'user' }]);
  setUserInput('');
  setIsLoading(true);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) throw new Error('API request failed');
    const data = await response.json();

  
    setMessages((prev) => [...prev, { text: data.response, sender: 'bot' }]);

  } catch (error) {
    console.error(error);
    setMessages((prev) => [...prev, { text: 'Sorry, something went wrong.', sender: 'bot' }]);
  } finally {
    setIsLoading(false);
  }
};


  
  return (
    <main className="bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 min-h-screen flex items-center justify-center px-4 py-8">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative bg-white/95 w-full max-w-4xl h-full sm:h-[90vh] sm:max-h-[800px] rounded-2xl shadow-2xl flex flex-col border border-gray-200/50 backdrop-blur-xl">
        
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8 rounded-t-2xl shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">XENORA</h1>
              <p className="text-sm text-gray-300 font-medium"> AI Solutions</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300 font-medium">Online</span>
          </div>
        </div>

        
        <div ref={chatContainerRef} className="flex-1 p-8 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white/90">
          <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          
            <div className="self-start max-w-[85%]">
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200/50 relative">
                <div className="absolute -left-2 top-6 w-4 h-4 bg-gradient-to-r from-slate-50 to-gray-50 rotate-45 border-l border-t border-gray-200/50"></div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium leading-relaxed">Welcome to Xenora  AI.</p>
                    <p className="text-gray-600 text-sm mt-1">How may I assist with your needs today?</p>
                  </div>
                </div>
              </div>
            </div>

            
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[85%] ${msg.sender === 'user' ? 'self-end' : 'self-start'} animate-in slide-in-from-bottom-3 duration-300`}
              >
                <div
                  className={
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-2xl shadow-lg border border-blue-400/30 relative'
                      : 'bg-gradient-to-r from-slate-50 to-gray-50 text-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200/50 relative'
                  }
                >
                  {msg.sender === 'user' && (
                    <div className="absolute -right-2 top-6 w-4 h-4 bg-gradient-to-r from-blue-600 to-blue-500 rotate-45"></div>
                  )}
                  {msg.sender === 'bot' && (
                    <div className="absolute -left-2 top-6 w-4 h-4 bg-gradient-to-r from-slate-50 to-gray-50 rotate-45 border-l border-t border-gray-200/50"></div>
                  )}
                  <div className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 ${
                      msg.sender === 'user' 
                        ? 'bg-white/20' 
                        : 'bg-gradient-to-br from-blue-500 to-purple-600'
                    }`}>
                      {msg.sender === 'user' ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                          <path d="M2 17l10 5 10-5"/>
                          <path d="M2 12l10 5 10-5"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="whitespace-pre-line leading-relaxed font-medium">{msg.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            
            {isLoading && (
              <div className="self-start max-w-[85%] animate-in slide-in-from-bottom-3 duration-300">
                <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200/50 relative">
                  <div className="absolute -left-2 top-6 w-4 h-4 bg-gradient-to-r from-slate-50 to-gray-50 rotate-45 border-l border-t border-gray-200/50"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 font-medium">Processing</span>
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        
        <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200/50 rounded-b-2xl">
          <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter your question..."
                className="w-full p-4 pl-6 pr-12 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 bg-white/80 text-gray-800 placeholder-gray-500 shadow-sm transition-all duration-300 text-lg font-medium backdrop-blur-sm"
                disabled={isLoading}
                autoComplete="off"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <path d="M8 9h8"/>
                  <path d="M8 13h6"/>
                  <path d="M4 7v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7"/>
                  <path d="M6 7V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"/>
                </svg>
              </div>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl px-8 py-4 hover:from-blue-700 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 shadow-lg transition-all duration-300 font-semibold text-lg flex items-center gap-2 group transform hover:scale-105 disabled:hover:scale-100"
              disabled={isLoading || !userInput.trim()}
              aria-label="Send message"
            >
              <span className="hidden sm:inline">Send</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform duration-200"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
          
        
          <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-200/30">
            <div className="flex items-center gap-2 text-gray-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1.2-3.2-3.7-6-7-7.5C11.8 3.5 9.3 2.8 6 4.5 2.7 6.5.2 9.3 1 12.5c.8 3.2 3.3 6 6.6 7.5 3.3 1.5 5.8 2.2 9.1.5 3.3-2 5.8-4.8 5-8"/>
              </svg>
              <span className="text-sm font-medium">Secure</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              <span className="text-sm font-medium">Fast</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}