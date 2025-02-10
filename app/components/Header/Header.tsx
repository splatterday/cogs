import { Navigation } from "../Navigation/Navigation.tsx";
import "./Header.scss";

export const Header = () => {
    return (
        <nav>
            <h2>Discogs app</h2>
            <Navigation />
        </nav>
    )
}