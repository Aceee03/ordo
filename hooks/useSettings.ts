// hooks/useSettings.ts
'use client'
import { useState, useEffect } from 'react';

export interface ClinicSettings {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export const useSettings = () => {
  const [settings, setSettings] = useState<ClinicSettings>({
    name: "Clinique",
    address: "Ouargla", 
    phone: "0660865034",
    email: "info@smiledentalclinic.com"
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/settings');
      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }
      
      const data = await response.json();
      
      // Map database keys to our interface
      const clinicSettings: ClinicSettings = {
        name: data.clinicName || settings.name,
        address: data.clinicAddress || settings.address,
        phone: data.clinicPhone || settings.phone,
        email: data.clinicEmail || settings.email,
      };
      
      setSettings(clinicSettings);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: ClinicSettings): Promise<boolean> => {
    try {
      setError(null);
      
      // Map our interface to database keys
      const dbSettings = {
        clinicName: newSettings.name,
        clinicAddress: newSettings.address,
        clinicPhone: newSettings.phone,
        clinicEmail: newSettings.email,
      };
      
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dbSettings)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update settings');
      }
      
      // Update local state immediately for better UX
      setSettings(newSettings);
      return true;
    } catch (error) {
      console.error('Failed to update settings:', error);
      setError(error instanceof Error ? error.message : 'Failed to update settings');
      return false;
    }
  };

  const updateSingleSetting = async (key: keyof ClinicSettings, value: string): Promise<boolean> => {
    try {
      setError(null);
      
      // Map our interface key to database key
      const dbKey = {
        name: 'clinicName',
        address: 'clinicAddress', 
        phone: 'clinicPhone',
        email: 'clinicEmail'
      }[key];
      
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: dbKey, value })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update setting');
      }
      
      // Update local state
      setSettings(prev => ({ ...prev, [key]: value }));
      return true;
    } catch (error) {
      console.error('Failed to update setting:', error);
      setError(error instanceof Error ? error.message : 'Failed to update setting');
      return false;
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return { 
    settings, 
    updateSettings, 
    updateSingleSetting,
    loading, 
    error,
    refetch: fetchSettings 
  };
};