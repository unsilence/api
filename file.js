import model from './model'
import asyncBusboy from 'async-busboy';
const PassThrough = require('stream').PassThrough;
const fs = require('fs');

export default async (ctx, next) => {
    try {
        let urls = ctx.path.split('/')
        let clt = urls[1] || 'file'
        let md5 = urls[2] || ''
        if(clt == 'file'){
            if(md5 == 'upload'){
                console.log('this.request.files',ctx.request)
                const {files, fields} = await asyncBusboy(ctx.req);
                let md5list = []
                for (let f of files) {
                    let md5 = await model.fileSave(f);
                    md5list.push(md5)
                    fs.unlink(f.path)
                }
                ctx.body = {status:'success',msg:'',md5list:md5list}
            }else if(md5.length == 32){
                let readStream = await model.fileRead(md5)
                ctx.type = 'image/png';
                ctx.body = readStream.on('error', ctx.onerror).pipe(PassThrough());
            }else{
                ctx.body = {status:'wrong',msg:'你在做什么？'}
            }
            return
        }
        await next()
    } catch (err) {
        console.log(err)
        ctx.body = { message: err.message };
        ctx.status = err.status || 500;
    }
}
