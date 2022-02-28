import UserAuthDAO from "../dao/userAuthDAO.js" 

// TODO: Token may be needed; Encryption may be added

export default class UserSevices { 
    static async Register(username, email, password, gender, region, mtl, edulevel, interest){
        // const existingUser = await UserAuthDAO.GetUserByEmail(email.trim());
        const existingUser = await UserAuthDAO.GetUserByEmail(email);
    
        if (existingUser) {
            console.log(`An account with ${email} has already been created`);
            // throw new Error(`An account with ${email} has already been created`) 
            console.log("hello")
            res.status(200).json({ message: `An account with ${email} has already been created` })
            console.log("hello")
        }
    
        let newUser = null;
        try {
            // newUser = await UserAuthDAO.CreateUser(email.trim(), username, password, gender, region, mtl, edulevel, interest);
            newUser = await UserAuthDAO.CreateUser(username, email, password, gender, region, mtl, edulevel, interest);
            res.status(200).json({ message: "Success"})
        } catch (err) {
            console.error(`An error occured while trying to create account ${err}`);
            // return res.status(500).json({error: e})
            // throw new Error(`An error has occured while trying to create amount`) 
            // res.status(500).json({ error: `An error has occured while trying to create amount` })
            res.status(500).send({ message: `Internal Server Error.\n\n${err}` });
        }
    }
    
    static async Login(email, password){
        const user = await UserAuthDAO.GetUserByEmail(email);
        // If user does not exist 
        if (!user) {
            console.info(`User Account does not exist ${email}`);
            return { success: false, message: 'Invalid Login: User Account does not exist'};
        }
    
        if (password != user.password) {
            console.info(`Failed login for account ${email}`);
            return { success: false, message: 'Invalid Login: Email or password is incorrect'};
        }
    
        return { success: true, message: 'Successfully logged in' };
    }

    static async Logout(userID){
        if (!userID) {
            console.error('No user ID');
        }
        
        const user = await UserAuthDAO.GetUserByID(userID)
        if (!user) {
            console.error(`User of ID ${userID} not found`);
        }
        
        try {
            await user.save();
        } catch (err) {
            console.error(`AuthService: Logout: ${err}`);
        }
        return { message: 'Successfully logged out' }
    }   
}
