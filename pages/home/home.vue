<template>
	<view class="body">
		<view class="swiper">
			<swiper indicator-dots autoplay circular>
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="recommend">
			<view class="line">
				推荐服务
			</view>
			<ul>
				<li v-for="(item,index) in serveList" :key="index">
					<view class="img">
						<image :src="$store.state.baseUrl+item.imgUrl" mode=""></image>
					</view>
					<text>{{item.serviceName}}</text>
				</li>
			</ul>
		</view>
		<view class="topic">
			<view class="weight">
				专题
			</view>
			<ul>
				<li v-for="(item,index) in topicList" :key="index" @click="goDetail(item.id)">
					<view class="img">
						<image :src="$store.state.baseUrl+item.cover" mode=""></image>
					</view>
					<text>{{filterTags(item.content)}}</text>
				</li>
				
			</ul>
		</view>
		<view class="news">
			<view class="sticky-box">
				<scroll-view class="scroll_view" scroll-x="true"  scroll-with-animation="true">
					<view  class="scroll_item" v-for="(item,index) in kindList" :key="index" @click="toggleNews(index,item.id,$event)" >
						<text :class="index===active?'current':''">{{item.name}}</text>
					</view>
				</scroll-view>
			</view>
			<view class="mainNews">
				<uni-list>
				 	<uni-list-item v-for="(item,index) in newsList" 
					:key="index"
					:title="item.title" 
					:note="item.subTitle" 
					:thumb="base+item.cover"
				 	 thumb-size="lg" 
					 @click.native="goDetail(item.id)"
					 ></uni-list-item>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../common/apiUtil.js'
	export default {
		data() {
			return {
				base:api.SERVER_BASE,
				swiperList:["../../static/img/hswiper1.jpg",
						"../../static/img/hswiper2.jpg",
						"../../static/img/hswiper3.jpg",
						"../../static/img/hswiper4.jpg",
						"../../static/img/hswiper5.jpg",],
				serveList:[],
				topicList:[],
				kindList:[],
				newsList:[],
				scrollL:0,
				active:0
			}
		},
		methods:{
			all(){
				this.getServicelist()
				this.getTopicList()
				this.getNewsKinds()
			},
			getServicelist() {
				this.$get(api.HOME_SERVICE).then(res => {
					this.serveList = res.rows.slice(0,5);
				})
			},
			getTopicList(){
				this.$get(api.GET_TOPIC_LIST).then(res=>{
					this.topicList=res.rows.slice(0,4)
				})
			},
			getNewsKinds(){
				this.$get(api.HOME_NEWS_CATEGORY).then(res=>{
					this.kindList=res.data
					this.getNewsList(res.data[0].id)
				})
			},
			filterTags(str){
				return str.replace(/\<p>/g,'')
			},
			getNewsList(id){
				this.$get(api.HOME_NEWS_LIST,{
					type:id
				}).then(res=>{
					this.newsList=res.rows
				})
			},
			goDetail(id){
				uni.navigateTo({
					url:'../news/news_detail?id='+id
				})
			},
			toggleNews(index,id,e){
				this.active=index
				this.getNewsList(id)
			}
		},
		onShow() {
			this.all()
			}
	}
</script>

<style lang="scss">
	.current{
		color: crimson;
	}
	ul{
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.body{
		display: flex;
		flex-direction: column;
		margin:0 15rpx;
		swiper{
			height: 400rpx;
		image{
			width: 100%;
			height: 100%;
			}
		}
	.recommend{
		margin-top: 15rpx;
		display: flex;
		flex-direction: column;
		.line{
			font-weight: 800;
			padding-bottom: 10rpx;
			border-bottom: 2rpx solid #ccc;
		}
		ul{
			display: flex;
			li{
				flex: 1;
				margin:30rpx 25rpx;
				display: flex;
				flex-direction: column;
				.img{
					height: 96rpx;
					border-radius: 50%;
					image{
					width: 100%;
					height: 100%;	
					}
				}
				text{
					text-align: center;
					font-size: 16rpx
				}
				
			}
		}
		}
	.topic{
		display: flex;
		flex-direction: column;
		.weight{
			font-weight: 800;
			margin-bottom: 15rpx;
		}
		ul{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			li{
				width: calc(50% - 8px);
				border-radius: 10px;
				margin-bottom: 15rpx;
				overflow: hidden;
				box-shadow: 0px 0px 5px #d3d3d3;
				.img{
					width: 100%;
					height: 200rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				text{
					    padding-bottom: 5px;
					    font-size: 16rpx;
					    line-height: 46rpx;
					    color: #3B4144;
					    text-indent: 1em;
					    display: -webkit-box;
					    -webkit-line-clamp: 2;
					    -webkit-box-orient: vertical;
				}
			}
		}
	}
	.news{
		display: flex;
		flex-direction: column;
	.sticky-box{
		margin: 0px;
		padding: 6px 0;
		border-bottom:3rpx solid #E2E2E2;
		.scroll_view{
			white-space: nowrap;
			width: 100%;
			.scroll_item{
				display: inline-block;
				padding: 0 30rpx;
				margin: 2% 0;
				border-right: 1upx #e2e2e2 solid;
			}
		}
	}
	.mainNewslist{
		width: 100%;
	}
	}
	}
</style>
