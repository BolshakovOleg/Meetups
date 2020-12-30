<template>
  <form class="form meetup-form" @submit.prevent="handleSubmit">
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <div class="form-group">
          <label class="form-label">Название</label>
          <input class="form-control" v-model="lcMeetup.title"/>
        </div>
        <div class="form-group">
          <label class="form-label">Дата</label>
          <input class="form-control" type="date" v-model="lcMeetup.date"/>
        </div>
        <div class="form-group">
          <label class="form-label">Место</label>
          <input class="form-control" v-model="lcMeetup.place"/>
        </div>
        <div class="form-group">
          <label class="form-label">Описание</label>
          <textarea class="form-control" rows="3" v-model="lcMeetup.description"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Изображение</label>
          <image-uploader v-model="lcMeetup.imageId"/>
        </div>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>
      <!--meetup-agenda-item-form
        v-for="(agendaItem, idx) in lcMeetup.agenda"
        :key="agendaItem.id"
        :agenda-item.sync="lcMeetup.agenda[idx]"
        @remove="removeAgendaItem(idx)"
        class="mb-3"
      /-->

      <div class="form-section_append">
        <button type="button" data-test="addAgendaItem" @click="addAgendaItem">
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
import { deepClone } from "@/utils";

export default {
  name: 'meetup-form',

  components: { ImageUploader, MeetupAgendaItemForm },

  data() {
    return {
      lcMeetup: {
        ...deepClone(this.meetup),
        date: new Date(this.meetup.date).toISOString().substr(0, 10), 
      },
    };
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
    submitText: {
      type: String,
      default: "Сохранить",
    },
  },

  methods: {
    addAgendaItem() {
      const newItem = {};//buildAgendaItem();
      if ( this.lcMeetup.agenda.length > 0) {
        newItem.startsAt = this.lcMeetup.agenda[this.lcMeetup.agenda.length - 1].endsAt;
      };
      this.lcMeetup.agenda.push(newItem);
    },
    removeAgendaItem(idx) {
      this.lcMeetup.agenda.splice(idx, 1);
    },
    handleSubmit() {
      this.$emit('submit', deepClone(this.lcMeetup));
    },
    handleCancel() {
      this.$emit('cancel');
    },
  }

}
</script>

<style scoped>

</style>