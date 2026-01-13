import React from 'react';
import { ClaimHistoryItem } from '../types/ui';
import { Button } from './Button';
import { Footer } from './Footer';
import { History } from 'lucide-react';
import { useStorage } from "@/entrypoints/hooks/useStorage";

interface HistoryViewProps {
    onManualClaim: () => void;
    isClaiming: boolean;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ onManualClaim, isClaiming }) => {
    const [history] = useStorage<ClaimHistoryItem[]>("history", []);

    return (
        <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-white">History</h2>
                    <p className="text-xs text-zinc-500 mt-1">Recent claim activity.</p>
                </div>

                {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-600 border border-dashed border-zinc-900 rounded-lg bg-zinc-900/20">
                        <History size={32} className="mb-3 opacity-50" />
                        <p className="text-sm font-medium">No history yet</p>
                    </div>
                ) : (
                    <div className="space-y-6 relative ml-2">
                        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-zinc-900"></div>
                        {history.map((item) => (
                            <div key={item.id} className="relative pl-6 group">
                                <div className={`absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full border-2 bg-zinc-950 transition-colors ${item.status === 'Success' ? 'border-emerald-500 group-hover:bg-emerald-500' : 'border-red-500 group-hover:bg-red-500'}`}></div>

                                <div className="flex flex-col gap-0.5">
                                    <h3 className="text-sm font-medium text-zinc-200">{item.gameTitle}</h3>
                                    <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                                        <span>{item.platform}</span>
                                        <span>•</span>
                                        <span>{item.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="space-y-3 pt-0 border-t border-transparent bg-zinc-950/95 backdrop-blur-sm z-10">
                <div className="px-4">
                    <div className="pt-4 border-t border-zinc-900">
                        <Button onClick={onManualClaim} isLoading={isClaiming} variant="secondary">
                            {isClaiming ? 'Processing...' : 'Retry Claim'}
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};
