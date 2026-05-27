import React from "react";
import "./Modal.scss";

interface ModalProps {
    title: string;
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal = ({ title, open, onClose, children }: ModalProps) => {
    if (!open) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal__header">
                    <h3>{title}</h3>

                    <button className="modal__close" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="modal__content">{children}</div>
            </div>
        </div>
    );
};
