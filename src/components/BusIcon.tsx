const BusIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="15" rx="3" fill="currentColor" />
    <rect x="5" y="5" width="5" height="5" rx="1" fill="hsl(var(--primary-foreground))" opacity="0.9" />
    <rect x="14" y="5" width="5" height="5" rx="1" fill="hsl(var(--primary-foreground))" opacity="0.9" />
    <rect x="5" y="12" width="14" height="2" rx="0.5" fill="hsl(var(--primary-foreground))" opacity="0.3" />
    <circle cx="7.5" cy="20" r="2" fill="currentColor" />
    <circle cx="16.5" cy="20" r="2" fill="currentColor" />
    <rect x="4" y="17" width="16" height="2" fill="currentColor" />
  </svg>
);

export default BusIcon;
