
export interface Song{
        key: string,
        title: string,
        subtitle: string,
        images: {
          coverart: string,
          coverarthq: string,
          background: string
        },
        artists: [{
          adamid: string,
        }
        ]
        hub:{
          actions: [
            {
              name:string,
              type:string,
              id:string,
            },
            {
              name:string,
              type:string,
              uri:string,
            }
          ],
        }
}