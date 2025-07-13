export default function UserList({ users, currentUser }) {
    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">
                Connected Users ({users.length})
            </h3>
            <ul className="space-y-2">
                {users.map((user, index) => (
                    <li
                        key={index}
                        className={`flex items-center py-2 px-3 rounded-md ${
                            user === currentUser
                                ? 'bg-blue-100 text-blue-800 font-medium'
                                : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                        <span className="flex-1">
                            {user} {user === currentUser && '(You)'}
                        </span>
                        {user === currentUser && (
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}