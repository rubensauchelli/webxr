var express = require('express');
const compression = require('compression')
const port = process.env.port || 8080
const path=require('path')

const app = express()

app.use(compression())

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/webxr/'), {etag: false, lastModified: false}));

//Serve frontend as static
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, 'dist/webxr/'), {etag: false, lastModified: false});
});

app.listen(port, () => console.log('Service server started. Listening on port '+ port));