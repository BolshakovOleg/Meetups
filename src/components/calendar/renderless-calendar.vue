<script>
export default {
  name: 'renderless-calendar',

  data() {
    return {
      offset: 2,
      date: new Date(new Date().getFullYear(), this.month, 1)
    }
  },

  props: {
    month: {
      type: Number,
      required: true,
    }
  },

  computed: {
    localDate() {
      return `${this.date.toLocaleDateString(navigator.language, {
        month: 'long',
      })} ${this.date.getFullYear()}`;
    },
    startFromSunday() {
      return navigator.language !== 'ru' ? false : true; // Это другие страны живут по библии, а у нас принято начинать неделю с понедельника.
    },
    cells() {
      const dayOfWeek = this.getDayOfWeek(this.date, 1);
      const firstDayOfMonth = this.startFromSunday ? dayOfWeek + 1 : dayOfWeek || 7;
      const daysInMonth = this.getDaysInMonth(this.date);
      const multiplier = Math.ceil((firstDayOfMonth - (this.offset - 1) + daysInMonth) / 7);
      const loop = multiplier * 7;
      const startDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.offset - firstDayOfMonth);
      return Array.from({length: loop}, (v, i) => {
        let date = new Date(startDate).setDate(startDate.getDate() + i);
        return {
          id: i+1,
          day: new Date(date).getDate(),
          active: new Date(this.date).getMonth() === new Date(date).getMonth(),
          date: date
        };
      });
    }
  },
  methods: {
    changeMonth(next) {
      let month = this.date.getMonth();
      if ( next ) {month++;} else {month--;};
      this.date = new Date(this.date.getFullYear(), month, 1);
    },
    getDaysInMonth(date) {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    },
    getDayOfWeek (date, day) {
      return new Date(date.getFullYear(), date.getMonth(), day).getDay();
    },
  },

  render() {
    return this.$scopedSlots.default({
      localDate: this.localDate,
      cells: this.cells,
      methods: {
        changeMonth: this.changeMonth,
        getDaysInMonth: this.getDaysInMonth,
        getDayOfWeek: this.getDayOfWeek
      }
    })
  },
};
</script>
