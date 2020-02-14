import {
    getCategoryList
} from "@/api/news/news";

const actions = {
    getCategoryItem(content) {
        return new Promise((resolve,reject) => {
            getCategoryList().then(res => {
                resolve(res.data.data.data)
            }).catch(error => {
                reject()
            })
        })
    }

}

export default {
    namespaced: true,
    actions
};