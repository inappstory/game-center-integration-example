import React from "react";
import "./BackgroundImage.scss";

interface BackgroundImageProps {
    src: string;
}

export const BackgroundImage = ({ src }: BackgroundImageProps) => {
    return <img src={src} className="background" />;
};
