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
				<uni-forms-item label="车牌号码" class="card">
					<picker class="pick" mode="selector" :range="array" :value="num1" @change="val1" range-key="name">
						<view>{{array[num1].name}}</view>
					</picker>
					<uni-easyinput inputBorder placeholder="请输入车牌号码" v-model="carnum"></uni-easyinput>
					</uni-forms-item>
			</view>
			<view class="">
				<uni-forms-item label="发动机号">
					<uni-easyinput inputBorder placeholder="请输入发动机号非必填"></uni-easyinput>
					</uni-forms-item>
			</view>
			<view class="">
				<button type="primary" @click="submit">车辆违章查询</button>
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
				num1:0,
				carImg:[
					'../../../static/img/car1.jpg',
					'../../../static/img/car2.jpg',
					'../../../static/img/car3.png',
					'../../../static/img/car4.jpg'
				],
				carType:[
					'小型汽车','大型汽车','挂车','教练汽车','临时行驶车'
				],
				array: [
					{name:'京'},{name: '津'}, {name:'沪'}, {name:'渝'},
					{name:'宁'},{name: '陕'}, {name:'甘'}, {name:'苏'},
					{name:'浙'},{name: '闽'}, {name:'赣'}, {name:'云'},
					{name:'贵'},{name: '皖'}, {name:'港'}, {name:'澳'},
					{name:'台'},{name: '琼'}, {name:'辽'}, {name:'吉'},
					{name:'黑'},{name: '蒙'}, {name:'青'}, {name:'藏'},
					{name:'川'},{name: '新'}, {name:'鲁'}, {name:'桂'},
					{name:'豫'},{name: '冀'}, {name:'鄂'}, {name:'湘'},
					{name:'粤'},{name:'晋'}
				],
				carnum:''
			};
		},
		methods:{
			val(e){
				this.num=e.detail.value
			},
			val1(e){
				// console.log(e);
				this.num1=e.detail.value
			},
			submit(){
				if(this.carnum===''){
					return uni.showToast({
						title:'请填写完整',
						icon:'error'
					})
				}
				if(!this.filter(this.array[this.num1].name+this.carnum)){
					return uni.showToast({
						title:'车牌号有误',
						icon:"none"
					})
				}
				uni.showToast({
					title:'查询成功',
					icon:'success'
				})
			},
			filter(str){
			var reg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
			return reg.test(str.toUpperCase())
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
			
		}
		.card{
			display: flex;
		}
	}
	}
</style>
