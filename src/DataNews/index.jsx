import React from "react";
import SearchDataNews from "./getDataSearch";

export default class DataNews extends React.Component {
    render() {
        return (
            <div>
                <SearchDataNews />
            </div>
        );
    }
}

// halaman ini digunakan pada 'Komponen/Navbar' untuk mencari data berita
