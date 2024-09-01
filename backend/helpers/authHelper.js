import bcrypt from 'bcrypt'

export const hashingPassword = async (password)=>{
    try{
        const salt = await bcrypt.genSalt(10) // number of rounds 10
        const hPassword = await bcrypt.hash(password,salt);
        return hPassword;
    }catch(e){
        console.log(e);
    }
};

export const comparePassword = async (password,hPassword)=>{
    return bcrypt.compare(password,hPassword);
};

