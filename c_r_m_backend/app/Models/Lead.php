<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    protected $fillable = [
        'lead_id',
        'title',
        'customer_name',
        'phone',
        'email',
        'project',
        'source',
        'status',
        'assigned_to',
        'created_date',
        'follow_up_date',
        'budget',
        'notes'
    ];
}