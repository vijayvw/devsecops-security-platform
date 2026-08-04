interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Drawer({
  open,
  onClose,
  title,
  children,
}: DrawerProps) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40"
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-screen w-full max-w-md overflow-y-auto bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded p-2 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </>
  );
}
