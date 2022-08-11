<template>
	<view class="body">
		<view class="mar">
			<uni-easyinput v-model="$store.state.user.nickName" @input="btntoggle"></uni-easyinput>
		</view>
		<view class="mar">
			<button size="mini" :type="flag" @click="toggle">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag:'default',
				url:this.$store.state.baseUrl,
				msg:{nickName:this.$store.state.user.nickName},
				time:0
			};
		},
		methods:{
			btntoggle(){
				this.flag='warn'
			},
			toggle(){
				
				this.$store.dispatch('toggle',this.$store.state.user)
			}
		},
		onLoad() {
			this.$store.dispatch('getUserInfo')
		}
	}
</script>

<style lang="scss">
	.body{
		margin: 15rpx;
		padding: 0;
		.mar{
			margin: 20rpx;
		}
		
	}
</style>
