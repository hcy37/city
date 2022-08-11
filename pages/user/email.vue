<template>
	<view class="body">
		<view class="mar">
			<uni-easyinput v-model="msg.email" @input="btntoggle"></uni-easyinput>
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
				msg:{email:this.$store.state.user.email}
			};
		},
		methods:{
			btntoggle(){
				this.flag='warn'
			},
			toggle(){
				this.$store.dispatch('toggle',this.msg)
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
