/* 进入子页面*/
import axios from 'axios';

export function editUser(para) {
     				axios({
						    method: 'post',
						    url:'/account/update',
						    data:para,
						}).then((res)=>{
							if(res.data.code=='200'){
							  alert('修改成功');
							}
						});
}