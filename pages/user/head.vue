<template>
	<view class="body">
		<view class="head">
			<image :src="$store.state.baseUrl+'/prod-api'+$store.state.user.avatar" mode=""></image>
		</view>
		<view class="btn">
			<button size="mini" plain @click="toggle">更换头像</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:this.$store.state.user
			};
		},
		methods:{
			toggle(){
				uni.chooseImage({
					count:1,
					success:res=>{
						this.$store.dispatch('upload',res)
						this.$store.dispatch('getUserInfo')
					}
				})
			}
		},
		onLoad() {
			this.$store.dispatch('getUserInfo')
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.body{
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #000;
		.head{
			height: 100%;
			display: flex;
			align-items: center;
			
		image{
			height: 50%;
			width:100%;
		}
		}
		.btn{
			
			display: flex;
			align-items: center;
			margin-bottom: 5%;
			button{
				color: #fff;
				border: 5rpx solid #fff;
			}
		}
	}
</style>
