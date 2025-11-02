import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

const ChatBubble = ({ role, content }) => {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
      <div
        className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed border ${
          isUser
            ? 'bg-indigo-600/90 text-white border-indigo-500/50'
            : 'bg-white/5 text-white/90 border-white/10'
        }`}
      >
        {content}
      </div>
    </div>
  );
};

const ChatPanel = ({ messages, input, setInput, onSend }) => {
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex flex-col h-full rounded-2xl border border-white/10 bg-neutral-950/80 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-white/50 text-sm">
            Start a conversation with JARVIS.
          </div>
        ) : (
          messages.map((m, idx) => (
            <ChatBubble key={idx} role={m.role} content={m.content} />
          ))
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t border-white/10 p-3 md:p-4 bg-black/40">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={1}
            className="flex-1 resize-none rounded-xl bg-white/5 text-white placeholder-white/40 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
          />
          <button
            onClick={onSend}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 transition-colors border border-indigo-400/30"
          >
            <Send size={18} />
            <span className="hidden md:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
