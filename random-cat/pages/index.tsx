import { NextPage } from "next";

const IndexPage: NextPage = () => {
    return <div>猫画像予定地</div>;
};
export default IndexPage;

const fetchImage = async () => {
    const url: string = "https://api.thecatapi.com/v1/images/search";
    const res = await fetch(url);
    const images = await res.json();
    console.log(images);
    return images[0];
};

fetchImage();