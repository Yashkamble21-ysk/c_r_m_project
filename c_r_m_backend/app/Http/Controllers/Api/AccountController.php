<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Account;

class AccountController extends Controller
{
    public function index()
    {
        return response()->json([
            'status'=>true,
            'data'=>Account::latest()->get()
        ]);
    }
}