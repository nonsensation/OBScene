import { writable, readable, get } from 'svelte/store'
import { sessionStore, localStore } from './PersistantStore'

export const Overlays = [
    // { id: 0, importComponent: async () => (await import( "/src/lib/overlays/Popup_Goal_v1.svelte" ) ).default , displayName: "Popup Goal" },
    // { id: 1, importComponent: async () => (await import( "/src/lib/overlays/Starting_FD_Pokal_v1.svelte" ) ).default , displayName: "Starting FD-Pokal" },
    // { id: 2, importComponent: async () => (await import( "/src/lib/overlays/Starting_v1.svelte" ) ).default , displayName: "Starting" },
    { id: 3, importComponent: async () => ( await import( "/src/lib/overlays/Scoreboard_PremierLeague_v1.svelte" ) ).default, displayName: "Scoreboard PremierLeague" },
    // { id: 4, importComponent: async () => (await import( "/src/lib/overlays/Scoreboard_Floorball_Goal_v2.svelte" ) ).default , displayName: "Scoreboard Floorball_Goal" },
    { id: 5, importComponent: async () => ( await import( "/src/lib/overlays/Scoreboard_Floorball_WFC2019_v1.svelte" ) ).default, displayName: "Scoreboard Floorball WFC2019" },
]

export async function loadOverlays()
{
    return await Promise.all(
        Overlays.map(
            async overlay =>
                await {
                    ...overlay,
                    component: await overlay.importComponent(),
                }
        )
    )
}

export async function loadOverlay( overlayId )
{
    const overlay = Overlays.find( x => x.id == overlayId )

    return await {
        ...overlay,
        component: await overlay.importComponent(),
    }
}

export const currentOverlayId = localStore( 'currentOverlayId', Overlays[ 0 ]?.id ?? 0 )

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
