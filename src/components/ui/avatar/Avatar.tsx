"use client";

import Image from "next/image";
import clsx from "clsx";

import styles from "./Avatar.module.css";

export interface AvatarProps {
    readonly src?: string;
    readonly alt: string;
    readonly initials?: string;
    readonly size?: "small" | "medium" | "large" | "xlarge";
    readonly className?: string;
}

export default function Avatar({
    src,
    alt,
    initials,
    size = "medium",
    className,
}: AvatarProps) {
    return (
        <div
            className={clsx(
                styles.avatar,
                styles[size],
                className,
            )}
        >
            {src ? (
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="100vw"
                    className={styles.image}
                />
            ) : (
                <span className={styles.initials}>
                    {initials ??
                        alt
                            .split(" ")
                            .map((word) =>
                                word.charAt(0),
                            )
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                </span>
            )}
        </div>
    );
}