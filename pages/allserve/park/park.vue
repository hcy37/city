<template>
	<view>
		<uni-card
		class="card"
		:title="info.parkName"
		:extra="info.distance+'公里'">
		<view class="main">
			<view class="dot">
				<view class="open">
				<text>对外开放</text>
					<view class="">
						<uni-icons type="location" size="32"></uni-icons>
						<text>{{info.address}}</text>
					</view>
				</view>
				<view class="car">
					<text>车位信息</text>	
					<view class="info">
						<view class="">
							<text>停车费</text>
							<view class="">
								{{info.rates}}元/小时
							</view>
						</view>
						<view class="">
							<text>剩余车位</text>
							<view class="">
								{{info.priceCaps}}个/{{info.allPark}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="pay">
				<text>收费参考</text>
				<text>每个小时{{info.rates}}元,最高30一天</text>
			</view>
		</view>
		</uni-card>
	</view>
</template>

<script>
	import api from '@/common/apiUtil.js'
	export default {
		data() {
			return {
				info:{}
			};
		},
		methods:{
			getDetail(id){
				this.$get(api.GET_PARK_DETAILS+id)
				.then(res=>{
					this.info=res.data
				})
			}
		},
		onLoad(option) {
			this.getDetail(option.id)	
		}
	}
</script>

<style lang="scss">
	.card{
		box-shadow: 0 0 10rpx #ccc;
	}
	.main{
		
		.dot{
			display: flex;
			flex-direction: column;
			padding: 15rpx;
			.open{
				height: 150rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				border-bottom: 3rpx solid #000;
				
			}
			.car{
				padding: 15rpx 0;
			.info{
				margin: 30rpx;
				display: flex;
				justify-content: space-around;
			}}
		}
		.pay{
			margin:10rpx;
			padding: 10rpx;
			display: flex;
			flex-direction: column;
		}
	}
</style>
