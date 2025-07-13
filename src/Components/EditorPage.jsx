import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import Editor from '@monaco-editor/react';
import LanguageDropdown from './LanguageDropdown';
import UserList from './UserList';

const socket = io('http://localhost:5000');

export default function EditorPage() {
    const { roomId } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('javascript');
    const editorRef = useRef(null);

    useEffect(() => {
        if (!state?.username) {
            navigate('/');
            return;
        }

        socket.emit('join-room', { roomId, username: state.username });

        socket.on('user-list', (users) => {
            setUsers(users);
        });

        socket.on('code-change', (newCode) => {
            setCode(newCode);
        });

        socket.on('language-change', (newLanguage) => {
            setLanguage(newLanguage);
        });

        return () => {
            socket.off('user-list');
            socket.off('code-change');
            socket.off('language-change');
            socket.emit('leave-room', { roomId, username: state.username });
        };
    }, [roomId, state?.username, navigate]);

    const handleEditorChange = (value) => {
        setCode(value);
        socket.emit('code-change', { roomId, code: value });
    };

    const handleLanguageChange = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        socket.emit('language-change', { roomId, language: selectedLanguage });
    };

    const handleLeaveRoom = () => {
        socket.emit('leave-room', { roomId, username: state.username });
        navigate('/');
    };

    const handleCopyRoomId = () => {
        navigator.clipboard.writeText(roomId);
        alert('Room ID copied to clipboard!');
    };

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white flex flex-col">
                <UserList users={users} currentUser={state.username} />
                <div className="p-4 space-y-2 mt-auto">
                    <button
                        onClick={handleCopyRoomId}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200 text-sm"
                    >
                        Copy Room ID
                    </button>
                    <button
                        onClick={handleLeaveRoom}
                        className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md transition duration-200 text-sm"
                    >
                        Leave Room
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 flex flex-col">
                <div className="bg-gray-200 p-2">
                    <LanguageDropdown
                        selectedLanguage={language}
                        onChange={handleLanguageChange}
                    />
                </div>
                <div className="flex-1">
                    <Editor
                        height="100%"
                        language={language}
                        value={code}
                        onChange={handleEditorChange}
                        onMount={handleEditorDidMount}
                        theme="vs-dark"
                        options={{
                            fontSize: 14,
                            minimap: { enabled: false },
                            wordWrap: 'on'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}