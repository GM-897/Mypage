// src/components/CodingProfiles.js

import React from 'react';
import styled from 'styled-components';      

const CodingProfilesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  padding: 40px 0px 80px 0px;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const CodingProfilesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 20px;
  @media (max-width: 960px) {
    gap: 20px;
  }
`;

const Title = styled.h2`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const ProfileCard = styled.a`
  width: 330px;
  height: 240px;
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 10px;
  border: 0.1px solid #306EE8;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  overflow: hidden;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    filter: brightness(1.1);
  }
  @media (max-width: 768px) {
    width: 300px;
    height: 220px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 160px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  object-fit: contain;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    height: 140px;
  }
`;

const ProfileTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  margin-top: auto;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const CodingProfiles = () => {
  const profiles = [
    {
      title: "LeetCode",
      image: "https://miro.medium.com/v2/resize:fit:1008/1*VOQU8CuPG34Gsd1yJCadOQ.png",
      link: "https://leetcode.com/your-profile"
    },
    {
      title: "GitHub",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Codechef%28new%29_logo.svg/1200px-Codechef%28new%29_logo.svg.png",
      link: "https://www.codechef.com/users/beastgm10"
    },
    {
      title: "CodeForces",
      image: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/062020/codeforces_logo.png?Qlx1_zCw.Q4T7PHPosbkLyNiBJQWX7GD&itok=6wPhjh1X",
      link: "https://codeforces.com/profile/beast_gm10"
    },
    // Add more profiles as needed
  ];

  return (
    <CodingProfilesContainer id="coding">
      <Title>Coding Profiles</Title>
      <CodingProfilesWrapper>
        {profiles.map((profile, index) => (
          <ProfileCard 
            key={index}
            href={profile.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ProfileImage src={profile.image} alt={profile.title} />
            <ProfileTitle>{profile.title}</ProfileTitle>
          </ProfileCard>
        ))}
      </CodingProfilesWrapper>
    </CodingProfilesContainer>
  );
};

export default CodingProfiles;