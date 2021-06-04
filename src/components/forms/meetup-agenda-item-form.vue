<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="removeAgendaItem(index)">
      <img src="../../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <form-group label="Тип">
      <dropdown-button
        title="Тип"
        :options="$options.agendaItemTypes"
        v-model="type"
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
        v-bind:[item.model.prop]="item.field"
        v-on:[item.model.event]="value => item.field = value"
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
  calcMeetupDuration,
  calcMeetupEndsTime
} from '@/services/meetup-service';
import { mapState, mapMutations } from "vuex";
import { mapFields } from "@/utils";

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

    ...mapFields(['type', 'startsAt', 'endsAt', 'title', 'description'],
      (vm, field) => vm.agendaItem[field],
      (vm, field, value) => {
        vm.setMeetupAgendaItemField({
          index: vm.index,
          field,
          value,
        });
        if ( field === 'startsAt' ) vm.updateEndsTime();
        if ( field === 'endsAt' ) vm.calculateDuration();
      }
    ),
  
    fieldSpecification() {
      return this.$options.fieldSpecifications[this.agendaItem.type];
    },

  },

  methods: {
    ...mapMutations('form', {
      setMeetupAgendaItemField: 'SET_MEETUP_AGENDA_ITEM_FIELD',
      removeAgendaItem: 'REMOVE_AGENDA_ITEM',
    }),
    updateEndsTime() {
      this.endsAt = calcMeetupEndsTime(this.startsAt, this.duration);
    },
    calculateDuration() {
      this.duration = calcMeetupDuration(this.startsAt, this.endsAt);
    },
  },
  mounted() {
    this.calculateDuration();
  }
};

</script>

<style></style>
