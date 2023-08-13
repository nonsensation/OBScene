import { writable, readable, get } from 'svelte/store'
import { sessionStore, localStore } from './PersistantStore'

export const scoreboard = localStore( 'scoreboard', {
    home : {
        score: 0,
        teamId: 0,
        name: "Wildfire Tigers",
        shortName: "WFT",
        textColor: "#000000",
        scoreColor: "#000000",
        primaryColor: "#ffffff",
        secondaryColor: "#0088ff",
        background: "",
    },
    guest : {
        score: 0,
        teamId: 1,
        name: "Stealth Strikers",
        shortName: "STS",
        textColor: "#000000",
        scoreColor: "#000000",
        primaryColor: "#ffffff",
        secondaryColor: "#ff0000",
        background: "",
    },
    period:  {
        enabled: true,
        textColor: '#000000',
        backgroundColor: '#ffffff',
        number: 1,
        text: '1. Drittel',
    },
    special:  {
        enabled: true,
        textColor: '#000000',
        backgroundColor: '#ffffff',
        text: 'Empty Net',
    },
    time: {
        enabled: true,
        textColor: '#000000',
        backgroundColor: '#ffffff',
        min: 13,
        sec: 37,
    },
} )
