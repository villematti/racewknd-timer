// (Angular w/TypeScript)
// As our intention is to test an Angular component that contains annotations 
// we need to include the reflect-metadata dependency.
import "reflect-metadata"; 

// A sample Jasmine test
describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});