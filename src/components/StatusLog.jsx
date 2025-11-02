import React, { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

const StatusLog = ({ logs }) => {
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 h-full overflow-hidden flex flex-col">
      <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2 text-white/80">
        <Terminal size={18} />
        <span className="text-sm">Status log</span>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs">
        {logs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-white/50">
            No actions yet.
          </div>
        ) : (
          logs.map((item, i) => (
            <div
              key={i}
              className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white/80"
            >
              {item}
            </div>
          ))
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default StatusLog;
