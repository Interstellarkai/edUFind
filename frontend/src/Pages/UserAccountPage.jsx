import styled from "styled-components";
import Navbar from "../Components/Navbar";

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: #ffe7c3;
`;

const WrapperContainer = styled.div`
    /* height: 80%; */
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: black solid; */
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    /* border: solid blue; */
    height: 100%;
`;

const Header1 = styled.h1`
    font-size: 48px;
    color: #264E70;
`;

const Header2 = styled.h2`
    font-size: 18px;
    color: #000000;
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin: 20px 0;
`;

const Input = styled.input`
    padding: 10px;
    font-weight: 600;

    font-family: ${(props) => props.type === "password" && "Verdana, Geneva, Tahoma, sans-serif"};

    letter-spacing: ${(props) => props.type === "password" && "0.125em"};
`;

const UserAccountPage = () => {
    return (
        <Container>
            <Navbar />
            <WrapperContainer>
                <Wrapper>
                    <Header1>Basic User Information</Header1>
                    <Header2>Name: (INSERT USER'S NAME HERE FROM DB)</Header2>
                    <Header2>Gender: (Insert user's gender here from DB)</Header2>
                    <Header2>Region: (Insert user's residential region here from DB)</Header2>
                    <Header2>Level of Education: (Insert user's level of education from DB)</Header2>
                    <Header2>Mother Tongue Language: (Insert user's MTL from DB)</Header2>

                    <Header1>Your Interests</Header1>
                    <Header2>Co-Curricular Activities (CCAs)</Header2>
                    <ul>
                        <li>Performing Arts</li>
                        <li>Sports</li>
                        <li>Clubs and Societies</li>
                        <li>Others</li>
                    </ul>

                    <Header1>Account Information</Header1>
                    <Header2>Email: (Insert user's email here from DB)</Header2>
                    <Form>
                        {/* The current password will be checked against what's stored in the database, sort of an authorization to allow changing of pswd */}
                        <Label>Enter Current Password: </Label>
                        <Input
                            type = 'password'
                            placeholder = 'Current Password'
                        />

                        <Label>New Password: </Label>
                        <Input
                            type = 'password'
                            placeholder = 'Enter New Password'
                        />

                        <Label>Confirm New Password: </Label>
                        <Input
                            type = 'password'
                            placeholder = 'Re-enter New Password'
                        />
                        {/* If the input in new password and confirm new password match, the new password is updated in the database */}
                        <Button>Save Changes</Button>
                    </Form>
                    
                </Wrapper>
            </WrapperContainer>
        </Container>
    );
};

export default UserAccountPage;