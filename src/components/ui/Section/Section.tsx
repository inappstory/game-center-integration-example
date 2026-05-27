import React from "react";
import "./Section.scss";

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

export const Section = ({ title, children }: SectionProps) => {
    return (
        <section className="section">
            <h2 className="section__title">{title}</h2>

            <div className="section__buttons">{children}</div>
        </section>
    );
};
