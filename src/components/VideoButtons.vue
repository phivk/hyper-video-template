<template>
  <div class="flex justify-center">
    <button class="m-2 bg-red" @click="$emit('setVideo', 'red')">red</button>
    <button class="m-2 bg-green" @click="$emit('setVideo', 'green')">green</button>
    <button class="m-2 bg-blue" @click="$emit('setVideo', 'blue')">blue</button>
  </div>
</template>

<style scoped>
button {
  border: none;
  color: black;
  font-weight: bold;
  padding: 16px 32px;
  text-align: center;
  font-size: 16px;
  border-radius: 4px;
}
</style>
