import React from 'react';
import { Github, Mail, Coffee } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <div className="mt-auto py-3 border-t border-zinc-900">
            <div className="flex justify-center space-x-6 text-zinc-600">
                <a href="https://github.com/ssmitpatel/Steam-Epic-Games-Claimer" target="_blank" className="flex flex-col items-center hover:text-zinc-300 transition-colors gap-1.5 group">
                    <Github size={16} />
                    <span className="text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">GitHub</span>
                </a>
                <a href="https://smit-patel.me/#contact" target="_blank" className="flex flex-col items-center hover:text-zinc-300 transition-colors gap-1.5 group">
                    <Mail size={16} />
                    <span className="text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">Contact</span>
                </a>
                <a className="flex flex-col items-center hover:text-white transition-colors gap-1.5 group cursor-default">
                    <Coffee size={16} />
                    <span className="text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">Donate</span>
                </a>
            </div>
        </div>
    );
};