'use strict';

const app   = require("electron").app;
const https = require("https");


function doGetRequest(url)
{
    console.log(`Fetching "${url}"...`);

    return new Promise((resolve) => {
        let data = [];
        https.get(url, (res) => {
            res.setEncoding("binary");
            res.on("data", (chunk) => data.push(Buffer.from(chunk, "binary")));
            res.on("end", () => {
                let d = Buffer.concat(data).toString();
                console.log(`Received ${d.length} bytes.`);
                resolve(d);
            });
        });
    });
}

(async () => {
    await app.whenReady();

    // Fetch something... Doesn't matter what it is.
    let html = await doGetRequest('https://api.chucknorris.io/jokes/random');

    // Now we wait... Since Electron 5.x, the application will crash with exit code 127 after a couple of seconds.
    // This time usually ranges between 5 and 20 seconds. I think it happens when the socket connection that is used
    // internally by {http(s)} is cleaned up or closed.
    console.log('And now we wait for a few seconds...');

})();


// Commenting out the async-function above and just running this will also crash the app after a few seconds.
// doGetRequest('https://api.chucknorris.io/jokes/random').then((data) => {
//     console.log('Now we wait...');
// });
