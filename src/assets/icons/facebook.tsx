import { LucideProps } from "lucide-react";
import React from "react";

const FacebookSvg = (props: React.RefAttributes<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="399"
        height="399"
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 399 399"
        id="facebook"
        {...props}
    >
        <g transform="translate(-194.969 -276.563)">
            <path fill="#3b5998" d="m 394.46875,276.5625 c -110.18364,0 -199.5,89.31636 -199.5,199.5 0,110.18364 89.31636,199.5 199.5,199.5 2.83069,0 5.63551,-0.0707 8.4375,-0.1875 l 0,-145.625 -30.09375,0 0,-50.1875 30.09375,0 0,-30.125 c 0,-40.94512 16.95752,-65.3125 65.1875,-65.3125 l 40.15625,0 0,50.21875 -25.09375,0 c -18.77812,0 -20.03125,7.0018 -20.03125,20.09375 l -0.0625,25.125 45.46875,0 -5.3125,50.1875 -40.15625,0 0,133.71875 c 76.39106,-27.97052 130.90625,-101.32528 130.90625,-187.40625 0,-110.18364 -89.31636,-199.5 -199.5,-199.5 z"></path>
            <path fill="#fff" d="m 468.09898,384.14138 c -48.22998,0 -65.1875,24.36738 -65.1875,65.3125 l 0,30.125 -30.09375,0 0,50.1875 30.09375,0 0,145.625 c 21.05631,-0.87731 41.2788,-4.99429 60.15625,-11.90625 l 0,-133.71875 40.15625,0 5.3125,-50.1875 -45.46875,0 0.0625,-25.125 c 0,-13.09195 1.25313,-20.09375 20.03125,-20.09375 l 25.09375,0 0,-50.21875 -40.15625,0 z"></path>
        </g>
    </svg>
);


export const FacebookIcon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>> = React.forwardRef((props, ref) => (
    <FacebookSvg {...props} ref={ref} />
));