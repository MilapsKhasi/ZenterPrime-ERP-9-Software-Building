/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown,
  LayoutDashboard,
  ShoppingCart,
  ShoppingBag,
  Users,
  Package,
  FileText,
  Settings as SettingsIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type NavItem = {
  label: string;
  modules?: string[];
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard' },
  { 
    label: 'Sales', 
    modules: ['Delivery Challans', 'Receipts', 'Sales Invoices', 'Credit Note', 'Payment Received'] 
  },
  { 
    label: 'Purchases', 
    modules: ['Purchase Orders', 'Purchase Bills', 'Debit Note', 'Payment Given'] 
  },
  { 
    label: 'Parties', 
    modules: ['Customers', 'Vendors'] 
  },
  { 
    label: 'Inventory', 
    modules: ['Items', 'Price List', 'Stocks'] 
  },
  { 
    label: 'Reports', 
    modules: ['Sales Register', 'Purchase Register', 'Profit and Loss Statement', 'Receivables', 'Payables', 'Ledger'] 
  },
  { label: 'Settings' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('Dashboard');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (label: string) => {
    setActiveTab(label);
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-tally-bg overflow-hidden select-none">
      {/* Navbar */}
      <header className="bg-tally-header text-white h-12 flex items-center px-4 shadow-md relative z-50" ref={navRef}>
        <nav className="flex items-center h-full space-x-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="relative h-full flex items-center">
              <button
                onClick={() => handleNavClick(item.label)}
                className={`h-full px-6 flex items-center space-x-2 text-sm font-medium transition-colors hover:bg-primary/40 ${activeTab === item.label ? 'bg-primary/60 border-b-2 border-accent' : ''} ${activeDropdown === item.label ? 'bg-primary/50' : ''}`}
              >
                <span>{item.label}</span>
                {item.modules && (
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} 
                  />
                )}
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {activeDropdown === item.label && item.modules && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-full bg-white border-x border-b border-slate-200 shadow-xl overflow-hidden min-w-[180px]"
                    style={{ width: '100%' }}
                  >
                    <div className="flex flex-col py-1">
                      {item.modules.map((module) => (
                        <button
                          key={module}
                          className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-primary hover:text-white transition-colors border-b border-slate-50 last:border-0"
                          onClick={() => {
                            setActiveDropdown(null);
                          }}
                        >
                          {module}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 bg-tally-bg overflow-y-auto p-4 space-y-6">
        {activeTab === 'Dashboard' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            {/* Dashboard Cards */}
            <div className="grid grid-cols-8 gap-4">
              {[
                { label: 'Sales', value: '₹ 0' },
                { label: 'Purchases', value: '₹ 0' },
                { label: 'Active Partners', value: '0' },
                { label: 'Receivables', value: '₹ 0' },
                { label: 'Payables', value: '₹ 0' },
                { label: 'Received', value: '₹ 0' },
                { label: 'Paid', value: '₹ 0' },
                { label: 'Balance', value: '₹ 0' },
              ].map((card) => (
                <div key={card.label} className="bg-white border border-slate-200 p-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-[10px] font-bold text-slate-500 uppercase text-left mb-1">{card.label}</div>
                  <div className="text-lg font-bold text-primary">{card.value}</div>
                </div>
              ))}
            </div>

            {/* Quick Create Section */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Quick Create</h2>
              <div className="flex flex-wrap gap-3">
                {[
                  'New Sales Entry',
                  'New Purch Entry',
                  'New Party Entry',
                  'New Item Entry',
                  'New DC Entry',
                  'New Rec Entry',
                ].map((btn) => (
                  <button 
                    key={btn}
                    className="bg-primary text-white px-4 py-2 text-xs font-bold shadow-sm hover:bg-tally-header transition-colors"
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Transactions Section */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Recent Transactions</h2>
              <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase text-slate-600">
                      <th className="p-3 border-r border-slate-200">Date</th>
                      <th className="p-3 border-r border-slate-200">Type</th>
                      <th className="p-3 border-r border-slate-200">Document</th>
                      <th className="p-3 border-r border-slate-200">Party Name</th>
                      <th className="p-3 border-r border-slate-200">Amount</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-slate-700">
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400 italic">
                        No transactions found.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Bottom Bar */}
      <footer className="bg-white border-t border-slate-200 h-10 flex items-center px-2 justify-between overflow-x-auto">
        <div className="flex items-center space-x-2">
          {[
            { key: 'F1', label: 'Help' },
            { key: 'F2', label: 'Date' },
            { key: 'F3', label: 'Search Invoice' },
            { key: 'F4', label: 'Calculator' },
            { key: 'F5', label: 'Refresh Data' },
            { key: 'F10', label: 'Print Last Bill' },
            { key: 'Esc', label: 'Close Module' },
          ].map((btn) => (
            <button 
              key={btn.key}
              className="flex-shrink-0 bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1 rounded text-[10px] font-bold flex items-center space-x-2 transition-colors"
            >
              <span className="text-primary">{btn.key}:</span>
              <span>{btn.label}</span>
            </button>
          ))}
        </div>
        <div className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          ZenterPrime ERP v26.3.1
        </div>
      </footer>
    </div>

  );
}
