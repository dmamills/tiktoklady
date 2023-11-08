import fetch from 'node-fetch';
import fs from 'fs/promises';

const tikTokRequest = async (text) => {
    return fetch('https://tiktok-tts.weilnet.workers.dev/api/generation', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text,
            voice: 'en_us_001'
        })
    }).then(res => res.json())
}

const toMp3 = async (filename, base64) => fs.writeFile(filename, Buffer.from(base64, 'base64'), 'binary');

(async() => {
    if(process.argv.length < 4) {
        console.log('usage: tiktoklady "<text>" <out.mp3>');
        return;
    }

    const res = await tikTokRequest(process.argv[2])
    await toMp3(process.argv[3], res.data);
})();