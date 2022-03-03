// import RefreshToken from '../models/refreshToken';

// export default class RefreshTokenRepo{
//     static async CreateRefreshToken(userID, token){

//         const expiry = new Date();
//         expiry.setDate(expiry.getDate() + 7);

//         const newRefreshToken = new RefreshToken({
//             user: userID,
//             token,
//             generatedAt: new Date(),
//             expiresAt: expiry,
//         });

//         try {
//             await newRefreshToken.save();
//         } catch (err) {
//             console.error(`RefreshTokenRepo: CreateRefreshToken: An error occured while saving refresh token`);
//             throw new Error('An error occured while saving refresh token');
//         }
//     }
    
//     static async GetRefreshTokenByToken(token){
//         try {
//             const refreshToken = await RefreshToken.findOne({ token });
//             return refreshToken;
//         } catch (err) {
//             console.error(`RefreshTokenRepo: GetRefreshTokenByToken: An error occured while retrieving token ${token}`);
//             throw new Error('An error occured while retrieving refresh token');
//         }
//     }

//     static async DeleteRefreshTokensForUser(userID){
//         try {
//             await RefreshToken.deleteMany({ user: userID });
//         } catch (err) {
//             console.error(`RefreshTokenRepo: DeleteRefreshTokensForUser: An error occured while deleting token for ${userID}`);
//             throw new Error('An error occured while retrieving refresh token');
//         }
//     }
// }
