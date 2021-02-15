import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Imdb = styled.span`
  background-color: #e1b518;
  border-radius: 5px;
  padding: 1.5px;
  color: black;
  cursor: pointer;
  font-weight: bold;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
  margin: 20px 0;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const ExtraInfo = styled.div`
  margin-bottom: 10px;
`;

const Youtube = styled.span`
  background-color: #f70000;
  border-radius: 5px;
  padding: 2px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  margin-right: 10px;
`;

const SeasonPoster = styled.img.attrs((props) => ({ src: props.src }))`
  width: 100px;
  height: 150px;
  border-radius: 5px;
`;

const DataWrapper = styled.div``;

const SeasonData = styled.div`
  margin: 20px 10px;
  font-size: 15px;
`;

const DetailPresenter = ({ result, loading, error }) => {
  console.log(result);
  return loading ? (
    <>
      <Helmet>
        <title>Loading | Nomfilx</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomfilx
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            {result.imdb_id ? (
              <>
                <Divider>•</Divider>
                <Imdb>
                  <a href={`https://www.imdb.com/title/${result.imdb_id}/`}>
                    IMDb
                  </a>
                </Imdb>
              </>
            ) : (
              <Item></Item>
            )}
          </ItemContainer>
          <ExtraInfo>
            {result.production_countries?.length > 0 && <Item>Made In </Item>}
            <Item>
              {result.production_countries.map((country, index) =>
                index === result.production_countries.length - 1
                  ? country.name
                  : `${country.name}, `
              )}
            </Item>
          </ExtraInfo>
          <ExtraInfo>
            <Item>Made By </Item>
            <Item>
              {result.production_companies?.length > 0 &&
                result.production_companies.map((company, index) =>
                  index === result.production_companies.length - 1
                    ? company.name
                    : `${company.name}, `
                )}
            </Item>
          </ExtraInfo>
          <Overview>{result.overview}</Overview>
          {result?.videos?.results.length > 0 &&
            result.videos.results.map((link, index) => (
              <ExtraInfo key={index}>
                <Youtube>
                  <a href={`https://www.youtube.com/watch?v=${link.key}`}>
                    Youtube
                  </a>
                </Youtube>
                <Item>
                  <a href={`https://www.youtube.com/watch?v=${link.key}`}>
                    {link.name}
                  </a>
                </Item>
              </ExtraInfo>
            ))}
          <FlexBox>
            {result?.seasons?.length > 0 &&
              result.seasons.map((season, index) => (
                <FlexBox key={index}>
                  <SeasonPoster
                    src={
                      season.poster_path
                        ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                        : require("../../assets/noPosterSmall.png")
                    }
                  />
                  <DataWrapper>
                    <SeasonData>{season.name}</SeasonData>
                    <SeasonData>{season.air_date}</SeasonData>
                    {season.episode_count > 0 && (
                      <SeasonData>
                        {season.episode_count === 1
                          ? `${season.episode_count} Episode`
                          : `${season.episode_count} Episodes`}
                      </SeasonData>
                    )}
                  </DataWrapper>
                </FlexBox>
              ))}
          </FlexBox>
        </Data>
      </Content>
    </Container>
  );
};

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
