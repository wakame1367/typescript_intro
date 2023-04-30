import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";

type Props = {
    initialImageUrl: string;
};

const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
    const [imageUrl, setImageUrl] = useState(initialImageUrl);
    const [loading, setLoading] = useState(false);
    // useEffect(() => {
    //     fetchImage().then((newImage) => {
    //         setImageUrl(newImage.url);
    //         setLoading(false);
    //     });
    // }, []);
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

export const getServerSidePros: GetServerSideProps<Props> = async () => {
    const image = await fetchImage();
    return {
        props: {
            initialImageUrl: image.url,
        },
    };
};

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