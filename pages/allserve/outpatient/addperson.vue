<template>
	<view>
		<view class="form">
			<view class="item">
				<text>姓名</text>
				<input v-model="niname" maxlength="4" style="text-align: right;" type="text" placeholder="请输入姓名">
			</view>
			<view class="item">
				<text>性别</text>
				<uni-data-checkbox v-model="rsex" :localdata="sex"></uni-data-checkbox>
			</view>
			<view class="item">
				<text>身份证号码</text>
				<input v-model="id" style="text-align: right;" type="text" placeholder="请输入身份证">
			</view>
			<view class="item">
				<text>出生年月</text>
				<picker mode="date"  @change="ymd">
					<view v-if="bir==''">{{year}}-{{month}}-{{day}}</view>
					<view v-else v-model="bir">
						{{bir}}
					</view>
				</picker>
			</view>
			<view class="item">
				<text>手机号码</text>
				<input v-model="tel" style="text-align: right;" type="text" placeholder="请输入手机号码">
			</view>
			<view class="item">
				<text>地址</text>
				<input v-model="address"  style="text-align: right;" type="text" placeholder="请输入地址">
			</view>
		</view>
		<view class="btn">
			<button >取消</button>
			<button type="primary" @click="submit">确认</button>
		</view>
	</view>
</template>

<script>
	import api from '@/common/apiUtil.js'
	export default {
		data() {
			const date = new Date()
			const year=date.getFullYear()
			const month=date.getMonth()+1
			const day=date.getDate()
			return {
				year,
				month,
				day,
				rsex:0,
				niname:'',
				tel:'',
				id:'',
				address:'',
				bir:'',
				type:1,
				cardId:'',
				sex:[
					{text:'男',
					value:0,
					},{
					text:'女',
					value:1
					}
				]
			};
		},
		onLoad(options) {
			this.type=options.type
			if(options.type==1){
				uni.setNavigationBarTitle({
					title:'新增就诊人'
				})
			}else{
				uni.setNavigationBarTitle({
					title:'编辑就诊人信息'
				})
			}
			uni.$on('cardInfo',res=>{
				this.rsex=Number(res.data.sex)
				this.niname=res.data.name
				this.tel=res.data.tel
				this.id=res.data.cardId
				this.cardId=res.data.id
				this.address=res.data.address
				this.bir=res.data.birthday
			})
		},
		methods:{
			submit(){
				if(this.niname===''){
					return uni.showToast({
						title:'姓名为空',
						icon:"none"
					})
				}
				if(this.id===''){
					return uni.showToast({
						title:'身份证号码为空',
						icon:"none"
					})
				}else{
					var reg=/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
					if(!reg.test(this.id)){
						return uni.showToast({
						title:'身份证号码错误',
						icon:"none"
					})
					}
				}
				if(this.tel===''){
					return uni.showToast({
						title:'电话号码为空',
						icon:"none"
					})
				}else{
					var reg=/[0-9-()（）]{7,18}/ 
					if(!reg.test(this.tel)){
						return uni.showToast({
						title:'电话号码错误',
						icon:"none"
					})
					}
				}
				if(this.address===''){
					return uni.showToast({
						title:'地址为空',
						icon:"none"
					})
				}
				// console.log(this.tel,this.id,this.address,this.niname,this.rsex,this.bir);
				if(this.type==1){
				this.$post(api.RESET_PATIENT_INFO,{
					address: this.address,
					birthday: this.bir,
					cardId: this.id,
					name: this.niname,
					sex: this.rsex,
					tel:this.tel
				})
				.then(res=>{
					if(res.code===200){
						uni.showToast({
							title:'新增就诊人成功',
							icon:'success'
						})
						setTimeout(()=>{
							uni.navigateTo({
								url:'personList'
							})
						},1500)
					}
				})
				}else{
					console.log(this.type);
					this.$put(api.RESET_PATIENT_INFO,{
						id:this.cardId,
						address: this.address,
						birthday: this.bir,
						cardId: this.id,
						name: this.niname,
						sex: this.rsex,
						tel:this.tel
					})
					.then(res=>{
						if(res.code===200){
							uni.showToast({
								title:'修改成功',
								success:()=>{
									uni.navigateTo({
										url:'personList'
									})
								}
							})
						}else{
							uni.showToast({
								title:'修改失败,请重试',
								icon:'none'
							})
						}
					})
				}
			},
			ymd(e){
				console.log(e);
				this.bir=e.detail.value
			}
		}
	}
</script>

<style lang="scss">
	.form{
		margin: 15rpx 0;
	.item{
		margin:0 20rpx;
		padding:20rpx;
		display: flex;
		justify-content: space-between;
		border-bottom: 2rpx solid #ccc;
	}}
	.btn{
		display: flex;
		
	}
</style>
