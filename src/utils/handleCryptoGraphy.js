 import CryptoJS from "crypto-js";
 const CryptoGrahpy = (text,key,setError,setOutput) => {
    
      const isCipherText = /^U2FsdGVkX1/.test(text);
     

      if(isCipherText){

        try {
            const bytes = CryptoJS.AES.decrypt(text, key);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    
            const isValid = decrypted &&
                    decrypted.trim().length > 0;
    
            if(isValid) {
                    setOutput(decrypted);
                    setError({
                        keyError: "",
                        textError: "",
                    });
            }
            else{
                setError({
                    keyError: "Invalid key",
                    textError: "Invalid text",
                });
                setOutput("");
            }
                
        } catch (error) {
            setError({
                keyError: "Invalid key",
                textError: "Invalid text",
            })
            setOutput("");
        }
      }
      else{
        try {
            const encrypted = CryptoJS.AES.encrypt(text, key).toString();
            setOutput(encrypted);
            setError({
                keyError: "",
                textError: "",
            })
        } catch (error) {
            setError({
                keyError: "Invalid key",
                textError: "Invalid text",
            })
            setOutput("");
        }
      }
    
  };

  export default CryptoGrahpy

