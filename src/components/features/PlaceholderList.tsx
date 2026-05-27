import React from "react";
import { Placeholder, PlaceholderType } from "@inappstory/game-center-api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "../ui/Table";
import { Image } from "../ui/Image";

export interface PlaceholderListProps {
    placeholders: Placeholder[];
}

export const PlaceholderList = ({ placeholders }: PlaceholderListProps) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {placeholders.map((placeholder, index) => (
                        <TableRow key={index}>
                            <TableCell>{placeholder.name}</TableCell>
                            <TableCell>{placeholder.type}</TableCell>
                            <TableCell>{placeholder.type === PlaceholderType.TEXT ? placeholder.value : <Image src={placeholder.value} />}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
