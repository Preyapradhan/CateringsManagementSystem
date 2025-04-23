import React, { useState } from 'react';
import { useAuthStore } from '../store/auth';
import { supabase } from '../lib/supabase';

function Profile() {
  const { user, updateProfile } = useAuthStore();
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName })
        .eq('id', user?.id);

      if (error) throw error;

      await updateProfile();
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Error updating profile. Please try again.');
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user?.email}
            disabled
            className="w-full px-4 py-2 border rounded-md bg-gray-50"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors
            ${saving ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

export default Profile;