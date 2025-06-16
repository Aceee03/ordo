"use client";

import React, { useState, useEffect } from "react";
import {
  IconBuilding,
  IconUsers,
  IconDatabase,
  IconSettings,
  IconCheck,
  IconX,
  IconLoader2,
} from "@tabler/icons-react";
import Sidebar from "@/components/sidebar";
import { useSettings } from "@/hooks/useSettings";

interface SettingCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const SettingCard: React.FC<SettingCardProps> = ({
  title,
  description,
  icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="min-w-[16rem] max-w-[16rem] min-h-[16rem]
       bg-pink-200 rounded-2xl px-6 py-8 flex flex-col items-center gap-4
       hover:scale-105 transition-all hover:border-[1px] hover:border-pink-300 
       duration-200 justify-center shadow-sm hover:shadow-md"
    >
      <div className="text-pink-700 mb-2">{icon}</div>
      <h2 className="font-bold text-center break-words text-gray-800">
        {title}
      </h2>
      <p className="text-sm text-gray-600 text-center leading-relaxed">
        {description}
      </p>
    </button>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const SettingsPage: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [localSettings, setLocalSettings] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { settings, updateSettings, loading, error } = useSettings();

  // Update local settings when global settings change
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const settingsCards = [
    {
      title: "Clinic Information",
      description: "Update clinic name, address, contact details",
      icon: <IconBuilding size={32} />,
      key: "clinic",
    },
    {
      title: "Staff Management",
      description: "Manage dentists, hygienists, and staff accounts",
      icon: <IconUsers size={32} />,
      key: "staff",
    },
  ];

  const handleCardClick = (key: string) => {
    setActiveModal(key);
    setSaveStatus('idle');
  };

  const closeModal = () => {
    setActiveModal(null);
    setSaveStatus('idle');
    // Reset local settings to current saved settings
    setLocalSettings(settings);
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    setSaveStatus('idle');
    
    const success = await updateSettings(localSettings);
    
    if (success) {
      setSaveStatus('success');
      // Auto-close modal after successful save
      setTimeout(() => {
        closeModal();
      }, 1500);
    } else {
      setSaveStatus('error');
    }
    
    setSaving(false);
  };

  const getSaveButtonContent = () => {
    if (saving) {
      return (
        <>
          <IconLoader2 size={16} className="animate-spin mr-2" />
          Saving...
        </>
      );
    }
    
    if (saveStatus === 'success') {
      return (
        <>
          <IconCheck size={16} className="mr-2" />
          Saved!
        </>
      );
    }
    
    if (saveStatus === 'error') {
      return (
        <>
          <IconX size={16} className="mr-2" />
          Failed to Save
        </>
      );
    }
    
    return 'Save Changes';
  };

  const getSaveButtonClass = () => {
    const baseClass = "w-full py-2 rounded-lg transition-colors flex items-center justify-center";
    
    if (saving) {
      return `${baseClass} bg-gray-400 text-white cursor-not-allowed`;
    }
    
    if (saveStatus === 'success') {
      return `${baseClass} bg-green-600 text-white`;
    }
    
    if (saveStatus === 'error') {
      return `${baseClass} bg-red-600 text-white hover:bg-red-700`;
    }
    
    return `${baseClass} bg-pink-600 text-white hover:bg-pink-700`;
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case "clinic":
        return (
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Clinic Name
              </label>
              <input
                type="text"
                value={localSettings.name}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, name: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                disabled={saving}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                value={localSettings.address}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    address: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                rows={3}
                disabled={saving}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={localSettings.phone}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    phone: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                disabled={saving}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={localSettings.email}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    email: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                disabled={saving}
              />
            </div>
            
            <button 
              className={getSaveButtonClass()}
              onClick={handleSaveSettings}
              disabled={saving || saveStatus === 'success'}
            >
              {getSaveButtonContent()}
            </button>
          </div>
        );
        
      default:
        return (
          <div className="text-center py-8">
            <IconSettings size={48} className="mx-auto text-pink-600 mb-4" />
            <p className="text-gray-600">
              Settings for {activeModal} are coming soon.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              This feature will be implemented in a future update.
            </p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div>
        <Sidebar />
        <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
          <div className="text-center">
            <IconLoader2 size={48} className="mx-auto text-pink-600 mb-4 animate-spin" />
            <p className="text-gray-600">Loading settings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Sidebar />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
            <p className="text-gray-600">
              Configure your dental clinic management system
            </p>
            
            {/* Display current clinic info */}
            <div className="mt-4 p-4 bg-white rounded-lg border">
              <h3 className="font-semibold text-gray-800 mb-2">Current Clinic Information:</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Name:</strong> {settings.name}</p>
                <p><strong>Address:</strong> {settings.address}</p>
                <p><strong>Phone:</strong> {settings.phone}</p>
                <p><strong>Email:</strong> {settings.email}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {settingsCards.map((card) => (
              <SettingCard
                key={card.key}
                title={card.title}
                description={card.description}
                icon={card.icon}
                onClick={() => handleCardClick(card.key)}
              />
            ))}
          </div>

          <Modal
            isOpen={activeModal !== null}
            onClose={closeModal}
            title={
              settingsCards.find((card) => card.key === activeModal)?.title ||
              "Settings"
            }
          >
            {renderModalContent()}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;