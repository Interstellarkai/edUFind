import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { publicRequest } from "../requestMethod";
import locationLogo from "../Logos/location.png";
import wwwLogo from "../Logos/www.png";
import phoneLogo from "../Logos/phone.png";
import emailLogo from "../Logos/email.png";
//import { GETSCHOOL } from "../requestMethod"

import CommentSection from "../Components/CommentComponents/CommentSection";

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


//const res = await publicRequest.get(GETSCHOOL(schName)); //using the API to get school data
// res.data.schools[0].postal_code <- getting the data, and storing it into a variable

// const schoolName = res.data.schools[0].school_name;
// const schoolAddress = res.data.schools[0].address;
// const schoolPostalCode = res.data.schools[0].postal_code
// const schoolWebsite = res.data.schools[0].url_address;
// const schoolNature = res.data.schools[0].nature_code;
// const schoolType = res.data.schools[0].type_code;
// const nearestMRT = res.data.schools[0].mrt_desc;
// const nearestBus = res.data.schools[0].bus_desc;

/*

const getMTLs = () => {
    var mtlArray = [];

    const fetchedMTL1 = res.data.schools[0].mothertongue1_code;
    const fetchedMTL2 = res.data.schools[0].mothertongue2_code;
    const fetchedMTL3 = res.data.schools[0].mothertongue3_code;

    if (fetchedMTL1 != "na") {
        mtlArray.push(fetchedMTL1);
    }

    if (fetchedMTL2 != "na") {
        mtlArray.push(fetchedMTL2);
    }

    if (fetchedMTL3 != "na") {
        mtlArray.push(fetchedMTL3);
    }


}

const getCCAs = () => {
    var ccaArray = [];

    const fetchedCCA = res.data.schools[0].cca_generic_name;

    for (var i of fetchedCCA) {
        ccaArray.push(i);
    }

}

const getElectives = () => {
    var electivesArray = [];

    const fetchedElectives = res.data.schools[0].moe_programme_desc;

    for (var i of fetchedElectives) {
        electivesArray.push(i);
    }
}

const getSubjects = () => {
    var subjectsArray = [];

    const fetchedSubjects = res.data.schools[0].subject_desc;

    for (var i of fetchedSubjects) {
        subjectsArray.push(i);
    }
}


*/

const SchoolProfilePage = () => {
    return (
        <Container>
            <Navbar />
            
            <SchoolWrapperContainer>
                
                <SchoolWrapper>
                    <SchoolHeader>School Name</SchoolHeader> {/* insert schoolName here */}
                    {/* <ShortlistButton></ShortlistButton> */}
                    
                    <div style={{ display: 'flex' }}>
                        <img src={locationLogo} style={{ height: '50px', width: '50px' }} />
                        <BasicInfoText>School Address</BasicInfoText> {/* insert schoolAddress and schoolPostalCode here and find a way to hyperlink this to google maps! */}
                    </div>

                    <div style={{ display: 'flex' }}>
                        <img src={wwwLogo} style={{ height: '50px', width: '50px' }} />
                        <BasicInfoText>School Website</BasicInfoText> {/* insert schoolWebsite here */}
                    </div>
                    
                    <div style={{ display: 'flex' }}>
                        <img src={phoneLogo} style={{ height: '50px', width: '50px' }} />
                        <BasicInfoText>Contact Number</BasicInfoText>
                    </div>
                    
                    <div style={{ display: 'flex' }}>
                        <img src={emailLogo} style={{ height: '50px', width: '50px' }} />
                        <BasicInfoText>Email Address</BasicInfoText>
                    </div>
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
                    <AboutText>School Nature:</AboutText> {/* insert schoolNature here */}
                    <AboutText>School Type:</AboutText> {/* insert schoolType here */}
                </AboutWrapper>
            </AboutWrapperContainer>

            <GettingThereWrapperContainer>
                <GettingThereWrapper>
                    <GettingThereHeader>Getting There</GettingThereHeader>
                    <GettingThereText>Nearest MRT Station:</GettingThereText> {/* insert nearestMRT here */}
                    <GettingThereText>Buses:</GettingThereText> {/* insert nearestBus here */}
                </GettingThereWrapper>
            </GettingThereWrapperContainer>

            {/* <CommentsWrapperContainer> */}
                {/* <CommentsWrapper> */}
                    {/* <CommentsHeader>Comments</CommentsHeader> */}
                    {/* <CommentsForm> */}
                        {/* <CommentInput>Write a comment</CommentInput> */}
                        {/* <CommentButton>View More Comments</CommentButton> */}
                    {/* </CommentsForm> */}
                {/* </CommentsWrapper> */}
            {/* </CommentsWrapperContainer> */}

            {/* This block of code below is testing implementation of a comments feature */}
            <CommentsWrapperContainer>
                <CommentsWrapper>
                    <CommentsHeader>Comments TEST</CommentsHeader>
                    <CommentSection />
                </CommentsWrapper>
            </CommentsWrapperContainer>

        </Container>
    );
};

export default SchoolProfilePage;