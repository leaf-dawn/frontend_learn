<template>
  <div class="counter-container">
    <!--数量 -1按钮-->
    <button type="button" class="btn btn-light btn-sm" @click="onSubClick">-</button>
    <input type="number" class="form-control form-control-sm ipt-num" v-model.number.lazy="number"/>
    <!--数量 +1按钮-->
    <button type="button" class="btn btn-light btn-sm" @click="onAddClick">+</button>
  </div>
</template>

<script>
export default {
  name: 'EsCounter',
  props: {
    num: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: NaN,
    }
  },
  data() {
    return {
      number: this.num
    }
  },
  emits: ['numChange'],
  watch: {
    number(newVal) {
      const parseResult = parseInt(newVal)
      if (isNaN(parseResult) || parseResult < 1) {
        this.number = 1
        return
      }
      if (String(newVal).indexOf('.') !== -1) {
        this.number = parseResult
        return
      }
      this.$emit('numChange', this.number)
    }
  },
  methods: {
    onSubClick() {
      if (!isNaN(this.min) && this.number - 1 < this.min) return
      this.number--;
    },
    onAddClick() {
      this.number++;
    }
  }
}
</script>

<style lang="less" scoped>
.counter-container {
  display: flex;
  //按钮样式
  .btn {
    width: 25px;
  }
  .ipt-num {
    width: 34px;
    text-align: center;
    margin: 0 4px;
  }
}
</style>