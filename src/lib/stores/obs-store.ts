import { writable, readable, get } from 'svelte/store'
import { sessionStore, localStore } from './PersistantStore'
import OBSWebSocket, { OBSWebSocketError } from "obs-websocket-js"


export enum ObsOutputState
{
    Stopped = 'OBS_WEBSOCKET_OUTPUT_STOPPED',
    Starting = 'OBS_WEBSOCKET_OUTPUT_STARTING',
    Started = 'OBS_WEBSOCKET_OUTPUT_STARTED',
    Stopping = 'OBS_WEBSOCKET_OUTPUT_STOPPING',
}

// See: https://github.com/obsproject/obs-websocket/blob/master/docs/generated/protocol.md#requeststatus
enum ObsRequestStatus
{
    Unknown = 0,
    NoError = 10,
    Success = 100,
    MissingRequestType = 203,
    UnknownRequestType = 204,
    GenericError = 205,
    InvalidResourceState = 604,
}

export enum ObsConnectionState
{
    Disconnected = 'DISCONNECTED',
    Connecting = 'CONNECTING',
    Connected = 'CONNECTED',
    Disconnecting = 'DISCONNECTING',
}

export enum ObsWebSocketCloseCode
{
    UnknownReason = 4000,
    MessageDecodeError = 4002,
    MissingDataField = 4003,
    InvalidDataFieldType = 4004,
    InvalidDataFieldValue = 4005,
    UnknownOpCode = 4006,
    NotIdentified = 4007,
    AlreadyIdentified = 4008,
    AuthenticationFailed = 4009,
    UnsupportedRpcVersion = 4010,
    SessionInvalidated = 4011,
    UnsupportedFeature = 4012,
}

export enum WebSocketStatusCode
{
    CloseNormal = 1000, // normal closure
    CloseGoingAway = 1001, // server shut down or browser navigated away
}

export const obs = createObsStore()
export const obsStatusLog = sessionStore( "obsStatusLog", "" )
export const obsIp = localStore( "obsIp", "" )
export const obsPort = localStore( "obsPort", "4455" )
export const obsPassword = localStore( "obsPassword", "" )
export const obsConnectionState = writable<ObsConnectionState>( ObsConnectionState.Disconnected )
export const obsRecordingState = writable<ObsOutputState>( ObsOutputState.Stopped )
export const obsStreamingState = writable<ObsOutputState>( ObsOutputState.Stopped )
export const obsReplayBufferState = writable<ObsOutputState>( ObsOutputState.Stopped )
export const obsCurrentScene = writable<string>( '?' )


function createObsStore()
{
    let obsWs

    return readable( null, function start( set, update )
    {
        if( obsWs )
            return

        console.debug( "start" )

        obsWs = obsInit()

        set( obsWs )

        return function stop()
        {
            console.debug( "stop" )
        }
    } )
}

function obsInit()
{
    let obsWs = new OBSWebSocket()

    function onDisconnect()
    {
        obsCurrentScene.set( '?' )
        obsRecordingState.set( ObsOutputState.Stopped )
        obsStreamingState.set( ObsOutputState.Stopped )
        obsReplayBufferState.set( ObsOutputState.Stopped )
    }

    obsWs.addListener( 'Identified', async () =>
    {
        obsLog( 'EVENT: Identified' )

        obsConnectionState.set( ObsConnectionState.Connected )

        // Check if Replay-Buffer is enabled

        let replayActive = false

        try
        {
            const { outputActive } = await obsWs.call( 'GetReplayBufferStatus' )

            replayActive = outputActive
        }
        catch( error )
        {
            if( error instanceof OBSWebSocketError && error.code && error.code == ObsRequestStatus.InvalidResourceState )
                obsLog( 'Replay-Buffer not available! (Enable in OBS-Settings)' )
        }

        const { currentProgramSceneName } = await obsWs.call( 'GetCurrentProgramScene' )
        const { outputActive: recordingActive } = await obsWs.call( 'GetRecordStatus' )
        const { outputActive: streamingActive } = await obsWs.call( 'GetStreamStatus' )

        obsCurrentScene.set( currentProgramSceneName )
        obsRecordingState.set( recordingActive ? ObsOutputState.Started : ObsOutputState.Stopped )
        obsStreamingState.set( streamingActive ? ObsOutputState.Started : ObsOutputState.Stopped )
        obsReplayBufferState.set( replayActive ? ObsOutputState.Started : ObsOutputState.Stopped )
    } )

    obsWs.addListener( 'ConnectionClosed', ( error: any ) =>
    {
        obsLog( 'EVENT: Identified' )

        obsConnectionState.set( ObsConnectionState.Disconnected )

        switch( error.code )
        {
            case WebSocketStatusCode.CloseNormal:
                obsLog( `Closing connection successful` )
                break

            case WebSocketStatusCode.CloseGoingAway:
                obsLog( `Closing connection (server offline or navigated away)` )
                break

            default:
                obsLog( `Connection-Closed:` )
                obsLog( `Error-Code: ${ error.code }` )

                if( error.message )
                    obsLog( `Error-Message: ${ error.message }` )

                break
        }

        onDisconnect()
    } )

    obsWs.addListener( 'ConnectionError', ( error: any ) =>
    {
        obsLog( 'EVENT: Identified' )

        obsConnectionState.set( ObsConnectionState.Disconnected )

        if( error.code === -1 )
        {
            obsLog( `No compatible server was found!` )
        }
        else
        {
            obsLog( `Connection-Error:` )
            obsLog( `Error-Code: ${ error.code }` )

            if( error.message )
                obsLog( `Error-Message: ${ error.message }` )
        }

        onDisconnect()
    } )

    obsWs.addListener( 'CurrentProgramSceneChanged', ( { sceneName } ) =>
    {
        obsLog( 'EVENT: CurrentProgramSceneChanged: ' + sceneName )

        obsCurrentScene.set( sceneName )
    } )

    obsWs.addListener( 'StreamStateChanged', ( { outputActive, outputState } ) =>
    {
        obsLog( 'EVENT: StreamStateChanged: ' + outputState )

        obsStreamingState.set( outputState as ObsOutputState )
    } )

    obsWs.addListener( 'RecordStateChanged', ( { outputActive, outputState } ) =>
    {
        obsLog( 'EVENT: RecordStateChanged: ' + outputState )

        obsRecordingState.set( outputState as ObsOutputState )
    } )

    obsWs.addListener( 'ReplayBufferStateChanged', ( { outputActive, outputState } ) =>
    {
        obsLog( 'EVENT: ReplayBufferStateChanged: ' + outputState )

        obsReplayBufferState.set( outputState as ObsOutputState )
    } )

    return obsWs
}

