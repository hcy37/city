<template>
	<view>
		<view class="main">
			<uni-card title="最高学历" is-shadow><view class="">
				<input type="text" v-model="mostEducation">
			</view>
			</uni-card>
			<uni-card title="教育经历" is-shadow><view class="">
				<input type="text" v-model="education">
			</view>
			</uni-card>
			<uni-card title="居住地址" is-shadow><view class="">
				<input type="text" v-model="address">
			</view>
			</uni-card>
			<uni-card title="工作经验" is-shadow><view class="">
				<input type="text" v-model="experience">
			</view>
			</uni-card>
			<uni-card title="个人简介" is-shadow><view class="">
				<input type="text" v-model="individualResume">
			</view>
			</uni-card>
			<uni-card title="期望薪资" is-shadow><view class="">
				<input type="text" v-model="money">
			</view>
			</uni-card>
			<uni-card title="点击上传个人简历" is-shadow><view class="">
				<uni-icons type="upload" @click="upload"></uni-icons>
			</view>
			</uni-card>
			<uni-card title="职位类别" is-shadow><view class="">
				<picker mode="selector" :range="titleList" @change="">
					<view>{{positionId===''?titleList[0]:titleList[positionId]}}</view>
				</picker>
			</view>
			</uni-card>
		</view>
		<view class="btn">
			
		<button type="primary" @click="edit">{{exit?'修改个人简历':'新增个人简历'}}</button>	
		</view>
	</view>
</template>

<script>
	import api from '@/common/apiUtil.js'
	export default {
		data() {
			return {
				resume:[],
				titleList:[],
				exit:'',
				mostEducation: '',
				education: '',
				address: '',
				experience: '',
				individualResume: '',
				money: '',
				positionId: '',
				files: '',
			};
		},
		methods:{
			all(){
				this.getResume()
				this.getToggle()
			},
			getResume(){
				const id=JSON.parse(uni.getStorageSync('info')).userId
				this.$get(api.GET_RESUME_DETAIL+id)
				.then(res=>{
					if(res.code == 200 && res.hasOwnProperty('data')) {
						this.exit = true;
						this.mostEducation = res.data.mostEducation;
						this.education = res.data.education;
						this.address = res.data.address;
						this.experience = res.data.experience;
						this.individualResume = res.data.individualResume;
						this.money = res.data.money;
						this.files = res.data.files;
						this.positionId = res.data.positionId;
					}else {
						this.exit = false;
					}
				})
			},
			edit(){
				const id=JSON.parse(uni.getStorageSync('info')).userId
				if(this.exit){
					this.$put(api.ADD_EDIT_RESUME,{
						// id:1,
						address: this.address,
						education: this.education,
						experience: this.experience,
						files: this.files,
						individualResume: this.individualResume,
						money: this.money,
						mostEducation: this.mostEducation,
						positionId: this.positionId
					})
					.then(res=>{
						if(res.code!==200){
							return uni.showToast({
								title:'修改失败',
								icon:"error"
							})
						}
						uni.showToast({
							title:'修改成功',
							icon:"none"
						})
					})
				}else{
					this.$post(api.ADD_EDIT_RESUME,{
						address: this.address,
						education: this.education,
						experience: this.experience,
						files: this.files,
						individualResume: this.individualResume,
						money: this.money,
						mostEducation: this.mostEducation,
						positionId: this.positionId
					})
					.then(res=>{
						if(res.code!==200){
							return uni.showToast({
								title:"新建失败",
								icon:"error"
							})
						}
						uni.showToast({
							title:'新建成功'
						})
					})
				}
			},
			getToggle(){
				this.$get(api.GET_PROFESSION_LIST)
				.then(res=>{
					res.rows.some((item,index)=>{
						this.titleList.push(item.professionName)
					})
					this.titleList=Array.from(new Set(this.titleList))
				})
			},
			upload(){
				let token=uni.getStorageSync('token')
				uni.chooseFile({
					count:1,
					extension:['.pdf'],
					success:res=>{
						uni.uploadFile({
							url:api.COMMON_UPLOAD,
							filePath:res.tempFilePaths[0],
							name:'file',
							header:{
								'authorization': token
							},
							success:res=>{
								if(res.statusCode!==200){
									return uni.showToast({
										title:"上传失败",
										icon:"none"
									})
								}
								uni.showToast({
									title:"上传成功",
									icon:"none"
								})
							}
						})
					}
				})
			}
		},
		created() {
			this.all()
		}
	}
</script>

<style lang="scss">
	.btn{
		margin: 15rpx;
	}
</style>
