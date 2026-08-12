type WeatherBackgroundProps = {
  weatherCode: number;
  children: React.ReactNode;
};

export default function WeatherBackground({ weatherCode, children }: WeatherBackgroundProps) {
  const isSunny = weatherCode === 0;
  const isCloudy = weatherCode >= 1 && weatherCode <= 3;
  const isRainy = weatherCode >= 51 && weatherCode <= 82;
  const isDusty = weatherCode >= 40 && weatherCode <= 49;

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-700 ${
  isSunny
    ? "bg-gradient-to-b from-orange-300 via-yellow-200 to-sky-100"
    : isRainy
    ? "bg-gradient-to-b from-slate-700 via-slate-600 to-slate-400"
    : isDusty
    ? "bg-gradient-to-b from-amber-300 via-yellow-600 to-amber-200"
    : isCloudy
    ? "bg-gradient-to-b from-blue-200 via-slate-200 to-slate-100"
    : "bg-slate-100"
}`}
    >
    
    {isSunny && (
  <div className="absolute top-16 right-16 w-64 h-64 flex items-center justify-center">
    <div className="absolute inset-0 animate-ray-spin">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 w-1 h-16 bg-yellow-300/70 rounded-full"
          style={{
            transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-140px)`,
          }}
        />
      ))}
    </div>
    <span className="relative text-8xl animate-sun-pulse drop-shadow-2xl">☀️</span>
  </div>
)}

      {isCloudy && (
  <>
    <div className="absolute top-4 left-[-10%] opacity-85 animate-float-cloud drop-shadow-2xl" style={{ fontSize: "10rem" }}>☁️</div>
    <div className="absolute top-36 left-1/4 opacity-75 animate-float-cloud drop-shadow-2xl" style={{ fontSize: "13rem", animationDelay: "2s" }}>☁️</div>
    <div className="absolute top-10 right-[-10%] opacity-80 animate-float-cloud drop-shadow-2xl" style={{ fontSize: "11rem", animationDelay: "4s" }}>☁️</div>
    <div className="absolute top-64 left-[10%] opacity-60 animate-float-cloud drop-shadow-xl" style={{ fontSize: "8rem", animationDelay: "1s" }}>☁️</div>
    <div className="absolute top-24 right-[15%] opacity-65 animate-float-cloud drop-shadow-xl" style={{ fontSize: "9rem", animationDelay: "5s" }}>☁️</div>
    <div className="absolute top-52 right-[35%] opacity-55 animate-float-cloud drop-shadow-xl" style={{ fontSize: "7rem", animationDelay: "3.5s" }}>☁️</div>
  </>
)}

      {isRainy && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-10 bg-blue-200/80 rounded-full animate-rain-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${0.4 + Math.random() * 0.4}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
      {isDusty && (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-amber-700/20 animate-dust-drift" />
    {Array.from({ length: 20 }).map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-amber-800/30 animate-dust-drift"
        style={{
          width: `${20 + Math.random() * 40}px`,
          height: `${20 + Math.random() * 40}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDuration: `${6 + Math.random() * 4}s`,
          animationDelay: `${Math.random() * 3}s`,
        }}
      />
    ))}
  </div>
)}
      <div className="relative z-10">{children}</div>
    </div>
  );
}