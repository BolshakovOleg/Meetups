<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="removeAgendaItem(index)">
      <img src="../../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <form-group label="Тип">
      <dropdown-button
        title="Тип"
        :options="$options.agendaItemTypes"
        v-model="agendaItem.type"
      />
    </form-group>

    <div class="form__row">
      <div class="form__col">
        <form-group label="Начало">
          <app-input
            type="time"
            placeholder="00:00"
            v-model="startsAt"
          />
        </form-group>
      </div>
      <div class="form__col">
        <form-group label="Окончание">
          <app-input
            type="time"
            placeholder="00:00"
            v-model="endsAt"
          />
        </form-group>
      </div>
    </div>

    <form-group
      v-for="(item, idx) in fieldSpecification"
      :key="idx"
      :label="item.title"
    >
      <component
        :is="item.component"
        v-bind="item.props"
        v-bind:[item.model.prop]="agendaItem[item.field]"
        v-on:[item.model.event]="value => agendaItem[item.field] = value"
      />
    </form-group>
  </div>
</template>

<script>
import AppInput from '@/components/ui/app-input';
import DropdownButton from '@/components/ui/dropdown-button';
import FormGroup from '@/components/ui/form-group';
import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypes,
} from '@/services/meetup-service';
import { mapState, mapMutations } from "vuex";
import { mapFields } from "@/utils";

const HOURS_A_DAY = 24;
const MINUTES_PER_HOUR = 60;

export default {
  name: 'meetup-agenda-item-form',

  components: { AppInput, DropdownButton, FormGroup },

  agendaItemTypes: getAgendaItemTypes(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),

  data() {
    return {
      duration: null,
    };
  },

  props: {
    index: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapState({
      agendaItem(state) {
        return state['form'].meetup.agenda[this.index];
      }
    }),

    ...mapFields(['type', 'title', 'description'],
      (vm, field) => vm.agendaItem[field],
      (vm, field, value) => {
        vm.setMeetupAgendaItemField({
          index: vm.index,
          field,
          value,
        });
      }
    ),
  
    fieldSpecification() {
      return this.$options.fieldSpecifications[this.agendaItem.type];
    },

    startsAt: {
      get() {
        return this.agendaItem.startsAt;
      },
      set(value) {
        this.setMeetupAgendaItemField({
          index: this.index,
          field: 'startsAt',
          value,
        });
        this.updateEndsTime();
      }
    },
    endsAt: {
      get() {
        return this.agendaItem.endsAt;
      },
      set(value) {
        this.setMeetupAgendaItemField({
          index: this.index,
          field: 'endsAt',
          value,
        });
        this.calculateDuration();
      }
    }
  },

  methods: {
    ...mapMutations('form', {
      setMeetupAgendaItemField: 'SET_MEETUP_AGENDA_ITEM_FIELD',
      removeAgendaItem: 'REMOVE_AGENDA_ITEM',
    }),
    updateEndsTime() {
      let hours = parseInt(this.startsAt.split(':')[0]) + this.duration.hours;
      let minutes = parseInt(this.startsAt.split(':')[1]) + this.duration.minutes;
      if (minutes >= MINUTES_PER_HOUR) {
        minutes = minutes % MINUTES_PER_HOUR;
        hours++;
      };
      hours = hours % HOURS_A_DAY;
      hours = hours.toString().padStart(2, '0');
      minutes = minutes.toString().padStart(2, '0');
      this.endsAt = hours + ':' + minutes;
    },
    calculateDuration() {
      let hours = parseInt(this.endsAt.split(':')[0]) - parseInt(this.startsAt.split(':')[0]),
          minutes = parseInt(this.endsAt.split(':')[1]) - parseInt(this.startsAt.split(':')[1]);
      if (minutes < 0) {
        minutes = minutes + MINUTES_PER_HOUR;
        hours--;
      };
      if (hours < 0) {
        hours = hours + HOURS_A_DAY;
      };
      this.duration = {
        hours,
        minutes
      };
    },
  },
  mounted() {
    this.calculateDuration();
  }
};

</script>

<style></style>
