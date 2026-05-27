import React from "react";

interface ImageProps {
    src: string;
}

export const Image = ({ src }: ImageProps) => {
    return <img src={src} alt="placeholder" width={80} />;
};
