import React, { useState, useEffect } from "react";
import Layout from "../hoc/Layout";
import Banner from "../components/Banner";
import StatsCard from "../components/StatsCard";
import AboutCard from "../components/AboutCard";
import CardStacker from "../components/CardStacker";
import DynamicCardStacker from "../components/DynamicCardStacker";
import Slider from "../components/Slider";
import ContactCard from "../components/ContactCard";
import ContactLeft from "../components/ContactLeft";
import { data, cardData, sections, testimonials } from "../constants/data";
import StoriesBanner from "../components/StoriesBanner";
import PopUpCard from "../components/PopUpCard";

const Home = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowModal(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="pt-16">
            {showModal && <PopUpCard onClose={closeModal} />}
            <div className="">
                <Banner />
            </div>
            <div className="mt-5">
                <StatsCard />
            </div>
            <div className="mt-5">
                <AboutCard sections={sections} />
            </div>
            <div>
                <DynamicCardStacker data={data}></DynamicCardStacker>
            </div>
            <div className="">
                <CardStacker data={cardData} />
            </div>
            <div className="mt-5">
                <Slider testimonials={testimonials} />
            </div>
            <div className="">
                <StoriesBanner />
            </div>
            <div className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="">
                    <ContactLeft />
                </div>
                <div className="bg-white rounded-lg shadow-lg">
                    <ContactCard />
                </div>
            </div>
        </div>
    );
};

export default Layout(Home);
