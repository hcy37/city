<template>
	<view class="body">
		<view class="swiper">
		<swiper indicator-dots autoplay circular="true" indicator-color="#fff">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item" mode=""></image>
			</swiper-item>
		</swiper>
		</view>
		<view class="set b-sh">
			<button @click="toIP">IP端口号设置</button>
		</view>
		<view class="btn b-sh">
			<button @click="toLogin">立即体验</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[
					'../../static/img/guide1.jpg',
					'../../static/img/guide2.jpg',
					'../../static/img/guide3.jpg',
					'../../static/img/guide4.jpg',
					'../../static/img/guide5.jpg'
				]
			};
		},
		methods:{
			toLogin(){
			uni.navigateTo({
				url:'../login/login'
			})
			},
			toIP(){
			uni.navigateTo({
				url:'../IP/IP'
			})
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.body{
		height: 100%;
		margin: 0;
		padding: 0;
		.swiper{
			height: 100%;
			swiper{
				height: 100%;
				
					image{
						width: 100%;
						height: 100%;
					}
			}
		}
		.btn{
			position: fixed;
			bottom: 60rpx;
			left: 50%;
			transform: translateX(-50%);
		}
		.set{
			position: fixed;
			top: 150rpx;
			right: 50rpx;
		}
		.b-sh{
			box-shadow: 0px 5px 5px #333;;
		}
	}
</style>
