/**
 * Created by xiexiaojing on 2017/10/28.
 */
// eslint-disable-next-line
import { get } from '../axios/tools';
import * as config from '../axios/config';
import axios from 'axios';
export const userActions = {
    //初始化新增页面数据
    sliderInit(){
        return (dispatch, getState) => {
            alert(3);
            axios.get(window.CONTEXT + '/a/monitorController/eleHeatDev').then(res => console.log(res.data)).catch(err => console.log(err));
        }
    },
}




