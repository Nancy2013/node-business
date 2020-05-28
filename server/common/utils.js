/*
 * @Author: your name
 * @Date: 2020-05-28 15:09:03
 * @LastEditTime: 2020-05-28 17:45:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\common\ultis.js
 */

function sendDatas(data, errcode = 200, msg = 'success') {
  let datas = { errcode, msg };
  if (data) {
    datas = {
      ...datas,
      data,
    };
   }
  console.log(datas);

  return datas;
}

module.exports = {
  sendDatas,
};
