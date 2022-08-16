<template>
	<view class="body">
		<view class="swiper">
			<swiper indicator-dots autoplay circular>
				<swiper-item v-for="(item,index) in img" :key="index">
					<image :src="base+item.imgUrl" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="main" v-html="main.brief">
		</view>
		<view class="btn">
			<button type="primary" style="border-radius: 50rpx;" @click="book">预约挂号</button>
		</view>
	</view>
</template>

<script>
	import api from '@/common/apiUtil.js'
	export default {
		data() {
			return {
				base:api.SERVER_BASE,
				main:{},
				img:[]
			};
		},
		methods:{
			getinfo(id){
				this.$get(api.GET_HOSPITAL_DETAILS+id)
				.then(res=>{
					this.main=res.data
				})
				this.$get(api.GET_HOSPDTL_ROTATIONS,{
					hospitalId: id
				})
				.then(res=>{
					this.img=res.data
				})
			},
			book(){
				uni.navigateTo({
					url:'./personList'
				})
			}
		},
		onLoad(options){
			this.getinfo(options.id)
		}
	}
</script>

<style lang="scss">
		.body{
			padding: 20rpx;
			
		.swiper{
			border-radius: 30rpx;
			overflow: hidden;
		swiper{
			width: 100%;
			image{
				height: 100%;
				width: 100%;
			}
		}
	}
	.main{
		border-radius: 10rpx;
		margin: 15rpx;
		padding: 25rpx;
		box-shadow: 0 5rpx 5rpx 5rpx #ccc;
	}
	
	.btn{
		margin: 15rpx;
		
	}}
</style>
