// import Head from "next/head";
import { useState, useEffect, useContext } from "react";
<<<<<<< HEAD
import CreateHero from '../components/CreateHero';
import { Create } from '../components/Create';
import { Logo } from '../components/Logo';
import VectorImage from '../components/VectorImage';
import Meta from '../components/Meta';
import Image from 'next/image';
import { NavbarMdUp, NavbarSmUp } from '../components/NavBar/index';
=======
import CreateHero from "../components/CreateHero";
import { Create } from "../components/Create";
import { Logo } from "../components/Logo";
import HamburgerMenu from "../components/HamburgerMenu";
import VectorImage from "../components/VectorImage";
import Image from "next/image";
>>>>>>> tech-dev
import Link from "next/link";
import { SocketContext } from "../utils/socketContext";

export default function Home() {
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.emit("test", "test");
      console.log("Socket:", socket);
      socket.on("test", (message) => {
        console.log("New test message:", message);
      });

      return () => {
        socket.off("message");
      };
    }
  }, [socket]);

<<<<<<< HEAD
  const [imageProcessing, setImageProcessing] = useState(false); // processing state ie. loading...
=======
  const [imageProcessing, setImageProcessing] = useState(false); //processing state ie. loading...
>>>>>>> tech-dev
  const [conditionalRender, setConditionalRender] = useState("");

  const toggleImageProcessing = async () => {
    setImageProcessing(false);
  };

  useEffect(() => {
    if (imageProcessing) {
      console.log(imageProcessing);
      setTimeout(toggleImageProcessing, 3000);
    }
  }, [imageProcessing]);

  return (
    <>
<<<<<<< HEAD
      <Meta />
      <NavbarMdUp />
      <NavbarSmUp />
      <div className='fixed top-0 h-screen w-screen'>

=======
      <div className="fixed top-0 h-screen w-screen">
>>>>>>> tech-dev
        <Image
          src="/images/CREATE-midpage/midPageImage.png"
          width={1000}
          height={1000}
          alt="midPage"
          className="object-cover w-full h-full -z-10"
        />
      </div>

      <div className="flex flex-col justify-center items-center">
        <p className="z-10">Version 0.8.22*</p>
        <p className="z-10">{"*Merged, now with 100% more Quiz! :D"}</p>
        <Link href="/nftpage">
          <span className="text-2xl relative z-10 text-white underline cursor-pointer font-black">
            NFT Explorer
          </span>
        </Link>
<<<<<<< HEAD

        {/* Add the link to the "CCID" page */}
        <Link href="/CCID">
          <span className="text-2xl relative z-10 text-white underline cursor-pointer font-black ml-4">
            CCID
          </span>
        </Link>

=======
>>>>>>> tech-dev
        <Logo setConditionalRender={setConditionalRender} />

        <div className="z-10 flex w-full justify-center">
          {/* <div className="w-1/6 h-screen bg-slate-300">
            <p className="">SIDEBAR</p>
          </div> */}

          <div className=" z-10">
<<<<<<< HEAD
            {/* Include your Create component */}
=======
>>>>>>> tech-dev
            <Create />
          </div>
        </div>
      </div>
    </>
  );
}
