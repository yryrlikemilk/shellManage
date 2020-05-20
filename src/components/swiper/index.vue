<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div v-for="(o,index) in srcdata" :key="index" class="swiper-slide">
        <img :src="o" width="100px" preview="index">
      </div>
    </div>
    <div class="swiper-pagination" />
  </div>
</template>

<script>
import Vue from 'vue'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
Vue.use(preview)
export default {
  components: {},
  props: {
    imglist: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      mySwiper: ''
    }
  },
  computed: {
    srcdata() {
      return this.imglist.split(';')
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 4,
      spaceBetween: 10,
      freeMode: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    })
  },
  methods: {}
}
</script>
<style scoped>
 .swiper-container {
  width: 100%;
}
.swiper-slide{
}
</style>
