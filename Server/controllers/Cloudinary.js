const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dvn7obs6d",
    api_key: "791934165548142",
    api_secret: "sCjC88oUy64e8bah6WxhGom1njM",
});

exports.createImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.body.image, {
            public_id: Date.now(),
            resource_type: "auto",
        });
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Upload Error");
    }
};

exports.uploadSlip = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.body.image, {
            folder: "payment", // Specify the folder in Cloudinary
            public_id: Date.now(),
            resource_type: "auto",
        });
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Upload Error");
    }
};

exports.removeImage = async (req, res) => {
    try {
        let image_id = req.body.public_id;
        cloudinary.uploader.destroy(image_id, (result) => {
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Remove Error");
    }
};

exports.removeSlip = async (req, res) => {
    try {
        let image_id = req.body.public_id;
        // Specify the folder in Cloudinary (assuming "payment" is the folder name)
        let folder = "payment";
        cloudinary.uploader.destroy(image_id, { folder }, (result) => {
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Remove Error");
    }
};
