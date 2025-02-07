import { Icon, IconType } from "./icon";

interface IconLinkProps {
    href: string;
    icon: IconType;
    label?: string;
    className?: string;
}

export const IconLink = ({ href, icon, className, label }: IconLinkProps) => (
    <a
        href={href}
        className="flex items-center space-x-2 text-primary font-light"
    >
        <Icon name={icon} className={className} strokeWidth={1} />
        {label && <span>{label}</span>}
    </a>
);

