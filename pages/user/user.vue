<template>
	<view class="body">
		<view class="header">
			<image :src="$store.state.baseUrl+'/prod-api'+$store.state.user.avatar" mode=""></image>
		</view>
		<ul>
			<li @click="userset">个人设置</li>
			<li @click="toorder">我的订单</li>
			<li @click="togglepwd">修改密码</li>
			<li @click="feedback">意见反馈</li>
			<li @click='loginout' >退出</li>
		</ul>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		methods:{
			userset(){
				uni.navigateTo({
					url:'./userset'
				})
			},
			togglepwd(){
				uni.navigateTo({
					url:'./pwd'
				})
			},
			toorder(){
				uni.navigateTo({
					url:'./user_order'
				})
			},
			feedback(){
				uni.navigateTo({
					url:'./feedback'
				})
			},
			loginout(){
				// uni.showToast({
				// 	title:'退出登录中',
				// 	icon:"loading"
				// })
				console.log('退出登录');
				uni.navigateTo({
					url:'../login/login'
				})
			}
		},
		onLoad() {
			this.$store.dispatch('getUserInfo')
		}
		
		
	}
</script>

<style lang="scss">
	ul{
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.body{
		margin: 15px;
		display: flex;
		flex-direction: column;
		align-items: center;
		.header{
			display: flex;
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			margin-bottom: 10rpx;
			image{
				border-radius: 50%;
				width: 100%;
				height: 100%;
			}
		}
		ul{
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			li{
				width: 100%;
				margin: 15rpx;
				padding: 10px;
				text-align: center;
				box-shadow: 0 5rpx 5rpx #ccc;
			}
		}
	}
</style>
