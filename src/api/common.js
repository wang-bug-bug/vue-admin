import {
    Message
} from 'element-ui'
import {
    ref,
    reactive
} from '@vue/composition-api'

import {
    getCategoryList
} from "@/api/news/news";

export function common() {
    const category = reactive({
        item: []
    })

    const getInfoCategory = () => {
        getCategoryList().then(res => {
            category.item = res.data.data.data
        }).catch(error => {

        })
    }

    return {
        getInfoCategory,
        category
    }
}