import { NextPage } from "next";
import { useEffect, useState } from "react";

const IndexPage: NextPage = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchImage().then((newImage) => {
            setImageUrl(newImage.url);
            setLoading(false);
        });
    }, []);
    const handleClick = async () => {
        setLoading(true);
        const newImage = await fetchImage();
        setImageUrl(newImage.url);
        setLoading(false);
    };
    return (
        <div>
            <button onClick={handleClick}>他の猫も見てみる</button>
            <div>{loading || <img src={imageUrl} />}</div>
        </div>
    );
};
export default IndexPage;

type Image = {
    url: string;
};
const fetchImage = async (): Promise<Image> => {
    const url: string = "https://api.thecatapi.com/v1/images/search";
    const res = await fetch(url);
    const images = await res.json();
    console.log(images);
    return images[0];
};

fetchImage();