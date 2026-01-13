import './style.css';
import { useState } from 'react';
import { browser } from 'wxt/browser';
import { Tab } from '../types/ui';
import { Tabs } from '../components/Tabs';
import { SettingsView } from '../components/SettingsView';
import { FreeGamesView } from '../components/FreeGamesView';
import { HistoryView } from '../components/HistoryView';
import { useStorage } from '../hooks/useStorage';
import { FreeGame } from '../types/freeGame';

function App() {
    clearBadge();

    // UI State
    const [activeTab, setActiveTab] = useState<Tab>(Tab.SETTINGS);
    const [isClaiming, setIsClaiming] = useState(false);

    // Storage Data for Badge
    const [steamGames] = useStorage<FreeGame[]>("steamGames", []);
    const [epicGames] = useStorage<FreeGame[]>("epicGames", []);
    const [futureGames] = useStorage<FreeGame[]>("futureGames", []);
    const allGamesCount = steamGames.length + epicGames.length + futureGames.length;

    const handleManualClaim = async () => {
        if (isClaiming) return;
        setIsClaiming(true);

        // Trigger background action
        try {
            await browser.runtime.sendMessage({ action: 'claim', target: 'background' });
        } catch (e) {
            console.error("Message failed", e);
        }

        // Simulate loading time since background doesn't reply with completion immediately
        // The background script clears games then fetches new ones.
        setTimeout(() => {
            setIsClaiming(false);
            // If we are in Settings, maybe switch to Free Games if games are found?
            // Optional: logic to auto-switch tab
            if (activeTab === Tab.SETTINGS) {
                setActiveTab(Tab.FREE_GAMES);
            }
        }, 4000);
    };

    return (
        <div className="w-[380px] h-[600px] bg-zinc-950 text-zinc-100 flex flex-col mx-auto shadow-2xl overflow-hidden font-sans selection:bg-zinc-700">

            {/* Top Header Area with Tabs - Fixed at top */}
            <div className="p-5 pb-2 shrink-0 z-20 bg-zinc-950">
                <Tabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    badgeCount={allGamesCount}
                />
            </div>

            {/* Main Content Area - Scrollable */}
            <div className="flex-1 overflow-hidden relative flex flex-col">
                {activeTab === Tab.SETTINGS && (
                    <SettingsView
                        onManualClaim={handleManualClaim}
                        isClaiming={isClaiming}
                    />
                )}

                {activeTab === Tab.FREE_GAMES && (
                    <FreeGamesView
                        onManualClaim={handleManualClaim}
                        isClaiming={isClaiming}
                    />
                )}

                {activeTab === Tab.HISTORY && (
                    <HistoryView
                        onManualClaim={handleManualClaim}
                        isClaiming={isClaiming}
                    />
                )}
            </div>
        </div>
    );

    function clearBadge() {
        browser.action.setBadgeText({ text: "" });
    }
}

export default App;
