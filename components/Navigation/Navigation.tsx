import Link from "next/link";
import styles from "./Navigation.module.scss";

export const Navigation = () => {
    return (
        <nav className={styles.navigation}>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/search">Search</Link>
                </li>
                <li>
                    <Link href="/collection">Collection</Link>
                </li>
                <li>
                    <Link href="/wantlist">Wantlist</Link>
                </li>
            </ul>
        </nav>
    )
}