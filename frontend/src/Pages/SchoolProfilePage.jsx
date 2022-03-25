import Comments from "../Components/CommentsComponents/Comments";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { publicRequest } from "../requestMethod";

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    /* background-color: #ffe7c3; */  
`;

const WrapperContainer = styled.div`
    /* height: 80%; */
    /* display: flex; */
    /* justify-content: center; */
    /* align-items: center; */
    /* border: black solid; */
`;

const Wrapper = styled.div`
    /* display: flex; */
    /* flex-direction: column; */
    /* align-items: center; */
    /* justify-content: center; */
    /* border: solid blue; */
    /* height: 100%; */
`;

const SchoolWrapperContainer = styled.div`
    background-color: #bcd2e8;
`;

const SchoolWrapper = styled.div`
    
`;

const AboutWrapperContainer = styled.div`
    background-color: #264e70;
`;

const AboutWrapper = styled.div`
     
`;

const GettingThereWrapperContainer = styled.div`
    background-color: #fdebd3;
`;

const GettingThereWrapper = styled.div`
    
`;

const CommentsWrapperContainer = styled.div`
    background-color: #bcd2e8;
`;

const CommentsWrapper = styled.div`
    
`;

const SchoolHeader = styled.h1`
    font-size: 72px;
    color: #000000;
    font-weight: bold;
`;

const BasicInfoText = styled.p`
    font-size: 24px;
    color: #000000;
`;

const OfferingText = styled.p`
    font-size: 24px;
    color: #000000;
    font-weight: medium;
`;

const AboutHeader = styled.h2`
    font-size: 48px;
    color: #fdebd3;
    font-weight: medium;
`;

const AboutText = styled.p`
    font-size: 32px;
    color: #fdebd3;
`;

const GettingThereHeader = styled.h2`
    font-size: 48px;
    color: #264e70;
    font-weight: medium;
`;

const GettingThereText = styled.p`
    font-size: 32px;
    color: #264e70
`;

const CommentsHeader = styled.h3`
    font-size: 36px;
    color: #000000;
    font-weight: medium;
`;

const Button = styled.button`
    width: 20%;
    margin: 20px 0;
    padding: 5px;
    border: none;
    color: white;
    font-weight: 600;
    background-color: #5a5add;
    cursor: pointer;
`;

const ShortlistButton = styled.button`

`;

const CommentButton = styled.button`

`;

const Icon = styled.image`

`;

const CommentsForm = styled.form`

`;

const CommentInput = styled.input`
  padding: 10px;
  font-weight: 600;

  font-family: ${(props) =>
    props.type === "password" && "Verdana, Geneva, Tahoma, sans-serif"};

  letter-spacing: ${(props) => props.type === "password" && "0.125em"};
`;

//const res = await publicRequest.get(GETSCHOOL(schName)); using the API to get school data
// res.data.schools[0].postal_code <- getting the data, and storing it into a variable

const SchoolProfilePage = () => {
    return (
        <Container>
            <Navbar />
            
            <SchoolWrapperContainer>
                
                <SchoolWrapper>
                    <SchoolHeader>School Name</SchoolHeader>
                    <ShortlistButton></ShortlistButton>
                    <Icon></Icon> {/* Address Icon */}
                    <BasicInfoText>School Address</BasicInfoText>
                    <Icon></Icon> {/* Website Icon */}
                    <BasicInfoText>School Website</BasicInfoText>
                </SchoolWrapper>

                <SchoolWrapper>

                    <OfferingText>Co-Curricular Activites offered:</OfferingText>
                    <ul>
                        <li>CCA 1</li>
                        <li>CCA 2</li>
                        <li>CCA 3</li>
                    </ul>

                    <OfferingText>Subjects offered:</OfferingText>
                    <ul>
                        <li>Subject 1</li>
                        <li>Subject 2</li>
                        <li>Subject 3</li>
                    </ul>

                    <OfferingText>MTLs offered:</OfferingText>
                    <ul>
                        <li>MTL 1</li>
                        <li>MTL 2</li>
                        <li>MTL 3</li>
                    </ul>

                    <OfferingText>Elective Programmes offered:</OfferingText>
                    <ul>
                        <li>Elective 1</li>
                        <li>Elective 2</li>
                        <li>Elective 3</li>
                    </ul>

                    <OfferingText>Support for Special Education Needs:</OfferingText>
                    <ul>
                        <li>Support Feature 1</li>
                        <li>Support Feature 2</li>
                        <li>Support Feature 3</li>
                    </ul>

                </SchoolWrapper>
            </SchoolWrapperContainer>

            <AboutWrapperContainer>
                <AboutWrapper>
                    <AboutHeader>About</AboutHeader>
                    <AboutText>School Nature:</AboutText>
                    <AboutText>School Type:</AboutText>
                </AboutWrapper>
            </AboutWrapperContainer>

            <GettingThereWrapperContainer>
                <GettingThereWrapper>
                    <GettingThereHeader>Getting There</GettingThereHeader>
                    <GettingThereText>Nearest MRT Station:</GettingThereText>
                    <GettingThereText>Buses:</GettingThereText>
                </GettingThereWrapper>
            </GettingThereWrapperContainer>

            <CommentsWrapperContainer>
                <CommentsWrapper>
                    <CommentsHeader>Comments</CommentsHeader>
                    <CommentsForm>
                        {/* <CommentInput>Write a comment</CommentInput> */}
                        <CommentButton>View More Comments</CommentButton>
                    </CommentsForm>
                </CommentsWrapper>
            </CommentsWrapperContainer>

            {/* This block of code below is testing implementation of a comments feature */}
            <CommentsWrapperContainer>
                <CommentsWrapper>
                    <CommentsHeader>Comments TEST</CommentsHeader>
                    <Comments currentUserID = "1" /> {/* this is static data atm, need to fetch from backend */}
                </CommentsWrapper>
            </CommentsWrapperContainer>

        </Container>
    );
};

export default SchoolProfilePage;