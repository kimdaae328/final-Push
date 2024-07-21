import { useQuery } from "@tanstack/react-query";
import { getComingSoon, makeImagePath, IAPIResponse, getMovie, IMovieDetail } from "../api";
import styled from "styled-components";
import { useMatch, PathMatch, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll } from "framer-motion";

const Wrapper = styled.div``;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px;
`;

const Row = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(120px, 256px));
  position: relative;
  justify-content: center;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  cursor: pointer;
  overflow: hidden;
`;

const Img = styled(motion.img)<{ bgPhoto: string }>`
  height: 400px;
  width: 100%;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
`;

const Title = styled.h2`
  font-size: 26px;
  padding: 15px 0;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: fixed;
  width: 80%;
  height: 80vh;
  left: 0;
  right: 0;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigDetail = styled.div`
  padding: 20px 0;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 28px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const BigOverview = styled.p`
  margin: 15px;
  position: relative;
  color: ${(props) => props.theme.white.lighter};
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  word-break: keep-all;
`;

const MovieP = styled.p`
  border: 1px solid #fff;
  display: inline-block;
  padding: 5px 8px;
  border-radius: 5px;
  margin-top: 5px;
`;

const CloseBtn = styled(motion.button)`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

export default function ComingSoon() {
  const navigate = useNavigate();
  const moviePathMatch: PathMatch<string> | null = useMatch("/coming-soon/:id");
  const { scrollY } = useScroll();
  const { data, isLoading } = useQuery<IAPIResponse>(["comingMovies"], getComingSoon);
  const { data: movieDetail } = useQuery<IMovieDetail>(
    ["movieDetail", moviePathMatch?.params.id],
    () => getMovie(moviePathMatch?.params.id || "")
  );

  const onBoxClicked = (movieId: number) => {
    navigate(`/coming-soon/${movieId}`);
  };

  const onOverlayClick = () => navigate("/coming-soon");

  const clickedMovie =
    moviePathMatch?.params.id &&
    data?.results.find(
      (movie) => String(movie.id) === moviePathMatch.params.id
    );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Row>
            {data?.results.map((movie, index) => (
              <Box
                onClick={() => onBoxClicked(movie.id)}
                key={movie.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.3 }}
                bgPhoto={makeImagePath(movie.poster_path)}
              >
                <Img
                  whileHover="hover"
                  variants={boxVariants}
                  bgPhoto={makeImagePath(movie.poster_path)}
                />
                <Title>{movie.title}</Title>
              </Box>
            ))}
          </Row>

          <AnimatePresence>
            {moviePathMatch && clickedMovie ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                  }}
                />
                <BigMovie
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  layoutId={moviePathMatch.params.id}
                >
                  <CloseBtn onClick={onOverlayClick}>
                    <svg
                      data-slot="icon"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      stroke="#fff"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                      ></path>
                    </svg>
                  </CloseBtn>
                  <BigCover
                    style={{
                      backgroundImage: `url(${makeImagePath(
                        clickedMovie.backdrop_path
                      )})`,
                    }}
                  ></BigCover>
                  <BigDetail>
                    <BigTitle>{clickedMovie.title}</BigTitle>
                    <BigOverview>{clickedMovie.overview}</BigOverview>
                    {movieDetail && (
                      <>
                        <MovieP>Revenue: ${movieDetail.revenue}</MovieP>
                        <MovieP>Runtime: {movieDetail.runtime} minutes</MovieP>
                        <MovieP>Released {movieDetail.release_date}</MovieP>
                      </>
                    )}
                  </BigDetail>
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
