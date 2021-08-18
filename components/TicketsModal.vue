<template>
  <div class="wrapper">
    <div class="inner">
      <div class="qr__wrapper">
        <div class="qr__wrapper-inner">
          <img
            :src="getQrUrl(currentTicket.id)"
            :class="['qr', { ready: qrStatus.isResolved() }]"
            alt="QR code for ticket 1A"
            @load="onQrLoad"
          />
        </div>
        <div :class="['spinner__wrapper', { show: qrStatus.isLoading() }]">
          <spinner :size="24" />
        </div>
      </div>

      <t-single-paginator
        :value="currentTicket"
        :items="tickets"
        label="seat"
        track-by="id"
        @change="onPaginatorChange"
      >
        <template #label="{ item }">
          <strong> Seat&nbsp;{{ item.seat }}</strong>
        </template>
      </t-single-paginator>
      <div class="mt-4">
        <h3>{{ movie.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import AsyncStatus from '~/utils/AsyncStatus'

export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
    tickets: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      qr: null,
      currentTicket: this.tickets[0],
      qrStatus: new AsyncStatus(),
    }
  },
  created() {
    this.qrStatus.beginLoading()
  },
  methods: {
    onPaginatorChange(ticket) {
      this.qrStatus.beginLoading()
      this.currentTicket = ticket
    },
    onQrLoad() {
      this.qrStatus.resolve()
    },
    getQrUrl(payload) {
      return `https://api.qrserver.com/v1/create-qr-code/?data=${payload}!&size=500x500`
    },
  },
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background-color: var(--color-bg);
  padding: var(--spacing-4);
}

.inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr,
.spinner__wrapper {
  opacity: 0;
  transition: opacity 200ms ease;
}

.qr.ready,
.spinner__wrapper.show {
  opacity: 1;
}

.qr__wrapper {
  margin-bottom: var(--spacing-4);
  position: relative;
  width: 100%;
  padding-top: 100%;
}

.qr__wrapper-inner,
.spinner__wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
