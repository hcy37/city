<template>
	<view class="">
	<view class="body">
			<h3 v-text="title"></h3>
			<view class="main" v-html="content">
			</view>
	</view>
		<!-- 评论 -->
		<view class="cmdlist">
			<uni-list>
				<uni-list-chat
				v-for="(item,index) in comList"
				:key="index"
				avatar-circle
				:title="item.userName"
				:note="item.content"
				avatar="../../static/img/header.png"
				:time="item.commentDate"
				></uni-list-chat>
			</uni-list>
		</view>
		<view class="cmd">
		<view class="input">
			<uni-icons type="compose" size="30"></uni-icons>
			<uni-easyinput class="text" placeholder="说说你的看法" v-model="msg"></uni-easyinput>
			<button size="mini" type="primary" @click="sendcmd">评论</button>
		</view>
		<view class="icon">
			<uni-icons type="chat" size="30"></uni-icons>
			<uni-badge class="badge" :text="allcmd" type="error" size="small"></uni-badge>
		</view>
		</view>
	
	</view>
</template>

<script>
	import api from '@/common/apiUtil.js'
	export default {
		data(){
			return {
				base:api.SERVER_BASE,
				title:'',
				content:'',
				cmd:0,
				allcmd:0,
				comList:[],
				msg:''
			};
		},
		methods:{
			getDetail(id){
				this.$get(api.NEWS_DETIAILS+'/'+id)
				.then(res=>{
					this.title=res.data.title
					this.content=res.data.content
					this.filter(this.content)
				})
			},
			filter(str){
				str=str.replace(/img/g,'img class="img"')
				this.content=str.replace(/\/prod-api\/profile\/upload\/image/g,this.base+'/prod-api/profile/upload/image')
			},
			getcmd(id){
				this.$get(api.GET_COMMENTS,{pressId:id})
				.then(res=>{
					this.allcmd=res.total
					this.comList=res.rows
				})
			},
			sendcmd(){
				if(this.msg===''){
					uni.showToast({
						title:'请填写内容',
						icon:'error'
					})
				}else{
					uni.getStorage({
						key:'token',
						success:res=>{
							this.$post(api.ADD_COMMENTS,{
								"newsId": this.cmd ,
								"content":this.msg
							})
							.then(res=>{
								uni.showToast({
									title:'评论成功',
								})
								this.getcmd(this.cmd)
							})
							this.msg=''
						},
						fail:res=>{
							uni.showToast({
								title:'提交失败，请重试',
								icon:'none'
							})
						}
					})
				}
			}
		},
		onLoad(option) {
			this.cmd=option.id
			this.getDetail(option.id)
			this.getcmd(option.id)
		}
	}
</script>

<style lang="scss">
	.body{
		margin: 30rpx;
		h3{
			text-align: center;
			color: #333;
			padding: 10rpx 0;
		}
		.img{
			display: none;
			// width: 100%;
		}
		.main{
			// border: 2;
			margin: 15rpx 0;
			width: 100%;
			box-sizing: border-box;
			box-shadow: 0 0 10rpx #d3d3d3;
			// padding: 20rpx;
			padding: 40rpx 30rpx;
			color: palevioletred;
		}
	}
	.cmdlist{
		// padding-bottom: 100rpx;
		// margin-top: 20rpx;
		padding-bottom: 120rpx;
		height: 100%;
	}
	.cmd{
		// padding: 0 rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		border-top: #d3d3d3 solid 5rpx;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.icon{
			position: relative;
			padding: 0 30rpx;
			
			.badge{
				position: absolute;
				left: 12px;
				top: -8px;
			}
		}
		.input{
			padding: 0 30rpx;
			display: flex;
			.text{
				color: gray;
				padding-left: 10rpx;
				border: none;
			}
		}
	}
</style>
