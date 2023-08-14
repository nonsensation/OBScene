import { writable, readable, get } from 'svelte/store'
import { sessionStore, localStore } from './PersistantStore'

export const overlayNames = [
    // "Popup_Goal_v1",
    // "Starting_FD_Pokal_v1",
    // "Starting_v1",
    "Scoreboard_PremierLeague_v1",
    // "Scoreboard_Floorball_Goal_v2",
    "Scoreboard_Floorball_WFC2019_v1",
]

export const currentOverlayName = localStore( 'currentOverlayName', overlayNames[ 0 ] )

export const scoreboard = localStore( 'scoreboard', {
    home: {
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
    guest: {
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
    period: {
        enabled: true,
        textColor: '#000000',
        backgroundColor: '#ffffff',
        number: 1,
        text: '1. Drittel',
    },
    special: {
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
