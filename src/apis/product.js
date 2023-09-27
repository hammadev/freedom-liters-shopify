import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../axios";
import { showMessage } from "react-native-flash-message";

function getExceptFields(isFirstParam = false) {
    let flag;
    if (isFirstParam)
        flag = '?';
    else
        flag = '&';

    return `${flag}except_fields=slug,permalink,date_created,date_created_gmt,date_modified,date_modified_gmt,meta_data,_links,price_html`;
}

export async function ProductListingReq(dispatch, type = null) {
    let url;
    let dispatchType;
    if (type !== null) {
        switch (type) {
            case 'featured':
                url = `products${getExceptFields(true)}&featured=true`;
                dispatchType = 'FEATURED_PRODUCTS';
                break;
            case 'onsale':
                url = `products${getExceptFields(true)}&on_sale=true`;
                dispatchType = 'ONSALE_PRODUCTS';
                break;
            case 'latest':
                url = `products${getExceptFields(true)}&orderby=date`;
                dispatchType = 'LATEST_PRODUCTS';
                break;
            default:
                url = `products${getExceptFields(true)}`;
                dispatchType = 'PRODUCTS';
        }
    } else {
        url = `products${getExceptFields(true)}`;
        dispatchType = 'PRODUCTS';
    }

    try {
        const { data } = await axios.get(url);
        if (data) {
            dispatch({
                type: dispatchType,
                Payload: data,
            })
        }
    }
    catch (err) {
        // showMessage({
        //     message: err.respose.data.errors[0].message,
        //     type: 'danger',
        // });
        console.log('error', err);
    }
}


export async function ProductPaginationReq(page, setEndOfScrolling, setLoading, setProducts, setCategoryWiseList, catId = 0) {
    try {
        let url;
        if (catId !== 0 && page !== 1)
            url = `products?category=${catId}&page=${page}${getExceptFields()}`;
        else if (page !== 1)
            url = `products?page=${page}${getExceptFields()}`;
        else
            url = `products${getExceptFields(true)}`;

        const { data } = await axios.get(url);
        if (data) {

            data.length < 10 &&
                setEndOfScrolling(true);
            if (catId !== 0 && page !== 1)
                setCategoryWiseList(((prev) => [...prev, ...data]));
            else
                setProducts((prev) => [...prev, ...data]);

        }

        setLoading(false);
    }
    catch (err) {
        // showMessage({
        //     message: err.respose.data.errors[0].message,
        //     type: 'danger',
        // });
        console.log('error', err);
    }
}


export async function ProductCategoryWiseReq(catId, setLoading, setCategoryWiseList, setEndOfScrolling) {
    setLoading(true);
    try {
        const { data } = await axios.get(`products?category=${catId}${getExceptFields()}`);
        if (data) {
            data.length < 10 &&
                setEndOfScrolling(true);
            // dispatch({
            //     type: 'PRODUCTS',
            //     Payload: [data],
            // })
            setCategoryWiseList(data);
        }
        setLoading(false);
    }
    catch (err) {
        // showMessage({
        //     message: err.respose.data.errors[0].message,
        //     type: 'danger',
        // });
        console.log('error', err);
    }
}