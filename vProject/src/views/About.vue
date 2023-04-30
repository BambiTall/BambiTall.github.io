<script>
</script>

<template>
  <div class="_about">
    <a-typography-title :level="1" class="_about_title">關於</a-typography-title>
    
    <div class="_about_des">
      <a-typography-title :level="4" class="_about_des__title">為什麼我想要做這個工具?</a-typography-title>
      <p>
        一直都很喜歡從資料中找到可以優化內容的 insight，<br>
        但 line 的創作者後台第一版提供的資料非常有限。<br>
        因此決定自己由報表中整理出想要的資訊。
      </p>
    </div>
  </div>
</template>

<style lang="scss">
._about{
}
._about_title{
  @extend %h1;

  text-align: center;
}
._about_des{
  @extend %white-card-style;
}
._about_des__title{
  color: $color-line-light !important;
  margin-bottom: 1rem !important;
}

@media only screen and (min-width: $screen-sm) {
  ._about_des{
    text-align: center;
  }
}
</style>
