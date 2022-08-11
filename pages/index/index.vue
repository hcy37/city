<template>
	<view class="">
		<scroll-view scroll-x="true">
			<view class="item1">
				asdas
			</view>
			<view class="item2">
				dasda
			</view>
			<view class="item3">
				asdasdas
			</view>
		</scroll-view>
		<img src="http://172.18.11.250:10001/prod-api/profile/upload//2021/05/17/d4ae4440-0599-42b9-a9bf-ee28c23be0e0.jpg">
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {

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
