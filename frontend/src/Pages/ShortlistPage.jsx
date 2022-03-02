import styled from "styled-components";
import Navbar from "../Components/Navbar";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #bcdfff;
`;

const WrapperContainer = styled.div`
  height: 80%;
  width: 60%;
  margin: auto;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  /* border: black solid; */
  align-items: center;
`;

const Title = styled.h1`
  /* border: black solid; */
  text-align: center;
  font-weight: 700;
  font-size: 40px;
`;

const Subtitle = styled.p`
  /* border: black solid; */
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
`;

const ShortlistWrapper = styled.div`
  /* border: black solid; */
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ShortlistElement = styled.div`
  /* border: black solid; */
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 45%;
  margin-top: 30px;
  margin-left: 25px;
`;

const SchoolNameWrapper = styled.div`
  /* border: black solid; */
  margin-left: 30px;
  margin-top: 25px;
  max-width: 85%;
  height: 90px;
  word-wrap: break-word;
  text-overflow: ellipsis;
  white-space: normal;
`;

const SchoolName = styled.h1`
  padding-top: 5px;
  font-size: 25px;
  font-weight: 700;
`;

const SchoolAddress = styled.p`
  padding-top: 10px;
  font-size: 15px;
  font-weight: 700;
`;

const PersonalNotesWrapper = styled.div`
  background-color: #bcdfff;
  /* border: black solid; */
  border-radius: 20px;
  text-align: center;
  padding-top: 5px;
  margin-inline-start: 40%;
  margin-top: 20px;
  width: 200px;
  height: 75px;
  word-wrap: break-word;
  text-overflow: ellipsis;
  white-space: normal;
`;

const PersonalNotesTitle = styled.p`
  font-weight: 700;
  font-size: 18px;
`;

const Notes = styled.p`
  font-size: 10px;
  font-weight: 700;
`;

const WrapperShowMore = styled.div`
  text-align: center;
`;

const ShowMore = styled.button`
  margin-inline-start: auto;
  border: solid black;
  border-radius: 25px;
  border-color: #9fd1ff;
  border-width: 1px;
  background-color: white;
  /* border: 1px solid teal; */
  color: black;
  font-weight: bold;
  font-size: 8px;
  padding: 5px;
  margin-top: 25px;
  margin-bottom: 8px;
  cursor: pointer;
`;

const WrapperViewMore = styled.div`
  /* border: solid black; */
  text-align: center;
`;

const ViewMoreButton = styled.button`
  margin-inline-start: auto;
  border: solid black;
  border-radius: 10px;
  border-width: 1px;
  background-color: #f5cb82;
  /* border: 1px solid teal; */
  color: black;
  font-weight: bold;
  font-size: 15px;
  padding: 5px 20px;
  margin-top: 25px;
  cursor: pointer;
`;

const ShortlistPage = () => {
  return (
    <Container>
      <Navbar />
      <WrapperContainer>
        <Title>Your Shortlisted Schools</Title>
        <Subtitle>
          These are the schools that you have shortlisted while browsing
        </Subtitle>
        <ShortlistWrapper>
          <ShortlistElement>
            <SchoolNameWrapper>
              <SchoolName>School XXX</SchoolName>
              <SchoolAddress>123 Address Street 234</SchoolAddress>
            </SchoolNameWrapper>
            <PersonalNotesWrapper>
              <PersonalNotesTitle>Personal Notes</PersonalNotesTitle>
            </PersonalNotesWrapper>
            <WrapperShowMore>
              <ShowMore>Show me More</ShowMore>
            </WrapperShowMore>
          </ShortlistElement>
          <ShortlistElement>
            <SchoolNameWrapper>
              <SchoolName>School XXX</SchoolName>
              <SchoolAddress>
                123 Address Street 234 @ abcdefghijklmnopqrstuvwxyz
              </SchoolAddress>
            </SchoolNameWrapper>
            <PersonalNotesWrapper>
              <PersonalNotesTitle>Personal Notes</PersonalNotesTitle>
              <Notes>Hello World! I am a Note. Spam Spam Spam Spam Spam</Notes>
            </PersonalNotesWrapper>
            <WrapperShowMore>
              <ShowMore>Show me More</ShowMore>
            </WrapperShowMore>
          </ShortlistElement>
        </ShortlistWrapper>
        <WrapperViewMore>
          <ViewMoreButton>View More Schools</ViewMoreButton>
        </WrapperViewMore>
      </WrapperContainer>
    </Container>
  );
};

export default ShortlistPage;
