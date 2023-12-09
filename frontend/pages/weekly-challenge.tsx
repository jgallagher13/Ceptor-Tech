import React, { useState, useEffect } from "react";
import { Contract, ethers, providers } from "ethers";
import { Alchemy, Network, Nft } from "alchemy-sdk";
import Explorer from "../components/Explorer";
import Link from "next/link";
import { Countdown } from "../components/Countdown";
import {
  sepolia,
  useAccount,
  useContractRead,
  useContractReads,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import NftCard from "../components/NftCard";
import { getServerSideProperties } from "../utils/getServerSideProps";
import { getMostLikedSubmission } from "./api/getMostLikedSubmission";
import { addresses } from "../utils/addresses";
import { ceptorDiceABI, promptCollectionABI, timerABI } from "../utils/abis";
import { useEthersProvider } from "../utils/ethers";
import { voteForSubmission } from "./api/voteForSubmission";
import { VoteData } from "../utils/types";

// For the user to submit the timer  (of burned/used dice) has to be running,
// for presentation we burn the 5, which is 20 minutes.

export async function getServerSideProps() {
  return getServerSideProperties();
}

export default function WeeklyChallenge({
  ALCHEMY_GOERLI_API_KEY,
  ALCHEMY_SEPOLIA_API_KEY,
  ALCHEMY_POLYGON_ZKEVM_API_KEY,
}: {
  ALCHEMY_GOERLI_API_KEY: string;
  ALCHEMY_SEPOLIA_API_KEY: string;
  ALCHEMY_POLYGON_ZKEVM_API_KEY: string;
}) {
  const { chain, chains } = useNetwork();
  const provider = useEthersProvider({ chainId: chain?.id });
  const { address, isConnecting, isDisconnected } = useAccount();

  // const [alchemy, setAlchemy] = useState<Alchemy>();
  const [latestBlock, setLatestBlock] = useState(null);
  const [nftList, setNFTList] = useState([]);
  const [deadline, setDeadline] = useState<Date>();
  const [weeklyChallenge, setWeeklyChallenge] = useState("Weekly Challenge");
  const [isConnected, setIsConnected] = useState(false);
  const [winnerNFT, setWinnerNFT] = useState<Nft>();
  const [diceId, setDiceId] = useState(5);
  const [currentTimer, setCurrentTimer] = useState();

  // TODO: move logic to burn dice to navbar
  // Config for burning Dice
  const { config: configBurnDice } = usePrepareContractWrite({
    address: addresses[chain?.network]?.ceptorDice,
    abi: ceptorDiceABI,
    functionName: "timerBurn",
    args: [address, diceId, 1],
  });

  // // Hook for burning Dice
  const {
    isLoading: isLoadingDice,
    data: dataBurnDice,
    write: writeBurnDice,
  } = useContractWrite(configBurnDice);

  const burnDice = async () => {
    writeBurnDice();
  };

  // // Config for sending user submission
  // const { config: configSendSubmission } = usePrepareContractWrite({
  //   address: addresses[chain?.network]?.promptCollection,
  //   abi: promptCollectionABI,
  //   functionName: "mint",
  //   args: [address, diceId, 1],
  // });

  // // Hook for sending user submission
  // const { data: dataSendSubmission, write: writeSendSubmission } =
  //   useContractWrite(configSendSubmission);

  // useEffect(() => {
  //   //  get this weeks challenge
  //   const getWeeklyChallenge = async () => {
  //     const temp = promptCollectionContract.s_currentPrompt();
  //     setWeeklyChallenge(temp);
  //   };

  //   // get weekTimeStamp form dealing of weekly challenge
  //   const getWeekDeadline = async () => {
  //     const temp = promptCollectionContract.weekTimeStamp();
  //     setDeadline(temp);
  //   };

  //   getWeeklyChallenge();
  //   getWeekDeadline();
  // }, [promptCollectionContract]);

  const {
    data: dataTimer,
    isError,
    isLoading,
  } = useContractRead({
    address: addresses[chain?.network]?.address,
    abi: timerABI,
    functionName: "checkTimer",
    args: [address],
  });

  console.log(dataTimer);

  // useEffect(() => {
  //   // getting the left time to play after burning a dice

  //   dataTimer && setCurrentTimer(dataTimer);
  // }, [dataTimer]);

  // // TODO: remove this temp variable once we get the deadline for powt from the smart contract
  // const oneWeekFromNow = new Date();
  // oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7); // Adds 7 days to the current date

  // const burnDice = async () => {
  //   writeBurnDice();
  // };

  // // TODO: create my submission using AI - component needs to be added in new branch
  // const sendSubmission = async () => {
  //   // TODO: call mint from promptCollection submit() -return tokenID
  //   // TODO: sned data to Mongo db with the tokenID
  //   writeSendSubmission();
  // };

  useEffect(() => {
    console.log("nfts state updated:", nftList);
  }, [nftList]);

  useEffect(() => {
    // TODO: replace with winning NFT of last week
    // getMostLikedSubmission();

    const alchemy = new Alchemy({
      apiKey: ALCHEMY_SEPOLIA_API_KEY,
      network: Network.ETH_SEPOLIA,
    });

    const getNFTofTheWeek = async () => {
      // const response = await getMostLikedSubmission();
      const response = await alchemy.nft.getNftsForContract(
        "0x4dBe3E96d429b9fE5F2Bb89728E39138aC4F817A"
      );
      setWinnerNFT(response.nfts[1]);
    };
    getNFTofTheWeek();
  }, [ALCHEMY_SEPOLIA_API_KEY]);

  return (
    <div className="bg-black flex flex-col items-center  min-h-screen py-5 space-y-10">
      <div className="flex flex-col justify-center items-center ">
        <h1 className="font-milonga text-4xl uppercase text-light-yellow mb-5">
          Challenge of the Week{" "}
        </h1>
        <h1 className="font-oswald text-2xl uppercase font-bold mb-2">
          powered by Chainlink VRF, Automation, & Functions
        </h1>
        <h1 className="font-oswald text-xl uppercase font-bold ">
          Are you an AI Prompt artist / wizard?
        </h1>
        <h1 className="font-oswald text-xl uppercase font-bold">
          Burn a die and mint your ChallengerNFT
        </h1>
        <div className="flex flex-col justify-center items-center mt-10">
          {winnerNFT && (
            <NftCard
              key={winnerNFT.tokenId}
              nft={winnerNFT}
              winner={true}
              onCardClick={() => console.log("nothing")}
            />
          )}
          <h1 className="font-oswald text-sm uppercase font-bold">
            Winner of last weeks challenge
          </h1>
        </div>
        <button onClick={() => burnDice()}>burn</button>
        <div className="flex flex-wrap justify-center items-center">
          <div className="mt-4 bg-light-pink mx-auto min-w-max p-4 px-4 rounded-xl shadow-lg">
            <h1 className="font-oswald text-xl uppercase text-light-yellow">
              This week’s challenge:
            </h1>
            <p className="text-2xl font-nothing-you-could-do">
              {weeklyChallenge}
            </p>
          </div>
          <div className="text-light-pink font-oswald m-5">
            {/* TODO: add real deadline from smart contract */}
            <Countdown deadline={deadline} />
          </div>
        </div>
      </div>

      <Explorer
        ALCHEMY_GOERLI_API_KEY={ALCHEMY_GOERLI_API_KEY}
        ALCHEMY_SEPOLIA_API_KEY={ALCHEMY_SEPOLIA_API_KEY}
        ALCHEMY_POLYGON_ZKEVM_API_KEY={ALCHEMY_POLYGON_ZKEVM_API_KEY}
        nftList={[]}
      />
    </div>
  );
}