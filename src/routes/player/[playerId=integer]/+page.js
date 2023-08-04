// TODO: load from indexedDB
export async function load( { params } )
{
    return {
        player: {
            id: params.playerId
        }
    }
}