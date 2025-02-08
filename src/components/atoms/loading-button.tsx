"use client";

import React, { useState } from "react";
import { Button, ButtonProps } from "../ui/button";
import { Spinner } from "./spinner";
import { Icon } from "./icon";
import { toast } from "sonner";

interface Components {
    Loader?: React.ReactNode | null;
    Error?: React.ReactNode | null;
    Toaster?: {
        show: boolean;
        successMessage?: string;
        errorMessage?: string;
    } | null;
}

interface LoadingButtonProps extends Omit<ButtonProps, "onClick" | "onError"> {
    Components?: Components;
    hideChildrenWhileLoading?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

const defaultComponents: Components = {
    Loader: <Spinner size="small" />,
    Error: <Icon name="circle-alert" className="text-red-500" />,
    Toaster: null,
};

const LoadingButton = ({
    Components = defaultComponents,
    hideChildrenWhileLoading = false,
    onSuccess,
    onError,
    onClick,
    ...buttonProps
}: LoadingButtonProps) => {
    const [loading, setLoading] = useState(false);
    const [errorState, setErrorState] = useState(false);

    const components = {
        ...defaultComponents,
        ...Components,
    }

    const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            try {
                setLoading(true);
                setErrorState(false);
                await onClick(e);
                if (onSuccess) {
                    onSuccess();
                }

                if (Components.Toaster?.show && Components.Toaster?.successMessage) {
                    toast.success(Components.Toaster.successMessage);
                }
            } catch (error) {
                setErrorState(true);
                if (onError) {
                    onError(error as Error);
                }

                if (Components.Toaster?.show && Components.Toaster?.errorMessage) {
                    toast.error(Components.Toaster.errorMessage);
                }
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Button
            {...buttonProps}
            disabled={loading || buttonProps.disabled}
            onClick={handleOnClick}
        >
            {loading && components.Loader}
            {errorState && components.Error}
            {(hideChildrenWhileLoading && loading) ? null : buttonProps.children}
        </Button>
    )
};

export default LoadingButton;
