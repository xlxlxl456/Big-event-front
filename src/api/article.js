import request from '@/utils/request'
import { useTokenStore } from '@/stores/token'

export const articleCategoryListService = () =>{
    // const tokenStore = useTokenStore();
    // return request.get('/category',{headers:{'Authorization':tokenStore.token}})
    return request.get('/category')
}

export const addArticleCatogeryService =(categoryData)=>{
    return request.post('/category',categoryData)
}

export const updateArticleCategoryService=(categoryData)=>{
    return request.put('/category',categoryData);
}

export const deleteArticleCategoryService=(id)=>{
    return request.delete('/category?id='+id)
}

export const articleListService=(params)=>{
    return request.get('/article',{params,params})
}

export const articleAddService=(articleData)=>{
    return request.post('/article',articleData)
}