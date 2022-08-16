<template>
	<view>
		<view class="">
			<uni-search-bar placeholder="请输入医院名称" v-model="name" @cancel="cancel" @confirm="submit"></uni-search-bar/>
		</view>
		<view class="list" v-if="hospital.length>0">
			<uni-card
			class="card"
			v-for="(item,index) in hospital"
			:thumbnail="base+item.imgUrl"
			:title="item.hospitalName"
			:key="index">
				<view class="level">
					<uni-rate v-model="item.level"></uni-rate>
					<uni-icons type="forward" size="28" @click="toDetail(item.id)"></uni-icons>
				</view>
			</uni-card>
		</view>
		<view class="nodata" v-else>
			未查询到你要的医院!
		</view>
	</view>
</template>

<script>
	import api from '@/common/apiUtil.js'
	export default {
		data() {
			return {
				base:api.SERVER_BASE,
				name:'',
				hospital:[]
			};
		},
		methods:{
			submit(){
				this.gethospital(this.name)
			},
			cancel(e){
				this.hospital=[]
				this.gethospital('')
			},
			gethospital(name){
				if(name===''){
					this.$get(api.GET_HOSPITAL_LIST)
					.then(res=>{
						this.hospital=res.rows
					})
				}else{
					this.$get(api.GET_HOSPITAL_LIST,{
						hospitalName:name
					})
					.then(res=>{
						this.hospital=res.rows
					})
				}
			},
			toDetail(id){
				uni.navigateTo({
					url:'./hospitalDesc?id='+id
				})
			}
		},
		created() {
			this.gethospital(this.name)
		}
	}
</script>

<style lang="scss">
	.list{
		padding-bottom: 50rpx;
		.card{
			box-shadow: 0 0 5rpx #666;
		}
	.level{
		display: flex;
		justify-content: flex-end;
		
	}
	
	}
	.nodata{
		text-align: center;
		padding: 20rpx 0;
	}
</style>
