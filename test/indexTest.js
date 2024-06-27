const chai = require("chai");
const fs = require("fs");
const path = require("path");
const globalJsdom = require("global-jsdom");

chai.use(require("chai-dom"));
const { expect } = chai;

const html = fs.readFileSync(path.resolve(__dirname, "..", "index.html"), "utf-8");

globalJsdom(html);

describe("index.html", () => {
  describe("valid document structure", () => {
    it("has a DOCTYPE tag", () => {
      expect(html).to.contain("<!DOCTYPE html>");
    });

    it("has opening and closing HTML tags", () => {
      expect(html).to.contain("<html");
      expect(html).to.contain("</html>");
    });

    it("has <head> and <body> tags nested in the <html> tag", () => {
      expect(html).to.contain("<head>");
      expect(html).to.contain("</head>");
      expect(html).to.contain("<body>");
      expect(html).to.contain("</body>");
    });

    it("has a language attribute in the <html> tag", () => {
      const htmlElement = document.querySelector("html");
      expect(htmlElement).to.have.attribute("lang", "en");
    });
  });

  describe("valid <head> structure", () => {
    it("has a <link> tag that links to an external stylesheet", () => {
      const link = document.querySelector("head > link[rel='stylesheet']");
      expect(link).to.have.attribute("href", "style.css");
    });

    it("has a <title> tag to enclose the site title", () => {
      const title = document.querySelector("head > title");
      expect(title).to.exist;
      expect(title).to.contain.text("My Site Title");
    });
  });
});
