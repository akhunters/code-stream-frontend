import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import {
    LucideProps,
    SquarePenIcon,
    Trash2,
    FilePenLine,
    Plus,
    Loader2,
    CircleAlert,
    Home,
    RefreshCw
} from "lucide-react";

// Import custom icons
import { GoogleIcon } from '@/assets/icons/google';
import { FacebookIcon } from '@/assets/icons/facebook';

// 🫠 I like this approach because it's easy to add new icons and the code is clean.
// This will be useful to define a strict set of icons that can be used in the application. 🚀
// to follow the design system and avoid using random icons.
export const ICON_KEYS = [
    "square-pen",
    "trash-2",
    "file-pen-line",
    "plus",
    "google",
    "facebook",
    "loader-2",
    "circle-alert",
    "home",
    "refresh-cw"
] as const;


// Defining the type of the icon will ensure only valid icons are used.
export type IconType = typeof ICON_KEYS[number];

const IconMap = new Map<IconType, ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>>([
    ["square-pen", SquarePenIcon],
    ["trash-2", Trash2],
    ["file-pen-line", FilePenLine],
    ["plus", Plus],
    ["google", GoogleIcon],
    ["facebook", FacebookIcon],
    ["loader-2", Loader2],
    ["circle-alert", CircleAlert],
    ["home", Home],
    ["refresh-cw", RefreshCw]
]);

export interface IconProps extends Omit<LucideProps, "ref"> {
    name: IconType;
}

export const Icon = ({ name, ...iconProps }: IconProps) => {
    const IconComponent = IconMap.get(name);

    if (!IconComponent) {
        return null;
    }

    return (<IconComponent {...iconProps} />);
};