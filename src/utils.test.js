import * as utils from "./utils";

describe("slugify", () => {
  const slugify = utils.slugify;

  describe("with spaces and weird characters", () => {
    it("collapses them to a single hyphen", () => {
      expect(slugify(" foo bar")).toEqual("foo-bar");
      expect(slugify("%^& 123 baZZZ__!")).toEqual("123-bazzz");
      expect(slugify("\r\n%a__--!!'\"@b...")).toEqual("a-b");
    });
  });
});

describe("sanitizeString", () => {
  const sanitizeString = utils.sanitizeString;

  describe("with most non-alphanumeric stuff", () => {
    it("makes them go away", () => {
      expect(sanitizeString("`1234567890[]~!@#$%^&*(){}',.\"<>/=\\?+|-_;:")).toEqual("1234567890");
    });
  });
});

describe("trimString", () => {
  const trimString = utils.trimString;

  describe("with whitespace in a string", () => {
    it("strips it off front and back", () => {
      expect(trimString("\n\rfoo \n")).toEqual("foo");
    });
  });

  describe("when being mapped", () => {
    it("works without being bound", () => {
      const trimmedStrings = [" a", "b\n", "\rc", " \n"].map(trimString);
      expect(trimmedStrings).toEqual(["a", "b", "c", ""]);
    });
  });
});
