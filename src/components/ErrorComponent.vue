<template>
  <div class="mt-28 text-red-500 text-xl font-bold">
    Data fetching failed, please check your network connection
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
      required: true
    }
  }
};
</script>

  