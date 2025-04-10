<template>
    <div class="box">
        <div class="top">
            <p class="title">实时游客统计</p>
            <p class="bg"></p>
            <p class="rt">可预约总人数<span>99999</span>人</p>
        </div>
        <div class="number">
            <span v-for="(item, index) in people" :key="index">{{ item }}</span>
        </div>
        <div class="charts" ref="charts">123</div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts'
import 'echarts-liquidfill'

const people = ref('216908')
const charts = ref()

onMounted(() => {
    const mycharts = echarts.init(charts.value)
    mycharts.setOption({
        title: {
            text: '水球图'
        },
        //x|y轴组件
        xAxis: {},
        yAxis: {},
        //系列:决定你展示什么样的图形图标
        series: {
            type: 'liquidFill',//系列
            data: [0.6, 0.4, 0.2],//展示的数据
            waveAnimation: true,//动画
            animationDuration: 3,
            animationDurationUpdate: 0,
            radius: '80%',//半径
            outline: {//外层边框颜色设置
                show: true,
                borderDistance: 8,
                itemStyle: {
                    color: 'skyblue',
                    borderColor: '#294D99',
                    borderWidth: 8,
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.25)'
                }
            },
        },
        //布局组件
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    })
})


</script>

<style scoped>
.box {
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;

    .top {
        margin-left: 20px;

        .title {
            color: white;
            font-size: 20px;
        }

        .bg {
            background: url(../../images/dataScreen-title.png);
            width: 68px;
            height: 7px;
            background-size: 100% 100%;
        }

        .rt {
            float: right;
            color: white;
            font-size: 15px;

            span {
                color: orange;
            }
        }
    }

    .number {
        margin-top: 30px;
        display: flex;
        padding: 10px;

        span {
            flex: 1;
            height: 40 px;
            text-align: center;
            line-height: 40px;
            background: url(../../images/total.png) no-repeat;
            background-size: 100% 100%;
            color: #29fcff;
            font-size: 40px;
        }
    }

    .charts {
        width: 100%;
        height: 270px;
    }
}
</style>
