import React from 'react';
import { Settings, Gift, History } from 'lucide-react';
import { Tab } from '../types/ui';

interface TabsProps {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
    badgeCount?: number;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab, badgeCount = 0 }) => {
    const tabs = [
        { id: Tab.SETTINGS, label: 'Settings', icon: Settings },
        { id: Tab.FREE_GAMES, label: 'Free Games', icon: Gift },
        { id: Tab.HISTORY, label: 'History', icon: History },
    ];

    return (
        <div className="flex items-center p-1 bg-zinc-900 rounded-lg">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
              flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-medium transition-all duration-200 relative
              ${isActive
                                ? 'bg-zinc-800 text-white shadow-sm'
                                : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                            }
            `}
                    >
                        <Icon size={14} className={isActive ? 'text-zinc-100' : 'opacity-80'} />
                        <span className={isActive ? 'opacity-100' : 'opacity-80'}>{tab.label}</span>

                        {tab.id === Tab.FREE_GAMES && badgeCount > 0 && (
                            <span className="absolute top-1.5 right-3 w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        )}
                    </button>
                );
            })}
        </div>
    );
};
