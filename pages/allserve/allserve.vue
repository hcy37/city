<template>
	<view class="body">
		<view class="">
			<uni-search-bar placeholder="搜索服务"></uni-search-bar>
		</view>
		<!-- 左侧 -->
		<view class="left-scroll-view" >
			<scroll-view scroll-y>
				<view class="item" 
				v-for="(item,index) in serveTpye" 
				@click="toggleType(index,item)"
				:class="active===index?'current':''"
				:key="index">
					{{item}}
				</view>
			</scroll-view>
		</view>
		<!-- 右侧 -->
		<view class="right-scroll-view">
			<h3>{{type}}</h3>
			<scroll-view class="item" scroll-y="true" >
				<view 
				v-for="(item,index) in serveList"
				@click="toDetail(item.link)"
				:key="index">
				<li class="" v-if="item.serviceType===type">
					<view class="img"> <image :src="base+item.imgUrl" mode=""></image> </view>
					<text>{{item.serviceName}}</text> 
				</li>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import api from '../../common/apiUtil.js'
	export default {
		data() {
			return {
				base:api.SERVER_BASE,
				serveList:[],
				serveTpye:[],
				active:0,
				type:''
			};
		},
		methods:{
			all(){
				this.geticon()
			},
			toggleType(index,item){
				this.active=index
				this.type=item
			},
			geticon(){
				this.$get(api.HOME_SERVICE)
				.then(res=>{
					this.serveList=res.rows
					this.filerType(this.serveList)
				})
			},
			filerType(data){
				data.some((item,index)=>{
					this.serveTpye.push(item.serviceType)
				})
				this.serveTpye=Array.from(new Set(this.serveTpye))
				this.toggleType(this.active,this.serveList[this.active].serviceType)
			},
			toDetail(url){
				uni.navigateTo({
					url
				})
			}
		},
		onShow() {
				this.all()
		}
		
	}
</script>

<style lang="scss">
	li{
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.current{
		background: #fff;
	}
	page{
		background: #eee;
	}
	.body{
		margin: 15rpx;
		.left-scroll-view{
			width: 32%;
			position: absolute;
			left: 0; top: 50px; bottom: 0;
			.item{
				text-align: center;
				padding: 15rpx;
			}
			// margin: 15rpx;
			// background: #fff;
		}
		.right-scroll-view{
			color: #333;
			width: 68%;
			position: absolute;
			left: 32%; top: 50px; bottom: 0;
			background-color: #fff;
			h3{
				display: flex;
				justify-content: center;
			}
			.item{
				margin: 15rpx;
				view{
			li{
				margin: 15rpx;
				// display: flex;
				// justify-content: center;
			.img{
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				image{
					width: 100%;
					height: 100%;
				}
			}
			}
			}
			}
		}
	}
</style>
