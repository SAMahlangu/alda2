import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare, Mic, FileText, Calculator } from 'lucide-react';

const Sidebar = () => {
  const links = [
    { to: '/text-to-speech', icon: MessageSquare, label: 'Texte en Parole' },
    { to: '/speech-to-text', icon: Mic, label: 'Parole en Texte' },
    { to: '/french-pdf', icon: FileText, label: 'Lecteur PDF' },
    { to: '/calculator', icon: Calculator, label: 'Calculatrice' },
  ];

  return (
    <nav className="w-64 bg-white shadow-lg">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-8">Application Multi-Outils</h2>
        <ul className="space-y-2">
          {links.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;