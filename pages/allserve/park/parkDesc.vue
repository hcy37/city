<template>
	<view>
		<view class="time">
		</view>
		<view class="main">
			<uni-card
			class="card"
			v-for="(item,index) in list"
			:key="index"
			:title="item.plateNumber"
			:extra="'收费金额'+item.monetary">
			<view class="detail">
				<text>入场时间： {{item.entryTime}}</text>
				<text>出场时间： {{item.outTime}}</text>
				<text>停车场名称： {{item.parkName}}</text>
			</view>
			</uni-card>
		</view>
		<view class="btn">
			<button type="primary" @click="more">查看更多</button>
		</view>
		</view>
</template>

<script>
	import api from '@/common/apiUtil.js'
	export default {
		data() {
			
			return {
				num:1,
				list:[]
			};
		},
		methods:{
			getrecord(num){
				this.$get(api.GET_PARK_RECORD,{
					pageNum:num,
					pageSize:3
				})
				.then(res=>{
					this.list=this.list.concat(res.rows)
					console.log(this.list);
				})
			},
			more(){
				this.getrecord(this.num++)
			}
		},
		created() {
			this.getrecord(1)
		}
	}
</script>

<style lang="scss">
	.card{
		box-shadow: 0 0 5rpx #ccc;
	.detail{
		display: flex;
		flex-direction: column;
	}
	}
	.btn{
		display: flex;
	}
</style>
