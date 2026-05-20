Stripe-Inspired Developer Section with Animated 3D Text Effect
Create a modern developer section layout with the following specifications:

Overall Layout
Dark background (#111) with 22px padding
Scrollable page with a "Scroll Down" section at the top (full viewport height with animated down arrow)
Main content card with max-width 1600px, centered, with these properties:
Rounded corners (10px border-radius)
Gradient background: linear-gradient(180deg, #f6f7fb, #f2f4f9)
Subtle border: white with 8% opacity
Box shadow: 0 18px 40px rgba(0,0,0,.10)
Padding: 32px
Content Sections
Top Decorative Border
2px solid border with color rgba(15,23,42,0.22)
Six "+" symbols positioned along the border at 6%, 22%, 38%, 54%, 70%, and 86%
Symbols: rgba(15,23,42,0.38), bold, 14px, positioned 10px above the line
Two-Column Grid (Docs & Social/Resources)
Left Column - Docs:

Header: "/ DOCS" (11px, extrabold, tracking 0.12em, uppercase, rgba(15,23,42,0.78))
Description: "Explore our guides and examples to integrate Stripe." (18px, semibold, rgba(15,23,42,0.88))
Button: "Learn more" (rounded-full, 32px height, border rgba(15,23,42,0.35), background rgba(255,255,255,0.25), hover effect)
Right Column - Social & Resources:

Two sections with headers "/ SOCIAL" and "/ RESOURCES"
Pill-shaped tags: 10px text, extrabold, uppercase, rounded 8px, border rgba(15,23,42,0.22), background rgba(255,255,255,0.65)
Social tags: YouTube, Twitter/X, Discord
Resource tags: Docs, Developer, Meetups
Middle Decorative Elements
Four "+" symbols positioned at left-8px, 32%, 62%, and right-8px
Color: rgba(15,23,42,0.35), bold, 14px
Bottom Meta Section
Globe icon (26px circle, border, centered SVG)
"Dev" pill badge
Copyright text: "© 2025 Stripe, Inc."
Footer Section with Hero Text
Border-top: rgba(15,23,42,0.12)
Three pill tags: Privacy, Legal, Stripe.com (positioned absolute right on desktop)
Main Feature: 3D Stacked "EVENT" Text with Animation
Text Specifications:

Text: "EVENT"
Font: Inter, weight 900
Font size: clamp(140px, 14vw, 220px) - responsive sizing
Letter spacing on h1: -0.04em
Letter spacing on text itself: 0.05em (makes it wider)
Uppercase
Centered alignment
3D Stacked Paper Effect:

Create 5 layers of the same text stacked vertically
Each layer has progressively reduced height and opacity:
Layer 1: height 0.9em, opacity 1
Layer 2: height calc(0.9em * 0.667), opacity 0.8
Layer 3: height calc(0.9em * 0.444), opacity 0.6
Layer 4: height calc(0.9em * 0.296), opacity 0.4
Layer 5: height calc(0.9em * 0.198), opacity 0.2
Each layer uses overflow-hidden and flex items-end
Line height: 0.9 on text, 0.8 on containers
Scroll-Triggered Animation (CRITICAL):

Use Motion library (from "motion" package: import { motion } from 'motion/react')
Use IntersectionObserver to detect when footer section is in view
Trigger settings: threshold 0.2, rootMargin '-100px 0px -100px 0px'
Animation should only play ONCE (check if isVisible is false before triggering)
Animation Details:

Each layer animates individually (use motion.span for each layer)
Initial state: y: -200, opacity: 0
Animated state: y: 0, opacity: [respective opacity value]
Duration: 1.2 seconds
Easing: [0.19, 1, 0.22, 1] (custom cubic-bezier)
Stagger: Each layer delays by 0.1s more than previous (delay: 0.1 + index * 0.1)
Creates cascading top-to-bottom slide effect
State Management:

- useState for isVisible (starts false)
- useRef for heroWordRef (attach to footer section)
- useEffect with IntersectionObserver
- Only set isVisible to true once when scrolling into view
Technical Requirements
Font family: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial'
Install motion package for animations
Fully responsive (grid changes to single column on mobile)
All colors use rgba format for precise opacity control
Padding: 120px vertical, 20px horizontal on text container