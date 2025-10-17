import { Link } from "react-router";
import MyContainer from "../components/MyContainer";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
const SignUp = () => {
  const [show, setShow] = useState(false)
  const handleSignup = (e)=>{
    e.preventDefault()
    const email = e.target.email?.value;
    const password = e.target.password?.value;
    // password validation start
    // if(password.length < 6){
    //   toast.error("Password must be 6 characters")
    //   return
    // }
    const regesExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+={[}\]|\\:;"'<>,.?/~`]).{8,}$/;
    if(!regesExp.test(password)){
      toast.error("password must be 8 charecters long and includes at least one charecter uppercase, one lowecase, and one special charecters")
      return
    }
    // password validation end


    // firebase sign in user start
    createUserWithEmailAndPassword(auth, email, password)
    .then(result =>{
      console.log(result.user)
      toast("SignUp Successfull")
    })
    .catch(e => {
      toast.error(e.message)
    })
  }
// firebase sign in user end
  return (
    <div className="min-h-[96vh] flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Animated floating circles */}
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-pink-400/30 rounded-full blur-2xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-2xl bottom-10 right-10 animate-pulse"></div>
      </div>

      <MyContainer>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white">
          <div className="max-w-lg text-center lg:text-left">
            <h1 className="text-5xl font-extrabold drop-shadow-lg">
              Create Your Account
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Join our community and unlock exclusive features. Your journey
              begins here!
            </p>
          </div>

          <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-white">
              Sign Up
            </h2>

            <form onSubmit={handleSignup} className="space-y-4">
                {/* email input */}
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  required
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                {/* password input */}
              </div>
              <div className="relative">
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <span
                  onClick={()=> setShow(!show)}
                  className="absolute right-[8px] top-[36px] cursor-pointer z-50"
                >
                  {show? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
                {/* button input */}
              <button type="submit" className="my-btn">
                Sign Up
              </button>
                {/* already have an account input */}
              <div className="text-center mt-3">
                <p className="text-sm text-white/80">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-pink-300 hover:text-white font-medium underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default SignUp;