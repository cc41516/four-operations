<template>
  <div class="row flex-center q-pa-md q-gutter-x-md">
    <q-avatar rounded color="primary" />
    <q-avatar color="transparant" font-size="3rem"> {{ symbol }} </q-avatar>
    <q-avatar rounded color="secondary" />
  </div>
</template>

<script>
export default {
  props: ["symbol"],
  setup() {},
};
</script>