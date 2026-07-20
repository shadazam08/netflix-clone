"use client";

import clsx from "clsx";

import styles from "./StepProgress.module.css";

export interface StepProgressItem {
    readonly id: string;
    readonly label: string;
}

export interface StepProgressProps {
    readonly steps: readonly StepProgressItem[];
    readonly currentStep: number;
    readonly className?: string;
}

export default function StepProgress({
    steps,
    currentStep,
    className,
}: StepProgressProps) {
    return (
        <div
            className={clsx(
                styles.container,
                className,
            )}
        >
            {steps.map((step, index) => {
                const completed =
                    index < currentStep;

                const active =
                    index === currentStep;

                return (
                    <div
                        key={step.id}
                        className={styles.item}
                    >
                        <div
                            className={clsx(
                                styles.circle,
                                completed &&
                                    styles.completed,
                                active &&
                                    styles.active,
                            )}
                        >
                            {index + 1}
                        </div>

                        <span
                            className={clsx(
                                styles.label,
                                active &&
                                    styles.activeLabel,
                            )}
                        >
                            {step.label}
                        </span>

                        {index <
                            steps.length - 1 && (
                            <div
                                className={clsx(
                                    styles.line,
                                    completed &&
                                        styles.completedLine,
                                )}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}