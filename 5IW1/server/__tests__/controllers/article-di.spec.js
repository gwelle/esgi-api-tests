describe("Unit tests", () => {
    let article;
    const res = {};
    const result = {};
    const mock = {
        create: jest.fn().mockReturnValue(result),
        cget: jest.fn().mockReturnValue(result),
        get: jest.fn().mockReturnValue(result),
        update: jest.fn().mockReturnValue(result),
        delete: jest.fn().mockReturnValue(result),
    };

    beforeAll(() => {
        const { ArticleController } = require("../controllers")(mock);
        article = new ArticleController();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
        jest.resetModules();
    });
   

    beforeEach(() => {
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.sendStatus = jest.fn().mockReturnValue(res);
    });

    describe("ArticleController", () => {
        describe("cget", () => {
            it("should return an array of articles", async () => {
                const result = [{ id: 1, name: "Article 1" }];
                const req = { query: {} };
                await article.cget(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith(result);
            });



            it("should return an empty array if no articles are found", async () => {
                const result = [];
                const req = { query: {} };
                await article.cget(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith(result);
            });

            it("should return an error if the query fails", async () => {
                const result = { status: "error", message: "Article fetch failed" };
                const req = { query: {} };
                await article.cget(req, res);
                expect(res.status).toHaveBeenCalledWith(400);
                expect(res.json).toHaveBeenCalledWith(result);
            });
            
        });

        describe("get", () => {
            it("should return an article", async () => {
                const result = { id: 1, name: "Article 1" };
                const req = { params: { id: 1 } };
                await article.get(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith(result);
            });

            it("should return an error if the article does not exist", async () => {
                const req = { params: { id: 1 } };
                await article.get(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
            });

            it("should return an error if the article id is not a number", async () => {
                const req = { params: { id: "a" } };
                await article.get(req, res);
                expect(res.status).toHaveBeenCalledWith(400);
            });

            it("should return an error if the article id is not an integer", async () => {
                const req = { params: { id: 1.1 } };
                await article.get(req, res);
                expect(res.status).toHaveBeenCalledWith(400);
            });

            it("should return 500 if error", async () => {
                const req = { params: { id: 1 } };
                await article.get(req, res);
                expect(res.status).toHaveBeenCalledWith(500);
            });

        });

        describe("create", () => {
            it("should create an article", async () => {
                const result = { id: 1, name: "Article 1" };
                const req = { body: { name: "Article 1" } };
                await article.create(req, res);
                expect(res.status).toHaveBeenCalledWith(201);
                expect(res.json).toHaveBeenCalledWith(result);
            });

            it("should return an error if the article name is not provided", async () => {
                const req = { body: { } };
                await article.create(req, res);
                expect(res.status).toHaveBeenCalledWith(400);
            });

            it("should return an error if the article name is not a string", async () => {
                const req = { body: { name: 1 } };
                await article.create(req, res);
                expect(res.status).toHaveBeenCalledWith(400);
            });

            it("should return 500 if error", async () => {
                const req = { body: { name: "Article 1" } };
                await article.create(req, res);
                expect(res.status).toHaveBeenCalledWith(500);
            })

        });

        describe("update", () => {
            it("should update an article", async () => {
                const result = { id: 1, name: "Article 1" };
                const req = { body: { name: "Article 1" }, params: { id: 1 } };
                await article.update(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith(result);
            });

            it("should return an error if the article id is not provided", async () => {
                const req = { body: { name: "Article 1" } };
                await article.update(req, res);
                expect(res.status).toHaveBeenCalledWith(400);
            });

            it("should return an error if the article id is not a number", async () => {
                const req = { body: { name: "Article 1" }, params: { id: "a" } };
                await article.update(req, res);
                expect(res.status).toHaveBeenCalledWith(400);
            });

            it("should return an error if the article id is not an integer", async () => {
                const req = { body: { name: "Article 1" }, params: { id: 1.1 } };
                await article.update(req, res);
                expect(res.status).toHaveBeenCalledWith(400);
            });

            it("should return an error if the article name is not provided", async () => {
                const req = { body: { }, params: { id: 1 } };
                await article.update(req, res);
                expect(res.status).toHaveBeenCalledWith(400);
            });
            
            it("should return an error if the article name is not a string", async () => {
                const req = { body: { name: 1 }, params: { id: 1 } };
                await article.update(req, res);
                expect(res.status).toHaveBeenCalledWith(400);
            });

            it("should return 500 if error", async () => {
                const req = { body: { name: "Article 1" }, params: { id: 1 } };
                await article.update(req, res);
                expect(res.status).toHaveBeenCalledWith(500);
            });
            
        
        });

        describe("delete", () => {
            it("should delete an article", async () => {
                const result = { id: 1, name: "Article 1" };
                const req = { params: { id: 1 } };
                await article.delete(req, res);
                expect(res.status).toHaveBeenCalledWith(204);
                expect(res.json).toHaveBeenCalledWith(result);
            });

            it("should return 404 if article not found", async () => {
                const result = { id: 1, name: "Article 1" };
                const req = { params: { id: 1 } };
                await article.delete(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalledWith({
                    status: "error",
                    message: "Article not found",
                });
            });

            it("should return 500 if error", async () => {
                const result = { id: 1, name: "Article 1" };
                const req = { params: { id: 1 } };
                await article.delete(req, res);
                expect(res.status).toHaveBeenCalledWith(500);
                expect(res.json).toHaveBeenCalledWith({
                    status: "error",
                    message: "Internal server error",
                });
            });
        });


    });

});
