import React, { useMemo, useState } from 'react';
import HeroSection from './components/HeroSection.jsx';
import ChatPanel from './components/ChatPanel.jsx';
import ControlBar from './components/ControlBar.jsx';
import StatusLog from './components/StatusLog.jsx';

function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello! I'm JARVIS. Ask me to search, summarize, manage files, or control your system.",
    },
  ]);
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState([]);
  const [listening, setListening] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({ voice: 'female', wakeWord: 'hey jarvis', internet: true });

  const addLog = (text) => setLogs((l) => [...l, `${new Date().toLocaleTimeString()} — ${text}`]);

  const onSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const next = [...messages, { role: 'user', content: trimmed }];
    setMessages(next);
    setInput('');
    addLog('User message sent');

    // Mock assistant thinking/response for this UI-only build
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            "I'll handle that locally. In the full app, I can execute Windows commands, read files, or browse (if enabled).",
        },
      ]);
      addLog('Assistant responded');
    }, 400);
  };

  const onToggleMic = () => {
    setListening((s) => {
      const next = !s;
      addLog(next ? `Listening started (wake word: "${settings.wakeWord}")` : 'Listening stopped');
      return next;
    });
  };

  const onRunCommand = () => {
    const cmd = window.prompt('Enter a system command or intent (e.g., "open notepad", "set volume 50%")');
    if (!cmd) return;
    const needsConfirm = /delete|remove|shutdown|restart|format|power off|empty recycle bin/i.test(cmd);
    if (needsConfirm) {
      const ok = window.confirm(`This action may be sensitive: "${cmd}". Do you want to proceed?`);
      if (!ok) {
        addLog('Command canceled by user');
        setMessages((m) => [...m, { role: 'assistant', content: 'Okay, canceled.' }]);
        return;
      }
    }
    addLog(`Executing command: ${cmd}`);
    setMessages((m) => [
      ...m,
      { role: 'user', content: `Run: ${cmd}` },
      { role: 'assistant', content: `Acknowledged. I will run: ${cmd}` },
    ]);
  };

  const onOpenEmail = () => {
    const to = window.prompt('Recipient email:');
    if (!to) return;
    const subject = window.prompt('Subject:') || '';
    const body = window.prompt('Message:') || '';
    const ok = window.confirm(`Send email to ${to}?`);
    if (!ok) {
      addLog('Email canceled');
      setMessages((m) => [...m, { role: 'assistant', content: 'Email canceled.' }]);
      return;
    }
    addLog(`Email queued to ${to} — "${subject}"`);
    setMessages((m) => [
      ...m,
      { role: 'user', content: `Send email to ${to}: ${subject}\n${body}` },
      { role: 'assistant', content: 'Email prepared. In the full app, I will send via your local Gmail connection.' },
    ]);
  };

  const layout = useMemo(() => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mt-4">
      <div className="lg:col-span-2 h-[560px]">
        <ChatPanel messages={messages} input={input} setInput={setInput} onSend={onSend} />
      </div>
      <div className="lg:col-span-1 h-[560px]">
        <StatusLog logs={logs} />
      </div>
    </div>
  ), [messages, input, logs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0b0f] via-[#0d0d12] to-[#111118] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10 space-y-4 md:space-y-6">
        <HeroSection />
        <ControlBar
          listening={listening}
          onToggleMic={onToggleMic}
          onRunCommand={onRunCommand}
          onOpenEmail={onOpenEmail}
          settings={settings}
          onChangeSettings={setSettings}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />
        {layout}
      </div>
    </div>
  );
}

export default App;
