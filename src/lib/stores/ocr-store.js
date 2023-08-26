import { writable, readable, get } from 'svelte/store'
import { sessionStore, localStore } from './PersistantStore'


export const selectedVideoDeviceId = localStore( 'selectedVideoDeviceId','' )

export const filter = localStore( 'filterSettings' , {
    luma: {
        enabled: false,
        min: 0.0 ,
        minSmooth: 0.0 ,
        max: 1.0 ,
        maxSmooth: 0.0 ,
    }
})