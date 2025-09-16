export default function Modal({ isOpen, onClose, title ,children }) {

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 ${!isOpen ? 'hidden': ''}`}>
      <div className="relative w-full max-w-2xl bg-violet-950 rounded-sm shadow-xl border border-gray-700">
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
