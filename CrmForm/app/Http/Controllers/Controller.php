<?php

namespace App\Http\Controllers;

abstract class Controller
{
    
    public function ApiResponse($data = [], $message = "Api Response", $success = true, $statusCode = 200){

        $response = [
            "data" => $data,
            "message" => $message,
            "success" => $success
        ];
        
        return response()->json($response, $statusCode);
    }
}
