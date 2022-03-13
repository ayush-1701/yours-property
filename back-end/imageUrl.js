    //  implemented by Shubham
const { aws } = require("../firebaseAws");

const bucketName = "yoursproperty";
async function generateUrl() {
    let date = new Date();
    let id = parseInt(Math.random() * 10000000000);

    const imageName = `${id}${date.getTime()}.jpg`;

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 300, //300 ms
        ContentType: 'image/jpeg'
    })
    const uploadUrl = await aws.getSignedUrlPromise('putObject', params);
    return uploadUrl;
}
exports.imageUrl=(req, res) => {
    generateUrl().then(url => res.json(url));
}