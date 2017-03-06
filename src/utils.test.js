import * as utils from "./utils";

describe("arrayWithoutElement", () => {
  const arrayWithoutElement = utils.arrayWithoutElement;

  describe("with array of elements + element in array", () => {
    it.skip("returns new array of elements without specified element", () => { // TODO jest doesn't have Array::includes
      const array = ["foo", "bar", "baz", "qux"];
      const nextArray = arrayWithoutElement(array, "bar");
      expect(nextArray).toEqual(["foo", "baz", "qux"]);
    });
  });
});

describe("objectWithoutKey", () => {
  const objectWithoutKey = utils.objectWithoutKey;

  describe("when passed an object and a key", () => {
    it.skip("returns a new object without that key", () => { // TODO jest doesn't have Object::entries
      const obj = {foo: "bar", baz: "qux"};
      expect(objectWithoutKey(obj, "baz")).toEqual({foo: "bar"});
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
