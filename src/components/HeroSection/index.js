import React from 'react'
import HeroBgAnimation from '../HeroBgAnimation'
import { HeroContainer, HeroBg, HeroLeftContainer, Img, HeroRightContainer, HeroInnerContainer, TextLoop, Title, Span, SubTitle, ResumeButton } from './HeroStyle'
import HeroImg from '../../images/HeroImage.jpg'
import Typewriter from 'typewriter-effect';
import { Bio } from '../../data/constants';
import { useApi } from '../../hooks/useApi';

const HeroSection = () => {
    const { data: apiBio, loading: bioLoading } = useApi('/bio', null);
    const name = apiBio?.name || Bio.name;
    const roles = apiBio?.roles?.length ? apiBio.roles : Bio.roles;
    const description = apiBio?.description || Bio.description;
    const resume = apiBio?.resume || Bio.resume;
    // Don't fall back to local HeroImg until API has responded — prevents
    // the visible swap from old bundled image → newly uploaded Cloudinary URL.
    const profileImage = bioLoading ? null : (apiBio?.profileImage || HeroImg);

    return (
        <div id="about">
            <HeroContainer>
                <HeroBg>
                    <HeroBgAnimation />
                </HeroBg>
                <HeroInnerContainer >
                    <HeroLeftContainer id="Left">
                        <Title>Hi, I am <br /> {name}</Title>
                        <TextLoop>
                            I am a
                            <Span>
                                <Typewriter
                                    options={{
                                        strings: roles,
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </Span>
                        </TextLoop>
                        <SubTitle>{description}</SubTitle>
                        <ResumeButton href={resume} target='display'>Check Resume</ResumeButton>
                    </HeroLeftContainer>

                    <HeroRightContainer id="Right">
                        {profileImage && <Img src={profileImage} alt="hero-image" />}
                    </HeroRightContainer>
                </HeroInnerContainer>

            </HeroContainer>
        </div>
    )
}

export default HeroSection