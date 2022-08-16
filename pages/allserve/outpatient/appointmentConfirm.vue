<template>
	<view>
		<view class="main">
			<view class="">
				<text>就诊人</text><text>{{bookData.pName}}</text>
			</view>
			<view class="">
				<text>预约科室</text><text>{{bookData.dtpName}}</text>
			</view>
			<view class="">
				<text>门诊类型</text><text>{{bookData.typeName}}</text>
			</view>
			<view class="">
				<text>金额</text><text>{{bookData.money}}</text>
			</view>
		</view>
		<view class="choose main">
			<view class="">
				<text>选择日期</text><text>
				<picker mode="date"  @change="todate">
					<view>{{date}}</view>
				</picker>
				</text>
			</view>
			<view class="">
				<text>选择时间</text><text></text>
				<picker mode="time"  @change="totime">
					<view>{{time}}</view>
				</picker>
			</view>
		</view>
		<view class="btn">
			<button style="border: 2rpx solid royalblue;color: royalblue;" @click="back">取消</button>
			<button type="primary" @click="submit">确认</button>
		</view>
	</view>
</template>

<script>
	import api from '@/common/apiUtil.js'
	export default {
		data(){
			return {
				date:new Date(),
				time:'12:00',
				bookData:{}
			};
		},
		methods:{
			todate(e){
				this.date=e.detail.value
			},
			totime(e){
				this.time=e.detail.value
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			submit(){
				this.$post(api.CREATE_APPOINT_ORDER,{
					categoryId:this.bookData.did,
					money: this.bookData.money,
					patientName:this.bookData.pName,
					reserveTime: this.date+' '+this.time,
					type: this.bookData.typeId
				})
				.then(res=>{
					if(res.code===200){
						uni.showToast({
							title:'预约成功'
						})
						setTimeout(()=>{
							uni.navigateTo({
								url:'appointmentResult'
							})
						},1000)
					}
				})
			}
		},
		onLoad() {
			uni.$on('appointInfo',res=>{
				this.bookData=res.data
			})
			this.date=this.date.getFullYear()+'-'+Number(this.date.getMonth()+1)+'-'+this.date.getDate()
		}
	}
</script>

<style lang="scss">
	.main{
		margin: 30rpx;
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		box-shadow:0 5rpx 5rpx 5rpx #ccc;
		view{
			flex: 1;
			margin: 10rpx;
			text:nth-child(1){
				color: #6e78f7;
			}
			text:nth-child(2){
				padding-left: 20rpx;
			}
		}
	}
	.choose{
		view{
			display: flex;
			justify-content: space-between;
		}
	}
	.btn{
		display: flex;
		justify-content: space-around;
	}
</style>
