import { Link } from "react-router-dom";

import arrow from "../assets/icons/arrow.svg";
const InfoBox = ({
    text,
    link,
    btnText,
}: {
    text: string;
    link: string;
    btnText: string;
}) => (
    <div className="info-box">
        <p className="font-medium sm:text-xl text-center">{text}</p>
        <Link to={link} className="neo-brutalism-white neo-btn">
            {btnText}
            <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
        </Link>
    </div>
);

const renderContent: { [key: number]: JSX.Element } = {
    1: (
        <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
            Hi, I am <span className="font-semibold">cc</span>
            <br />
            bldkasbkdadl
        </h1>
    ),
    2: (
        <InfoBox
            link="/about"
            text="Led multiple projects to success over the years. Curious about the impact?"
            btnText="Learn more"
        />
    ),
    3: (
        <InfoBox
            link="/projects"
            text="Worked with many companies and picked up many skill alogn da waaaaduahd u"
            btnText="Visit my pfl"
        />
    ),
    4: (
        <InfoBox
            link="/contact"
            text="Need a project done or looking for a dev? I'm just a few keystrokes away"
            btnText="Let's talk"
        />
    ),
};

function HomeInfo({ currentStage }: { currentStage: number }) {
    return renderContent[currentStage];
}

export default HomeInfo;
