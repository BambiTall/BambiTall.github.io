<template>
  <div class="_qa">
    <a-typography-title :level="1" class="_qa_title">Q&A</a-typography-title>
    <div class="_qa_des">
      <a-collapse class="_qa_collapse" v-model:activeKey="activeKey" ghost>
        
        <a-collapse-panel key="1" header="沒有資料可以試用嗎？">
          可以先點
          <a-typography-link href="https://github.com/BambiTall/BambiTall.github.io/blob/main/vProject/src/assets/return-sample-file.csv" target="_blank">這裡</a-typography-link>
          下載測試用資料喔！
        </a-collapse-panel>

        <a-collapse-panel key="2" header="我該去哪裡下載收益報表？">
          <a-timeline>
            <a-timeline-item class="_qa_collapse_content">
              登入後台後點選匯款申請
              <img class="_qa_des__img _qa_des__img--1" src="@/assets/img/qa-1/qa-1-1.jpg" />
            </a-timeline-item>
            <a-timeline-item>
              點選分配 Tab
              <img class="_qa_des__img" src="@/assets/img/qa-1/qa-1-2.jpg" />
            </a-timeline-item>
            <a-timeline-item>
              點選 csv 下載檔案
              <img class="_qa_des__img" src="@/assets/img/qa-1/qa-1-3.jpg" />
            </a-timeline-item>
          </a-timeline>
        </a-collapse-panel>

        <a-collapse-panel key="3" header="為什麼會有 sales counts 等於 0 的狀況？">
          <p>
            代表該項目有從超值方案(Premium)獲得分潤，但沒有另外售出。
          </p>
        </a-collapse-panel>

        <a-collapse-panel key="4" header="目前有哪些功能？">
          <ul>
            <li>依照分潤金額(Revenue Share)排序</li>
            <li>依照銷售組數(Sales Counts)排序</li>
            <li>依類型(Type)過濾資料</li>
            <li>顯示每個項目的銷售地區</li>
          </ul>
        </a-collapse-panel>
      
      </a-collapse>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Qa',
  data() {
    return {
      activeKey: [0]
    }
  }
}
</script>

<style lang="scss">
.ant-timeline-item-content{
  display: flex;
  flex-direction: column;
  text-align: left;
}
.ant-collapse-header{
  color: $color-line-light !important;
  font-size: 1.25rem !important;
  font-weight: bold;
}
.ant-collapse-arrow{
  color: $color-line-light !important;
  font-size: 1rem !important;
  font-weight: bold;
}
._qa{
}
._qa_title{
  @extend %h1;

  text-align: center;
}
._qa_des{
  @extend %white-card-style;

  padding: 2rem 1rem;
}
._qa_des__img{
  margin-top: 1rem;
  border: $color-gray 1px solid;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  overflow: hidden;
  border-radius: 1em;
  margin: 2rem 0 3rem;
}
._qa_des__title{
  color: $color-line-light !important;
  margin-bottom: 1rem !important;
}

// rwd
@media only screen and (min-width: $screen-sm) {
  .ant-collapse-header{
    font-size: 1.25rem !important;
  }
  .ant-collapse-arrow{
    font-size: 1.25rem;
  }
  ._qa_des__img{
    width: 80%;
  }
  ._qa_des{
    margin-left: 10%;
    margin-right: 10%;
  }
}
</style>
