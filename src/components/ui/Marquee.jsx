import { TechIcon } from '../Icons'

export default function Marquee({ items, reverse = false, speed = 32 }) {
  const doubled = [...items, ...items]

  return (
    <div className="mask-fade-x group relative flex overflow-hidden">
      <div
        className="flex w-max shrink-0 items-center gap-4 animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {doubled.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 backdrop-blur-md transition-colors duration-300 hover:border-brand-400/45 hover:bg-brand-400/10"
          >
            <TechIcon name={item.icon} className="h-4 w-4 text-brand-300" />
            <span className="whitespace-nowrap text-[13px] font-medium text-slate-300">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
