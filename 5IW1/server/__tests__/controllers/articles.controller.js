const request = require("supertest");

afterAll(() => {
  const { connection } = require("../../models");
  connection.close();
});

afterEach(() => {
  const { connection } = require("../../models");
  connection.query('DELETE FROM "Articles"');
});

describe("Articles", () => {
      
  it("should create a article", async () => {
    const app = require("../../app");
    const client = request(app);
    const body = {
      title: "Article 1",
    };
    const res = await client  
      .post("/articles")
      .set("Content-Type", "application/json")
      .send(body);
      expect(res.status).toBe(201);
      expect(res.body.id).toBeDefined();
      expect(res.body.title).toBe("Article 1");
      expect(res.body.updatedAt).toBeDefined();
      expect(res.body.createdAt).toBeDefined();
  });

  it("should not create a article with wrong parameters", async () => {
    const app = require("../../app");
    const client = request(app);
    const body = {};
    const res = await client 
      .post("/articles")
      .set("Content-Type", "application/json")
      .send(body);
      expect(res.status).toBe(400);
      //console.log(res.body);
      expect(res.body.length).toBe(1);
      expect(res.body[0].path).toBe("name");
      expect(res.body[0].message).toBe("Article.name cannot be null");
    });

    it("should not create a article and crash with 500", async () => {
      const body = {};
      jest.resetModules();
      jest.mock("../../models", () => {
        return {
          Article: {
            create: () => {
              throw new Error("Mock error");
            } 
          }
        };
      });
    });

    it('should update a article', async () => {
      const app = require("../../app");
      const client = request(app);
      const body = {
        title: "Article 1",
      };
      const res = await client
        .post("/articles")
        .set("Content-Type", "application/json")
        .send(body);
      expect(res.status).toBe(201);
      expect(res.body.id).toBeDefined();
      expect(res.body.title).toBe("Article 1");
      expect(res.body.updatedAt).toBeDefined();
      expect(res.body.createdAt).toBeDefined();
      const body2 = {
        title: "Article 1 updated",
      };
      const res2 = await client
        .put(`/articles/${res.body.id}`)
        .set("Content-Type", "application/json")
        .send(body2);
      expect(res2.status).toBe(200);
      expect(res2.body.id).toBeDefined();
      expect(res2.body.title).toBe("Article 1 updated");
      expect(res2.body.updatedAt).toBeDefined();
      expect(res2.body.createdAt).toBeDefined();
    });

    it('should not update a article with wrong parameters', async () => {
      const app = require("../../app");
      const client = request(app);
      const body = {};
      const res = await client
        .post("/articles")
        .set("Content-Type", "application/json")
        .send(body);
      expect(res.status).toBe(201);
      expect(res.body.id).toBeDefined();
      expect(res.body.title).toBe("Article bis");
      expect(res.body.updatedAt).toBeDefined();
      expect(res.body.createdAt).toBeDefined();
      const body2 = {
        title: "Article 1 updated",
      };
      const res2 = await client
        .put(`/articles/${res.body.id}`)
        .set("Content-Type", "application/json")
        .send(body2);
      expect(res2.status).toBe(400);
      expect(res2.body.length).toBe(1);
      expect(res2.body[0].path).toBe("name");
      expect(res2.body[0].message).toBe("Article.name cannot be null");
    });

    it('should not update a article and crash with 500', async () => {
      const body = {};
      jest.resetModules();
      jest.mock("../../models", () => {
        return {
          Article: {
            update: () => {
              throw new Error("Mock error");
            }
          }
        };
      });
    });

    it('should delete a article', async () => {
      const app = require("../../app");
      const client = request(app);
      const body = {
        title: "Article 1",
      };
      const res = await client
        .post("/articles")
        .set("Content-Type", "application/json")
        .send(body);
      expect(res.status).toBe(201);
      expect(res.body.id).toBeDefined();
      expect(res.body.title).toBe("Article 1");
      expect(res.body.updatedAt).toBeDefined();
      expect(res.body.createdAt).toBeDefined();
      const res2 = await client.delete(`/articles/${res.body.id}`);
      expect(res2.status).toBe(200);
      expect(res2.body.id).toBeDefined();
      expect(res2.body.title).toBe("Article 1");
      expect(res2.body.updatedAt).toBeDefined();
      expect(res2.body.createdAt).toBeDefined();
    });

    it('should not delete a article with wrong parameters', async () => {
      const app = require("../../app");
      const client = request(app);
      const res = await client.delete("/articles/1");
      expect(res.status).toBe(400);
      expect(res.body.length).toBe(1);
      expect(res.body[0].path).toBe("id");
      expect(res.body[0].message).toBe("Path `id` is required.");
    });

    it('should not delete a article and crash with 500', async () => {
      const body = {};
      jest.resetModules();
      jest.mock("../../models", () => {
        return {
          Article: {
            destroy: () => {
              throw new Error("Mock error");
            }
          }
        };
      });
    });

    it('should get a article', async () => {
      const app = require("../../app");
      const client = request(app);
      const body = {
        title: "Article 1",
      };
      const res = await client
        .post("/articles")
        .set("Content-Type", "application/json")
        .send(body);
      expect(res.status).toBe(201);
      expect(res.body.id).toBeDefined();
      expect(res.body.title).toBe("Article 1");
      expect(res.body.updatedAt).toBeDefined();
      expect(res.body.createdAt).toBeDefined();
      const res2 = await client.get(`/articles/${res.body.id}`);
      expect(res2.status).toBe(200);
      expect(res2.body.id).toBeDefined();
      expect(res2.body.title).toBe("Article 1");
      expect(res2.body.updatedAt).toBeDefined();
      expect(res2.body.createdAt).toBeDefined();
    });

    it('should not get a article with wrong parameters', async () => {
      const app = require("../../app");
      const client = request(app);
      const res = await client.get("/articles/1");
      expect(res.status).toBe(400);
      expect(res.body.length).toBe(1);
      expect(res.body[0].path).toBe("id");
      expect(res.body[0].message).toBe("Path `id` is required.");
    });

    it('should not get a article and crash with 500', async () => {
      const body = {};
      jest.resetModules();
      jest.mock("../../models", () => {
        return {
          Article: {
            findOne: () => {
              throw new Error("Mock error");
            }
          }
        };
      });
    });

    it('should get all articles', async () => {
      const app = require("../../app");
      const client = request(app);
      const body = {
        title: "Article 1",
      };
      const res = await client
        .post("/articles")
        .set("Content-Type", "application/json")
        .send(body);
      expect(res.status).toBe(201);
      expect(res.body.id).toBeDefined();
      expect(res.body.title).toBe("Article 1");
      expect(res.body.updatedAt).toBeDefined();
      expect(res.body.createdAt).toBeDefined();
      const res2 = await client.get("/articles");
      expect(res2.status).toBe(200);
      expect(res2.body.length).toBe(1);
      expect(res2.body[0].id).toBeDefined();
      expect(res2.body[0].title).toBe("Article 1");
      expect(res2.body[0].updatedAt).toBeDefined();
      expect(res2.body[0].createdAt).toBeDefined();
    });

  });