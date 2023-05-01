<template>
  <div class="_return">
    <a-typography-title :level="1" class="_return_title">Line 貼圖收益分析工具</a-typography-title>
    
    <div class="_return_upload">
      <a-typography-title :level="4">使用方法</a-typography-title>
        <p>
          上傳由
          <a-typography-link href="https://creator.line.me/signup/line_auth" target="_blank">
            LINE Creators Market
          </a-typography-link>
          下載的 
          <a-tooltip>
            <template #title>檔名為 return-XXXXX.csv</template>
            收益報表
          </a-tooltip>
          檔案
        </p>
        
        <input type="file" id="uploadBtn" @change="handleFileChange" multiple hidden>
        <label class="_return_upload__btn" for="uploadBtn">
          <i class="las la-upload _return_upload__icon"></i> 點我上傳 (複數可)
        </label>
    </div>

    <a-row v-if="tableData.length != 0" :gutter="20">
      <a-col :xs="24" :md="12">
        <div class="_return_duration">
          <a-typography-title :level="5">期間</a-typography-title>
          <div class="_return_duration__month"> {{ startMonth }} - {{ endMonth }} </div>
        </div>
      </a-col>
      <a-col :xs="24" :md="12">
        <div class="_return_total">
          <a-typography-title :level="5">總分潤</a-typography-title>
          <div class="_return_total__totalShare">
            <span class="_return_total__jpy"> {{ totalShare }} 円</span>
            <span class="_return_total__twd"> ( 約為新台幣 {{ ntdShare }} 元 ) </span>
          </div>
        </div>
      </a-col>
    </a-row>
      
    <div class="_return_table" v-if="tableData.length != 0">
      <a-table :columns="fields" :data-source="tableData" @change="onChange" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import moment from "moment";
import axios from "axios";

