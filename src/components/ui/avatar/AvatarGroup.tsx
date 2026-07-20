import clsx from "clsx";

import { Avatar } from "@/components/ui/avatar";

import styles from "./AvatarGroup.module.css";

export interface AvatarGroupItem {
    readonly id: string;
    readonly alt: string;
    readonly src?: string;
    readonly initials?: string;
}

export interface AvatarGroupProps {
    readonly items: readonly AvatarGroupItem[];
    readonly max?: number;
    readonly size?: "small" | "medium" | "large" | "xlarge";
    readonly className?: string;
}

export default function AvatarGroup({
    items,
    max = 5,
    size = "medium",
    className,
}: AvatarGroupProps) {
    const visibleItems = items.slice(0, max);
    const remaining = items.length - visibleItems.length;

    return (
        <div
            className={clsx(
                styles.group,
                className,
            )}
        >
            {visibleItems.map((item) => (
                <div
                    key={item.id}
                    className={styles.item}
                >
                    <Avatar
                        src={item.src}
                        alt={item.alt}
                        initials={item.initials}
                        size={size}
                    />
                </div>
            ))}

            {remaining > 0 && (
                <div className={styles.item}>
                    <div
                        className={clsx(
                            styles.more,
                            styles[size],
                        )}
                    >
                        +{remaining}
                    </div>
                </div>
            )}
        </div>
    );
}