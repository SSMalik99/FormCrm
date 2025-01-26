<?php

use App\Http\Controllers\Api\FormsController;
use App\Http\Controllers\Auth\SessionController;
use App\Http\Middleware\ForceJsonHeader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware([ForceJsonHeader::class])->group(function () {
    
    Route::post("/register", [SessionController::class, "register"]);
    Route::post("/login", [SessionController::class, "apiLogin"]);
    Route::delete("/logout", [SessionController::class, "logout"]);
    
    
    Route::prefix("/forms")->middleware("auth:api")->controller(FormsController::class)->group(function() {
        Route::get("/list", [FormsController::class, "index"]);
        Route::post("/save", [FormsController::class, "store"]);
        Route::get("/{id}", [FormsController::class, "show"]);
        Route::post("/update/{id}", [FormsController::class, "update"]);
    });
    
});
