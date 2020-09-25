process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app.js");

chai.should();
chai.use(chaiHttp);

describe("Reports", () => {
    describe("GET /reports/week/1", () => {
        it("200 HAPPY PATH", (done) => {
            chai.request(server)
                .get("/reports/week/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.report.should.be.an("object");
                    res.body.data.report.week.should.be.an("number");
                    res.body.data.report.report.should.be.an("string");

                    done();
            });
        });
    });
});
