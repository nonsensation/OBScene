// TODO: load from indexedDB
export async function load( { params } )
{
    return {
        overlayName: params.overlayName,
    }
}