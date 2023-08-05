<?php

use App\Http\Controllers\ContactsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(ContactsController::class)->group(function () {
    Route::prefix("contacts")->group(function () {
        Route::get("/getAll", "getAll");
        Route::post("/add", "add");
        Route::post("/edit/{id}", "edit");
        Route::post("/delete/{id}", "delete");
    });
});