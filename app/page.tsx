"use client";
import Image from 'next/image';
import {useState} from "react";

export default function Home() {

    const [humanArt, setHumanArt] = useState("/images/humanart.png")
    const [aiArt, setAiArt] = useState("/images/aiart.png")

    function Header() {
        return (
            <div>
                <h1 className={"header"}>AI or Not?</h1>
                <h3 className={"header"} id={"descriptor"}>Can you tell the difference between AI and human artwork?</h3>
            </div>
        );
    }

    function ThemeButton() {
        return (
            <Image id={"themebutton"} onClick={toggleTheme} src={"/images/themeicon.svg"} alt={"theme toggle"} width={50} height={50} />
        )
    }

    function Images( {humanart, aiart} ) {
        return (
            <div id={"ImagesDiv"}>
                <Image className={"image"} src={humanart} alt="aiart example" width={500} height={500} />
                <Image className={"image"} src={aiart} alt="humanart example" width={500} height={500} />
            </div>
        );
    }

    function Button() {
        return (
            <div id={"buttonContainer"}>
                <button onClick={startGame}>Start Game</button>
            </div>
        );
    }

    function toggleTheme() {
        let body = document.querySelector("body");
        if (body) {
            body.classList.toggle('dark-mode');
        }
    }

    async function getImages() {
        let imagesArray: Array<string> = [];

        const civitAPI = 'https://civitai.com/api/v1/images';
        const civitParams = new URLSearchParams({
            limit: 1,
            nsfw: 'None',
            sort: 'Most Comments',
            page: 1
        });

        const apiUrl = `${civitAPI}?${civitParams.toString()}`;

        await fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Process the response data
                imagesArray.push(data.items[0].url);
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });

        return imagesArray;

    }

    async function startGame() {
        console.log('start game');

        let images = document.querySelectorAll<HTMLElement>('.image');
        images.forEach(image => {
            image.style.opacity = "0.9";
            image.addEventListener("mouseover", ()=> {
                image.style.opacity = "1";
                image.style.outline = "5px solid green"
            });
            image.addEventListener("mouseout", ()=> {
                image.style.opacity = "0.9";
                image.style.outline = "";
            });

        });

        let gameImages = await getImages();

        console.log(gameImages)

        setAiArt(gameImages[0])

    }

    return (

        <div>
            <Header />
            <ThemeButton />
            <Images humanart={humanArt} aiart={aiArt} />
            <Button />

        </div>
    );
}