interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
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
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}

      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[800px] flex-col bg-white shadow-2xl">

        {/* Sticky Header */}

        <div className="flex items-center justify-end border-b bg-white px-6 py-5">

  {title && (
    <h2 className="mr-auto text-2xl font-bold text-slate-900">
      {title}
    </h2>
  )}

  <button
    onClick={onClose}
    className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
  >
    ✕
  </button>

</div>

        {/* Scrollable Content */}

        <div className="flex-1 overflow-y-auto p-6">

          {children}

        </div>

      </div>
    </>
  );
}