import React from "react";
import "./Button.scss";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
    return (
        <button className="button" onClick={onClick}>
            {children}
        </button>
    );
};
