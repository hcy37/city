<template>
	<view class="body">
		<view class="mar check">
			<uni-data-checkbox @change="btntoggle" v-model="msg.sex" icon="right" mode="list"  :localdata="sex"></uni-data-checkbox>
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
				msg:{sex:Number(this.$store.state.user.sex)},
				sex: [{
					text: '男',
					value: 0
					}, {
					text: '女',
					value: 1
					}]
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
