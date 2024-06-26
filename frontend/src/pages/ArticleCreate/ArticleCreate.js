import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ROUTE_ARTICLE_LIST } from "../../constants";
import { createArticle } from "../../services/articles";
import AuthorDropdown from "../../components/AuthorDropdown/AuthorDropdown";
import RegionDropdown from "../../components/RegionDropdown/RegionDropdown";

function ArticleCreate() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [regions, setRegions] = useState([]);
  const [author, setAuthor] = useState("");

  const handleSave = async () => {
    const payload = {
      title,
      content,
      regions,
      author: author.label === "" ? undefined: author.label,
      authorId: author.value === "" ? undefined: author.value,
    };
   
    if (title.length !== 0) {
      await createArticle(payload);
      history.push(ROUTE_ARTICLE_LIST);
    }
  
  };

  return (
    <div className="ArticleCreate">
      <h1>Create Article</h1>
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Content"
            rows="5"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Regions</Form.Label>
          <RegionDropdown
            value={regions}
            onChange={(regions) => setRegions(regions)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Authors</Form.Label>
          <AuthorDropdown
            value={author}
            onChange={(author) => setAuthor(author)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSave}>
          Save Article
        </Button>
      </Form>
    </div>
  );
}

export default ArticleCreate;
