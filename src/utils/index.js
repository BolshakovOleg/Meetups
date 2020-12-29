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

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
export const agendaItemTitles = {
  registration: "Регистрация",
  opening: "Открытие",
  break: "Перерыв",
  coffee: "Coffee Break",
  closing: "Закрытие",
  afterparty: "Afterparty",
  talk: "Доклад",
  other: "Другое"
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
export const agendaItemIcons = {
  registration: "key",
  opening: "cal-sm",
  talk: "tv",
  break: "clock",
  coffee: "coffee",
  closing: "key",
  afterparty: "cal-sm",
  other: "cal-sm"
};
