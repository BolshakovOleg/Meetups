import { nanoid } from 'nanoid'

export const generateId = () => ( nanoid() );

export const buildMeetup = () => ({
  id: 0,
  title: '',
  description: '',
  imageId: null,
  date: null,
  place: '',
  agenda: [],
})

export const getAgendaItemTitlesMap = () => ({
  registration: "Регистрация",
  opening: "Открытие",
  break: "Перерыв",
  coffee: "Coffee Break",
  closing: "Закрытие",
  afterparty: "Afterparty",
  talk: "Доклад",
  other: "Другое"
});

export const getAgendaIconsMap = () => ({
  registration: "key",
  opening: "cal-sm",
  talk: "tv",
  break: "clock",
  coffee: "coffee",
  closing: "key",
  afterparty: "cal-sm",
  other: "cal-sm"
});

export const buildAgendaItem = () => {
  return {
    id: nanoid(),
    startsAt: "00:00",
    endsAt: "00:00",
    type: "other",
    title: null,
    description: null,
    speaker: null,
    language: null
  };
};

export const getAgendaItemTypes = () => [
  { value: "registration", text: "Регистрация" },
  { value: "opening", text: "Открытие" },
  { value: "break", text: "Перерыв" },
  { value: "coffee", text: "Coffee Break" },
  { value: "closing", text: "Закрытие" },
  { value: "afterparty", text: "Afterparty" },
  { value: "talk", text: "Доклад" },
  { value: "other", text: "Другое" }
];

export const getAgendaItemLanguageOptions = () => [
  { value: null, text: "Не указано" },
  { value: "RU", text: "RU" },
  { value: "EN", text: "EN" }
];

export const getAgendaItemsFieldSpecifications = () => {
  const common = [
    {
      title: "Нестандартный текст (необязательно)",
      field: "title",
      component: "app-input",
      model: { prop: "value", event: "input" },
      props: {}
    }
  ];

  return {
    registration: [...common],
    opening: [...common],
    talk: [
      {
        title: "Тема",
        field: "title",
        component: "app-input",
        model: { prop: "value", event: "input" },
        props: {}
      },
      {
        title: "Докладчик",
        field: "speaker",
        component: "app-input",
        model: { prop: "value", event: "input" },
        props: {}
      },
      {
        title: "Описание",
        field: "description",
        component: "app-input",
        model: { prop: "value", event: "input" },
        props: {
          multiline: true
        }
      },
      {
        title: "Язык",
        field: "language",
        component: "dropdown-button",
        model: { prop: "value", event: "change" },
        props: {
          options: getAgendaItemLanguageOptions(),
          title: "Язык"
        }
      }
    ],
    break: [...common],
    coffee: [...common],
    closing: [...common],
    afterparty: [...common],
    other: [
      {
        title: "Заголовок",
        field: "title",
        component: "app-input",
        model: { prop: "value", event: "input" },
        props: {}
      },
      {
        title: "Описание",
        field: "description",
        component: "app-input",
        model: { prop: "value", event: "input" },
        props: {
          multiline: true
        }
      }
    ]
  };
};

const HOURS_A_DAY = 24;
const MINUTES_PER_HOUR = 60;

export const calcMeetupDuration = (startsAt, endsAt) => {
  let hours = parseInt(endsAt.split(':')[0]) - parseInt(startsAt.split(':')[0]),
      minutes = parseInt(endsAt.split(':')[1]) - parseInt(startsAt.split(':')[1]);
  if (minutes < 0) {
    minutes = minutes + MINUTES_PER_HOUR;
    hours--;
  };
  if (hours < 0) {
    hours = hours + HOURS_A_DAY;
  };
  return {
    hours,
    minutes
  };
}

export const calcMeetupEndsTime = (startsAt, duration) => {
  let hours = parseInt(startsAt.split(':')[0]) + duration.hours;
  let minutes = parseInt(startsAt.split(':')[1]) + duration.minutes;
  if (minutes >= MINUTES_PER_HOUR) {
    minutes = minutes % MINUTES_PER_HOUR;
    hours++;
  };
  hours = hours % HOURS_A_DAY;
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  return hours + ':' + minutes;
}