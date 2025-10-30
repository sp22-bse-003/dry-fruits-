import { Sparkles } from "lucide-react"

interface LogoProps {
  className?: string
  iconSize?: number
  textSize?: string
}

export function Logo({ className = "", iconSize = 24, textSize = "text-xl" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Icon with gradient background */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-amber-500 to-primary rounded-lg blur-sm opacity-75"></div>
        <div className="relative bg-gradient-to-br from-accent via-amber-500 to-primary p-1.5 rounded-lg shadow-lg">
          <Sparkles className="text-white" size={iconSize} strokeWidth={2.5} />
        </div>
      </div>
      
      {/* Text logo */}
      <div className="flex flex-col leading-none">
        <span className={`font-serif font-bold ${textSize} bg-gradient-to-r from-primary via-accent to-amber-600 bg-clip-text text-transparent`}>
          DryFruits
        </span>
        <span className="text-[0.6em] font-semibold tracking-wider text-accent/80 -mt-1">
          .PK
        </span>
      </div>
    </div>
  )
}
