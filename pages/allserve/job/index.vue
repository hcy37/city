<template>
	<view>
		<view class="nav">
			<text 
			@click="toggle(1)"
			:class="act==1?'active':''">找工作</text>
			<text 
			@click="toggle(2)"
			:class="act==2?'active':''">投递记录</text>
			<text 
			@click="toggle(3)"
			:class="act==3?'active':''">个人简历</text>
		</view>
		<view class="" v-if="act==1">
			<view class="home">
				<view class="search">
					<uni-search-bar  @clear="getWork()" @confirm="search"></uni-search-bar>
				</view>
				<view class="hot">
					<text>热门职位</text>
				</view>
				<view class="scroll">
					<scroll-view scroll-x="true"  class="list">
						<view v-for="(item,index) in kinds" :key="index" @click="tohot(item.id)">
						<text :class="active===item.id?'act':''">{{item.professionName}}</text>
						</view>
					</scroll-view>
				</view>
				<view class="worklist">
					<text>工作列表</text>
				</view>
				<view class="work">
					<view class="work_item" v-for="(item,index) in work" :key="index" @click="toDetail(item.id)">
						<view class="">
							<text>职位名称：</text><text>{{item.professionName}}</text>
						</view>
						<view class="">
							<text>职位描述：</text><text>{{item.obligation}}</text>
						</view>
						<view class="">
							<text>单位地址：</text><text>{{item.address}}</text>
						</view>
						<view class="">
							<text>薪酬：</text><text>{{item.salary}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="" v-else-if="act==2">
			<view class="record"  v-for="(item,index) in record" :key="index">
				<uni-list>
					<uni-list-item
					:rightText="item.postName"
					title="职位名称:">
					</uni-list-item>
					<uni-list-item
					:rightText="item.companyName"
					title="公司名称:">
					</uni-list-item>
					<uni-list-item
					:rightText="item.money"
					title="薪酬:">
					</uni-list-item>
				</uni-list>
			</view>
		</view>
		<view class="resume" v-else-if="act==3">
			<view class="head">
				<image :src="base+'/prod-api'+info.avatar" mode=""></image>
			</view>	
			<view class="main">
				<uni-list>
					<uni-list-item
					:rightText="info.nickName"
					title="昵称:">
					</uni-list-item>
					<uni-list-item
					:rightText="info.sex==0?'男':'女'"
					title="性别:">
					</uni-list-item>
					<uni-list-item
					:rightText="info.email"
					title="Email:">
					</uni-list-item>
					<uni-list-item
					:rightText="info.phonenumber"
					title="电话号码:">
					</uni-list-item>
				</uni-list>
			</view>
			<view class="manger">
				<button type="primary" @click="tomanage">个人简历管理</button>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/common/apiUtil.js'
	export default {
		data() {
			return {
				base:api.SERVER_BASE,
				act:1,
				info:{},
				record:[],
				kinds:[],
				work:[],
				active:0
			};
		},
		methods:{
			get(){
				console.log(1);
			},
			all(){
				this.getRecord()
				this.getKinds()
				this.getWork()
			},
			toggle(num){
				this.act=num
			},
			tomanage(){
				uni.navigateTo({
					url:'resumeManage'
				})
			},
			getKinds(){
				this.$get(api.GET_PROFESSION_LIST)
				.then(res=>{
					this.kinds=res.rows
				})
			},
			getWork(id){
				this.$get(api.GET_POST_LIST,{
					professionId:id
				})
				.then(res=>{
					if(res.code == 200){
						this.work = [];
						res.rows.forEach(item => {
							if(item.professionName != null) {
								this.work.push(item)
							}
						})
					}
				})
			},
			getRecord(){
				this.$get(api.GET_DELIVER_LIST,{
					userId:this.info.userId
				})
				.then(res=>{
					this.record=res.rows
				})
			},
			tohot(id){
				this.active=id
				this.getWork(id)
			},
			toDetail(id){
				uni.navigateTo({
					url:'jobDetail?id='+id
				})
			},
			search(e){
			this.work = this.work.filter((item) => {
					return item.professionName.indexOf(e.value) >= 0;
				})
			}
		},
		onLoad() {
			this.info= JSON.parse(uni.getStorageSync('info'))
			this.all()
		}
	}
</script>

<style lang="scss">
	.act{
		color: crimson;
	}
	.active{
		border-bottom: 3rpx solid greenyellow;
		color: green;
	}
	.nav{
		display: flex;
		border-bottom: 3rpx solid #ccc;
		box-shadow: 0 5rpx 5rpx #eee;
		text{
			padding: 40rpx;
			flex: 1;
		}
	}
	.resume{
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.head{
			width: 120rpx;
			height: 120rpx;
			image{
				border-radius: 50%;
				height: 100%;
				width: 100%;
			}
		}
	}
	.record{
		margin: 20rpx 0;
		border-bottom: 3rpx solid #ccc;
	}
	.home{
		.hot{
			padding: 20rpx;
			color: #ababab;
			border-bottom: #ccc solid 3rpx;
		}
		.scroll{
			.list{
				white-space: nowrap;
				width: 100%;
				view{
					display: inline-block;
					margin: 15rpx;
					margin: 2% 0;
					text{
						padding:0 15rpx;
						border-right: 3rpx solid #333;
					}
				}
			}
		}
		.worklist{
			padding: 20rpx;
			color: #fff;
			background: royalblue;
		}
		.work{
			.work_item{
				margin: 25rpx;
				padding: 10rpx 0;
				border-bottom: #ababab solid 3rpx;
				display: flex;
				flex-direction: column;
			view{
				text{
					padding: 5rpx 0;
				}
				}
			}
		}
	}
</style>
