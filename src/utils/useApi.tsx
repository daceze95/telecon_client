// import React from 'react'

import { instance } from "."
import { KeyValueProps } from '../interfaces/index';

// const UseAuth = () => {


//   return (
//     <div>UseAuth</div>
//   )
// }

// export default UseAuth


export const apiGet = async(url:string) => {
    return await instance.get(url);
}

export const apiPost = async(url:string, data:KeyValueProps) => {
    return await instance.post(url, data);
}

export const apiPut = async(url:string, data:KeyValueProps) => {
    return await instance.put(url, data);
}

export const apiDelete = async(url:string) => {
    return await instance.delete(url);
}

export const apiUploadFile = async(url:string, formData: FormData) => {
    return await instance.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });
}