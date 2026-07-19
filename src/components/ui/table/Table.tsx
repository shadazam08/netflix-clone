import type {
    HTMLAttributes,
    ReactNode,
    TableHTMLAttributes,
} from "react";

import clsx from "clsx";

import styles from "./Table.module.css";

export interface TableProps
    extends TableHTMLAttributes<HTMLTableElement> {
    readonly children: ReactNode;
    readonly responsive?: boolean;
    readonly containerClassName?: string;
}

export interface TableSectionProps
    extends HTMLAttributes<
        HTMLTableSectionElement
    > {
    readonly children: ReactNode;
}

export interface TableRowProps
    extends HTMLAttributes<
        HTMLTableRowElement
    > {
    readonly children: ReactNode;
}

export interface TableCellProps
    extends HTMLAttributes<
        HTMLTableCellElement
    > {
    readonly children: ReactNode;
}

export interface TableHeaderCellProps
    extends HTMLAttributes<
        HTMLTableCellElement
    > {
    readonly children: ReactNode;
}

export function Table({
    children,
    responsive = true,
    containerClassName,
    className,
    ...props
}: TableProps) {
    const table = (
        <table
            {...props}
            className={clsx(
                styles.table,
                className,
            )}
        >
            {children}
        </table>
    );

    if (!responsive) {
        return table;
    }

    return (
        <div
            className={clsx(
                styles.container,
                containerClassName,
            )}
        >
            {table}
        </div>
    );
}

export function TableHead({
    children,
    className,
    ...props
}: TableSectionProps) {
    return (
        <thead
            {...props}
            className={clsx(
                styles.head,
                className,
            )}
        >
            {children}
        </thead>
    );
}

export function TableBody({
    children,
    className,
    ...props
}: TableSectionProps) {
    return (
        <tbody
            {...props}
            className={clsx(
                styles.body,
                className,
            )}
        >
            {children}
        </tbody>
    );
}

export function TableRow({
    children,
    className,
    ...props
}: TableRowProps) {
    return (
        <tr
            {...props}
            className={clsx(
                styles.row,
                className,
            )}
        >
            {children}
        </tr>
    );
}

export function TableHeaderCell({
    children,
    className,
    ...props
}: TableHeaderCellProps) {
    return (
        <th
            {...props}
            className={clsx(
                styles.headerCell,
                className,
            )}
        >
            {children}
        </th>
    );
}

export function TableCell({
    children,
    className,
    ...props
}: TableCellProps) {
    return (
        <td
            {...props}
            className={clsx(
                styles.cell,
                className,
            )}
        >
            {children}
        </td>
    );
}