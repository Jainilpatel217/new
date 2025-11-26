const validator=require('validator')

const validate=(data)=>{

      const mandatoryfield=['firstname','emailid','password'];

      const isallowed=mandatoryfield.every((k)=>Object.keys(data).includes(k));

      if(!isallowed)
        throw new Error('field missing');

      if(!validator.isEmail(data.emailid))
             throw new Error("invalid email")

      if(!validator.isStrongPassword(data.password))
        throw new Error("weak password");

      
}

module.exports=validate;