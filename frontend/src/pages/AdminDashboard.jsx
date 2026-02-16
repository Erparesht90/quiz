import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [settings, setSettings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingDetails, setEditingDetails] = useState(null); // mode being edited
    const navigate = useNavigate();

    // Fetch Settings
    useEffect(() => {
        const fetchSettings = async () => {
            const token = localStorage.getItem('adminToken');
            if (!token) return navigate('/admin/login');

            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
                const res = await axios.get(`${API_URL}/admin.php/settings`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSettings(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Fetch error", error);
                localStorage.removeItem('adminToken');
                navigate('/admin/login');
            }
        };
        fetchSettings();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    const handleToggle = async (mode) => {
        const token = localStorage.getItem('adminToken');
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
            await axios.put(`${API_URL}/admin.php/toggle/${mode}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Optimistic update or refetch
            setSettings(settings.map(s => s.mode === mode ? { ...s, is_enabled: !s.is_enabled } : s));
        } catch (error) {
            alert("Failed to toggle mode");
        }
    };

    const handleEditClick = (setting) => {
        setEditingDetails({ ...setting });
    };

    const handleSave = async () => {
        const token = localStorage.getItem('adminToken');
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
            await axios.put(`${API_URL}/admin.php/settings/${editingDetails.mode}`, editingDetails, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setSettings(settings.map(s => s.mode === editingDetails.mode ? editingDetails : s));
            setEditingDetails(null);
        } catch (error) {
            alert("Failed to update settings");
        }
    };

    if (loading) return <div className="p-8 text-center">Loading Dashboard...</div>;

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
                <button onClick={handleLogout} className="text-red-600 hover:text-red-800 font-medium">Logout</button>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Mode</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                            <th className="p-4 font-semibold text-gray-600">Range</th>
                            <th className="p-4 font-semibold text-gray-600">Questions</th>
                            <th className="p-4 font-semibold text-gray-600">Time (s)</th>
                            <th className="p-4 font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {settings.map(s => (
                            <tr key={s.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-bold capitalize">{s.mode}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${s.is_enabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {s.is_enabled ? 'Active' : 'Disabled'}
                                    </span>
                                </td>
                                <td className="p-4">{s.min_number} - {s.max_number}</td>
                                <td className="p-4">{s.question_count}</td>
                                <td className="p-4">{s.time_limit}s</td>
                                <td className="p-4 space-x-2">
                                    <button
                                        onClick={() => handleToggle(s.mode)}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        Toggle
                                    </button>
                                    <button
                                        onClick={() => handleEditClick(s)}
                                        className="text-sm text-gray-600 hover:text-primary hover:underline"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {editingDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4 capitalize">Edit {editingDetails.mode} Settings</h3>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Min Number</label>
                                    <input
                                        type="number"
                                        className="w-full border p-2 rounded"
                                        value={editingDetails.min_number}
                                        onChange={(e) => setEditingDetails({ ...editingDetails, min_number: parseInt(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Max Number</label>
                                    <input
                                        type="number"
                                        className="w-full border p-2 rounded"
                                        value={editingDetails.max_number}
                                        onChange={(e) => setEditingDetails({ ...editingDetails, max_number: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Questions Count</label>
                                <input
                                    type="number"
                                    className="w-full border p-2 rounded"
                                    value={editingDetails.question_count}
                                    onChange={(e) => setEditingDetails({ ...editingDetails, question_count: parseInt(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Time Limit (seconds)</label>
                                <input
                                    type="number"
                                    className="w-full border p-2 rounded"
                                    value={editingDetails.time_limit}
                                    onChange={(e) => setEditingDetails({ ...editingDetails, time_limit: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                onClick={() => setEditingDetails(null)}
                                className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 text-white bg-primary rounded hover:bg-secondary"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
