export default function TokenSkeleton() {
  return (
    <div className="px-4 py-3 flex justify-between items-center animate-pulse">
      {/* Left */}
      <div className="space-y-2">
        <div className="h-4 w-24 rounded bg-[#1f1f24]" />
        <div className="h-3 w-12 rounded bg-[#1f1f24]" />
      </div>

      {/* Right */}
      <div className="space-y-2 text-right">
        <div className="h-4 w-16 rounded bg-[#1f1f24]" />
        <div className="h-3 w-10 rounded bg-[#1f1f24]" />
      </div>
    </div>
  );
}
