//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
import { ElMessage } from 'element-plus'
import { useTokenStore } from '@/stores/token';
// import { useRouter } from 'vue-router';
import router from '@/router';
//定义一个变量,记录公共的前缀  ,  baseURL
// const baseURL = 'http://localhost:8080';
const baseURL = '/api';
const instance = axios.create({baseURL})
// const router = useRouter()


//添加响应拦截器
instance.interceptors.response.use(
    result=>{
        if(result.data.code===0){
            return result.data;
        }
        ElMessage.error(result.data.message?result.data.message:'Service Error')
        return Promise.reject(result.data);
    },
    err=>{
        if(err.response.status===401){
            ElMessage.error("Please login first");
            router.push('/login')
        }else{
            ElMessage.error("Service Error")
        }
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

instance.interceptors.request.use(
    (config)=>{
        const tokenStore = useTokenStore();
        if(tokenStore.token){
            config.headers.Authorization = tokenStore.token
        }
        return config;
    },
    (err)=>{
        Promise.reject(err)
    }
)

export default instance;