<?php

use Illuminate\Support\Facades\Route as Router;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\DealController;
use App\Http\Controllers\Api\EmailController;
use App\Http\Controllers\Api\CallController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\AccountController;



Route::get('/test', function () {
    return response()->json([
        'message' => 'API Working'
    ]);
});

Route::get('/leads', [LeadController::class, 'index']);
Route::post('/leads', [LeadController::class, 'store']);
Route::get('/leads/{id}', [LeadController::class, 'show']);
Route::put('/leads/{id}', [LeadController::class, 'update']);
Route::delete('/leads/{id}', [LeadController::class, 'destroy']);
Route::post('/leads/{id}/note', [LeadController::class, 'addNote']);

Route::get('/deals', [DealController::class, 'index']);

Route::get('/emails', [EmailController::class, 'index']);

Route::get('/accounts',[AccountController::class,'index']);
Route::post('/contacts', [ContactController::class, 'store']);


Route::get('/calls', [CallController::class, 'index']);

// Email Send Route
Route::post('/emails/send', [EmailController::class, 'send']);

Route::get('/contacts', [ContactController::class, 'index']);
Route::get('/contacts/{id}', [ContactController::class, 'show']);

Route::get('/tasks',          [TaskController::class, 'index']);
Route::post('/tasks',         [TaskController::class, 'store']);
Route::get('/tasks/{id}',     [TaskController::class, 'show']);
Route::put('/tasks/{id}',     [TaskController::class, 'update']);
Route::delete('/tasks/{id}',  [TaskController::class, 'destroy']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});