
import { LucideProps, SquarePenIcon, Trash2, FilePenLine, Plus } from "lucide-react";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { GoogleIcon } from '@/assets/icons/google';
import { FacebookIcon } from '@/assets/icons/facebook';

const ICON_KEYS = [
    "square-pen",
    "trash-2",
    "file-pen-line",
    "plus",
    "google",
    "facebook",
] as const;

export type IconType = typeof ICON_KEYS[number];

const IconMap = new Map<IconType, ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>>([
    ["square-pen", SquarePenIcon],
    ["trash-2", Trash2],
    ["file-pen-line", FilePenLine],
    ["plus", Plus],
    ["google", GoogleIcon],
    ["facebook", FacebookIcon],
]);

export interface IconProps extends Omit<LucideProps, "ref"> {
    name: IconType;
}

export const Icon = ({ name, ...iconProps }: IconProps) => {
    const IconComponent = IconMap.get(name);

    if (!IconComponent) {
        return null;
    }

    return (
        <>
            <IconComponent
                {...iconProps}
            />
        </>
    );
};