<template>

  <table class="table table-borderd table-striped">
    <!--标题区域-->
    <thead>
      <tr>
        <slot name="header"></slot>
      </tr>
    </thead>
    <!--内容主体区域-->
    <tbody>
      <tr v-for="(item,index) in data" :key="item.id">
        <!--数据行插槽-->
        <slot name="body" :row="item" :index="index"></slot>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'MyTable',
  props: {
    data: {
      type: Array,
      required: true,
      default: []
    }
  }
}
</script>

<style lang="less" scoped>

</style>