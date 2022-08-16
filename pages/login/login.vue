<template>
	<view>
		<view class="login" v-show="!flag">
		<uni-forms ref="baseForm">
			<h2>登录</h2>
			<uni-forms-item label="用户名" required >
				<uni-easyinput v-model="login.username"  placeholder="请输入用户名" />
			</uni-forms-item>
			<uni-forms-item label="密码" required>
				<uni-easyinput type="password" v-model="login.password" placeholder="请输入密码" />
			</uni-forms-item>
			<uni-forms-item>
			<button @click="submit">登录</button>
			</uni-forms-item>
			<view class="toReg">
				<text @click="toReg">注册</text>
			</view>
		</uni-forms>
		</view>
		
		
		<view class="reg" v-show="flag">
		<uni-forms ref="baseForm">
			<h2>注册</h2>
			<uni-forms-item label="用户名" required name="name">
				<uni-easyinput v-model="reg.userName" placeholder="请输入用户名" />
			</uni-forms-item>
			<uni-forms-item label="密码" required>
				<uni-easyinput type="password" v-model="reg.password" placeholder="请输入密码" />
			</uni-forms-item>
			<uni-forms-item label="手机号码" required>
				<uni-easyinput v-model="reg.phonenumber" placeholder="请输入手机号码" />
			</uni-forms-item>
			<uni-forms-item label="性别" required>
				<uni-easyinput v-model="reg.sex" placeholder="请输入性别" />
			</uni-forms-item>
			<uni-forms-item>
			<button @click="register">注册</button>
			</uni-forms-item>
			<view class="toReg">
				<text @click="toReg">登录</text>
			</view>
		</uni-forms>
		</view>
	</view>
</template>

<script>
	import api from '@/common/apiUtil.js'
	export default {
		data() {
			return {
				flag:false,
				url:'',
				login:{
					username:'',
					password:''
				},
				reg:{
					userName: "", 
					password: "", 
					phonenumber: "",
					sex: ""
				}
			}
		},
		methods:{
			setUser(){
				this.$get(api.GET_USER_INFO)
				.then(res=>{
					uni.setStorage({
						key:'info',
						data:JSON.stringify(res.user)
					})
				})
			},
			toReg(){
				this.flag=!this.flag
			},
			submit(){
				uni.request({
					url:this.url+'/prod-api/api/login',
					method:'post',
					data:this.login,
			success:res=>{
				if(res.data.code!==200){
					return uni.showToast({
						title:'失败了,'+res.data.msg,
						icon:"error"
					})
					}
					
					uni.showToast({
						title:'登陆成功！',
						duration:2000,
					})
					console.log('登陆成功！');
				this.$store.commit('getPwd',this.login)
				uni.setStorage({
					key:'token',
					data:res.data.token,
					success:res=>{
						this.setUser()
					}
				})
				uni.switchTab({
					url:'./../home/home'
				})
					}
				})
			},
			register(){
				uni.request({
					url:this.url+'/prod-api/api/register',
					method:'POST',
					data:this.reg,
					success:res=>{
						console.log(res);
						if(res.data.code!==200){
							return console.log('失败了,'+res.data.msg);
						}
						console.log(res.data.msg);
						this.toReg()
					}
				})
			}
		},
		onLoad() {
			this.url=this.$store.state.baseUrl
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #ccc;
	}
	h2{
		text-align: center;
		
	}
	.login{
		position: fixed;
		width: 700rpx;
		padding: 30rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-color: #fff;
		}
	
	.reg{
		position: fixed;
		width: 700rpx;
		padding: 30rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-color: #fff;
	}
	.toReg{
		display: flex;
		justify-content: flex-end;
		color: #777;
	}
</style>
