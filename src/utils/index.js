export const mapField = (field, getter, setter) => ({
  get() {
    return getter(this, field);
  },
  set(value) {
    setter(this, field, value);
  }
});

export const mapFields = (fields, getter, setter) =>
  fields.reduce(
    (map, field) => ({
      ...map,
      [field]: mapField(field, getter, setter)
    }),
    {}
  );

export const sortByDate = (eventA, eventB) => {
  return new Date(eventB.date) - new Date(eventA.date);
};
