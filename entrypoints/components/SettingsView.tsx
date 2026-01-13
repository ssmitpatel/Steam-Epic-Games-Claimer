import React from 'react';
import { Power, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { Footer } from './Footer';
import { useStorage } from "@/entrypoints/hooks/useStorage";

interface SettingsViewProps {
    onManualClaim: () => void;
    isClaiming: boolean;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
    onManualClaim,
    isClaiming,
}) => {
    const [active, setActive] = useStorage<boolean>("active", true);
    const [steamCheck, setSteamCheck] = useStorage<boolean>("steamCheck", true);
    const [epicCheck, setEpicCheck] = useStorage<boolean>("epicCheck", true);
    const [counter] = useStorage<number>("counter", 0);

    return (
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-300">
            <div className="flex-1 p-4 space-y-5">

                {/* Header Stats */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-semibold text-zinc-100">Auto-Claimer</h2>
                        <p className="text-xs text-zinc-500">Service Status</p>
                    </div>
                    <div className="text-right">
                        <span className="text-lg font-mono font-bold text-white">{counter}</span>
                        <p className="text-xs text-zinc-500">Games Claimed</p>
                    </div>
                </div>

                {/* Main Power Toggle - RED/GREEN */}
                <div className="flex flex-col items-center justify-center py-4">
                    <button
                        onClick={() => setActive(!active)}
                        className={`
              relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl
              ${active
                                ? 'bg-emerald-500/10 text-emerald-500 ring-2 ring-emerald-500/50 shadow-emerald-500/20'
                                : 'bg-red-500/10 text-red-500 ring-2 ring-red-500/50 shadow-red-500/20'
                            }
            `}
                    >
                        <Power size={32} className="transition-transform duration-300 active:scale-90" />
                    </button>
                    <div className="mt-4 flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${active ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
                        <span className={`text-xs font-bold uppercase tracking-widest ${active ? 'text-emerald-500' : 'text-red-500'}`}>
                            {active ? 'Online' : 'Offline'}
                        </span>
                    </div>
                </div>

                {/* Manual Claim */}
                <div className="bg-zinc-900/50 rounded-lg p-2 border border-zinc-900">
                    <Button onClick={onManualClaim} isLoading={isClaiming}>
                        {isClaiming ? 'Claiming...' : 'Start Manual Claim'}
                    </Button>
                    <div className="mt-3 flex items-start gap-2 text-[11px] text-zinc-500 leading-relaxed">
                        <AlertCircle size={14} className="mt-0.5 shrink-0 text-zinc-600" />
                        <p>Ensure you are logged in to Steam and Epic Games in your browser.</p>
                    </div>
                </div>

                {/* Platforms - Grid Layout */}
                <div className="space-y-3">
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Platforms</p>

                    <div className="grid grid-cols-2 gap-3">
                        <PlatformCard
                            label="Steam"
                            checked={steamCheck}
                            onToggle={() => setSteamCheck(!steamCheck)}
                        />
                        <PlatformCard
                            label="Epic Games"
                            checked={epicCheck}
                            onToggle={() => setEpicCheck(!epicCheck)}
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

const PlatformCard = ({ label, checked, onToggle }: { label: string, checked: boolean, onToggle: () => void }) => (
    <button
        onClick={onToggle}
        className={`
      relative h-12 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 group w-full
      ${checked
                ? 'bg-zinc-900 border-zinc-200 text-white shadow-lg'
                : 'bg-black border-zinc-800 text-zinc-600 hover:border-zinc-700 hover:bg-zinc-900/50'
            }
    `}
    >
        {checked && (
            <div className="absolute top-1.5 right-2">
                <CheckCircle2 size={14} className="text-white fill-emerald-600" />
            </div>
        )}
        <span className="text-xs font-bold">{label}</span>
    </button>
);
