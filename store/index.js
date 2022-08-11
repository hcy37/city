import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store=new Vuex.Store({
	state:{
		baseUrl:'http://172.18.11.250:10001',
		token:'',
		user:{},
		login:{}
	},
	mutations:{
		changeUrl(state,step){
			state.baseUrl=step
			console.log(state.baseUrl);
		},
		getPwd(state,step){
			state.login=step
		}
	},
	actions:{
		//获取token
		getToken(state){
			uni.getStorage({
				key:'token',
				success:res=>{
					state.state.token=res.data
				}
			})
		},
		//获取用户信息
		getUserInfo(state,step){
			this.dispatch('getToken')
			uni.request({
				url:state.state.baseUrl+'/prod-api/api/common/user/getInfo',
				header:{
					'Authorization':'Bearer '+state.state.token
				},
				success:res=>{
					if(res.data.code!==200){
						return console.log('用户信息获取失败');
					}
					state.state.user=res.data.user
					console.log('获取用户信息'+res.data.msg);
				}
			})
		},
		
		//修改用户信息
		toggle(state,step){
			this.dispatch('getToken')
			uni.request({
				url:state.state.baseUrl+'/prod-api/api/common/user',
				method:"PUT",
				header:{
					'Authorization':'Bearer '+state.state.token
				},
				data:step,
				success:res=>{
					if(res.data.code!==200){
						return uni.showToast({
						title: '修改失败',
						icon:"error"
					});
					}
					uni.showToast({
						title: '修改成功',
						duration: 2000
					});
					this.dispatch('getUserInfo')
				}
			})
		},
		
		//修改密码
		repwd(state,step){
			this.dispatch('getToken')
			uni.request({
				url:state.state.baseUrl+'/prod-api/api/common/user/resetPwd',
				method:'PUT',
				header:{'Authorization':state.state.token},
				data:step,
				success:res=>{
					if(res.data.code!==200){
						return uni.showToast({
							title:'修改失败！',
							icon:'error'
						})
					}
					state.state.login.password=step.newPassword
					console.log(state.state.login.password);
					uni.showToast({
						title:'密码修改成功！'
					})
				}
			})
		},
		//上传文件
		upload(state,res){
			var file=res.tempFiles[0]
			var filePath=res.tempFilePaths[0]
			//#ifndef APP-PLUS
			uni.uploadFile({
				url:state.state.baseUrl+'/prod-api/common/upload',
				file,
				filePath,
				formData:{'file':file},
				header:{'Authorization':'Bearer '+state.state.token},
				success:res=>{
					if(res.statusCode!==200){
						return console.log('上传失败');
					}
					console.log('上传'+ JSON.parse(res.data).msg);
					var obj={avatar:JSON.parse(res.data).fileName}
					this.dispatch('toggle',obj)
				}
			})
			//#endif
		},
		
	}
})
export default store