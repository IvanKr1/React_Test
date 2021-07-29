import React, { useState, useEffect } from "react";
import "../../css/ArticleList.css";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

import { ROUTE_ARTICLE_PREFIX, ROUTE_ARTICLE_CREATE } from "../../constants";
import { listArticles } from "../../services/articles";
import FilterArticles from "../../components/FilterArticle/FilterArticles";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await listArticles();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  const getRegions = (value) => {
    setRegions(value);
  };

  // Sort by ascending order
  if (regions.length > 1) {
    regions.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
    });
  }

  const getTableRow = (id, title) => {
    return (
      <tr key={id}>
        <td>
          <Link to={`${ROUTE_ARTICLE_PREFIX}/${id}`}>{title}</Link>
        </td>
      </tr>
    );
  };

  const renderArticles = () =>
    articles.map((article) => {
      const { id, title } = article;
      let hasArticleRegions = article.regions.length > 0;
      let hasRegionsFilter = regions.length > 0;

      if (hasArticleRegions && hasRegionsFilter) {
        let deleteArticles_regions = article.regions.map((article) => {
          delete article.articles_regions;
          return article;
        });

        if (
          JSON.stringify(deleteArticles_regions) === JSON.stringify(regions)
        ) {
          return getTableRow(id, title);
        }
      }

      if (!hasRegionsFilter) {
        return getTableRow(id, title);
      }
    });

  return (
    <div className="ArticleList">
      <h1>Articles</h1>
      <div className="ArticleList__submenu">
        <Link className="d-block" to={ROUTE_ARTICLE_CREATE}>
          Create a new Article
        </Link>
        <FilterArticles getRegions={getRegions} />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>{renderArticles()}</tbody>
      </Table>
    </div>
  );
}

export default ArticleList;