export async function obsSendData( eventName: string, data: any ): Promise<any | undefined>
{
    if( get( obsConnectionState ) !== ObsConnectionState.Connected )
    {
        obsLog( `Cannot send data ${ eventName } - not connected!` )

        return
    }

    console.assert( data === Object( data ), 'Primitive values cannot be send! Make it an Object instead ({data: myData})' )

    var response = await get( obs ).call( 'CallVendorRequest', {
        vendorName: 'obs-browser',
        requestType: 'emit_event',
        requestData: {
            event_name: eventName,
            event_data: data,
        },
    } )

    obsLog( `Request: ${ eventName }: ${ JSON.stringify( data ) }` )
    obsLog( `Response: ${ JSON.stringify( response ) }` )

    return response
}

export async function obsToggleConnection()
{
    const url = `ws://${ get( obsIp ) }:${ get( obsPort ) }`

    if( get( obsConnectionState ) === ObsConnectionState.Connected )
    {
        await obsDisconnect()
    }
    else if( get( obsConnectionState ) === ObsConnectionState.Disconnected )
    {
        await obsConnect()
    }
    else
    {
        console.error( "invalid state: " + get( obsConnectionState ) )
    }
}

export async function obsConnect()
{
    console.assert( get( obsConnectionState ) === ObsConnectionState.Disconnected )

    // TODO:
    // - validate input
    // - handle reconnect with different credentials?

    let ip = get( obsIp )
    let port = get( obsPort )
    let pw = get( obsPassword )

    try
    {
        // if( isIPV6Address( ip ) )
        //     ip = `[${ ip }]`

        const address = `ws://${ ip }:${ port }`

        obsLog( `Try connect to server: ${ address }` )

        obsConnectionState.set( ObsConnectionState.Connecting )

        const { obsWebSocketVersion, negotiatedRpcVersion } =
            await get( obs ).connect( address, pw, { rpcVersion: 1 } )

        obsConnectionState.set( ObsConnectionState.Connected )

        obsLog( `Version: ${ obsWebSocketVersion }` )
        obsLog( `RPC: ${ negotiatedRpcVersion }` )
        obsLog( `Connected.` )
    }
    catch( error )
    {
        if( error instanceof OBSWebSocketError )
        {
            obsLog( `OBSWebSocketError: ` + error )
        }
        else
        {
            obsLog( `Unknown error: ` + error )
        }

        obsLog( `Failed to connect` )
        obsLog( `Error-Code: ${ error.code }` )

        if( error.message )
            obsLog( `Error-Message: ${ error.message }` )

        obsConnectionState.set( ObsConnectionState.Disconnected )
    }
}

export async function obsDisconnect()
{
    console.assert( get( obsConnectionState ) === ObsConnectionState.Connected )

    // TODO: handle failed disconnect?
    try
    {
        obsConnectionState.set( ObsConnectionState.Disconnecting )

        await get( obs ).disconnect()

        obsConnectionState.set( ObsConnectionState.Disconnected )

        obsLog( `Disconnected.` )
    }
    catch( error )
    {
        if( error instanceof OBSWebSocketError )
        {
            obsLog( `OBSWebSocketError: ` + error )
        }
        else
        {
            obsLog( `Unknown error: ` + error )
        }

        obsConnectionState.set( ObsConnectionState.Connected ) // TODO: is this correct?

        obsLog( `Failed to disconnect` )
        obsLog( `Error-Code: ${ error.code }` )
        obsLog( `Error-Message: ${ error.message }` )
    }
}

function obsLog( msg: string )
{
    const time = new Date()
        .toLocaleTimeString( "de-de", {
            timeStyle: "medium",
        } )

    obsStatusLog.set( `${ time } | ${ msg }\n` + get( obsStatusLog ) )
}

export function obsTryConnect()
{
    const ip = get( obsIp )
    const port = get( obsPort )
    const connectionState = get( obsConnectionState )

    if( ip && port )
    {
        if( connectionState === ObsConnectionState.Disconnected )
            obsToggleConnection()
        else
            console.debug( 'Connection-State: ' + connectionState )
    }
    else
    {
        console.debug( 'IP: ' + ip )
        console.debug( 'Port: ' + port )
    }
}