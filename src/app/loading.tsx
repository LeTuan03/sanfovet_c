import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="relative flex flex-col items-center">
        {/* Simple pulse animation for the logo during streaming transitions */}
        <div className="mb-6 animate-pulse opacity-70">
          <Image 
            src="/images/logo.png" 
            alt="Loading..." 
            width={100} 
            height={100} 
            className="h-auto w-auto grayscale brightness-110"
            priority
          />
        </div>

        {/* CSS Animation via inline style for simplicity in loading.tsx */}
        <div className="relative h-1 w-32 overflow-hidden rounded-full bg-slate-100">
          <div 
            className="absolute h-full w-full bg-[#199ad6]"
            style={{
              animation: 'loading-bar 1.5s infinite ease-in-out',
              left: '-100%'
            }}
          ></div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading-bar {
          0% { left: -100%; width: 30%; }
          50% { left: 0%; width: 60%; }
          100% { left: 100%; width: 30%; }
        }
      `}} />
    </div>
  );
}
