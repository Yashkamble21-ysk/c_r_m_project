<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deal extends Model
{
    use HasFactory;

    protected $fillable = [
        'deal_name',
        'client_name',
        'project',
        'deal_value',
        'stage',
        'expected_close',
    ];
}