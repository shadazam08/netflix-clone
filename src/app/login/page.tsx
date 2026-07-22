import LoginForm from "@/components/auth/LoginForm";

import styles from './Page.module.css';

export const metadata = {
    title: "Login | Netflix Admin",
    description: "Netflix Admin Login",
};

export default function LoginPage() {
    return (
        <main className={styles.page}>
            <div className={styles.overlay} />

            <section className={styles.left}>
                <div className={styles.brand}>
                    <span className={styles.logo}>
                        NETFLIX
                    </span>

                    <h1 className={styles.heading}>
                        Admin Panel
                    </h1>

                    <p className={styles.description}>
                        Manage movies, TV shows, users,
                        categories, genres, homepage
                        sections and the complete
                        Netflix platform from one place.
                    </p>
                </div>
            </section>

            <section className={styles.right}>
                <LoginForm />
            </section>
        </main>
    );
}