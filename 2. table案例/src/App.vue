<template>
  <div>
    <h1>App 根组件</h1>
    <hr/>
    <MyTable :data="goodslist">
      <!--添加标题的插槽-->
      <template v-slot:header>
        <th>序号</th>
        <th>商品名称</th>
        <th>价格</th>
        <th>标签</th>
        <th>操作</th>
      </template>
      <template v-slot:body="{row,index}">
        <td>{{ index + 1 }}</td>
        <td>{{ row.goods_name }}</td>
        <td>{{ row.goods_price }}</td>
        <td>
          <input type="text" class="form-control form-control-sm form-ipt" v-if="row.inputVisible" v-focus
          v-model.trim="row.inputValue" @blur="onInputConfirm(row)"/>
          <button type="button" class="btn btn-primary btn-sm" v-else @click="row.inputVisible = true">+Tag</button>
          <!--循环渲染标签信息-->
          <span class="badge badge-warning ml-2" v-for="item in row.tags" :key="item">{{ item }}</span>
        </td>
        <td>
          <button type="button" class="btn btn-danger btn-sm" @click="onRemove(row.id)">删除</button>
        </td>
      </template>
    </MyTable>
  </div>
</template>

<script>
import MyTable from './components/my-table/MyTable.vue'
export default {
  name: 'MyApp',
  data() {
    return {
      goodslist: []
    }
  },
  created() {
    // 发起请求
    this.getGoodsList()
  },
  methods: {
    async getGoodsList() {
      const {data: res} = await this.$http.get('/api/goods')
      if(res.status !== 0) return console.log('获取商品列表数据失败')
      this.goodslist = res.data
    },
    //根据id删除商品
    onRemove(id) {
      this.goodslist = this.goodslist.filter(x => x.id !== id)
    },
    onInputConfirm(row) {
      const val = row.inputValue
      row.inputValue = ''
      row.inputVisible = false
      if (!val || row.tags.indexOf(val) != -1)return
      row.tags.push(val)
    }
  },
  directives: {
    // 自定义属性获取焦点，通过v-focus来使用
    focus(el) {
      el.focus()
    }
  },
  components: {
    MyTable,
  }
}
</script>

<style lang="less" scoped>

.form-ipt {
  width: 80px;
  display: inline;
}
</style>