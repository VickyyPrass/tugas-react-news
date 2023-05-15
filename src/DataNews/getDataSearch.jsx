import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "./style.scss";

function SearchDataNews() {
    const [query, setSearchQuery] = useState();
    const [searchData, setSearchData] = useState();
    const [news, setNews] = useState();

    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        try {
            const data = await fetch(
                "https://newsapi.org/v2/top-headlines?country=id&apiKey=999dc387a7244a4eb28079302f245880"
            );
            const res = await data.json();
            setNews(res.articles);
        } catch (error) {
            console.log(error);
        }
    };

    // ketika tombol cari di klik akan mencari data yang sesuai dengan nilai input
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newsUrl = `https://newsapi.org/v2/everything?sortBy=relevancy&sortBy=publishedAt&apikey=999dc387a7244a4eb28079302f245880&q=`;
            const dataResponse = await fetch(newsUrl + query);
            const { articles } = await dataResponse.json();

            setSearchData(articles);
        } catch (error) {
            console.log(error);
        }
        e.target.reset();
    };

    return (
        <div className="search-area-news">
            <Container>
                <Form className="d-flex" onSubmit={handleSubmit}>
                    <Form.Control
                        type="search"
                        placeholder="Search..."
                        className="me-2"
                        aria-label="Search"
                        onChange={(e) =>
                            setSearchQuery(e.target.value.toLowerCase())
                        }
                    />
                    <Button variant="success" type="submit">
                        Search
                    </Button>
                </Form>
            </Container>

            <Container className="data_article">
                {/* MAIN ARTICLE */}
                <main className="sidebar__main">
                    <h5 className="mt-4 mb-4">Our News</h5>

                    {/* show data search */}
                    {searchData &&
                        searchData.map((data, index) => {
                            return (
                                <div key={index}>
                                    <Card className="card-news mb-4">
                                        <Card.Body className="card-news d-flex position-relative p-3">
                                            <Card.Img
                                                src={data.urlToImage}
                                                className="flex-shrink-0 me-3"
                                                alt={data.author}
                                                style={{ width: "150px" }}
                                            />
                                            <div>
                                                <h5 className="mt-0 title-news">
                                                    {data.title}
                                                </h5>
                                                <p>
                                                    {data.description.substr(
                                                        0,
                                                        250
                                                    )}
                                                    ...
                                                </p>
                                                <p className="card-text">
                                                    <small className="text-muted">
                                                        Last updated{" "}
                                                        {data.publishedAt.substr(
                                                            0,
                                                            10
                                                        )}
                                                    </small>
                                                </p>
                                                <a
                                                    href={data.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="stretched-link btn btn-primary"
                                                >
                                                    Read more
                                                </a>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        })}
                </main>

                {/* sidebar */}
                <aside className="sidebar__sidebar">
                    <h5>Breaking News</h5>
                    <div className="container-top-headline-news">
                        {news &&
                            news.map((data, index) => {
                                return (
                                    <div key={index}>
                                        <Card className="card-news mb-4">
                                            <Card.Body className="card-news d-flex position-relative p-3">
                                                <p className="mt-0 title-news fw-bold">
                                                    {data.title.substr(0, 75)}
                                                    ...
                                                </p>
                                            </Card.Body>
                                            <p className="card-text p-1">
                                                <small className="text-muted">
                                                    Last updated{" "}
                                                    {data.publishedAt.substr(
                                                        0,
                                                        10
                                                    )}
                                                </small>
                                            </p>
                                            <a
                                                href={data.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="stretched-link"
                                            ></a>
                                        </Card>
                                    </div>
                                );
                            })}
                    </div>
                </aside>
            </Container>
        </div>
    );
}

export default SearchDataNews;
