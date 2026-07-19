import clsx from "clsx";

import styles from "./Loader.module.css";

export type LoaderSize =
    | "small"
    | "medium"
    | "large";

export interface LoaderProps {
    readonly size?: LoaderSize;
    readonly fullScreen?: boolean;
    readonly text?: string;
    readonly className?: string;
}

export default function Loader({
    size = "medium",
    fullScreen = false,
    text,
    className,
}: LoaderProps) {
    const loader = (
        <div
            className={clsx(
                styles.loader,
                className,
            )}
        >
            <span
                className={clsx(
                    styles.spinner,
                    styles[size],
                )}
                aria-hidden="true"
            />

            {text && (
                <p className={styles.text}>
                    {text}
                </p>
            )}
        </div>
    );

    if (!fullScreen) {
        return loader;
    }

    return (
        <div className={styles.overlay}>
            {loader}
        </div>
    );
}