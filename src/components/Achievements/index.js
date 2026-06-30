import React from 'react';
import styled from 'styled-components';
import { useApi } from '../../hooks/useApi';

// ─── Layout ────────────────────────────────────────────────────────
const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px 80px;
  position: relative;
  z-index: 1;
  @media (max-width: 960px) {
    padding: 24px 16px 48px;
  }
`;

const Title = styled.h2`
  font-size: 42px;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 40px;
  text-align: center;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  max-width: 1200px;
  width: 100%;
`;

// ─── Card ──────────────────────────────────────────────────────────
const cardBase = `
  width: 270px;
  background: var(--card-bg);
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--accent);
  box-shadow: 0 4px 20px var(--shadow);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  text-decoration: none;
  color: inherit;
  @media (max-width: 500px) {
    width: calc(100vw - 48px);
    max-width: 270px;
  }
`;

const CardLink = styled.a`
  ${cardBase}
  cursor: pointer;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 14px 36px var(--shadow-hover);
    border-color: var(--accent-hover);
  }
`;

const CardDiv = styled.div`
  ${cardBase}
`;

const ImageWrap = styled.div`
  width: 100%;
  height: 180px;
  background: ${({ theme }) => theme.bgLight || '#1C1E27'};
  overflow: hidden;
  flex-shrink: 0;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
  ${CardLink}:hover & {
    transform: scale(1.04);
  }
`;

const PlaceholderImg = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  background: ${({ theme }) => theme.primary}18;
  color: ${({ theme }) => theme.primary};
`;

const CardBody = styled.div`
  padding: 16px 18px 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 6px;
`;

const CardTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.4;
`;

const CardDesc = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 10px;
`;

const CardDate = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.text_secondary};
  opacity: 0.7;
`;

const ViewLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  letter-spacing: 0.3px;
`;

const EmptyState = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  text-align: center;
  padding: 40px;
  opacity: 0.6;
`;

// ─── Single Card ───────────────────────────────────────────────────
const AchievementCard = ({ item }) => {
  const accent = `${item._accentHex || '#854CE6'}`;

  const inner = (
    <>
      <ImageWrap>
        {item.image
          ? <CardImage src={item.image} alt={item.title} />
          : <PlaceholderImg>&#127942;</PlaceholderImg>
        }
      </ImageWrap>
      <CardBody>
        <CardTitle>{item.title}</CardTitle>
        {item.description && <CardDesc>{item.description}</CardDesc>}
        <CardFooter>
          <CardDate>{item.date}</CardDate>
          {item.link && <ViewLabel>View ↗</ViewLabel>}
        </CardFooter>
      </CardBody>
    </>
  );

  const cssVars = {
    '--card-bg':      'var(--theme-card, #171721)',
    '--accent':       `${accent}44`,
    '--shadow':       `${accent}18`,
    '--shadow-hover': `${accent}38`,
    '--accent-hover': `${accent}99`,
  };

  if (item.link) {
    return (
      <CardLink
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        style={cssVars}
      >
        {inner}
      </CardLink>
    );
  }
  return <CardDiv style={cssVars}>{inner}</CardDiv>;
};

// ─── Main Component ────────────────────────────────────────────────
const Achievements = () => {
  const { data: achievements, loading } = useApi('/achievements', []);

  if (!loading && (!achievements || achievements.length === 0)) return null;

  return (
    <Section id="achievements">
      <Title>Achievements</Title>
      <Subtitle>Certifications, awards & milestones</Subtitle>
      <Grid>
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <CardDiv key={i} style={{ '--card-bg': '#171721', '--accent': '#854CE644', '--shadow': '#854CE618', '--shadow-hover': '#854CE638', '--accent-hover': '#854CE699' }}>
                <ImageWrap style={{ background: '#2a2a3a' }} />
                <CardBody>
                  <div style={{ height: 14, borderRadius: 6, background: '#2a2a3a', width: '70%' }} />
                  <div style={{ height: 11, borderRadius: 6, background: '#2a2a3a', width: '90%', marginTop: 4 }} />
                </CardBody>
              </CardDiv>
            ))
          : achievements.map((item) => (
              <AchievementCard key={item._id} item={item} />
            ))
        }
      </Grid>
    </Section>
  );
};

export default Achievements;
