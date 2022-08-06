<template>
  
  <van-image-preview v-model="show" :images="images" @change="onChange">
  <template v-slot:index>第{{ index }}页</template>
</van-image-preview>
</template>

<script>
export default {

}
</script>

<style>

</style>