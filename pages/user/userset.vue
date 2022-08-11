<template>
	<view class="body">
		<ul>
			<li><text>头像</text>
			<view class="header" @click="head">
			<image :src="$store.state.baseUrl+'/prod-api'+$store.state.user.avatar" mode=""></image>
			</view>
			</li>
			<li><text>用户名</text> <text>{{this.$store.state.user.userName}}</text></li>
			<li><text>用户ID</text> <text>{{this.$store.state.user.userId}}</text></li>
			<li><text>用户昵称</text> <text>{{this.$store.state.user.nickName}}<uni-icons type="forward" size="30" color="#ccc" @click="nickName"></uni-icons></text></li>
			<li><text>手机号</text> <text>{{this.$store.state.user.phonenumber}}<uni-icons type="forward" size="30" color="#ccc" @click="tel"></uni-icons></text></li>
			<li><text>邮箱</text> <text>{{this.$store.state.user.email}}<uni-icons type="forward" size="30" color="#ccc" @click="email"></uni-icons></text></li>
			<li><text>性别</text> <text>{{this.$store.state.user.sex==0?'男':'女'}}<uni-icons type="forward" size="30" color="#ccc" @click="sex"></uni-icons></text></li>
			<li><text>用户积分</text> <text>{{this.$store.state.user.balance}}</text></li>
		</ul>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// user:this.$store.state.user
			};
		},
		methods:{
			nickName(){
				uni.navigateTo({
					url:'./nickName'
				})
			},
			tel(){
				uni.navigateTo({
					url:'./tel'
				})
			},
			email(){
				uni.navigateTo({
					url:'./email'
				})
			},
			sex(){
				uni.navigateTo({
					url:'./sex'
				})
			},
			head(){
				uni.navigateTo({
					url:'./head'
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
		margin: 15rpx;
		padding: 0;
		ul{
			margin-top: 20rpx;
			display: flex;
			flex-direction: column;
			li{
				display: flex;
				justify-content: space-between;
				margin: 15rpx;
				font-size: 42rpx;
				color: #333;
				align-items: center;
				.header{
					width: 200rpx;
					height: 200rpx;
					border-radius: 50%;
					image{
						border-radius: 50%;
						width: 100%;
						height: 100%;
					}
				}
				text:nth-child(2){
					color: #ccc;
					
				}
			}
			
			
		}
	}
</style>
