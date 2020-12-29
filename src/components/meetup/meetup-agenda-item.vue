<template>
  <div class="meetup-agenda__item">
    <div class="meetup-agenda__item-col">
      <app-icon :icon="item.icon" />
    </div>
    <div class="meetup-agenda__item-col">{{ item.time }}</div>
    <div class="meetup-agenda__item-col">
      <h5 class="meetup-agenda__title">{{ item.title }}</h5>
      <p v-if="item.type === 'talk'">
        <span>{{ item.speaker }}</span>
        <span class="meetup-agenda__dot"></span>
        <span class="meetup-agenda__lang">{{ item.language }}</span>
      </p>
      <p v-if="item.description">{{ item.description }}</p>
    </div>
  </div>
</template>

<script>
import AppIcon from "@/components/base/app-icon";
import { agendaItemIcons, agendaItemTitles } from "@/utils";

export default {
  name: "meetup-agenda-item",

  components: { AppIcon },

  props: {
    agendaItem: {
      type: Object,
      required: true
    }
  },

  computed: {
    item() {
      let item = this.agendaItem;
      return {
        ...this.agendaItem,
        time: `${item.startsAt} - ${item.endsAt}`,
        icon:
          item.type in agendaItemIcons
            ? agendaItemIcons[item.type]
            : agendaItemIcons.other,
        title: item.title ? item.title : agendaItemTitles[item.type]
      };
    }
  }
};
</script>

<style scoped></style>
