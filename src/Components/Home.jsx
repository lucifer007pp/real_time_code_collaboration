import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';

export default function Home() {
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username) return alert('Please enter a username');

        const id = roomId || uuidV4();
        navigate(`/editor/${id}`, { state: { username } });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">CodeCollab</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="roomId" className="block text-sm font-medium text-gray-700 mb-1">
                            Room ID (leave empty to create new)
                        </label>
                        <input
                            type="text"
                            id="roomId"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter room ID"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition duration-200"
                    >
                        {roomId ? 'Join Room' : 'Create Room'}
                    </button>
                </form>
            </div>
        </div>
    );
}