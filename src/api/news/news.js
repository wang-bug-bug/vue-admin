import service from "@/utils/request"

/**
 * 一级分类添加
 */

export function addFirstCategory(data){
    return service.request({
        method:"post",
        url:"/news/addFirstCategory/",
        data
    })
} 


/**
 * 二级分类添加
 */

export function addChildrenCategory(data){
    return service.request({
        method:"post",
        url:"/news/addChildrenCategory/",
        data
    })
} 


/**
 * 获取分类
 */

export function getCategoryList(){
    return service.request({
        method:"post",
        url:"/news/getCategoryAll/",
    })
}


/**
 * 删除分类
 */

export function deleteCategory(data){
    return service.request({
        method:"post",
        url:"/news/deleteCategory/",
        data
    })
}



/**
 * 修改分类
 */

export function editFirstCategory(data){
    return service.request({
        method:"post",
        url:"/news/editCategory/",
        data
    })
}

/**
 * 新增信息
 */

export function addInfo(data){
    return service.request({
        method:"post",
        url:"/news/add/",
        data
    })
}

/**
 * 信息列表
 */

export function infoList(data){
    return service.request({
        method:"post",
        url:"/news/getList/",
        data
    })
}

/**
 * 删除信息
 */

export function deleteInfo(data){
    return service.request({
        method:"post",
        url:"/news/deleteInfo/",
        data
    })
}


/**
 * 修改信息
 */

export function editInfo(data){
    return service.request({
        method:"post",
        url:"/news/editInfo/",
        data
    })
}