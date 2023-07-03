import React, { useState } from "react";
import { useEffect } from "react";
import ImageUploader from "react-images-upload";

function UploadImages({ handleChange, data }) {
    const [bool, setBool] = useState(false);
    const [hinhanh, setHinhanh] = useState([]);
    const [loading, setLoading] = useState(true);
    const onDrop = (pictureDataURLs) => {
        setLoading(true)
        console.log(pictureDataURLs);
        handleChange(pictureDataURLs);
        setLoading(false)
        setHinhanh(pictureDataURLs)
        setBool(true);
    };
    async function clearAll(e) {
        e.preventDefault();
        // await handleChange([]); 
        setHinhanh([])
        data.hinhanhs = [];
    }
    useEffect(() => {
        if (data) {
            setHinhanh(data.hinhanhs);
            setLoading(false); setBool(true)
        }
    }, [handleChange])

    return (
        <form>
            <ImageUploader
                key="image-uploader"
                className="imageUploader"
                withIcon={false}
                withLabel={false}
                withPreview={true}
                label="Maximum size file: 5MB"
                onChange={onDrop}
                imgExtension={[".jpg", ".png", ".jpeg"]}
                maxFileSize={5242880}
                buttonText="Chọn hình ảnh"
            ></ImageUploader>

            {bool && (
                <button
                    className="btn btn-outline-darks clear-all"
                    onClick={(e) => clearAll}
                >
                    Xóa tất cả
                </button>
            )}
        </form>
    );
}

export default UploadImages;
