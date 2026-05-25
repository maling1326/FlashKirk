<template>
  <div
    class="flex flex-col w-330 max-w-330 min-h-screen items-center bg-orange-88 gap-[48px] pb-10"
  >
    <div
      class="flex flex-wrap justify-between items-end content-end pb-12 pt-6 self-stretch border-b border-b-orange-10-16"
    >
      <div class="flex flex-start flex-col gap-[0.81px]">
        <p
          class="text-orange-10 font-family-font-2 text-96 italic font-400 leading-[91.2px] -tracking-1-92"
        >
          Purchase history
        </p>
        <p
          class="text-orange-10-65 font-family-font-2 text-96 italic font-400 leading-[91.2px] -tracking-1-92"
        >
          your past orders.
        </p>
      </div>
      <div class="flex max-w-90 pl-5.25 content-end items-center">
        <p
          class="text-orange-10-65 text-right font-family-font-2 text-18 italic font-400 spacing-[25.2px]"
        >
          Review your past transactions and delivery statuses below.
        </p>
      </div>
    </div>

    <div
      class="grid h-full gap-18 self-stretch grid-cols-[minmax(0,1fr)_420px]"
    >
      <div
        class="flex flex-col items-start gap-[64px] self-start justify-stretch w-full"
      >
        <div class="flex flex-col items-start gap-8 self-stretch w-full">
          <div
            v-if="!transaction.transactions.value.length"
            class="text-orange-10-65 font-family-font-2 text-24 italic py-12"
          >
            No past transactions found.
          </div>

          <div
            v-for="tx in transaction.transactions.value"
            :key="tx.id"
            class="flex flex-col w-full rounded-lg border border-orange-10-16 bg-orange-88/40 p-8 gap-8"
          >
            <div
              class="flex justify-between items-end w-full border-b border-b-orange-10-16 pb-6"
            >
              <div class="flex flex-col gap-2">
                <p
                  class="text-orange-10 font-family-font-4 text-28 font-400 spacing-[28px] -tracking-0-3"
                >
                  Order #{{ tx.id }}
                </p>
                <p
                  class="text-orange-10-65 font-family-font-2 text-14 italic font-400"
                >
                  Placed on {{ formatDate(tx.date) }} at {{ tx.time }}
                </p>
                <p
                  class="text-orange-10-65 font-family-font-2 text-14 italic font-400"
                >
                  Expected Arrival: {{ formatDate(tx.expectedArrive) }}
                </p>
              </div>
              <div class="flex flex-col items-end gap-2">
                <p
                  class="text-orange-10 font-family-font-4 text-32 font-400 spacing-[32px] tracking-[-0.32px]"
                >
                  ${{ tx.totalPrice.toFixed(2) }}
                </p>
                <p
                  class="font-family-font-3 text-11 font-400 tracking-1-98 uppercase"
                  :class="
                    tx.isDelivered ? 'text-[#B07D4F]' : 'text-orange-10-65'
                  "
                >
                  {{ tx.isDelivered ? "Delivered" : "Processing" }}
                </p>
              </div>
            </div>

            <div class="flex flex-col items-start gap-[0.01px] self-stretch">
              <div
                class="grid pb-8 mt-8 gap-[32px] self-stretch grid-rows-1 grid-cols-[180px_minmax(0,1fr)_140px] border-b border-b-orange-10-45 h-fit last:border-b-0 last:pb-0"
                v-for="(item, index) in tx.item"
                :key="index"
              >
                <div
                  class="flex w-45 justify-center items-center self-stretch bg-grey-92 border border-orange-10-8 rounded-md aspect-square"
                >
                  <div
                    class="w-full max-w-[100px] aspect-[95/24] rotate-[-15deg] flex"
                  >
                    <div
                      class="w-full h-full rounded-[4px] shadow-panel-gloss relative flex items-center"
                      :class="getColorClass(item.color)"
                    >
                      <p
                        class="text-orange-88-42 font-family-font-4 text-[5px] font-400 mb-2.5 ml-1.75 tracking-tight text-shadow-embossed"
                      >
                        bytemax
                      </p>
                      <div
                        class="absolute right-[10px] top-[12.5px] w-[1.5px] h-[1.5px] rounded-full bg-yellow-200 shadow-sphere-glow"
                      ></div>
                    </div>
                    <div
                      class="mt-[4.5px] w-[7px] h-[16px] rounded-r-4 shadow-inner-bevel bg-[linear-gradient(180deg,var(--color-white-22,rgba(255,255,255,0.22))0%,var(--color-white-0,rgba(255,255,255,0.00))12%,var(--color-white-0,rgba(255,255,255,0.00))88%,var(--color-black-40,rgba(0,0,0,0.40))100%),linear-gradient(90deg,var(--color-orange-18,#3A2E23)0%,var(--color-orange-8,#1A1410)60%,var(--color-orange-80,rgba(26,20,16,0.00))100%)]"
                    >
                      <div
                        class="w-[5px] h-[14px] rounded-r-full shadow-inset-top bg-[linear-gradient(90deg,var(--color-orange-8,#1A1410)0%,var(--color-orange-80,rgba(26,20,16,0.00))100%)]"
                      ></div>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col justify-center items-start gap-0.75">
                  <div class="flex flex-col items-start self-stretch">
                    <p
                      class="text-orange-10 font-family-font-4 text-30 font-400 spacing-[30px] -tracking-0-3 capitalize"
                    >
                      {{ item.variant }}
                    </p>
                  </div>
                  <div class="flex flex-col items-start self-stretch">
                    <p
                      class="text-orange-10-65 font-family-font-2 text-17 font-400 -tracking-0-3 italic"
                    >
                      <span class="text-orange-12/80 capitalize">{{
                        item.color
                      }}</span>
                      colourway.
                    </p>
                  </div>
                  <div class="flex flex-col items-start self-stretch mt-4">
                    <p
                      class="text-orange-10 font-family-font-3 text-14 font-400 spacing-[22px]"
                    >
                      QTY: {{ item.quantity }}
                    </p>
                  </div>
                </div>

                <div
                  class="flex flex-col items-end gap-[8px] justify-center min-w-35"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="h-fit self-start justify-stretch rounded-lg border border-orange-10-16 bg-grey-92 p-8.25"
      >
        <h2
          class="flex items-start text-orange-10 font-family-font-4 text-32 font-400 spacing-[32px] -tracking-0-3"
        >
          Overview
        </h2>
        <p
          class="flex items-start pb-6 pt-1 text-orange-10-40 font-family-font-3 text-10 font-400 spacing-[16px] tracking-2-2 uppercase border-b border-b-orange-10-16 w-full"
        >
          Account Details
        </p>

        <div class="pt-6">
          <p
            class="text-orange-10-65 font-family-font-2 text-14 italic font-400 leading-relaxed"
          >
            Manage your recent orders and keep track of your active deliveries.
            Need help with a return? Please contact our support.
          </p>
        </div>

        <div
          class="flex px-5.5 py-4.5 mt-8 flex-col items-center justify-center rounded-full border cursor-pointer bg-[#ebaf7b] border-[#fcb170] hover:bg-[#fba050] hover:border-[#fba050] transition-all group"
          @click="router.push('/')"
        >
          <p
            class="text-orange-8 text-center font-family-font-1 text-13 font-400 spacing-[20.8px] tracking-[2.34px] uppercase group-hover:scale-110 transition-all"
          >
            Keep shopping →
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const transaction = useTransaction();

function getColorClass(color: string) {
  switch (color?.toLowerCase()) {
    case "obsidian":
      return "bg-black";
    case "cream":
      return "bg-[#FFFDD0]";
    case "brass":
      return "bg-[#b5a642]";
    default:
      return "bg-grey-92";
  }
}

function formatDate(isoString: string) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
</script>
