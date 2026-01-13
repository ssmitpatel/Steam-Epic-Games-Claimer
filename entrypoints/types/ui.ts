export enum Tab {
    SETTINGS = 'SETTINGS',
    FREE_GAMES = 'FREE_GAMES',
    HISTORY = 'HISTORY',
}

export interface Game {
    id: string;
    title: string;
    platform: 'Steam' | 'Epic';
    image: string;
    claimedAt?: string;
    price: string;
}

export interface AppSettings {
    isEnabled: boolean;
    enableSteam: boolean;
    enableEpic: boolean;
    lastClaimDate: string | null;
}

export interface ClaimHistoryItem {
    id: string;
    gameTitle: string;
    platform: 'Steam' | 'Epic';
    date: string;
    status: 'Success' | 'Failed';
}
