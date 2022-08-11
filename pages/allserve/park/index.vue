<template>
	<view>
		<view class="main">
			<uni-card  
			class="item"
			v-for="(item,index) in parkList"
			:key="index"
			:title="item.parkName" 
			:sub-title="item.address" 
			:extra="item.distance+'公里'" >
			<view class="allc">
				<view class="content">
					<text>空位{{item.priceCaps}} 个|停车费{{item.rates}} 元/小时</text>
					<text> {{item.address}}</text>
				</view>
				<uni-icons type="forward" size="32" @click="toDetail(item.id)"></uni-icons>
			</view>
			</uni-card>
		<view class="btn">
			<button type="primary" @click="record">查看停车记录</button>
			<button type="primary" @click="more">查看更多</button>
		</view>
		</view>
	</view>
</template>

<script>
	import api from '@/common/apiUtil.js'
	export default {
		data() {
			return {
				pageNum:1,
				parkList:[]
			};
		},
		methods:{
			all(){
				this.getParkList(this.pageNum)
			},
			getParkList(pageNum){
				this.$get(api.GET_PARK_LIST,{
					pageNum,
					pageSize:5
				})
				.then(res=>{
					this.parkList=this.parkList.concat(res.rows)
				})
			},
			more(){
				this.getParkList(this.pageNum++)
			},
			toDetail(id){
				uni.navigateTo({
					url:'./park?id='+id
				})
			},
			record(){
				uni.navigateTo({
					url:'./parkDesc'
				})
			}
		},
		created() {
			this.all()
		}
		
	}
</script>

<style lang="scss">
	.main{
		.item{
			box-shadow:0 0 10rpx #ccc;
			.allc{
				display: flex;
				justify-content:space-around;
			.content{
			display: flex;
			flex-direction: column;
			text{
				
				color: #666;
			}
			}
		}
		}
	}
	.btn{
		margin: 15rpx;
		display: flex;
		justify-content: space-around;
		button{
			flex: 1;
			margin: 15rpx;
		}
	}
</style>