export default {
  name: 'Return',
  data() {
    return {
      // upload
      fileLength: 0,
      fileCounter: 0,

      // summary ui
      startMonth: '',
      endMonth: '',

      // data
      allDataArr: [],
      jsonData: [],
      tableData: [],
      idArr: [],
      uniqIdArr: [],
      monthArr: [],
      uniqMonthArr: [],
      typeArr: [],

      totalShare: 0,
      ntdShare: 0,

      // table
      fields: [
          {
            title: 'Month',
            dataIndex: 'month',
            originIdx: 0,
            responsive: ['xxl']
          },
          {
            title: 'ID',
            dataIndex: 'id',
            originIdx: 3,
            responsive: ['md']
          },
          {
            title: 'Title',
            dataIndex: 'title',
            originIdx: 4
          },
          {
            title: 'Type',
            dataIndex: 'type',
            originIdx: 2,
            responsive: ['sm'],
            filters: [
              {
                text: 'Sticker',
                value: 'Sticker',
              },
              {
                text: 'Emoji',
                value: 'Emoji',
              },
              {
                text: 'Theme',
                value: 'Theme',
              },
            ],
            onFilter: (value, record) => record.type.indexOf(value) === 0,
          },
          {
            title: 'Country',
            dataIndex: 'country',
            originIdx: 5,
            responsive: ['md']
          },
          {
            title: 'Sales Counts',
            dataIndex: 'salesCounts',
            originIdx: 7,
            responsive: ['md'],
            sorter: {
              compare: (a, b) => a.salesCounts - b.salesCounts,
            },
          },
          {
            title: 'Revenue Share',
            dataIndex: 'revenueShare',
            originIdx: 12,
            fixed: 'right',
            sorter: {
              compare: (a, b) => a.revenueShare - b.revenueShare,
            },
            defaultSortOrder: 'descend',
          },
      ]
    }
  },
  methods: {
    onChange: (pagination, filters, sorter, extra) => {
      // console.log('params', pagination, filters, sorter, extra);
    },
    resetAllDataContainer(){
      this.fileLength = 0;
      this.fileCounter = 0;
      this.allDataArr = [];
      this.tableData = [];
      this.jsonData = [];
      
      this.monthArr = [];
      this.idArr = [];
    },
    handleFileChange (e) {
      // reset all data container
      this.resetAllDataContainer();

      let files = e.target.files;
      this.fileLength = files.length;
      for (let i = 0; i < files.length; i++) {
        this.$papa.parse (files[i], {
          complete: (results) => {
            this.collectData(results.data);
          }
        });
      }
    },
    collectData (data) {
      // Remove unnecessary info in csv
      // table head
      data.shift()[0];
      // 2 empty element in every csv
      data.splice(-2, 2);
      
      // push all data in to an array
      let dataArr = this.reorganizeData(data);
      this.allDataArr = _.concat( this.allDataArr, dataArr);
    },
    reorganizeData (items) {
      let res = [];
      
      items.forEach( (item) => {
        let itemObj = {};
        // add key to data
        this.fields.map((o)=>{
          itemObj[o.dataIndex] = item[o.originIdx];
        });
        res.push(itemObj);
        
        // get all ID
        this.idArr.push(itemObj.id);
        
        // get all Type ( Sticker, Emoji or Theme)
        this.typeArr.push({
          text: itemObj.type,
          value: itemObj.type,
        });
        
        // this.countryArr.push(itemObj.country);
        
        // get all month
        this.monthArr.push(itemObj.month);
        
        itemObj = {};
      });

      return res;
    },
    arrangeObjData( allDataArr ){
      this.getRequiredData();
      let res = [];
      this.uniqIdArr.map((id)=>{
        res.push( _.filter(allDataArr, {'id': id }) );
      });

      this.jsonData = res;
    },
    getRequiredData(){
      // uniq ID
      this.uniqIdArr = _.uniq(this.idArr);

      // uniq month
      let tempMonthArr = _.sortedUniq( this.monthArr )
      const newArr = tempMonthArr.sort((a, b) => {
        return moment(a).diff(b);
      });
      this.uniqMonthArr = newArr;

      // set start month
      this.startMonth = moment(this.uniqMonthArr[0]).format('YYYY/MM');

      // set end month
      this.endMonth = moment(this.uniqMonthArr[this.uniqMonthArr.length-1]).format('YYYY/MM');
    },
    jsonToTableData () {
      let resArr = [];

      // total
      this.jsonData.forEach( (item) => {
        let row = {
          salesCounts: 0,
          country: [],
          revenueShare: 0
        }

        item.forEach( (e) => {
          row.id = e.id;
          row.title = e.title;
          row.type = e.type;
          if( e.salesCounts != "" ){
            row.salesCounts += parseInt(e.salesCounts);
          }
          // combine country
          row.country.push(e.country);
          row.revenueShare += parseInt(e.revenueShare);
        });

        // get uniq country and connect with ','
        row.country = _.join( _.filter(_.uniq(row.country), function(o) { return o != ''; } ) , ', ');

        resArr.push(row);
      });
      
      let finalArr = [];
      resArr.map((item)=>{
        // remove revenueShare === 0 item
        if(item.revenueShare != 0){
          finalArr.push(item);
        }
      });

      this.tableData = finalArr;
      
      // total
      let subTotal = 0;
      _.forEach( this.tableData , function(value) {
        subTotal += value.revenueShare
      });
      this.totalShare = subTotal;
      
      // to NTD
      this.ntdShare = parseInt( this.totalShare / Number(this.mostRecentData["USD/JPY"]) * Number(this.mostRecentData["USD/NTD"]) );
    },
    async getExrate() {
      const config = {
        method: 'get',
        url: '/DailyForeignExchangeRates',
        headers: {
          'accept': 'application/json',
          'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
        baseURL: 'https://openapi.taifex.com.tw/v1',
        // baseURL: 'https://cors-anywhere.herokuapp.com/https://openapi.taifex.com.tw/v1',
      }

      try {
        const response = await axios(config)
        const data = response.data;
        this.mostRecentData = data[data.length-1];

      } catch(err) {
        console.log('err')
      }
    }
  },
  watch: {
    allDataArr: async function( data ) {
      if( this.fileCounter === this.fileLength ){
        await this.arrangeObjData( data );
        await this.jsonToTableData();
      }

      this.fileCounter ++;
    },
  },
  created(){
  },
  mounted(){
    this.getExrate()
  }
}
</script>

<style lang="scss">
._return{
  text-align: center;
}
._return_title{
  @extend %h1;
}
._return_upload{
  @extend %white-card-style;
}
._return_upload__icon{    
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 0.25rem;
}
._return_upload__btn{
  cursor: pointer;
  transition: all .2s ease-in;
  background-color: $color-line-light;
  color: white;
  padding: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
  display: flex;
  margin: auto;
  border-radius: 5rem;
  justify-content: center;
  align-items: center;

  &:hover{
    filter: brightness(115%);
  }
}
._return_table{
  @extend %white-card-style;
}
._return_duration{
  @extend %white-card-style;
}
._return_duration__month{
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: .5rem;
  color: $color-line-light;
}
._return_total{
  @extend %white-card-style;
}
._return_total__jpy{
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: .25rem;
  color: $color-line-light;
}

// rwd
@media only screen and (min-width: $screen-sm) {
  ._return_duration__month{
    font-size: 1.5rem;
  }
  ._return_upload__btn{
    width: 50%;
  }
}
</style>
