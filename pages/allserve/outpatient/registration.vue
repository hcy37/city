<template>
	<view>
		<view class="btn">
			<button :type="flag1" @click="toggle(1)">专家号</button>
			<button :type="flag2" @click="toggle(2)">普通号</button>
		</view>
		<view class="main">
			<uni-list>
				<uni-list-item
				v-for="(item,index) in list"
				:title="item.categoryName"
				showArrow
				clickable
				@click="goorder(item.money,item.categoryName,item.id)"
				:key="index">
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import api from '@/common/apiUtil.js'
	export default {
		data() {
			return {
				flag1:'primary',
				flag2:'default',
				list:[],
				name:'',
				typeNum:1
			};
		},
		onLoad(options){
			this.name=options.name
		},
		methods:{
			toggle(id){
				if(id==1){
					this.flag1='primary'
					this.flag2='default'
				}else{
					this.flag1='default'
					this.flag2='primary'
				}
				this.getinfo(id)
			},
			getinfo(id){
				this.typeNum=id
				this.$get(api.GET_DEPART_LIST+'?type='+id)
				.then(res=>{
					this.list=res.rows
				})
			},
			goorder(money,kinds,did){
				var typeName=this.typeNum==1?'专家号':'普通号'
				setTimeout(()=>{
					uni.$emit('appointInfo',{data:{
						typeName,
						dtpName:kinds,
						pName:this.name,
						money,
						did,
						typeId:this.typeNum
					}})
				},500)
				uni.navigateTo({
					url:'appointmentConfirm'
				})
			}
			
		},
		created() {
			this.getinfo(1)
		}
	}
</script>

<style lang="scss">
	.btn{
		padding:30rpx 0; 
		display: flex;
		justify-content: space-around;
		background: #f0f0f0;
	}
</style>
