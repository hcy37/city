<template>
	<view>
		<view class="form">
		<uni-forms class>
			<uni-forms-item><uni-easyinput v-model="ip" placeholder="请输入IP端口号"/></uni-forms-item>
			<view class="btn">
				<button type="warn" size="mini" @click="change">确认</button>
			</view>
		</uni-forms>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ip:''
			};
		},
		computed:{
		
		},
		methods:{
			change(){
				this.$store.commit('changeUrl',this.ip)
				this.ip=''
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #e5e5e5;
	}
	.form{
		
		background-color: #fff;
		position: fixed;
		width: 700rpx;
		padding: 30rpx;
		bottom: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.btn{
		display: flex;
		justify-items: center;
	}
</style>
