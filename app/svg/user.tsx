export default function UserSVG({ className }: { className?: string }) {
    return (
        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <circle cx="12" cy="6" r="4" stroke="#1C274C" stroke-width="1.5" />
            <path d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z" stroke="#1C274C" stroke-width="1.5" />
        </svg>
    );
}