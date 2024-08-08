import type { EditState } from "@/types";
import { defineStore } from "pinia";

export const useEditStore = defineStore("edit", {
    state: (): EditState => ({
        message: ''
    }),
    actions: {
        updateMessage(message: string){
            this.message = message;
        },
        resetMessage(){
            this.message = ''
        }
    }
})