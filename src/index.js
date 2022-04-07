const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const oldRepository = repositories.find(repository => repository.id === id);
  const newRepository = {...oldRepository}
  

  let repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex === -1) {
    return response.status(404).json({ error: "Repository not found" });
  }
  newRepository.title = title;
  newRepository.url = url;
  newRepository.techs = techs;
  return response.json(newRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if (repositoryIndex === -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  let repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex === -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const likes = ++repositories[repositoryIndex].likes;
  repositories[repositoryIndex].likes = likes;

  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
