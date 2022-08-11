<template>
	<view class="body">
		<view class="swiper">
	<swiper indicator-dots autoplay circular>
		<swiper-item v-for="(item,index) in newsImg" :key="index">
			<image :src="item" mode=""></image>
		</swiper-item>
	</swiper>
	</view>
	<view class="news">
		<view class="kinds">
		<scroll-view scroll-x="true"  class="list" scroll-with-animation="true">
			<view class="item" v-for="(item,index) in newskind" :key="index" @click="toggle(index,item.id)">
				<text :class="index===active?'current':''">{{item.name}}</text>
			</view>
		</scroll-view>
		</view>
		<view class="mainNews">
			<uni-list>
				<uni-list-item
				v-for="(item,index) in newsList"
				:title=item.title
				:thumb="base+item.cover"
				thumbSize="lg"
				@click.native="goDetail(item.id)"
				:key="index">
				</uni-list-item>
			</uni-list>
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
				newskind:[],
				active:0,
				newsList:[],
				newsImg:['../../static/img/new1.jpg',
				'../../static/img/new2.jpg']
			};
		},
		methods:{
			all(){
				this.getkinds()
			},
			getkinds(){
				this.$get(api.HOME_NEWS_CATEGORY)
				.then(res=>{
					this.newskind=res.data
					this.getnewsList(res.data[0].id)
				})
			},
			toggle(index,id){
				this.active=index
				this.getnewsList(id)
			},
			getnewsList(id){
				this.$get(api.HOME_NEWS_LIST,{
					type:id
				})
				.then(res=>{
					this.newsList=res.rows
				})
			},
			goDetail(id){
				uni.navigateTo({
					url:'./news_detail?id='+id
				})
			}
		},
		created() {
			this.all()
		}
	}
</script>

<style lang="scss">
	.current{
		color: crimson;
	}
	page{
		background: #fdfdfd;
	}
	.body{
		margin: 20rpx;
		.swiper{
			border-radius: 30rpx;
			overflow: hidden;
			margin-bottom: 15rpx;
			swiper{
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.news{
			.kinds{
				margin: 15rpx 0;
				padding: 6px 0;
				border-bottom: 3rpx solid #e2e2e2;
				.list{
					white-space: nowrap;
					width: 100%;
					.item{
						display: inline-block;
						padding: 0 30rpx;
						margin: 2% 0;
						border-right: 1rpx #e2e2e2 solid;
					}
				}
			}
		}
	}
</style>
