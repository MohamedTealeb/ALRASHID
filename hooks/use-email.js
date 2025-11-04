import {  useMutation } from "@tanstack/react-query";
import { sendEmail } from "../services/email";



export function UseEmail(){

    return useMutation({
          mutationFn:sendEmail,
    })

}