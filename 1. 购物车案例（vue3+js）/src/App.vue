<template>
  <div class="app-container">
  <EsHeader title="购物车案例"></EsHeader>
  <EsGoods v-for="item in goodslist" 
  :key="item.id" :id="item.id" :thumb="item.goods_img" 
  :title="item.goods_name" :price="item.goods_price"
  :count="item.goods_count" :checked="item.goods_state" 
  @stateChange="onGoodsStateChange"
  @countChange="onGoodsCountChange"
  ></EsGoods>
  <EsFooter @fullChange="onFullStateChange" :amount="amount"
  :total="total"></EsFooter>
  </div>

</template>

<script>
import EsHeader from './components/es-header/ESHeader.vue';
import EsFooter from './components/es-footer/EsFooter.vue';
import EsGoods from './components/es-goods/EsGoods.vue';
import { setTransitionHooks } from 'vue';

export default {
  name: 'MyApp',
  data() {
    return {
      //商品列表的数据
      goodslist: []
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 获取商品列表数据的方法
    async getGoodsList() {
      const { data: res } = await this.$http.get('/api/cart')
      if(res.status !== 200) return alert('数据请求失败')
      this.goodslist = res.list
      console.log(res)
    },
    // 监听选中状态变化的事件
    onFullStateChange(isFull) {
      console.log(isFull)
      this.goodslist.forEach(x => x.goods_state = isFull)
    },
    // 监听商品勾选状态变化
    onGoodsStateChange(e) {
      const findResult = this.goodslist.find(x => x.id == e.id)
      if (findResult) {
        findResult.goods_state = e.value
      }
    },
    onGoodsCountChange(e) {
      const findResult = this.goodslist.find(x => x.id == e.id)
      if (findResult) {
        findResult.goods_count = e.value
      }
    }
  },
  computed: { 
    //已勾选商品的总价格
    amount() {
      let a = 0
      this.goodslist.filter(x=> x.goods_state).forEach(x => {
        a += x.goods_count * x.goods_price
      })
      console.log(a)
      return a
    },
    // 已勾选商品总数量
    total() {
      let t = 0
      this.goodslist.filter(x => x.goods_state).forEach(
        x=>{
          t+=x.goods_count
        }
      )
      return t
    }
  },
  components: {
    EsHeader,
    EsFooter,
    EsGoods,
  },
}
</script>


<style lang="less" scoped>
.app-container {
  padding-top: 45px;
}
</style>