<template>
  <div class="box2">
    <div class="title">
      <p>年龄比例</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <!-- 图形图标的容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
//引入echarts
import * as echarts from 'echarts';
const charts = ref();

onMounted(() => {
  const mychart = echarts.init(charts.value);
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      right: 30,
      top: 40,
      orient: 'vertical',//图例组件方向的设置
      textStyle: {
        color: 'white',
        fontSize: 14
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white'
        },

        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '60upper' },
          { value: 735, name: '41-60' },
          { value: 580, name: '31-40' },
          { value: 484, name: '21-30' },
          { value: 300, name: '0-20' }
        ]
      }
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom:100,      
    }
  };
  mychart.setOption(option)
})
</script>

<style scoped>
.box2 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;

  .title {
    margin-left: 20px;

    p {
      color: white;
      font-size: 20px;
    }
  }

  .charts {
    height: 260px;
  }
}
</style>
