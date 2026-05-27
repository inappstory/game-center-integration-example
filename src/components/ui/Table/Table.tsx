import React, { PropsWithChildren } from "react";
import "./Table.scss";

export const TableContainer = ({ children }: PropsWithChildren) => {
    return <div className="table-container">{children}</div>;
};

export const Table = ({ children }: PropsWithChildren) => {
    return <table className="table">{children}</table>;
};

export const TableHead = ({ children }: PropsWithChildren) => {
    return <thead className="table-head">{children}</thead>;
};

export const TableBody = ({ children }: PropsWithChildren) => {
    return <tbody className="table-body">{children}</tbody>;
};

export const TableRow = ({ children }: PropsWithChildren) => {
    return <tr className="table-row">{children}</tr>;
};

interface TableCellProps extends PropsWithChildren {
    isHeader?: boolean;
}

export const TableCell = ({ children, isHeader = false }: TableCellProps) => {
    if (isHeader) {
        return <th className="table-cell table-cell--header">{children}</th>;
    }

    return <td className="table-cell">{children}</td>;
};
