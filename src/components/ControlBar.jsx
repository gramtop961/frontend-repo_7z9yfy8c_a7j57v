import React, { useId } from 'react';
import { Mic, MicOff, Terminal, Settings, Volume2, Power, Globe, Mail } from 'lucide-react';

const Toggle = ({ label, checked, onChange, id }) => (
  <div className="flex items-center justify-between py-2">
    <label htmlFor={id} className="text-sm text-white/80">
      {label}
    </label>
    <button
      id={id}
      onClick={() => onChange(!checked)}
      className={`w-12 h-7 rounded-full relative transition-colors ${
        checked ? 'bg-indigo-600' : 'bg-white/10'
      }`}
      aria-pressed={checked}
      type="button"
    >
      <span
        className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white transition-transform ${
          checked ? 'translate-x-5' : ''
        }`}
      />
    </button>
  </div>
);

const Select = ({ label, value, onChange, options, id }) => (
  <div className="flex flex-col gap-1 py-2">
    <label htmlFor={id} className="text-sm text-white/80">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-neutral-900">
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const ControlBar = ({
  listening,
  onToggleMic,
  onRunCommand,
  onOpenEmail,
  settings,
  onChangeSettings,
  showSettings,
  setShowSettings,
}) => {
  const voiceId = useId();
  const wakeId = useId();
  const netId = useId();

  return (
    <div className="relative rounded-2xl border border-white/10 bg-black/40 p-3 md:p-4">
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <button
          onClick={onToggleMic}
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors ${
            listening
              ? 'bg-red-600/80 hover:bg-red-600 text-white border-red-400/40'
              : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
          }`}
        >
          {listening ? <MicOff size={18} /> : <Mic size={18} />}
          <span className="hidden md:inline">{listening ? 'Stop' : 'Listen'}</span>
        </button>

        <button
          onClick={onRunCommand}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border bg-white/5 hover:bg-white/10 text-white border-white/10"
        >
          <Terminal size={18} />
          <span className="hidden md:inline">Run system command</span>
        </button>

        <button
          onClick={onOpenEmail}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border bg-white/5 hover:bg-white/10 text-white border-white/10"
        >
          <Mail size={18} />
          <span className="hidden md:inline">Compose email</span>
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setShowSettings(true)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border bg-white/5 hover:bg-white/10 text-white border-white/10"
            aria-haspopup="dialog"
          >
            <Settings size={18} />
            <span className="hidden md:inline">Settings</span>
          </button>
        </div>
      </div>

      {showSettings && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowSettings(false)} />
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-neutral-950 p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Assistant Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-white/60 hover:text-white"
                aria-label="Close settings"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <Select
                id={voiceId}
                label="Voice"
                value={settings.voice}
                onChange={(v) => onChangeSettings({ ...settings, voice: v })}
                options={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                ]}
              />

              <Select
                id={wakeId}
                label="Wake word"
                value={settings.wakeWord}
                onChange={(v) => onChangeSettings({ ...settings, wakeWord: v })}
                options={[
                  { label: 'Hey Jarvis', value: 'hey jarvis' },
                  { label: 'Computer', value: 'computer' },
                  { label: 'Assistant', value: 'assistant' },
                ]}
              />

              <Toggle
                id={netId}
                label={
                  <span className="inline-flex items-center gap-2">
                    <Globe size={16} className="text-white/70" /> Internet access
                  </span>
                }
                checked={settings.internet}
                onChange={(c) => onChangeSettings({ ...settings, internet: c })}
              />

              <div className="mt-2 grid grid-cols-2 gap-2">
                <button className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl border bg-white/5 hover:bg-white/10 text-white border-white/10">
                  <Volume2 size={18} /> Test voice
                </button>
                <button className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl border bg-white/5 hover:bg-white/10 text-white border-white/10">
                  <Power size={18} /> Quiet hours
                </button>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 rounded-xl border bg-white/5 hover:bg-white/10 text-white border-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlBar;
