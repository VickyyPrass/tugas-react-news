import React from "react";
import SearchDataNews from "../DataNews/getDataSearch";
import NavbarApp from "./Navbar";

export default class ArtikelApp extends React.Component {
    render() {
        return (
            <div>
                <NavbarApp />
                <SearchDataNews />
            </div>
        );
    }
}
