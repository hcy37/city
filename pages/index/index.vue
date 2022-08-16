<template>
	<view class="">
		<input type="text" v-model="msg" placeholder="msg">
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg:''
			}
		},
		methods: {

		},
		onLoad() {
			uni.$on('cardInfo',res=>{
				this.msg=res.data.id
				console.log(res.data.id);
			})
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
	scroll-view{
			width: 100%;
			height: 300rpx;
			white-space: nowrap;
		}
		.item1,.item2,.item3{
			display: inline-block;
			width: 100%;
			height: 100%;
		}
		.item1{
			background-color: #007AFF;
		}
		.item2{
			background-color: #333333;
		}
		.item3{
			background-color: #4CD964;
		}

</style>
