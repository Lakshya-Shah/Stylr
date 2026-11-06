'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Ruler } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'shirts' | 'tshirts' | 'trousers' | 'coords'>('shirts');
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isSizeGuideOpen) return null;

  const data = {
    shirts: {
      headers: ['Size', 'Chest', 'Shoulder', 'Length', 'Sleeve'],
      inches: [
        ['S', '38', '17.5', '28.5', '9.0'],
        ['M', '40', '18.2', '29.5', '9.5'],
        ['L', '42', '19.0', '30.5', '10.0'],
        ['XL', '44', '19.8', '31.5', '10.5'],
        ['XXL', '46', '20.5', '32.5', '11.0']
      ],
      cm: [
        ['S', '96.5', '44.5', '72.4', '22.8'],
        ['M', '101.6', '46.2', '74.9', '24.1'],
        ['L', '106.7', '48.3', '77.5', '25.4'],
        ['XL', '111.8', '50.3', '80.0', '26.7'],
        ['XXL', '116.8', '52.1', '82.5', '27.9']
      ]
    },
    tshirts: {
      headers: ['Size', 'Chest', 'Shoulder', 'Length'],
      inches: [
        ['S', '39', '19.0', '27.0'],
        ['M', '41', '19.8', '28.0'],
        ['L', '43', '20.5', '29.0'],
        ['XL', '45', '21.2', '30.0'],
        ['XXL', '47', '22.0', '31.0']
      ],
      cm: [
        ['S', '99.0', '48.3', '68.6'],
        ['M', '104.1', '50.3', '71.1'],
        ['L', '109.2', '52.1', '73.7'],
        ['XL', '114.3', '53.8', '76.2'],
        ['XXL', '119.4', '55.9', '78.7']
      ]
    },
    trousers: {
      headers: ['Size', 'Waist', 'Hip', 'Inseam', 'Thigh'],
      inches: [
        ['S (30)', '30-31', '39.0', '30.0', '24.0'],
        ['M (32)', '32-33', '41.0', '30.5', '25.0'],
        ['L (34)', '34-35', '43.0', '31.0', '26.0'],
        ['XL (36)', '36-37', '45.0', '31.5', '27.0'],
        ['XXL (38)', '38-39', '47.0', '32.0', '28.0']
      ],
      cm: [
        ['S (30)', '76-78', '99.0', '76.2', '61.0'],
        ['M (32)', '81-84', '104.1', '77.5', '63.5'],
        ['L (34)', '86-89', '109.2', '78.7', '66.0'],
        ['XL (36)', '91-94', '114.3', '80.0', '68.6'],
        ['XXL (38)', '96-99', '119.4', '81.3', '71.1']
      ]
    },
    coords: {
      headers: ['Size', 'Shirt Chest', 'Shirt Length', 'Shorts Waist', 'Inseam'],
      inches: [
        ['S', '40', '28.0', '29-31', '6.5'],
        ['M', '42', '29.0', '32-34', '7.0'],
        ['L', '44', '30.0', '34-36', '7.5'],
        ['XL', '46', '31.0', '36-38', '8.0']
      ],
      cm: [
        ['S', '101.6', '71.1', '73-78', '16.5'],
        ['M', '106.7', '73.7', '81-86', '17.8'],
        ['L', '111.8', '76.2', '86-91', '19.0'],
        ['XL', '116.8', '78.7', '91-96', '20.3']
      ]
    }
  };

  const currentTable = data[activeTab];
  const rows = unit === 'inches' ? currentTable.inches : currentTable.cm;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF9F6] border border-[#E5DED4] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative">
        <div className="flex justify-between items-center pb-4 border-b border-[#E5DED4] mb-6">
          <div className="flex items-center space-x-2">
            <Ruler className="w-5 h-5 text-[#A77B55]" />
            <h3 className="font-serif text-2xl tracking-wide text-[#242321]">Garment Measurement Guide</h3>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="text-[#77716B] hover:text-[#242321] p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Tab & Unit Switcher */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <div className="flex space-x-1 border-b border-[#E5DED4] sm:border-0 overflow-x-auto pb-1 sm:pb-0">
            {(['shirts', 'tshirts', 'trousers', 'coords'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-xs uppercase tracking-widest transition-colors font-medium ${
                  activeTab === tab
                    ? 'bg-[#29221D] text-[#FAF9F6]'
                    : 'text-[#77716B] hover:text-[#242321] hover:bg-[#F5F1E9]'
                }`}
              >
                {tab === 'tshirts' ? 'T-Shirts' : tab === 'coords' ? 'Co-ords' : tab}
              </button>
            ))}
          </div>

          <div className="flex items-center self-end sm:self-auto border border-[#E5DED4] text-xs">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 font-medium transition-colors ${
                unit === 'inches' ? 'bg-[#A77B55] text-white' : 'text-[#77716B] hover:text-[#242321]'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 font-medium transition-colors ${
                unit === 'cm' ? 'bg-[#A77B55] text-white' : 'text-[#77716B] hover:text-[#242321]'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left text-xs border border-[#E5DED4]">
            <thead>
              <tr className="bg-[#F5F1E9] border-b border-[#E5DED4] text-[#242321]">
                {currentTable.headers.map((h, i) => (
                  <th key={i} className="py-3 px-4 font-semibold uppercase tracking-wider">
                    {h} {unit === 'inches' && i > 0 ? '(in)' : unit === 'cm' && i > 0 ? '(cm)' : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DED4]">
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-[#F5F1E9]/50 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={`py-3 px-4 ${cIdx === 0 ? 'font-semibold text-[#242321]' : 'text-[#77716B]'}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fitting notes */}
        <div className="bg-[#F5F1E9] p-4 text-xs text-[#77716B] space-y-1.5 border border-[#E5DED4]">
          <p className="font-semibold text-[#242321] uppercase tracking-wider">How to Measure</p>
          <p>• <strong>Chest:</strong> Measure around the fullest part of your chest, keeping tape comfortably horizontal.</p>
          <p>• <strong>Waist:</strong> Measure around your natural waistline, where your trousers naturally sit.</p>
          <p>• <strong>Fit Philosophy:</strong> STYLR silhouettes are cut for relaxed contemporary elegance. If you prefer a tailored fit, choose your exact size. For an oversized editorial look, size up one step.</p>
        </div>
      </div>
    </div>
  );
};
