import React from 'react';
import { Button } from './Button';
import { Footer } from './Footer';
import { Gift, Gamepad2 } from 'lucide-react';
import { useStorage } from "@/entrypoints/hooks/useStorage";
import { FreeGame } from "@/entrypoints/types/freeGame";

interface FreeGamesViewProps {
    onManualClaim: () => void;
    isClaiming: boolean;
}

export const FreeGamesView: React.FC<FreeGamesViewProps> = ({ onManualClaim, isClaiming }) => {
    const [steamGames] = useStorage<FreeGame[]>("steamGames", []);
    const [epicGames] = useStorage<FreeGame[]>("epicGames", []);
    const [futureGames] = useStorage<FreeGame[]>("futureGames", []);

    // Combine all games. You might want to filter duplicate IDs if necessary, but typically existing logic works.
    // The original GamesList logic combined them.
    const allGames = [...steamGames, ...epicGames, ...futureGames];

    return (
        <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-white">Available Games</h2>
                    <p className="text-xs text-zinc-500 mt-1">Found {allGames.length} free games to claim.</p>
                </div>

                {allGames.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-600 border border-dashed border-zinc-900 rounded-lg bg-zinc-900/20">
                        <Gift size={32} className="mb-3 opacity-50" />
                        <p className="text-sm font-medium">No games found</p>
                        <p className="text-xs mt-1 opacity-70 max-w-[150px]">Try running a manual claim to scan for games.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {allGames.map((game, index) => (
                            <div key={index} className="group bg-zinc-900 hover:bg-zinc-800 rounded-lg p-3 flex gap-4 transition-all">
                                <div className="w-12 h-16 bg-black rounded overflow-hidden shrink-0">
                                    {game.img ? (
                                        <img src={game.img} alt={game.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                                            <Gamepad2 size={20} className="text-zinc-600" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                    <h3 className="font-medium text-sm text-zinc-200 truncate pr-2">{game.title}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] uppercase font-bold text-zinc-500">{game.platform === 'Epic Games' ? 'Epic' : 'Steam'}</span>
                                        <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                                        {game.future ? (
                                            <span className="text-xs text-amber-500 font-medium">Upcoming</span>
                                        ) : (
                                            <span className="text-xs text-emerald-500 font-medium">Free</span>
                                        )}
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
                        <Button onClick={onManualClaim} isLoading={isClaiming}>
                            {isClaiming ? 'Scanning...' : 'Scan & Claim'}
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};
