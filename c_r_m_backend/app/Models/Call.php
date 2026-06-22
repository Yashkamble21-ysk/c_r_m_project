<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Call extends Model
{
    use HasFactory;

    protected $fillable = [
        'caller_name', 'caller_number', 'receiver_name', 
        'receiver_number', 'duration', 'status', 'notes', 
        'call_time', 'direction'
    ];
}