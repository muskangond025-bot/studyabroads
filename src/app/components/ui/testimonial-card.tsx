import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/app/components/ui/avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ 
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'
  
  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-lg border-t-2",
        "p-4 text-start sm:p-6",
        "max-w-[320px] sm:max-w-[320px]",
        "transition-all duration-300",
        "hover:scale-105 hover:shadow-xl",
        className
      )}
      style={{
        borderTopColor: 'var(--color-champagne)',
        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(128, 0, 32, 0.3) 100%)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 ring-2" style={{ ringColor: 'var(--color-champagne)' }}>
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-md leading-none" style={{ color: 'var(--color-champagne)', fontWeight: 600 }}>
            {author.name}
          </h3>
          <p className="text-sm mt-1" style={{ color: 'var(--color-champagne-light)' }}>
            {author.handle}
          </p>
        </div>
      </div>
      <p className="sm:text-md mt-4 text-sm leading-relaxed" style={{ color: 'white' }}>
        {text}
      </p>
    </Card>
  )
}