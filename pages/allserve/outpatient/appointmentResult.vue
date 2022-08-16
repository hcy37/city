<template>
	<view>
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view><text>预约订单</text><text>{{item.orderNo}}</text></view>
				<view><text>预约金额</text><text>{{item.money}}</text></view>
				<view><text>就诊人</text><text>{{item.patientName}}</text></view>
				<view><text>预约科室</text><text>{{item.type=='1'?'专家号':'普通号'}}</text></view>
				<view><text>门诊类型</text><text>{{item.categoryName}}</text></view>
				<view><text>预约时间</text><text>{{item.createTime}}</text></view>
			</view>
		</view>
		<view class="back">
			<button type="primary" @click="back">返回首页</button>
		</view>
	</view>
</template>

<script>
	import api from '@/common/apiUtil.js'
	export default {
		data() {
			return {
				list:[]
			};
		},
		methods:{
			getList(){
				this.$get(api.GET_APPOINT_LIST)
				.then(res=>{
					this.list=res.rows
					console.log(list);
				})
			},
			back(){
				uni.switchTab({
					url:'../../home/home'
				})
			}
		},
		created() {
			this.getList()
		}
	}
</script>

<style lang="scss">
	.item{
		margin: 20rpx;
		box-shadow: 0 5rpx 5rpx 5rpx #ccc;
		padding: 30rpx;
		view{
			margin: 15rpx;
			text:nth-child(1){
				color: #6e78f7;
				padding-right: 20rpx;
			}
		}
	}
</style>
