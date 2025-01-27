<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class SessionController extends Controller
{
    public function register(Request $request)  {
        $validation = Validator::make($request->all(), [
            "name" => "required|min:3|max:255|",
            "email" => "required|email|unique:users,email",
            "password" => ['required', "confirmed", Password::min(8)->mixedCase()->numbers()->symbols()]
        ]);

        if (($validation->fails())) {
            $errors = $validation->errors();
            return $this->ApiResponse($errors->messages(), $errors->first(), false, 400);
        }
        
        // NO need to send email yet for email verification just verify here.
        $newUser = User::create($validation->validate());
        $newUser->email_verified_at = now();
        $newUser->save();

        return $this->ApiResponse(message:"You are registered successfull, please login to the app.");
        

    }

    public function apiLogin(Request $request)  {

        $validation = Validator::make($request->all(), [
            "email" => "required|email|exists:users,email",
            "password" => ['required']
        ]);

        if (($validation->fails())) {
            $errors = $validation->errors();
            return $this->ApiResponse($errors->messages(), $errors->first(), false, 400);
        }

        $validatedData = $validation->validate();

        $user = User::where('email', $validatedData["email"])->first();

        if (Hash::check($request->password, $user->password)) {
            $token = $user->createToken('CrmFormAccessToken')->accessToken;
            
            return $this->ApiResponse(new UserResource($user, $token), "Logged in Successfully.");
        } 
        
        return $this->ApiResponse([
            "password" => "Password is not correct."
        ], "Password is not correct.", false, 422);
        
    }

    public function logout(Request $request)  {
        
        $token = $request->user()->token();
        $token->revoke();
        return $this->ApiResponse([], "You are logged out successfully");
    }

    public function profile(Request $request) {
        return $this->ApiResponse(new UserResource($request->user(), $request->bearerToken()), "User Profile.");
    }
}
