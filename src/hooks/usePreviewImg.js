import { useState } from "react";

const usePreviewImg = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleImageChange = (e) => {
		const file = e.target.files[0];

        if (file){
            const reader = new FileReader();

            reader.onloadend = () => {
				setSelectedFile(reader.result);
			};

			reader.readAsDataURL(file);
        } else {
            setSelectedFile(null)
        }
    }

    return { selectedFile, handleImageChange, setSelectedFile };

}

export default usePreviewImg;