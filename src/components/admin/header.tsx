export function AdminHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-neutral-800 bg-black px-6">
      <h1 className="text-lg font-semibold text-white">
        Admin Dashboard
      </h1>

      <div className="text-sm text-neutral-400">
        Administrator
      </div>
    </header>
  );
}