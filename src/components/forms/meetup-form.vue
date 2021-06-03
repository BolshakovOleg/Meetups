<template>
  <form class="form meetup-form" @submit.prevent="handleSubmit">
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <div class="form-group">
          <label class="form-label">Название</label>
          <app-input
            v-model="title"
            required
          />
        </div>
        <div class="form-group">
          <label class="form-label">Дата</label>
          <app-input
            type="date"
            v-model="date"
            required
          />
        </div>
        <div class="form-group">
          <label class="form-label">Место</label>
          <app-input
            v-model="place"
            required
          />
        </div>
        <div class="form-group">
          <label class="form-label">Описание</label>
          <app-input
            :multiline="true"
            rows="3"
            v-model="description"
            required
          />
        </div>
        <div class="form-group">
          <label class="form-label">Изображение</label>
          <!--image-uploader v-model="lcMeetup.imageId" /-->
        </div>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>
      <meetup-agenda-item-form
        v-for="(agendaItem, index) in meetup.agenda"
        :key="agendaItem.id"
        :index="index"
        class="mb-3"
      />

      <div class="form-section_append">
        <button type="button" @click="pushAgendaItem">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">      
        <button
          class="button button_secondary button_block"
          type="button"
          data-test="cancel"
          @click="handleCancel"
        >
          Отмена
        </button>
        <button
          class="button button_primary button_block"
          type="submit"
          data-test="submit"
        >
          {{ submitText }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapFields } from "@/utils";
import { mapState, mapMutations } from "vuex";
import AppInput from "@/components/ui/app-input";
import MeetupAgendaItemForm from "./meetup-agenda-item-form";

export default {
  name: "meetup-form",

  components: {
    AppInput,
    //ImageUploader
    MeetupAgendaItemForm
  },

  computed: {
    ...mapState({
      meetup: (state) => state['form'].meetup,
    }),

    ...mapFields(['title', 'place', 'date', 'description'],
      (vm, field) => vm.meetup[field],
      (vm, field, value) => {
        vm.setMeetupField({ field, value });
      },
    ),
  },

  props: {
    submitText: {
      type: String,
      default: "Сохранить"
    }
  },

  methods: {
    ...mapMutations('form', {
      setMeetupField: 'SET_MEETUP_FIELD',
      pushAgendaItem: 'PUSH_AGENDA_ITEM',
    }),
    handleSubmit() {
      this.$emit("submit", this.meetup);
    },
    handleCancel() {
      this.$emit("cancel");
    },
  }
};
</script>

<style scoped></style>
