import React from "react";
import { flattenObject } from "../../helpers";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "../ui/Table";

export interface VariableListProps {
    variables: Record<string, any>;
}

export const VariableList = ({ variables }: VariableListProps) => {
    const variableRows = flattenObject(variables);

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Variable</TableCell>
                        <TableCell>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {variableRows.map((variable, index) => (
                        <TableRow key={index}>
                            <TableCell>{variable.key}</TableCell>
                            <TableCell>{variable.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
