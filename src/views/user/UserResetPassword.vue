<script setup>
import { ref } from 'vue'
import useUserInfoStore from '@/stores/userInfo'
import { useTokenStore } from '@/stores/token';
import {useRouter} from 'vue-router';
const tokenStore = useTokenStore();
const userInfoStore=useUserInfoStore();
const router = useRouter();

const passwordData = ref({
    oldPassword:"",
    newPassword:"",
    reNewPassword:""
})

const checkRePassword=(rules,value,callback)=>{
    if(value===""){
        callback(new Error("Please check the password again"))
    }else if(value !== passwordData.value.newPassword){
        callback(new Error("Please check the password are the same"))
    }else{
        callback()
    }
}

const rules={
    oldPassword:[
        {required:true,message:"Please input old password",trigger:"blur"},
        {min:5,max:16,message:"The length of password must be between 5 and 16",trigger:"blur"}
    ],
    newPassword:[
        {required:true,message:"Please input new password",trigger:"blur"},
        {min:5,max:16,message:"The length of password must be between 5 and 16",trigger:"blur"}
    ],
    reNewPassword:[
        {required:true,validator:checkRePassword,trigger:"blur"}
    ]
}

import {updatePasswordService} from '@/api/user'
import {ElMessage,ElMessageBox} from 'element-plus'
const updatePassword= async()=>{
    ElMessageBox.confirm(
        'Do you want to change password?',
        'Warning',
        {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        }
    )
    .then(async() => {
        let result = await updatePasswordService(passwordData.value);
        ElMessage.success(result.message?result.message:'Update success');

        tokenStore.removeToken();
        userInfoStore.removeInfo();
        
        router.push('/login')
    ElMessage({
        type: 'success',
        message: 'Logout success',
    })
    articelCategoryList();
    })
    .catch(() => {
    ElMessage({
        type: 'info',
        message: 'Change canceled',
    })
    })
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>基本资料</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="passwordData" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="原密码" prop="oldPassword">
                        <el-input type="password" v-model="passwordData.oldPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input type="password" v-model="passwordData.newPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="再输入密码" prop="reNewPassword">
                        <el-input type="password" v-model="passwordData.reNewPassword"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updatePassword">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>