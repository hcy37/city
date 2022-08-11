<template>
	<view class="body">
		<view class="form">
		<uni-forms>
			<uni-forms-item label="原始密码:">
				<uni-easyinput v-model="oldpwd" type="password"  placeholder="请输入密码"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="新密码:">
				<uni-easyinput v-model="newpwd1" type="password"  placeholder="请输入密码"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="再次确认:">
				<uni-easyinput v-model="newpwd2" type="password"  placeholder="请输入密码"></uni-easyinput>
			</uni-forms-item>
			<button @click="submit">确认</button>
		</uni-forms>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldpwd:'',
				newpwd1:'',
				newpwd2:''
			};
		},
		methods:{
			submit(){
				if(this.oldpwd!==this.$store.state.login.password){
					return uni.showToast({
						title:'原始密码错误！',
						icon:"error"
					})
				}
				if(this.newpwd1!==this.newpwd2){
					return uni.showToast({
						title:'两次密码不对！',
						icon:"error"
					})
				}
				if(this.newpwd1===this.oldpwd){
					return uni.showToast({
						title:'新密码与原密码一致',
						icon:"error"
					})
				}
				var pwd={
					newPassword:this.newpwd1,
					oldPassword:this.oldpwd
				}
				this.$store.dispatch('repwd',pwd)
			}
		}
	}
</script>

<style lang="scss">
	.body{
		margin: 15rpx;
		.form{
			
		}
	}
</style>
