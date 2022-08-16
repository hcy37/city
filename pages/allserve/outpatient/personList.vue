<template>
	<view>
		<view class="user">
				<uni-card
				class="item"
				thumbnail="../../../static/img/header.png"
				:title="item.name"
				:note="'手机号码:  '+ item.tel"
				v-for="(item,index) in user" 
				:key="index">
				<view class="cardId">
					<text @click="book(item.name)">身份证号码：{{item.cardId}}</text>
					<uni-icons type="gear" size="30" @click="edit(item)"></uni-icons>
				</view>
				</uni-card>
		</view>
		<view class="main">
			<uni-icons type="plus-filled" size="40" @click="info"></uni-icons>
			<text>添加就诊人</text>
		</view>
	</view>
</template>

<script>
	import api from '@/common/apiUtil.js'
	export default {
		data() {
			return {
				user:[]
			};
		},
		methods:{
			getCard(){
				this.$get(api.GET_PATIENT_LIST)
				.then(res=>{
					this.user=res.rows
				})
			},
			info(){
				uni.navigateTo({
					url:'./addperson?type=1'
				})
			},
			edit(item){
				setTimeout(()=>{
					uni.$emit('cardInfo',{data:item})
				},500)
				uni.navigateTo({
					url:'./addperson?type=2'
				})
			},
			book(name){
				uni.navigateTo({
					url:'registration?name='+name
				})
			}
		},
		
		created() {
			this.getCard()
		}
	}
</script>

<style lang="scss">
	.item{
		margin: 15rpx;
		box-shadow: 0 5rpx 5rpx #ccc;
		.cardId{
			display: flex;
			justify-content: space-between;
		}
	}
	.main{
		margin:100rpx 20rpx;
		padding: 50rpx;
		display: flex;
		justify-content: center;
		box-shadow: 0 5rpx 5rpx 5rpx #ccc;
		line-height: 40rpx;
	}
</style>
