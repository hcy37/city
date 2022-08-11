<template>
	<view class="body">
		<view class="text">
			<uni-forms-item label="标题:">
			<uni-easyinput v-model="msg.title" placeholder="请输入标题"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="内容:">
			<uni-easyinput v-model="msg.content" autoHeight type="textarea" placeholder="提点意见吧~少于150字哦" ></uni-easyinput>
			</uni-forms-item>
		</view>
		<button @click="submit">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg:{
					title:'',
					content:''
				}
			};
		},
		methods:{
			submit(){
				if(this.msg.content!==''&&this.msg.title!==''){
					uni.request({
						url:this.$store.state.baseUrl+'/prod-api/api/common/feedback',
						method:"POST",
						header:{'Authorization':this.$store.state.token},
						data:this.msg,
						success:res=>{
							if(res.data.code!==200){
								return uni.showToast({
									title:'发表失败！',
									icon:"error"
								})
							}
							uni.showToast({
								title:'发表成功！'
							})
						}
					})
				
				}else{
				 uni.showToast({
					title:'输入为空，请重新输入',
					icon:"error"
				})
				
			}
			}
		}
	}
</script>

<style lang="scss">
	.body{
		margin: 15px;
		.text{
			margin: 10rpx;
		}
	}
</style>
