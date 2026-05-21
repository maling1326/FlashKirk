<template>
  <div class="p-8 font-sans">
    <h1 class="text-2xl font-bold mb-6">State vs Storage Example</h1>

    <div class="flex gap-8">
      <!-- 1. LOCAL STATE UI -->
      <div class="p-6 border rounded-lg bg-gray-50">
        <h2 class="text-xl font-semibold">Local State</h2>
        <p class="text-sm text-gray-500 mb-4">Resets when you refresh</p>

        <p class="text-3xl font-bold mb-4">{{ sessionClicks }}</p>

        <button
          @click="incrementSession"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Click Me
        </button>
      </div>

      <!-- 2. LOCAL STORAGE UI -->
      <div class="p-6 border rounded-lg bg-green-50">
        <h2 class="text-xl font-semibold">Local Storage</h2>
        <p class="text-sm text-gray-500 mb-4">Survives page refreshes</p>

        <p class="text-3xl font-bold mb-4">{{ lifetimeClicks }}</p>

        <button
          @click="incrementLifetime"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save to Disk
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

// ==========================================
// 1. LOCAL STATE (Vue ref)
// ==========================================
// This lives purely in the computer's RAM.
// When the page refreshes, the RAM clears, and it goes back to 0.
const sessionClicks = ref(0);

const incrementSession = () => {
  sessionClicks.value++;
};

// ==========================================
// 2. LOCAL STORAGE (Browser Database)
// ==========================================
const lifetimeClicks = ref(0);

// STEP A: Read from LocalStorage when the page loads
// We wrap this in onMounted() because Nuxt renders on the server first.
// The server doesn't have a browser window, so calling localStorage directly
// will crash the app. onMounted ensures this only runs in the user's browser.
onMounted(() => {
  const savedData = localStorage.getItem("my-lifetime-clicks");

  if (savedData) {
    // localStorage ONLY saves strings. We must convert it back to a number.
    lifetimeClicks.value = parseInt(savedData, 10);
  }
});

// STEP B: Write to LocalStorage whenever the value changes
// The watch() function listens to 'lifetimeClicks'. If it changes, it runs the code inside.
watch(lifetimeClicks, (newValue) => {
  // Convert the number back to a string to save it
  localStorage.setItem("my-lifetime-clicks", newValue.toString());
});

const incrementLifetime = () => {
  lifetimeClicks.value++;
};
</script>
