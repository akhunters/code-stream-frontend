
import { LucideProps, SquarePenIcon } from "lucide-react";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";

const ICON_KEYS = ["square-pen"] as const;

export type IconType = typeof ICON_KEYS[number];

const IconMap = new Map<IconType, ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>>([
    ["square-pen", SquarePenIcon],
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
        <IconComponent
            {...iconProps}
        />
    );
};