const getEventObject = require("../src/getEventObject").default;

test("returns object with type", () => {
  const type = "my_event";
  const data = [1, 2, 3];
  const result = {
    type,
    data
  };
  expect(getEventObject(type, data)).toEqual(result);
});
