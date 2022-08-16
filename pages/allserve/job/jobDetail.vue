<template>
	<view>
		<view class="main">
			<uni-card title="工作列表" isShadow>
				<view class="info">
				<view class="">
					<text>职位名称：</text><text>{{info.name}}</text>
				</view>
				<view class="">
					<text>职位描述：</text><text>{{info.need}}</text>
				</view>
				<view class="">
					<text>工作地址：</text><text>{{info.address}}</text>
				</view>
				<view class="">
					<text>薪酬：</text><text>{{info.salary}}</text>
				</view>
				<view class="">
					<text>联系人：</text><text>{{info.contacts}}</text>
				</view>
				<view class="">
					<text>工作描述：</text><text>{{info.obligation}}</text>
				</view>
				</view>
			</uni-card>
			<uni-card title="公司信息" isShadow>
				<view class="">
					<view class="">
						<text>公司名称：</text><text>{{company.companyName}}</text>
					</view>
					<view class="">
						<text>公司简介：</text><text>{{company.introductory}}</text>
					</view>
				</view>
			</uni-card>
		</view>
		<view class="join">
			<button type="primary" @click="join">投简历</button>
		</view>
	</view>
</template>

<script>
	import api from '@/common/apiUtil.js'
	export default {
		data() {
			return {
				info:[],
				company:[],
				pid:0,
				cid:0
			};
		},
		methods:{
			getDetail(id){
				this.$get(api.GET_POST_DETAIL+id)
				.then(res=>{
					this.info=res.data
					this.getCompany(this.info.companyId)
				})
			},
			getCompany(id){
				this.$get(api.GET_COMPANY_DETAIL+id)
				.then(res=>{
					this.company=res.data
				})
			},
			join(){
				this.$post(api.DELIVER_RESUME,{
					companyId:this.company.id,
					postId:this.pid,
					money: this.info.salary,
					postName: this.company.companyName
				})
				.then(res=>{
					clearTimeout(this.timer)
					if(res.code==200){
						uni.showToast({
							title:"投递成功",
							icon:'none',
						})
						this.timer=setTimeout(()=>{
							uni.navigateBack()
						},1500)
					}else{
						uni.showToast({
							title:'投递失败',
							icon:'error'
						})
					}
					console.log(res);
				})
			}
		},
		onLoad(options) {
			this.pid=options.id
			this.getDetail(options.id)
		}
	}
</script>

<style lang="scss">
	.join{
		margin: 0 30rpx;
	}
</style>
