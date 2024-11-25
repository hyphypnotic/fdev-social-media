export default function Chats() {
    return (
        <div className="grid h-screen grid-cols-[1fr_3fr]">
            <div className="col-span-1p-4 border-r">
                <h2 className="mb-4 text-gray-800 font-semibold">Chats</h2>
                <ul className="space-y-2">
                    <li className="text-gray-700">Chat 1</li>
                    <li className="text-gray-700">Chat 2</li>
                    <li className="text-gray-700">Chat 3</li>
                    <li className="text-gray-700">Chat 4</li>
                </ul>
            </div>
            <div className="col-span-1p-4 border-r">
                <h2 className="mb-4 text-gray-800 font-semibold">Chat</h2>
            </div>
        </div>
    );
}
