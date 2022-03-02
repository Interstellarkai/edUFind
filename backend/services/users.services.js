import UserAuthDAO from "../dao/userAuthDAO.js" 

// TODO: Token may be needed; Encryption may be added

export default class UserSevices { 
    static async Register(username, email, password, gender, region, mtl, edulevel, interest){
        // const existingUser = await UserAuthDAO.GetUserByEmail(email.trim());
        const existingUser = await UserAuthDAO.GetUserByEmail(email);
    
        if (existingUser) {
            console.error(`An account with ${email} has already been created`);
            return { success: false, message: `An account with ${email} has already been created` }
        }
    
        let newUser = null;
        try {
            // newUser = await UserAuthDAO.CreateUser(email.trim(), username, password, gender, region, mtl, edulevel, interest);
            newUser = await UserAuthDAO.CreateUser(username, email, password, gender, region, mtl, edulevel, interest);
            return { success: true, message: "Success"}
        } catch (err) {
            console.error(`An error occured while trying to create account ${err}`);
            return { success: false, message: `An error occured while trying to create account ${err}`}
        }
    }
    
    static async Login(email, password){
        const user = await UserAuthDAO.GetUserByEmail(email);
        // If user does not exist 
        if (!user) {
            console.error(`User Account does not exist ${email}`);
            return { success: false, message: `Invalid Login: User Account does not exist ${email}`};
        }
    
        if (password != user.password) {
            console.error(`Failed login for account ${email}`);
            return { success: false, message: 'Invalid Login: Wrong password'};
        }
    
        return { user, success: true, message: 'Successfully logged in' };
    }

    static async Logout(userID){
        if (!userID) {
            console.error('No user ID');
            return { success: false, message: 'No user ID' };
        }
        
        const user = await UserAuthDAO.GetUserByID(userID)
        if (!user) {
            console.error(`User of ID ${userID} not found`);
            return { success: false, message: `User of ID ${userID} not found` }
        }
        
        try {
            await user.save();
        } catch (err) {
            console.error(`AuthService: Logout: ${err}`);
        }
        return { success: true, message: 'Successfully logged out' }
    }   
}
