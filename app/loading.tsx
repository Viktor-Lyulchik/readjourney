export default function Loading() {
  return (
    <div className="relative w-10 h-10 perspective-[67px]">
      <div className="w-full h-full bg-white absolute left-1/2 origin-[left] animate-[loader_2s_infinite_0.15s]"></div>
      <div className="w-full h-full bg-white absolute left-1/2 origin-[left] animate-[loader_2s_infinite_0.3s]"></div>
      <div className="w-full h-full bg-white absolute left-1/2 origin-[left] animate-[loader_2s_infinite_0.45s]"></div>
      <div className="w-full h-full bg-white absolute left-1/2 origin-[left] animate-[loader_2s_infinite_0.6s]"></div>
      <div className="w-full h-full bg-white absolute left-1/2 origin-[left] animate-[loader_2s_infinite_0.75s]"></div>
    </div>
  );
}
