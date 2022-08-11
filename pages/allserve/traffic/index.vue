<template>
	<view class="body">
		<view class="swiper">
			<swiper indicator-dots autoplay  circular>
				<swiper-item v-for="(item,index) in carImg" :key="index">
					<image :src="item" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="search">
			<view class="">
			<uni-forms-item label="号码种类">
				<picker class="pick" mode="selector" :range="carType" :value="num" @change="val">
					<view>{{carType[num]}}</view>
				</picker>
			</uni-forms-item>
			
			</view>
			<view class="">
				<uni-forms-item label="车牌号码">
					<uni-easyinput inputBorder placeholder="请输入车牌号码"></uni-easyinput>
					</uni-forms-item>
			</view>
			<view class="">
				<uni-forms-item label="发动机号">
					<uni-easyinput inputBorder placeholder="请输入发动机号非必填"></uni-easyinput>
					</uni-forms-item>
			</view>
			<view class="">
				<button type="primary">车辆违章查询</button>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/common/apiUtil.js'
	export default {
		data() {
			return {
				num:0,
				carImg:[
					'../../../static/img/car1.jpg',
					'../../../static/img/car2.jpg',
					'../../../static/img/car3.png',
					'../../../static/img/car4.jpg'
				],
				carType:[
					'小型汽车','大型汽车','挂车','教练汽车','临时行驶车'
				]
			};
		},
		methods:{
			val(e){
				this.num=e.detail.value
			}
		}
	}
</script>

<style lang="scss">
	.body{
		margin: 20rpx;
	.swiper{
		width: 100%;
		border-radius: 30rpx;
		overflow: hidden;
		swiper{
			// margin: 10rpx;
			width: 100%;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.search{
		margin: 20rpx 0;
		padding: 20rpx;
		box-shadow: 0 0 5rpx #ccc;
		.pick{
			display: flex;
			padding-top: 18rpx;
			// align-content: center;
			// line-height: 40rpx;
		}
	}
	}
</style>
