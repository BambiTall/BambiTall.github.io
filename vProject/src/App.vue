<script setup>
import Header from '@/components/Header.vue'
</script>

<template>
  <Header />
  <div class="_wrap">
    <router-view />
    <div class="_wrap_footer">
      © <a class="_wrap_footer_a" href="https://store.line.me/search/en?q=Bambiland" target="_blank">班比牧場 Bambiland</a>
    </div>
  </div>
</template>

<style lang="scss">
#app{
  background: rgb(63,162,106);
  background: linear-gradient(300deg, rgba(63,162,106,1) 0%, rgba(76,199,100,1) 100%);
  height: 100%;
  overflow: auto;
}
p{
  line-height: 2;
}
._wrap{
  width: 90%;
  margin: auto;
  padding: 4rem 0px;
}
._wrap_footer{
  color: white;
  text-align: center;
  opacity: .6;
}
._wrap_footer_a{
  color: white;
}

// rwd
@media only screen and (min-width: $screen-sm) {
  ._wrap{
    width: 80%;
  }
}
</style>
