'use client';
import React from 'react';
import { Button, buttonVariants } from '@/app/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/app/components/ui/menu-toggle-icon';
import { useScroll } from '@/app/components/ui/use-scroll';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);
	const { pathname } = useLocation();

	const isAdmissionPortal = pathname === '/get-quote' || pathname.endsWith('/get-quote');
	const isScrolledOrPortal = scrolled || isAdmissionPortal;

	const links = [
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'About',
			href: '/about',
		},
		{
			label: 'Services',
			href: '/services',
		},
		{
			label: 'Universities',
			href: '/events',
		},
		{
			label: 'Scholarships',
			href: '/venues',
		},
		{
			label: 'Contact',
			href: '/contact',
		},
	];

	React.useEffect(() => {
		if (open) {
			// Disable scroll
			document.body.style.overflow = 'hidden';
		} else {
			// Re-enable scroll
			document.body.style.overflow = '';
		}

		// Cleanup when component unmounts (important for Next.js)
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn(
				'absolute top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl border-b border-transparent md:transition-all md:ease-out',
				{
					'fixed top-0 md:top-4 md:max-w-4xl border-border bg-background/95 supports-[backdrop-filter]:bg-background/50 backdrop-blur-lg md:rounded-md md:shadow':
						isScrolledOrPortal && !open,
					'fixed inset-x-0 top-0 bg-background/90': open,
				},
			)}
		>
			<nav
				className={cn(
					'flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out',
					{
						'md:px-2': isScrolledOrPortal,
					},
				)}
			>
				<WordmarkIcon className={isScrolledOrPortal ? "text-[#1a1a1a]" : "text-white"} />
				<div className="hidden items-center gap-2 md:flex">
					{links.map((link, i) => {
						const isActive = pathname === link.href;
						return (
							<Link 
								key={i} 
								className={cn(
									"relative group px-4 py-2 text-sm font-medium transition-colors",
									isScrolledOrPortal ? "text-[#1a1a1a]/60 hover:text-[#1a1a1a]" : "text-white/70 hover:text-white"
								)} 
								to={link.href}
							>
								<span className="relative z-10">{link.label}</span>
								
								{/* Archival Brackets (Top/Bottom Lines) */}
								<motion.div
									initial={{ scaleX: 0, opacity: 0 }}
									whileHover={{ scaleX: 1, opacity: 1 }}
									className="absolute top-0 left-2 right-2 h-[1px] bg-[#d4af37]/40"
									transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
								/>
								
								{isActive ? (
									<motion.div
										layoutId="nav-underline"
										className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#d4af37]"
										transition={{ type: "spring", stiffness: 380, damping: 30 }}
									/>
								) : (
									<motion.div
										initial={{ scaleX: 0, opacity: 0 }}
										whileHover={{ scaleX: 1, opacity: 1 }}
										className="absolute bottom-0 left-2 right-2 h-[1px] bg-[#d4af37]/40"
										transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
									/>
								)}
							</Link>
						);
					})}
					<Link to="/get-quote">
						<Button>Admissions Portal</Button>
					</Link>
				</div>
				<Button 
					size="icon" 
					variant="outline" 
					onClick={() => setOpen(!open)} 
					className={cn("md:hidden bg-transparent border-transparent", isScrolledOrPortal ? "text-[#1a1a1a]" : "text-white")}
				>
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</nav>

			<div
				className={cn(
					'bg-background/90 fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y md:hidden',
					open ? 'block' : 'hidden',
				)}
			>
				<div
					data-slot={open ? 'open' : 'closed'}
					className={cn(
						'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
						'flex h-full w-full flex-col justify-between gap-y-2 p-4',
					)}
				>
					<div className="grid gap-y-2">
						{links.map((link) => (
							<Link
								key={link.label}
								className={buttonVariants({
									variant: 'ghost',
									className: 'justify-start',
								})}
								to={link.href}
							>
								{link.label}
							</Link>
						))}
					</div>
					<div className="flex flex-col gap-2">
						<Link to="/get-quote">
							<Button className="w-full">Admissions Portal</Button>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}

export const WordmarkIcon = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span 
    className={cn("text-lg md:text-xl font-bold tracking-[0.15em] flex items-center select-none cursor-pointer", className)} 
    style={{ fontFamily: '"Playfair Display", serif' }} 
    {...props}
  >
    GLOBAL<span className="text-[#d4af37] italic ml-1">PATH</span>
  </span>
);