

const actions = {
    create: async ( requestEvent ) => {
        const { request } = requestEvent

        const formData = await request.formData()

        console.log( 'actions' )
        console.log( formData )
        console.log( formData.get('logo') )


    }
}