import { Icon, IconType } from "./icon";

interface IconButtonProps {
    href: string;
    icon: IconType;
    label?: string;
    className?: string;
    onClick?: () => void;
}

export const IconButton = ({ href, icon, className, label, onClick }: IconButtonProps) => (
    <a
        href={href}
        onClick={onClick}
        className="flex items-center space-x-2 text-primary font-light"
    >
        <Icon name={icon} className={className} strokeWidth={1} />
        {label && <span>{label}</span>}
    </a>
);

